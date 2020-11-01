import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'ep-caption',
  templateUrl: './caption.component.html',
  styleUrls: ['./caption.component.scss']
})
export class CaptionComponent {

  form: FormGroup;
  stockStatuses = [];
  constructor(
    public dialogRef: MatDialogRef<CaptionComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private fb: FormBuilder,
  ) {
    this.data = data;
    this.form = this.fb.group({
      caption: [this.data],
    });
  }

  close() {
    this.dialogRef.close(this.form.controls['caption'].value);
  }

  save() {
    this.dialogRef.close(this.form.controls['caption'].value);
  }




}
