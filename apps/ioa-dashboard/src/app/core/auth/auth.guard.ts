import { inject } from "@angular/core";
import { CanActivateChildFn, Router } from "@angular/router";
import { AuthSession } from "./auth.session";

export const authGuard: CanActivateChildFn = () => {
	const session = inject(AuthSession);
	const router = inject(Router);

	return session.isAuthenticated() ? true : router.createUrlTree(["/auth"]);
};
