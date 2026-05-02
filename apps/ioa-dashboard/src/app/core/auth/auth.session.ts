import { computed, Injectable, signal } from "@angular/core";

@Injectable({ providedIn: "root" })
export class AuthSession {
  private readonly tokenStorageKey = "triage.ioa-dashboard.accessToken";
  private readonly accessTokenState = signal<string | null>(localStorage.getItem(this.tokenStorageKey));

  readonly accessToken = this.accessTokenState.asReadonly();
  readonly isAuthenticated = computed(() => this.accessToken() !== null);

  setAccessToken(accessToken: string) {
    localStorage.setItem(this.tokenStorageKey, accessToken);
    this.accessTokenState.set(accessToken);
  }

  clear() {
    localStorage.removeItem(this.tokenStorageKey);
    this.accessTokenState.set(null);
  }
}

