import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { PatientDetailsService } from 'src/app/modules/user/services/patient-details.service';
import { PatientDetailsComponent } from '../../../../app/modules/user/components/patient-details.component';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';
import patientDetailsJson from 'src/assets/mockData/patient-details.json';
import { PatientDetails } from 'src/app/modules/user/models/patient-details';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { EllipsisPipe } from 'src/app/modules/user/pipes/ellipsis.pipe';
import { TemplateRef } from '@angular/core';

describe('PatientDetailsComponent', () => {
  let component: PatientDetailsComponent;
  let fixture: ComponentFixture<PatientDetailsComponent>;
  let patientDetailsService: PatientDetailsService;
  let modalService: BsModalService;

  const patientDetails: PatientDetails[] = patientDetailsJson as PatientDetails[];

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [PatientDetailsComponent, EllipsisPipe],
        imports: [
          RouterTestingModule,
          BrowserAnimationsModule,
          HttpClientTestingModule,
          FormsModule,
        ],
        providers: [PatientDetailsService, BsModalService],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientDetailsComponent);
    component = fixture.componentInstance;
    patientDetailsService = TestBed.inject(PatientDetailsService);
    modalService = TestBed.inject(BsModalService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch patient details on init', () => {
    const spyGetAllPatients = spyOn(
      patientDetailsService,
      'getAllPatients'
    ).and.returnValue(of(patientDetails));
    component.ngOnInit();
    expect(component.patientDetails.length).toBeGreaterThan(1);
    expect(spyGetAllPatients).toHaveBeenCalled();
  });

  it('should open add edit modal popup for edit', () => {
    const addEditTemplate = {} as TemplateRef<any>;
    modalService.show = jasmine
      .createSpy('show')
      .and.returnValue(new BsModalRef());
    component.onAddEdit();
    expect(modalService.show).toHaveBeenCalled();
  });

  it('should open add edit modal popup for edit', () => {
    component.patientDetail = patientDetails[1];
    const addEditTemplate = {} as TemplateRef<any>;
    modalService.show = jasmine
      .createSpy('show')
      .and.returnValue(new BsModalRef());
    component.onAddEdit(1);
    expect(modalService.show).toHaveBeenCalled();
  });

  it('should close modal popup on save and refresh the list', () => {
    component.addEditModalRef = new BsModalRef();
    const modalSpy = spyOn(component.addEditModalRef, 'hide');
    const spyGetAllPatients = spyOn(
      patientDetailsService,
      'getAllPatients'
    ).and.returnValue(of(patientDetails));
    component.onSave();
    expect(modalSpy).toHaveBeenCalled();
    expect(spyGetAllPatients).toHaveBeenCalled();
  });

  it('should fetch patient details on init', () => {
    component.patientDetails = patientDetails;
    const spyDeletePatient = spyOn(
      patientDetailsService,
      'deletePatientDetails'
    ).and.returnValue(of(true));
    const spyGetAllPatients = spyOn(
      patientDetailsService,
      'getAllPatients'
    ).and.returnValue(of(patientDetails));
    component.onDelete(component.patientDetails[0].id);
    expect(spyDeletePatient).toHaveBeenCalled();
    expect(spyGetAllPatients).toHaveBeenCalled();
  });
});
