import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { PatientDetails, Mode } from '../models/patient-details';
import { PatientDetailsService } from '../services/patient-details.service';
import { ColDef } from 'ag-grid-community';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-patient-details',
  templateUrl: '../views/patient-details.component.html',
  styleUrls: ['../styles/patient-details.component.less'],
})
export class PatientDetailsComponent implements OnInit {
  patientDetails: PatientDetails[] = [];
  patientDetail?: PatientDetails;
  mode!: Mode;
  @ViewChild('addEditModal') addEditModal?: TemplateRef<any>;
  addEditModalRef: BsModalRef | null = null;
  columnDefs: ColDef[] = [];

  constructor(
    private patientDetailsService: PatientDetailsService,
    private modalService: BsModalService
  ) {
    this.columnDefConfigure();
  }

  ngOnInit(): void {
    this.getPatients();
  }

  private getPatients(): void {
    this.patientDetailsService
      .getAllPatients()
      .subscribe((data: PatientDetails[]) => {
        if (data) {
          this.patientDetails = data;
        }
      });
  }

  onAddEdit(index: number | null = null): void {
    if (index !== null) {
      this.mode = Mode.edit;
      this.patientDetail = { ...this.patientDetails[index] };
    } else {
      this.mode = Mode.add;
      this.patientDetail = new PatientDetails();
    }
    this.addEditModalRef = this.modalService.show(this.addEditModal!, {
      class: 'modal-lg modal-large',
      ignoreBackdropClick: true,
      keyboard: false,
    });
  }

  onDelete(id: number): void {
    this.patientDetailsService
      .deletePatientDetails(id)
      .subscribe((data: boolean) => {
        if (data) {
          this.getPatients();
        }
      });
  }

  onSave(): void {
    this.addEditModalRef?.hide();
    this.getPatients();
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
