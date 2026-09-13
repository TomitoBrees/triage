import { Routes } from "@angular/router";
import { LandingPage } from "./features/landing-page/landing-page.component";
import { PatientAccess } from "./features/patient-access/patient-access.component";

export const routes: Routes = [
	{
		path: "",
		component: LandingPage,
	},
	{
		path: "interface-patient",
		component: PatientAccess,
	},
	{
		path: "**",
		redirectTo: "",
	},
];
