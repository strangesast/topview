import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { BaseComponent } from './base/base.component';

import { MapdataService } from './mapdata.service';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    BaseComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
      {
        path: '',
        component: BaseComponent,
        resolve: {
          mapdata: MapdataService
        }
      }
    ])
  ],
  providers: [
    MapdataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
