import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {GraphqlModule} from "../../../../graphql-module/graphql-module.module";
import {Article} from "../article.component";

@Component({
  selector: 'app-article-full-page',
  templateUrl: './article-full-page.component.html',
  styleUrls: ['./article-full-page.component.css']
})
export class ArticleFullPageComponent implements OnInit, OnDestroy {

  article: Article;
  constructor(private route: ActivatedRoute, private graphql: GraphqlModule) {
    this.route.params.subscribe(params => {
      this.loadArticle(params['id']);
    });
  }

  ngOnDestroy() {
    //this.sub.unsubscribe();
  }

  loadArticle(id: number) {
    if (!id) {
      return;
    }
    const params: Object = {
      id: id
    };
    let parametric: string = 'id' + id.toString();
    const OperationName = 'getNodeQuery';

    this.graphql.getQueryResult(OperationName, parametric, params)
      .subscribe(result => {
        this.article = result.data.nodeById;
        console.log(result);
        if (!result.fromCache) {
          this.graphql.cacheQueryResult(OperationName, parametric, result.data);
        }
      });
  }

  ngOnInit() {
  }

}
