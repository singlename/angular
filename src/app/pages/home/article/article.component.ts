import {Component, Input} from '@angular/core';
import {SafeHtml} from "@angular/platform-browser";

export interface Article{
  title: string,
  entityId: number,
  body: {
    summary?: SafeHtml,
    value?: SafeHtml
  },
  created: number,
  fieldImage: {
    url: string
  },
  entityUrl: {
    path: string
  }
}

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent {

  @Input() article: Article;
  constructor() { }
}
