import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormGroupDirective } from '@angular/forms';
import { SharedCrudService } from 'src/app/shared/services/shared-crud.service';
import { FormTypeService } from 'src/app/shared/services/form-type.service';
import { FormTypes } from 'src/app/shared/constants/form-types';
import { first, switchMap, map } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { CareerApis } from '../../career.constants';

@Component({
  selector: 'ep-career-form',
  templateUrl: './career-form.component.html',
  styleUrls: ['./career-form.component.scss']
})
export class CareerFormComponent implements OnInit {
  careerForm: FormGroup;
  emptyCareerObj = { active: true, brief: '', content: '', meta_description: '', meta_title: '', name: '', sort_order: '', url: '' };
  formType = null;
  FormTypes = FormTypes;
  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private formTypeService: FormTypeService,
    private sharedCrudService: SharedCrudService) { }

  ngOnInit(): void {
    this.formType = this.formTypeService.getFormTypeWithId(this.route);

    this.careerForm = this.fb.group({
      active: [true],
      brief: [''],
      content: [''],
      meta_description: [''],
      meta_title: [''],
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(255)]],
      sort_order: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      url: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(255)]],
    });

    if (this.formType.type === FormTypes.edit) {
      this.sharedCrudService.getItemDetails(CareerApis.getDetails, this.formType.id)
        .pipe(first())
        .subscribe(x => this.careerForm.patchValue(x));
    }
    if (this.formType.type === FormTypes.editDraft) {
      this.sharedCrudService.getDraftItemDetails(CareerApis.getDraftDetails, this.formType.id)
        .pipe(first())
        .subscribe(x => this.careerForm.patchValue(x));
    }
  }

  get careerFormControl() {
    return this.careerForm.controls;
  }

  addNew(formDirective: FormGroupDirective) {
    console.log(this.careerFormControl.name);
    console.log(this.careerFormControl.url);
    console.log(this.careerFormControl.sort_order);

    if (this.careerForm.valid) {
      this.sharedCrudService.addItem(CareerApis.add, this.careerForm.value)
        .subscribe(response => {
          formDirective.resetForm();
          this.careerForm.reset(this.emptyCareerObj);
        });
    }
  }

  saveAsDraft(formDirective: FormGroupDirective) {
    if (this.careerForm.valid) {
      this.sharedCrudService.addItem(CareerApis.addDraft, this.careerForm.value)
        .subscribe(response => {
          formDirective.resetForm();
          this.careerForm.reset(this.emptyCareerObj);
        });
    }
  }

  edit() {
    if (this.careerForm.valid) {
      this.sharedCrudService.editItem(CareerApis.update, this.careerForm.value, this.formType.id)
        .subscribe(response => {
        });
    }
  }

  editDraft() {
    if (this.careerForm.valid) {
      this.sharedCrudService.editItem(CareerApis.updateDraft, this.careerForm.value, this.formType.id)
        .subscribe(response => {
        });
    }
  }

  publish() {
    if (this.careerForm.valid) {
        this.sharedCrudService.publish(CareerApis.add, CareerApis.deleteDraft, this.careerForm.value, this.formType.id)
        .subscribe((response: any) => {
          this.router.navigate([`/careers/edit/${response.data.id}`])
        });
    }
  }
}
