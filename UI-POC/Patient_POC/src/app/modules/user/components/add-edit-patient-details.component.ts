import {
  Component,
  OnInit,
  ViewChild,
  TemplateRef,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { PatientDetails, Mode } from '../models/patient-details';
import { PatientDetailsService } from '../services/patient-details.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-add-edit-patient-details',
  templateUrl: '../views/add-edit-patient-details.component.html',
  styleUrls: ['../styles/add-edit-patient-details.component.less'],
})
export class AddEditPatientDetailsComponent {
  @Input() patientDetail?: PatientDetails = new PatientDetails();
  @Input() mode!: Mode;
  @Output() save: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() closeModal: EventEmitter<boolean> = new EventEmitter<boolean>();
  @ViewChild('saveToaster') saveToaster?: TemplateRef<any>;
  saveToasterRef: BsModalRef | null = null;

  constructor(
    private patientDetailsService: PatientDetailsService,
    private modalService: BsModalService
  ) {}

  onSave(): void {
    if (!this.patientDetail?.id) {
      this.patientDetail!.id = Math.random();
      this.patientDetailsService
        .savePatientDetails(this.patientDetail!)
        .subscribe((result: boolean) => {
          if (result) {
            this.saveToasterRef = this.modalService.show(this.saveToaster!);
            this.save.emit();
          }
        });
    } else {
      this.patientDetailsService
        .updatePatientDetails(this.patientDetail!)
        .subscribe((result: boolean) => {
          if (result) {
            this.saveToasterRef = this.modalService.show(this.saveToaster!);
            this.save.emit();
          }
        });
    }
  }
}
