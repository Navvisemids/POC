import { Component, OnInit } from '@angular/core';
import { PatientDetails } from '../models/patient-details';
import { PatientDetailsService } from '../services/patient-details.service';
import { ColDef } from 'ag-grid-community';

@Component({
  selector: 'app-patient-details',
  templateUrl: '../views/patient-details.component.html',
  styleUrls: ['../styles/patient-details.component.less'],
})
export class PatientDetailsComponent implements OnInit {
  patientDetails: PatientDetails[] = [];
  columnDefs: ColDef[] = [];

  constructor(private patientDetailsService: PatientDetailsService) {
    this.columnDefConfigure();
  }

  ngOnInit(): void {
    this.patientDetailsService
      .getAllPatients()
      .subscribe((data: PatientDetails[]) => {
        if (data) {
          this.patientDetails = data;
        }
      });
  }

  columnDefConfigure(): void {
    this.columnDefs = [
      {
        headerName: 'Name',
        field: 'name',
        headerClass: 'text-center',
        cellClass: 'text-center',
      },
      {
        headerName: 'Date Of Birth',
        field: 'dateOfBirth',
        headerClass: 'text-center',
        cellClass: 'text-center',
      },
      {
        headerName: 'Address',
        field: 'address',
        headerClass: 'text-center',
        cellClass: 'text-center',
      },
      {
        headerName: 'Phone',
        field: 'phone',
        headerClass: 'text-center',
        cellClass: 'text-center',
      },
      {
        headerName: 'Email',
        field: 'email',
        headerClass: 'text-center',
        cellClass: 'text-center',
      },
      {
        headerName: 'Edit',
        headerClass: 'text-center',
        cellClass: 'text-center',
      },
      {
        headerName: 'Delete',
        headerClass: 'text-center',
        cellClass: 'text-center',
      },
    ];
  }
}
