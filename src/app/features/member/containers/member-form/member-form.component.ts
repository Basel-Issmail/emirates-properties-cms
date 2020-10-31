import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroupDirective, FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormTypeService } from 'src/app/shared/services/form-type.service';
import { SharedCrudService } from 'src/app/shared/services/shared-crud.service';
import { FormTypes } from 'src/app/shared/constants/form-types';
import { first, map, startWith, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { MemberApis } from '../../member.constants';


interface Marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}


@Component({
  selector: 'ep-member-form',
  templateUrl: './member-form.component.html',
  styleUrls: ['./member-form.component.scss']
})
export class MemberFormComponent implements OnInit {
  memberForm: FormGroup;
  addressForm: FormGroup;
  emptyMemberObj = { active: true, full_name: '', mobile: '', password: '', whatsapp_number: '', email: '', address: { address: '', city_id: '', country_id: '', latitude: 24.44313948954762, longitude: 54.371185302734375 } };
  formType = null;
  FormTypes = FormTypes;
  // data to autocomplete
  countryFormControl = new FormControl('');
  filteredCountries$: Observable<any[]>;
  cityFormControl = new FormControl('');
  filteredCities$: Observable<any[]>;

  // Map Variables
  markers: Marker[] = [{
    lat: 24.44313948954762,
    lng: 54.371185302734375,
    draggable: true
  }];
  lat = 24.44313948954762;
  lng = 54.371185302734375;

  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private formTypeService: FormTypeService,
    private sharedCrudService: SharedCrudService) { }

  ngOnInit(): void {
    this.formType = this.formTypeService.getFormTypeWithId(this.route);

    const passwordValidators = [];
    if (this.formType.type === FormTypes.add) {
      passwordValidators.push(Validators.required);
    }

    this.memberForm = this.fb.group({
      active: [true],
      email: ['', Validators.required],
      full_name: ['', Validators.required],
      mobile: ['', Validators.required],
      password: ['', passwordValidators],
      whatsapp_number: ['', Validators.required],
      address: this.fb.group({
        address: ['', Validators.required],
        city_id: ['', Validators.required],
        country_id: ['', Validators.required],
        latitude: ['', Validators.required],
        longitude: ['', Validators.required],
      })
    });

    // autocomplete data
    this.filteredCountries$ = this.countryFormControl.valueChanges.pipe(
      startWith(''),
      map(userInputValue => this.route.snapshot.data.buidler.countries_list.
        filter(itemObj => itemObj.name.toLowerCase().indexOf(userInputValue) === 0)));

    this.filteredCities$ = this.cityFormControl.valueChanges.pipe(
      startWith(''),
      map(userInputValue => this.route.snapshot.data.buidler.city_list.
        filter(itemObj => itemObj.name.toLowerCase().indexOf(userInputValue) === 0)));


    if (this.formType.type === FormTypes.edit) {
      this.sharedCrudService.getItemDetails(MemberApis.getDetails, this.formType.id)
        .pipe(first(), map(response => { if (response.areas) response.areas = response.areas.map(value => Number(value.id)); return response }))
        .subscribe(x => {
          this.memberForm.patchValue(x);
        });
    }

    if (this.formType.type === FormTypes.editDraft) {
      this.sharedCrudService.getDraftItemDetails(MemberApis.getDraftDetails, this.formType.id)
        .pipe(first())
        .subscribe(x => this.memberForm.patchValue(x));
    }
  }

  get memberFormControl() {
    return this.memberForm.controls;
  }

  addNew(formDirective: FormGroupDirective) {
    if (this.memberForm.valid) {
      this.sharedCrudService.addItem(MemberApis.add, this.memberForm.value)
        .subscribe(response => {
          formDirective.resetForm();
          this.memberForm.reset(this.emptyMemberObj);
          this.refreshLocation({ latitude: 24.44313948954762, longitude: 54.371185302734375 });
        });
    }
  }
  edit() {
    if (this.memberForm.valid) {
      this.sharedCrudService.editItem(MemberApis.update, this.memberForm.value, this.formType.id)
        .subscribe(response => {
        });
    }
  }

  markerDragEnd(m: Marker, $event) {
    const location = {
      latitude: $event.latLng.lat(),
      longitude: $event.latLng.lng()
    };
    this.refreshLocation(location);
  }

  refreshLocation(location) {
    this.memberForm.get('address.latitude').setValue(location.latitude);
    this.memberForm.get('address.longitude').setValue(location.longitude);
  }

}
