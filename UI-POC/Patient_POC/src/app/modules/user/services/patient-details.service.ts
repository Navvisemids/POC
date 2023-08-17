import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { PatientDetails } from '../models/patient-details';
import patientDetailsJson from 'src/assets/mockData/patient-details.json';

@Injectable({
  providedIn: 'root',
})
export class PatientDetailsService {
  private readonly baseUrl = 'assets/mockData/';
  patientDetails: PatientDetails[] = patientDetailsJson as PatientDetails[];

  constructor(protected httpClient: HttpClient) {}

  getAllPatients(): Observable<PatientDetails[]> {
    // const url = `${this.baseUrl}/patient-details.json`;
    // return this.httpClient.get<PatientDetails[]>(url);
    return of(this.patientDetails);
  }

  getPatientDetails(id: number): Observable<PatientDetails> {
    // const url = `${this.baseUrl}/patient-details.json`;
    // return this.httpClient.get<PatientDetails>(url);
    return of(this.patientDetails.find((patient) => patient.id === id)!);
  }

  updatePatientDetails(PatientDetails: PatientDetails): Observable<boolean> {
    return of(true);
  }

  savePatientDetails(PatientDetails: PatientDetails): Observable<boolean> {
    return of(true);
  }
}
