import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Leader} from '../../shared/leader';
import { Observable} from 'rxjs/Observable';
import { Http, Response} from '@angular/http';
import { baseURL } from '../../shared/baseurl';
import { ProcessHttpmsgProvider} from '../process-httpmsg/process-httpmsg';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/catch';

/*
  Generated class for the LeaderProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LeaderProvider {

  constructor(public http: Http, private processHttpmsgService: ProcessHttpmsgProvider) {
    console.log('Hello LeaderProvider Provider');
  }

  getLeaders(): Observable<Leader[]> {
    return this.http.get(baseURL + 'leaders')
      .map(res => this.processHttpmsgService.extractData(res))
      .catch( error => this.processHttpmsgService.handleError(error));
  }

  getLeader(id: number): Observable<Leader>{
    return this.http.get(baseURL + 'leaders/' + id)
      .map(res => this.processHttpmsgService.extractData(res))
      .catch(error => this.processHttpmsgService.handleError(error));
  }

  getFeaturedLeader(): Observable<Leader> {
    return this.http.get(baseURL + 'leaders?featured=true')
      .map(res => this.processHttpmsgService.extractData(res)[0])
      .catch(error => this.processHttpmsgService.handleError(error));
  }
}
