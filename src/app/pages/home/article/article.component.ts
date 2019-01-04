import {Component, Input, OnInit} from '@angular/core';
import {SafeHtml} from "@angular/platform-browser";

interface Article{
  title: string,
  body: {summary: SafeHtml},
  created: number,
  fieldImage: {
    url: string
  }
}

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  @Input() article: Article;
  constructor() { }

  ngOnInit() {
    console.log(this.article);
  }

}
