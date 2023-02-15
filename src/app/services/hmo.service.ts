import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import Hmo from '../models/HMO';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class HMOService {

  constructor(public httpClient: HttpClient) { }
  baseRouteUrl =environment.baseUrl+"HMO"

  getAllHMOs() {
    return this.httpClient.get<Hmo[]>(`${this.baseRouteUrl}`);
  }
  
}
