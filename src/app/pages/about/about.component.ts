import {Component, OnInit} from '@angular/core';
import {GraphqlModule} from '../../graphql-module/graphql-module.module';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  title: string;
  body: any;

  constructor(private graphql: GraphqlModule) {

    this.title = 'Loading...';
  }

  ngOnInit() {
    this.graphql.getQueryResult('getAboutUsNode')
      .subscribe(result => {
        this.title = result.data.nodeById.title;
        this.body = result.data.nodeById.body.value;
      });
    // this.graphql.getGraphqlQueryResultTest('getAboutUsNode')
    //   .subscribe(result => {
    //     this.title = result.data.nodeById.title;
    //     this.body = result.data.nodeById.body.value;
    //   });

  }

}
