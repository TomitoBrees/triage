import { TestBed } from "@angular/core/testing";
import { provideHttpClient } from "@angular/common/http";
import { provideHttpClientTesting } from "@angular/common/http/testing";

import { PatientQuestionnaireService } from "./patient-questionnaire.service";
import { API_URL } from "../../../core/http/api-url.token";

describe("PatientQuestionnaireService", () => {
	let service: PatientQuestionnaireService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				provideHttpClient(),
				provideHttpClientTesting(),
				{ provide: API_URL, useValue: "http://localhost:3000" },
			],
		});
		service = TestBed.inject(PatientQuestionnaireService);
	});

	it("should be created", () => {
		expect(service).toBeTruthy();
	});
});
