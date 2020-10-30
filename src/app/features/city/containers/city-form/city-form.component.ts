import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormGroupDirective, FormControl } from '@angular/forms';
import { SharedCrudService } from 'src/app/shared/services/shared-crud.service';
import { FormTypeService } from 'src/app/shared/services/form-type.service';
import { FormTypes } from 'src/app/shared/constants/form-types';
import { first, startWith, map, switchMap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CityApis } from '../../city.constants';

interface Marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}

@Component({
  selector: 'ep-city-form',
  templateUrl: './city-form.component.html',
  styleUrls: ['./city-form.component.scss']
})
export class CityFormComponent implements OnInit {
  cityForm: FormGroup;
  emptyCityObj = { country_id: '', parent_id: '', name: '', latitude: '', longitude: '' };
  formType = null;
  FormTypes = FormTypes;
  // data to autocomplete
  countryFormControl = new FormControl('');
  filteredCcountries$: Observable<any[]>;
  parentCityFormControl = new FormControl('');
  filteredParentCities$: Observable<any[]>;

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

    this.cityForm = this.fb.group({
      country_id: ['', Validators.required],
      parent_id: [''],
      name: ['', Validators.required],
      latitude: ['', Validators.required],
      longitude: ['', Validators.required],
    });

    // autocomplete data
    this.filteredCcountries$ = this.countryFormControl.valueChanges.pipe(
      startWith(''),
      map(userInputValue => this.route.snapshot.data.buidler.country_list.
        filter(itemObj => itemObj.name.toLowerCase().indexOf(userInputValue) === 0)));

    this.filteredParentCities$ = this.parentCityFormControl.valueChanges.pipe(
      startWith(''),
      map(userInputValue => this.route.snapshot.data.buidler.city_list.
        filter(itemObj => itemObj.name.toLowerCase().indexOf(userInputValue) === 0)));

    if (this.formType.type === FormTypes.edit) {
      this.sharedCrudService.getItemDetails(CityApis.getDetails, this.formType.id)
        .pipe(first())
        .subscribe(x => {
          this.cityForm.patchValue(x);
          this.lat = this.markers[0].lat = +this.cityFormControl.latitude.value;
          this.lng = this.markers[0].lng = +this.cityFormControl.longitude.value;
          const location = {
            latitude: this.lat,
            longitude: this.lng
          };
          this.refreshLocation(location);
        });
    }
  }

  get cityFormControl() {
    return this.cityForm.controls;
  }

  addNew(formDirective: FormGroupDirective) {
    if (this.cityForm.valid) {
      this.sharedCrudService.addItem(CityApis.add, this.cityForm.value)
        .subscribe(response => {
          formDirective.resetForm();
          this.cityForm.reset(this.emptyCityObj);
        });
    }
  }

  edit() {
    if (this.cityForm.valid) {
      this.sharedCrudService.editItem(CityApis.update, this.cityForm.value, this.formType.id)
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
    this.cityFormControl.latitude.setValue(location.latitude);
    this.cityFormControl.longitude.setValue(location.longitude);
  }

}
