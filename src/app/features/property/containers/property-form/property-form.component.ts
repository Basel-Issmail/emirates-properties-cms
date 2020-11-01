import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormGroupDirective, FormControl } from '@angular/forms';
import { SharedCrudService } from 'src/app/shared/services/shared-crud.service';
import { FormTypeService } from 'src/app/shared/services/form-type.service';
import { FormTypes } from 'src/app/shared/constants/form-types';
import { first, switchMap, map, startWith } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { PropertyApis } from '../../property.constants';
import { environment } from 'src/environments/environment';
import { CoreApis } from 'src/app/core/core.constants';

interface Marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}

@Component({
  selector: 'ep-property-form',
  templateUrl: './property-form.component.html',
  styleUrls: ['./property-form.component.scss']
})
export class PropertyFormComponent implements OnInit {
  imageBaseUrl = environment.imageBaseUrl;
  propertiesForm: FormGroup;
  emptyPropertiesObj = {
    active: true, agent_id: '', amenities: '', approve: false, area: '', bathrooms: '', bedrooms: '', city: '', completion_status: '', description: '',
    expiry_date: '', floor_plans: '', frequency: '', furnished: false, images: '', latitude: '', longitude: '', maidroom: '', price: '', publish_date: '',
    purpose: '', reference: '', title: '', trakheesi_permit: '', type_id: '', verified: false, videos: '',
  };
  formType = null;
  FormTypes = FormTypes;
  member = null;
  @ViewChild('imageUploader') imageUploader;
  @ViewChild('floorPlanUploader') floorPlanUploader;
  @ViewChild('videoUploader') videoUploader;

  uploadPhoto = CoreApis.uploadPhoto;
  uploadFile = CoreApis.uploadFile;
  images = [];
  floorPlans = [];
  videos = [];
  // Map Variables
  markers: Marker[] = [{
    lat: 24.44313948954762,
    lng: 54.371185302734375,
    draggable: true
  }];
  lat = 24.44313948954762;
  lng = 54.371185302734375;

  //amenities
  amenityCategoryList: any = [];

