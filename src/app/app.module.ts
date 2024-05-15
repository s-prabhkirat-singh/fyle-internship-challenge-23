import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HttpClientModule } from  '@angular/common/http';
import { UserReposComponent } from './user-repos/user-repos.component';
import { ApiService } from './services/api.service';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    AppComponent,
    UserReposComponent,
    SearchBarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule ,
    NgxPaginationModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
