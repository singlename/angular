import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {GraphqlModule} from "../../../../graphql-module/graphql-module.module";
import {Article} from "../article.component";

@Component({
  selector: 'app-article-full-page',
  templateUrl: './article-full-page.component.html',
  styleUrls: ['./article-full-page.component.css']
})
export class ArticleFullPageComponent implements OnInit, OnDestroy {

  article: Article;
  constructor(private route: ActivatedRoute, private graphql: GraphqlModule, private  router: Router) {
    this.route.params.subscribe(params => {
      this.loadArticle('/article/' + params['path']);
    });
  }

  ngOnDestroy() {
    //this.sub.unsubscribe();
  }

  loadArticle(path: string) {
    if (!path) {
      return;
    }
    const params: Object = {
      path: path
    };
    let parametric: string = 'path:' + path;
    const OperationName = 'getArticleByRoute';
    this.graphql.getQueryResult(OperationName, parametric, params)
      .subscribe(result => {
        if (!result.data.route) {
          this.router.navigateByUrl('page-was-not-found');
          return;
        }
        this.article = result.data.route.nodeContext;
        if (!result.fromCache) {
          this.graphql.cacheQueryResult(OperationName, parametric, result.data);
        }
      });
  }

  ngOnInit() {
  }

}
