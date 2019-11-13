import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {GraphqlModule} from '../../../../graphql-module/graphql-module.module';
import {Article} from '../article.component';

import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-article-full-page',
  templateUrl: './article-full-page.component.html',
  styleUrls: ['./article-full-page.component.css']
})
export class ArticleFullPageComponent implements OnInit, OnDestroy {

  article: Article;
  constructor(
    private route: ActivatedRoute,
    private graphql: GraphqlModule,
    private  router: Router) {
    this.route.params.subscribe(params => {
      this.loadArticle('/article/' + params['path']);
    });
  }

  ngOnDestroy() {
    // this.sub.unsubscribe();
  }

  loadArticle(path: string) {
    if (!path) {
      return;
    }
    const params: Object = {
      path: path
    };
    const parametric: string = 'path' + path.replace('\\', '--');
    const OperationName = 'getArticleByRoute';
    this.graphql.getQueryResult(OperationName, parametric, params)
      .subscribe(result => {
        if (result.fromCache) {
          this.article = result.data;
          return;
        }
        if (!result.data.route) {
          this.router.navigateByUrl('page-was-not-found');
          return;
        }
        result.data.route.nodeContext.body.value = this.formatHTML(result.data.route.nodeContext.body.value);
        this.article = result.data.route.nodeContext;
        if (result.data.route && !result.fromCache) {
          this.graphql.cacheQueryResult(OperationName, parametric, result.data, result.data.route.nodeContext);
        }
      });
  }

  formatHTML(source: string) {
    const replacement = 'src="'.concat(environment.backend_endpoint);
    return source.replace('src="', replacement);
  }

  ngOnInit() {
  }

}
