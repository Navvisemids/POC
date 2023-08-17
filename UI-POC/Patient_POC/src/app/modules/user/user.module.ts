import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientDetailsComponent } from './components/patient-details.component';
import { AddEditPatientDetailsComponent } from './components/add-edit-patient-details.component';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { AgGridModule } from 'ag-grid-angular';

const routes: Routes = [
  {
    path: '',
    component: PatientDetailsComponent,
  },
];

@NgModule({
  declarations: [PatientDetailsComponent, AddEditPatientDetailsComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    FormsModule,
    AgGridModule,
  ],
})
export class UserModule {}
