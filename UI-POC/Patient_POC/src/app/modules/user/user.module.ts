import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientDetailsComponent } from './components/patient-details.component';
import { AddEditPatientDetailsComponent } from './components/add-edit-patient-details.component';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { AgGridModule } from 'ag-grid-angular';
import { ModalModule, BsModalService } from 'ngx-bootstrap/modal';
import { EllipsisPipe } from './pipes/ellipsis.pipe';

const routes: Routes = [
  {
    path: '',
    component: PatientDetailsComponent,
  },
];

@NgModule({
  declarations: [PatientDetailsComponent, AddEditPatientDetailsComponent, EllipsisPipe],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    FormsModule,
    AgGridModule,
    ModalModule,
  ],
  providers: [BsModalService],
})
export class UserModule {}
