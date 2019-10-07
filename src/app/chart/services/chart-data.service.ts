import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ChartDataModel} from '../../models/models';
import {DUMMY_DATA_URL} from '../../utils/constans';

@Injectable()
export class ChartDataService {

  constructor(private http: HttpClient) { }

  getAllDate(): Observable<ChartDataModel> {
    return this.http.get<ChartDataModel>(DUMMY_DATA_URL);
  }
}
