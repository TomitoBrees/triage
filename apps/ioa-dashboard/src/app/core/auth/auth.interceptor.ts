import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { AuthSession } from "./auth.session";

export const authInterceptor: HttpInterceptorFn = (request, next) => {
  const accessToken = inject(AuthSession).accessToken();

  if (!accessToken) {
    return next(request);
  }

  return next(
    request.clone({
      setHeaders: {
        Authorization: `Bearer ${accessToken}`
      }
    })
  );
};

