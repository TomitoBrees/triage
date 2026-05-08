import { TestBed } from "@angular/core/testing";

import { PatientQuestionnaire } from "./patient-questionnaire.service";

describe("PatientQuestionnaire", () => {
	let service: PatientQuestionnaire;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(PatientQuestionnaire);
	});

	it("should be created", () => {
		expect(service).toBeTruthy();
	});
});
