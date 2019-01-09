import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {GraphqlModule} from './graphql-module/graphql-module.module';
import {HomeComponent} from './pages/home/home.component';
import {AboutComponent} from './pages/about/about.component';
import {PageNotFoundComponent} from './pages/page-not-found/page-not-found.component';
import {RouterModule, Routes} from '@angular/router';
import {BrowserModule} from '@angular/platform-browser';
import {MainMenuComponent} from './pages/main-menu/main-menu.component';
import {FormProcessComponent} from './pages/form-process/form-process.component';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {HttpLinkModule} from 'apollo-angular-link-http';
import {BatchHttpLink} from 'apollo-link-batch-http';
import {GraphqlFetchDataService} from './services/graphql-fetch-data.service';
import { ArticleComponent } from './pages/home/article/article.component';
import {ApolloModule} from "apollo-angular";
import { ArticleFullPageComponent } from './pages/home/article/article-full-page/article-full-page.component';

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'about-us', component: AboutComponent},
  {path: 'sign-up', component: FormProcessComponent},
  {path: 'article/:path', component: ArticleFullPageComponent},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    PageNotFoundComponent,
    MainMenuComponent,
    FormProcessComponent,
    ArticleComponent,
    ArticleFullPageComponent,
  ],
  imports: [
    BrowserModule,
    GraphqlModule,
    HttpLinkModule,
    HttpClientModule,
    ApolloModule,
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule,
  ],
  providers: [
    GraphqlFetchDataService,
    {
      provide: BatchHttpLink,
      // useValue: [{batchInterval: 10}, {batchMax: 10}]
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
