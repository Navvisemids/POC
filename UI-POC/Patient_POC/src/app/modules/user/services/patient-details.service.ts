import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { PatientDetails } from '../models/patient-details';
import patientDetailsJson from 'src/assets/mockData/patient-details.json';

@Injectable({
  providedIn: 'root',
})
export class PatientDetailsService {
  private readonly baseUrl = 'assets/mockData/';
  patientDetails: PatientDetails[] = patientDetailsJson as PatientDetails[];

  constructor() {}

  getAllPatients(): Observable<PatientDetails[]> {
    // const url = `${this.baseUrl}/patient-details.json`;
    // return this.httpClient.get<PatientDetails[]>(url);
    return of(this.patientDetails);
  }

  updatePatientDetails(patientDetails: PatientDetails): Observable<boolean> {
    const index = this.patientDetails.findIndex(
      (item) => item.id === patientDetails.id
    );
    this.patientDetails[index] = patientDetails;
    return of(true);
  }

  savePatientDetails(patientDetails: PatientDetails): Observable<boolean> {
    this.patientDetails.push(patientDetails);
    return of(true);
  }

  deletePatientDetails(id: number): Observable<boolean> {
    const index = this.patientDetails.findIndex((item) => item.id === id);
    this.patientDetails.splice(index, 1);
    return of(true);
  }
}
