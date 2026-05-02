import { Routes } from "@angular/router";
import { authGuard } from "./core/auth/auth.guard";
import { AppShellComponent } from "./layout/app-shell/app-shell.component";

export const routes: Routes = [
  {
    path: "auth",
    loadComponent: () =>
      import("./features/auth/sign-in/sign-in.page").then((m) => m.SignInPage)
  },
  {
    path: "",
    component: AppShellComponent,
    canActivateChild: [authGuard],
    children: [
      {
        path: "",
        pathMatch: "full",
        loadComponent: () =>
          import("./features/queue/pages/queue-home/queue-home.page").then((m) => m.QueueHomePage)
      },
      {
        path: "patient-record",
        loadComponent: () =>
          import("./features/patient-record/pages/patient-record-home/patient-record-home.page").then(
            (m) => m.PatientRecordHomePage
          )
      }
    ]
  },
  {
    path: "**",
    redirectTo: ""
  }
];
