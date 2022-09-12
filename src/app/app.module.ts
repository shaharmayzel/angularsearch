import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorService } from './services/intercept/interceptor.service';
import { NavComponent } from './components/nav/nav.component';
import { FormsModule } from '@angular/forms';
import { PeopleListComponent } from './components/people-list/people-list.component';
import { Routes, RouterModule } from '@angular/router';
import { PeopleCardComponent } from './components/people-card/people-card.component'; // CLI imports router
import { AppComponent } from './components/app/app.component';
import { NgHttpLoaderModule } from 'ng-http-loader';
const routes: Routes = [
  { path: 'people', component: PeopleListComponent },
  { path: 'people/:name', component: PeopleCardComponent },
  { path: '', redirectTo: '/people', pathMatch: 'prefix' },
];
@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    PeopleListComponent,
    PeopleCardComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgHttpLoaderModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
