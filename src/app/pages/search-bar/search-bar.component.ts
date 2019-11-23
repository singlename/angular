import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators, FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  searchBar: FormGroup;
  formBuilder: FormBuilder;
  constructor() {
  }

  ngOnInit() {
    this.searchBar = new FormGroup({
      searchField: new FormControl()
    });

    this.
    searchBar.
    valueChanges.
    subscribe(values => {
      if (values.searchField.length < 3) {
        return;
      }
      // @todo: display auto suggestions for article titles
      console.log(values);
    });
  }
}
