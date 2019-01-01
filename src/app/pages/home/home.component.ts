import {Component, Injectable, Input, OnInit} from '@angular/core';
import {GraphqlModule} from '../../graphql-module/graphql-module.module';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
@Injectable()
export class HomeComponent implements OnInit {

  title: string;
  body: any;

  constructor(private graphql: GraphqlModule) {

    this.title = 'Loading...';
  }

  ngOnInit() {
    const OperationName = 'getModeQuery';
    this.graphql.getQueryResult(OperationName)
      .subscribe(result => {
        this.title = result.data.nodeById.title;
        this.body = result.data.nodeById.body.value;
        const query = this.graphql.getQuery(OperationName).query;
        if (!result.fromCache) {
          this.graphql.cacheQueryResult('getModeQuery', query, result.data);
        }
      });
  }
}
