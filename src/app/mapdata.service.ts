import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class MapdataService {
  public assets = {}

  constructor(private http: Http) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.init();
  }

  init() {
    //let assetNames = ['buildings', 'other_buildings'];
    let assetNames = ['buildings'];//, 'other_buildings'];
    return Observable.forkJoin(...assetNames.map(name => this.http.get(`/api/${ name }`).map(res => ({ [name]: { features: res.json() } })))).map(results => results.reduce((a, b) => Object.assign(a, b), {}));
    //return Observable.forkJoin(...assetNames.map(name => this.http.get(`/assets/${ name }.geojson`).map(res => ({ [name]: res.json() })))).map(results => results.reduce((a, b) => Object.assign(a, b), {}));
  }

}
