import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PatientDetails } from '../models/patient-details';
import { PatientDetailsService } from '../services/patient-details.service';

@Component({
  selector: 'app-add-edit-patient-details',
  templateUrl: '../views/add-edit-patient-details.component.html',
  styleUrls: ['../styles/add-edit-patient-details.component.less'],
})
export class AddEditPatientDetailsComponent implements OnInit {
  patientDetails!: PatientDetails;
  @ViewChild('saveToaster') saveToaster?: TemplateRef<any>;

  constructor(private patientDetailsService: PatientDetailsService) {}

  ngOnInit(): void {}

  onCancel(patientDetailsForm: NgForm): void {
    patientDetailsForm.form.reset();
  }

  onSave(patientDetailsForm: NgForm): void {
    this.patientDetailsService
      .savePatientDetails(this.patientDetails)
      .subscribe((result: boolean) => {
        if (result) {
        }
      });
  }
}
