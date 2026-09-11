import { Routes } from "@angular/router";
import { PatientPage } from "./features/patient-page/patient-page.component";

export const routes: Routes = [
	{
		path: "patient/:id",
		component: PatientPage,
	},
	{
		path: "**",
		redirectTo: "",
	},
];
