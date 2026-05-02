import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { API_URL } from "../http/api-url.token";
import { AuthCredentials, AuthResponse, CurrentUser } from "./auth.models";

@Injectable({ providedIn: "root" })
export class AuthApi {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = inject(API_URL);

  register(credentials: AuthCredentials) {
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/register`, credentials);
  }

  login(credentials: AuthCredentials) {
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/login`, credentials);
  }

  me() {
    return this.http.get<CurrentUser>(`${this.apiUrl}/auth/me`);
  }
}

