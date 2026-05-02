import { Component, inject, signal } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthApi } from "../../../core/auth/auth.api";
import { AuthSession } from "../../../core/auth/auth.session";

@Component({
  selector: "app-sign-in-page",
  imports: [ReactiveFormsModule],
  templateUrl: "./sign-in.page.html",
  styleUrl: "./sign-in.page.css"
})
export class SignInPage {
  private readonly formBuilder = inject(FormBuilder);
  private readonly authApi = inject(AuthApi);
  private readonly authSession = inject(AuthSession);
  private readonly router = inject(Router);

  protected readonly mode = signal<"login" | "register">("login");
  protected readonly message = signal("Ready");

  protected readonly form = this.formBuilder.nonNullable.group({
    email: ["", [Validators.required, Validators.email]],
    password: ["", [Validators.required, Validators.minLength(8)]]
  });

  protected submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const credentials = this.form.getRawValue();
    const request = this.mode() === "login" ? this.authApi.login(credentials) : this.authApi.register(credentials);

    request.subscribe({
      next: ({ accessToken }) => {
        this.authSession.setAccessToken(accessToken);
        void this.router.navigateByUrl("/");
      },
      error: () => this.message.set("Authentication failed")
    });
  }
}

