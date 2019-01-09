import {Component, ElementRef, Injectable, OnInit, ViewChild} from '@angular/core';
import {GraphqlModule} from '../../graphql-module/graphql-module.module';
import {Article} from "./article/article.component";

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
  articles: Array<Article>;
  @ViewChild('dynamicContent') dynamicContent:ElementRef;

  constructor(private graphql: GraphqlModule) {
    this.articles = [];
  }

  loadArticles(limit: number, offset: number) {
    const params: Object = {
      limit: limit,
      offset: offset
    };
    let parametric: string = '';
    for(let key in params){
      if(params.hasOwnProperty(key)){
        parametric+= key + params[key];
      }
    }

    const OperationName = 'getArticlesSummary';

    this.contentLoading = true;
    this.graphql.getQueryResult(OperationName, parametric, params)
      .subscribe(result => {
        this.articles = this.articles.concat(result.data.collection.entities);
        if (!result.fromCache) {
          this.graphql.cacheQueryResult(OperationName, parametric, result.data);
        }
        this.contentLoading = false;
      });
  }

  ngOnInit() {
    this.loadArticles(5, 0);
  }
  onScroll($event: Event) {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight && !this.contentLoading) {
      this.contentLoading = true;
      const offset = this.articles.length;
      this.loadArticles(5, offset);
    }
  }
}
