import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import {GraphqlModule} from './graphql-module/graphql-module.module';
import { APOLLO_OPTIONS, ApolloModule} from 'apollo-angular';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import {RouterModule, Routes} from '@angular/router';
import {BrowserModule} from '@angular/platform-browser';
import { MainMenuComponent } from './pages/main-menu/main-menu.component';
import { FormProcessComponent } from './pages/form-process/form-process.component';
import {ReactiveFormsModule} from '@angular/forms';
import {GraphqlFetchDataService} from './services/graphql-fetch-data.service';
import {HttpLink, HttpLinkModule} from 'apollo-angular-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {HttpClientModule} from '@angular/common/http';

const appRoutes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'about-us', component: AboutComponent },
    { path: 'sign-up', component: FormProcessComponent},
    { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    PageNotFoundComponent,
    MainMenuComponent,
    FormProcessComponent,
  ],
  imports: [
    BrowserModule,
    GraphqlModule,
    HttpLinkModule,
    HttpClientModule,
    ApolloModule,
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule
  ],
  providers: [
    GraphqlFetchDataService,
    {
      provide: APOLLO_OPTIONS,
      useFactory(httpLink: HttpLink) {
        return {
          cache: new InMemoryCache(),
          link: httpLink.create({
            uri: "http://mylandoapp.lndo.site:32779/graphql"
          })
        }
      },
      deps: [HttpLink]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
