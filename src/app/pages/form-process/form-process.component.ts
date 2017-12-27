import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-form-process',
  templateUrl: './form-process.component.html',
  styleUrls: ['./form-process.component.css']
})
export class FormProcessComponent implements OnInit {

  lead: FormGroup;
  onSubmit() {
    console.log(this.lead.value);
  }

  constructor() { }

  ngOnInit() {
      this.lead = new FormGroup({
          name: new FormControl(''),
          email: new FormControl(''),
          phone: new FormControl(''),
          consent: new FormControl('')
      });
  }



}
