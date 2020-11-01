import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { GridTabsComponent } from './components/grid-tabs/grid-tabs.component';
import { GridLoadingComponent } from './components/grid-loading/grid-loading.component';
import { GridColumnsDisplayMenuComponent } from './components/grid-columns-display-menu/grid-columns-display-menu.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlashMessageComponent } from './components/flash-message/flash-message.component';
import { ImageUploaderComponent } from './components/image-uploader/image-uploader.component';
import { ImageComponentComponent } from './components/image-component/image-component.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { CaptionComponent } from './components/caption/caption.component';


@NgModule({
  declarations: [GridTabsComponent, GridLoadingComponent, GridColumnsDisplayMenuComponent, FlashMessageComponent, ImageUploaderComponent, ImageComponentComponent, CaptionComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ImageCropperModule,
    ReactiveFormsModule
  ],
  exports: [
    MaterialModule,
    GridTabsComponent,
    GridLoadingComponent,
    GridColumnsDisplayMenuComponent,
    ImageUploaderComponent
  ]
})
export class SharedModule { }
