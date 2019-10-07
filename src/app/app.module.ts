import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import {ChartDataService} from './chart/services/chart-data.service';
import {ChartComponent} from './chart/components/chart.component';
import {HttpClientModule} from '@angular/common/http';
import {DatePipe} from '@angular/common';


@NgModule({
  declarations: [
    AppComponent,
    ChartComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [ChartDataService, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