  // data to autocomplete
  agentFormControl = new FormControl('');
  filteredAgents$: Observable<any[]>;
  cityFormControl = new FormControl('');
  filteredCities$: Observable<any[]>;
  typeFormControl = new FormControl('');
  filteredTypes$: Observable<any[]>;
  purposeFormControl = new FormControl('');
  filteredPurposes$: Observable<any[]>;
  completionStatusFormControl = new FormControl('');
  filteredCompletionStatus$: Observable<any[]>;
  frequencyFormControl = new FormControl('');
  filteredFrequencies$: Observable<any[]>;

  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private formTypeService: FormTypeService,
    private sharedCrudService: SharedCrudService) { }

  ngOnInit(): void {
    this.formType = this.formTypeService.getFormTypeWithId(this.route);

    this.propertiesForm = this.fb.group({
      active: [true],
      agent_id: [''],
      amenities: [''],
      approve: [false],
      area: ['', Validators.required],
      bathrooms: [''],
      bedrooms: [''],
      city: ['', Validators.required],
      completion_status: [''],
      description: [''],
      expiry_date: [''],
      floor_plans: [''],
      frequency: [''],
      furnished: [false],
      images: [''],
      latitude: [''],
      longitude: [''],
      maidroom: ['', Validators.required],
      price: ['', Validators.required],
      publish_date: [''],
      purpose: ['', Validators.required],
      reference: [''],
      title: ['', Validators.required],
      trakheesi_permit: [''],
      type_id: ['', Validators.required],
      verified: [false],
      videos: [''],
    });

    // autocomplete data
    this.filteredAgents$ = this.agentFormControl.valueChanges.pipe(
      startWith(''),
      map(userInputValue => this.route.snapshot.data.buidler.companies_list.
        filter(itemObj => itemObj.name.toLowerCase().indexOf(userInputValue) === 0)));

    this.filteredCities$ = this.cityFormControl.valueChanges.pipe(
      startWith(''),
      map(userInputValue => this.route.snapshot.data.buidler.city_list.
        filter(itemObj => itemObj.name.toLowerCase().indexOf(userInputValue) === 0)));

    this.filteredTypes$ = this.typeFormControl.valueChanges.pipe(
      startWith(''),
      map(userInputValue => this.route.snapshot.data.buidler.types_categories_list.
        filter(itemObj => itemObj.name.toLowerCase().indexOf(userInputValue) === 0)));

    this.filteredPurposes$ = this.purposeFormControl.valueChanges.pipe(
      startWith(''),
      map(userInputValue => this.route.snapshot.data.buidler.purpose_list.
        filter(itemObj => itemObj.name.toLowerCase().indexOf(userInputValue) === 0)));

    this.filteredCompletionStatus$ = this.completionStatusFormControl.valueChanges.pipe(
      startWith(''),
      map(userInputValue => this.route.snapshot.data.buidler.status_list.
        filter(itemObj => itemObj.title.toLowerCase().indexOf(userInputValue) === 0)));

    this.filteredFrequencies$ = this.frequencyFormControl.valueChanges.pipe(
      startWith(''),
      map(userInputValue => this.route.snapshot.data.buidler.frequency_list.
        filter(itemObj => itemObj.name.toLowerCase().indexOf(userInputValue) === 0)));

    //amenity list
    this.amenityCategoryList = this.route.snapshot.data.buidler.amenities_categories_list
      .filter(val => (Array.isArray(val.amenities) && val.amenities.length > 0));

    if (this.formType.type === FormTypes.edit) {
      this.sharedCrudService.getItemDetails(PropertyApis.getDetails, this.formType.id)
        .pipe(first(), map(value => {
          value.amenities = value.amenities.map(amenityItem => Number(amenityItem.id));
          this.member = value.member;
          if (Array.isArray(value.images)) {
            value.images.forEach(element => {
              element.caption = element.name;
            });
          }
          return value;
        }))
        .subscribe(x => this.propertiesForm.patchValue(x));
    }
    if (this.formType.type === FormTypes.editDraft) {
      this.sharedCrudService.getDraftItemDetails(PropertyApis.getDraftDetails, this.formType.id)
        .pipe(first(), map(value => {
          this.member = value.member;
          if (Array.isArray(value.images)) {
            value.images.forEach(element => {
              element.caption = element.name;
            });
          }
          return value;
        }))
        .subscribe(x => this.propertiesForm.patchValue(x));
    }
  }

  get propertiesFormControl() {
    return this.propertiesForm.controls;
  }

  get prcessedData() {
    return {
      ...this.propertiesForm.value,
      publish_date: (this.propertiesFormControl.publish_date.value) ? moment(this.propertiesFormControl.publish_date.value).format('YYYY-MM-DD') : '',
      expiry_date: (this.propertiesFormControl.expiry_date.value) ? moment(this.propertiesFormControl.expiry_date.value).format('YYYY-MM-DD') : '',
      images: this.images,
      floor_plans: this.floorPlans,
      videos: this.videos
    }
  }

  addNew(formDirective: FormGroupDirective) {
    if (this.propertiesForm.valid) {
      this.sharedCrudService.addItem(PropertyApis.add, this.prcessedData)
        .subscribe(response => {
          formDirective.resetForm();
          this.propertiesForm.reset(this.emptyPropertiesObj);
          this.imageUploader.deleteAll();
          this.floorPlanUploader.deleteAll();
          this.videoUploader.deleteAll();

        });
    }
  }

  saveAsDraft(formDirective: FormGroupDirective) {
    if (this.propertiesForm.valid) {
      this.sharedCrudService.addItem(PropertyApis.addDraft, this.prcessedData)
        .subscribe(response => {
          formDirective.resetForm();
          this.propertiesForm.reset(this.emptyPropertiesObj);
          this.imageUploader.deleteAll();
          this.floorPlanUploader.deleteAll();
          this.videoUploader.deleteAll();
        });
    }
  }

  edit() {
    if (this.propertiesForm.valid) {
      this.sharedCrudService.editItem(PropertyApis.update, this.prcessedData, this.formType.id)
        .subscribe(response => {
        });
    }
  }

  editDraft() {
    if (this.propertiesForm.valid) {
      this.sharedCrudService.editItem(PropertyApis.updateDraft, this.prcessedData, this.formType.id)
        .subscribe(response => {
        });
    }
  }

  publish() {
    if (this.propertiesForm.valid) {
      this.sharedCrudService.publish(PropertyApis.add, PropertyApis.deleteDraft, this.prcessedData, this.formType.id)
        .subscribe((response: any) => {
          this.router.navigate([`/property/edit/${response.data.id}`])
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
    this.propertiesFormControl.latitude.setValue(location.latitude);
    this.propertiesFormControl.longitude.setValue(location.longitude);
  }

  getImages(event) {
    this.images = event;
    this.images.forEach(
      (value) => (value.name = value.caption ? value.caption : "Image")
    );
  }

  getFloorPlans(event) {
    this.floorPlans = event;
    this.floorPlans.forEach(
      (value) => (value.name = value.caption ? value.caption : "Floor plan image")
    );
  }

  getVideo(event) {
    this.videos = event;
    this.videos.forEach(
      (value) => (value.name = value.caption ? value.caption : "Floor plan image")
    );
  }
}
