import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-form-process',
  templateUrl: './form-process.component.html',
  styleUrls: ['./form-process.component.css']
})
export class FormProcessComponent implements OnInit {

  lead: FormGroup;
  onSubmit() {
    console.log(this.lead.value);
    this.lead.reset();
  }

  constructor() { }

  ngOnInit() {
      this.lead = new FormGroup({
          name: new FormControl('', [Validators.required, Validators.minLength(5)]),
          email: new FormControl('', [Validators.required, Validators.email]),
          phone: new FormControl('', [Validators.required, Validators.minLength(12), Validators.pattern('\\+3706[0-9]{7}')]),
          consent: new FormControl('')
      });
  }



}
