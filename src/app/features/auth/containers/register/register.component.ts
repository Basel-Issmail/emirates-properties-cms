import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'ep-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerationForm = this.fb.group({
    email: ['', [Validators.required, Validators.email,]],
    password: ['', Validators.required],
    passwordConfirmation: ['', Validators.required],
    terms: ['']
  })
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  get registerationFormControl() {
    return this.registerationForm.controls;
  }

  onSubmit() {
    if (this.registerationForm.valid) {
      alert('Form Submitted succesfully!!!\n Check the values in browser console.');
      console.table(this.registerationForm.value);
    }
  }
}
