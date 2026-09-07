import { TestBed } from "@angular/core/testing";
import { provideHttpClient } from "@angular/common/http";
import { provideHttpClientTesting } from "@angular/common/http/testing";

import { PatientFormControllerService } from "./patient-form-controller.service";
import { API_URL } from "../../../core/http/api-url.token";

describe("PatientFormControllerService", () => {
	let service: PatientFormControllerService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				provideHttpClient(),
				provideHttpClientTesting(),
				{ provide: API_URL, useValue: "http://localhost:3000" },
			],
		});
		service = TestBed.inject(PatientFormControllerService);
	});

	it("should be created", () => {
		expect(service).toBeTruthy();
	});
});
