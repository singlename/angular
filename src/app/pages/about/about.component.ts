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

    const OperationName = 'getAboutUsNode';
    this.graphql.getQueryResult(OperationName)
      .subscribe(result => {
        this.title = result.data.nodeById.title;
        this.body = result.data.nodeById.body.value;
        if (!result.fromCache) {
          this.graphql.cacheQueryResult(OperationName, result.data);
        }
      });
  }

}
