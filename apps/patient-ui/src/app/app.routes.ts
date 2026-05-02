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
          import("./features/intake/pages/intake-home/intake-home.page").then((m) => m.IntakeHomePage)
      },
      {
        path: "profile",
        loadComponent: () =>
          import("./features/profile/pages/profile-home/profile-home.page").then((m) => m.ProfileHomePage)
      }
    ]
  },
  {
    path: "**",
    redirectTo: ""
  }
];
