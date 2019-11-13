import { Component, OnInit } from '@angular/core';
import {GraphqlModule} from '../../../../../graphql-module/graphql-module.module';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(private graphql: GraphqlModule) { }

  ngOnInit() {
  }

}
