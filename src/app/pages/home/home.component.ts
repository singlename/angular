import {Component, ElementRef, Injectable, OnInit, Output, ViewChild} from '@angular/core';
import {GraphqlModule} from '../../graphql-module/graphql-module.module';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
@Injectable()
export class HomeComponent implements OnInit {

  title: string;
  body: any;
  contentLoading: boolean = false;
  articles: Object = {};
  @ViewChild('dynamicContent') dynamicContent:ElementRef;

  constructor(private graphql: GraphqlModule) {

    this.title = 'Loading...';
  }

  ngOnInit() {
    const OperationName = 'getArticlesSummary';
    const params: Object = {
        limit: 5,
        offset: 0
    };

    this.graphql.getQueryResult(OperationName, params)
      .subscribe(result => {
        console.log(result);
        this.articles = result.data.collection.entities;
        if (!result.fromCache) {
          this.graphql.cacheQueryResult(OperationName, result.data);
        }
      });
  }
  onScroll($event: Event) {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight && !this.contentLoading) {
      console.log("On Scroll Down");
      this.dynamicContent.nativeElement.insertAdjacentHTML('beforeend', '<h1>TEST</h1>');
      //Write logic here for loading new content.
    }
  }
}
