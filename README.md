# Triage

**Aide au triage aux urgences.** Le patient scanne un QR code en salle d'attente, répond à un
questionnaire court adapté à son motif de venue, et l'infirmière d'accueil (IAO) voit arriver une
file déjà priorisée selon l'échelle **FRENCH**.

Monorepo TypeScript : une API NestJS, trois applications Angular, un package de questions partagé
entre le front et le back.

| | |
|---|---|
| **Landing** | présentation du projet + QR code d'accès |
| **Patient UI** | https://triage-patient-ui.vercel.app |
| **Dashboard IAO** | https://triage-ioa-dashboard.vercel.app |
| **API** | https://triage-api-liart.vercel.app/api |

---

## Le problème

À l'arrivée aux urgences, le motif de venue est recueilli oralement par l'IAO, patient par patient.
Le temps d'entretien devient le goulot d'étranglement : la file n'est priorisée qu'au fur et à
mesure des entretiens, pas à l'arrivée.

L'idée du projet : déplacer la collecte d'informations **avant** l'entretien. Le patient remplit
lui-même le questionnaire pendant qu'il attend, le score FRENCH est calculé côté serveur, et l'IAO
arbitre sur une file déjà classée plutôt que sur une liste d'arrivée brute.

> Projet personnel, non certifié dispositif médical. Le score proposé est une aide à la décision :
> l'IAO reste seule décisionnaire et peut réévaluer chaque niveau depuis le dashboard.

---

## Parcours

```
  Patient                          API                        IAO
 ────────                        ─────                      ─────
 scan QR code
     │
     ├─ symptômes d'urgence ?  ──────────────────────────────┐
     │   (7 red flags)                                       │  si oui → FRENCH 1
     ├─ symptôme principal                                   │  immédiatement
     │   (12 familles)                                       │
     ├─ questions communes                                   │
     ├─ informations perso                                   │
     ├─ questions spécifiques                                │
     │   au symptôme choisi                                  │
     │                                                       ▼
     └──── POST /api/patient ──▶ scorer dédié ──▶ FRENCH 1-5 ──▶ file triée
                                 (12 scorers)                    par niveau,
                                                                 puis par heure
                                                                 d'arrivée
```

### Les niveaux FRENCH

| Niveau | Libellé | Délai cible |
|---|---|---|
| 1 | Prise en charge immédiate | immédiat |
| 2 | Très urgent | ≤ 20 min |
| 3 | Urgent | ≤ 60 min |
| 4 | Peu urgent | ≤ 120 min |
| 5 | Non urgent | ≤ 240 min |
| 0 | À déterminer | cas libre, à évaluer par l'IAO |

---

## Ce que le projet montre techniquement

### Un questionnaire conditionnel piloté par la donnée

Les questions ne sont pas écrites dans des templates : ce sont des objets typés dans
[`packages/shared`](packages/shared/src/patient-questions.ts). Chaque question porte son type
(`boolean`, `single-choice`, `number`) et ses `conditions` d'affichage, ce qui permet d'enchaîner
des questions de relance sans ajouter de `@if` dans le HTML.

```ts
export type PatientQuestionCondition = {
  questionId: string;
  answer: PatientQuestionAnswer | PatientQuestionAnswer[];
};
```

Le même package est consommé par le front patient (pour poser les questions) **et** par le
dashboard IAO (pour réafficher les réponses avec leur libellé d'origine). Une question renommée
reste cohérente des deux côtés, sans duplication de labels.

### Le scoring, isolé du reste de l'API

Le calcul du score n'est pas un `switch` géant dans un service. Chaque famille de symptômes a son
scorer, derrière une interface commune, injecté via un token Nest multi-provider :

```ts
export class FrenchScoreService {
  constructor(@Inject(SYMPTOM_SCORERS) private readonly scorers: SymptomScorer[]) {}

  public computeFrench(dto: CreatePatientDto): number {
    if (dto.criticalSymptom) return 1;
    const scorer = this.scorers.find((c) => c.symptomId === dto.generalSymptom);
    ...
  }
}
```

12 scorers ([`apps/api/src/patient/scoring/scorers/`](apps/api/src/patient/scoring/scorers/)) :
cardiaque, respiratoire, neurologique, abdominal, traumatologique, infectieux, urinaire,
gynécologique, dermatologique, ORL, psychologique, intoxication. Ajouter une famille = ajouter un
fichier et l'enregistrer, sans toucher au reste.

Le score est **toujours** recalculé côté serveur à partir des réponses brutes : le client n'envoie
jamais de niveau de priorité.

### Angular 21, sans surcouche

- Composants standalone, lazy loading au niveau des routes.
- État local en **signals** (`signal`, `computed`, `effect`) — pas de store global tant que la
  complexité ne le justifie pas.
- Injection via `inject()`.
- Bibliothèque de composants UI maison (slider, switch, number-input, dialog, info-box…) dans
  `shared/ui`, pensée pour un usage mobile en salle d'attente.

Les conventions sont documentées dans [FRONTEND_ARCHITECTURE.md](FRONTEND_ARCHITECTURE.md).

---

## Stack

| Couche | Techno |
|---|---|
| Frontends | Angular 21.2 (standalone, signals), SCSS |
| API | NestJS 11, class-validator, Prisma 7 |
| Base | PostgreSQL 18 (Docker en local, Neon en production) |
| Monorepo | pnpm workspaces, Prettier, TypeScript 5.9 |
| Déploiement | Vercel (4 projets : api, patient-ui, ioa-dashboard, landing) |

---

## Structure

```
apps/
  api/              NestJS — REST /api/patient, Prisma, scoring FRENCH
  patient-ui/       questionnaire patient (mobile-first, accès par QR code)
  ioa-dashboard/    file d'attente priorisée + fiche patient + note IAO
  landing/          présentation du projet et accès aux deux interfaces
packages/
  shared/           questions communes et spécifiques, libellés de symptômes
```

### API

| Méthode | Route | Rôle |
|---|---|---|
| `POST` | `/api/patient` | crée un patient, calcule et stocke son FRENCH |
| `GET` | `/api/patient` | file d'attente (données de liste uniquement) |
| `GET` | `/api/patient/:id` | fiche détaillée : réponses, score, note IAO |
| `PATCH` | `/api/patient/:id` | statut, niveau FRENCH réévalué, note IAO |

---

## Lancer le projet

Prérequis : Node 22+, Corepack, Docker (pour PostgreSQL en local).

```bash
corepack pnpm install
cp apps/api/.env.example apps/api/.env
corepack pnpm db:up
corepack pnpm prisma:generate
corepack pnpm prisma:migrate
corepack pnpm dev
```

| Service | URL locale |
|---|---|
| API | http://localhost:3000 |
| Patient UI | http://localhost:4200 |
| Dashboard IAO | http://localhost:4201 |
| Landing | http://localhost:4202 |

Les apps Angular sont servies sur `0.0.0.0` : le questionnaire est testable depuis un téléphone
sur le même réseau, ce qui est le vrai contexte d'usage.

---

## Pistes suivantes

- Couverture de tests sur les 12 scorers (jeux de réponses → niveau attendu).
- Mise à jour temps réel de la file côté IAO (SSE ou WebSocket) plutôt qu'au chargement.
- Authentification du dashboard IAO, retirée pour la démo publique.
- Accessibilité : parcours complet au clavier et au lecteur d'écran sur le questionnaire.

---

## Auteur

**Tom L'Hotellier** — [LinkedIn](https://www.linkedin.com/in/tom-l-hotellier/) ·
[GitHub](https://github.com/TomitoBrees)
