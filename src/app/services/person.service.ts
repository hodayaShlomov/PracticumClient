import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import Person from '../models/person';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PersonService{
  public children:Person[]=[];
  showChild=false;
  constructor(public httpClient: HttpClient) { }


 public person=new Person("","","",new Date(),true,-1,undefined)
 child:Person =new Person("","","",new Date(),true,-1,undefined);

  currentPerson=new BehaviorSubject<Person>(new Person("","","",new Date(),true,-1,null));

  baseRouteUrl =environment.baseUrl+"Person"
   addPerson(person1:Person){
    return this.httpClient.post<Person>(`${this.baseRouteUrl}`, person1);
  }
 
   isBirthdayInvalid(birthday:Date){
    return birthday> new Date();
  }
  
}
