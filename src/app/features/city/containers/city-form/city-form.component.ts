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
  marker = { lng: 54.371185302734375, lat: 24.44313948954762 };
  mapCoords = { lng: 54.371185302734375, lat: 24.44313948954762 };

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
    if (this.formType.type === FormTypes.add) {
      this.listenToCityList();
    }

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
          this.marker = { lng: Number(x.longitude), lat: Number(x.latitude) };
          this.mapCoords = { lng: Number(x.longitude), lat: Number(x.latitude) };
          this.refreshLocation(this.marker);
          this.listenToCityList();
        });
    }
  }

  listenToCityList() {
    this.cityFormControl.parent_id.valueChanges.subscribe(x => {
      if (x) {
        let chosenCity = this.route.snapshot.data.buidler.city_list.find(val => val.id == x);
        this.marker = { lng: Number(chosenCity.longitude), lat: Number(chosenCity.latitude) };
        this.mapCoords = { lng: Number(chosenCity.longitude), lat: Number(chosenCity.latitude) };
        this.refreshLocation(this.marker);
      }
    });
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

  refreshLocation(location) {
    this.cityFormControl.latitude.setValue(location.lat);
    this.cityFormControl.longitude.setValue(location.lng);
  }

  placeMarker($event) {
    this.marker = { lng: $event.coords.lng, lat: $event.coords.lat };
    this.refreshLocation(this.marker);
  }

}
// (dragEnd)="markerDragEnd($event)"