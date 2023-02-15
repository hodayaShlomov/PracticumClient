import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import Person from '../models/person';
import { PersonService } from '../services/person.service';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.scss']
})
export class ChildComponent implements OnInit {
  selected = this.personService.child.IsMale;
  showChild=false;
  flagErrorChild = false;
  constructor(public personService:PersonService) { }
  ngOnInit(): void {
  }
  saveChild(){
    if(this.personService.child.FirstName == "" ||
    this.personService.child.DateOfBirth > new Date() ||
    this.personService.child.IdNumber.length < 9 ||
    this.personService.child.IdNumber == ""){
    this.flagErrorChild = true;
      return;
    }
    this.personService.child.LastName = this.personService.person.LastName;
    this.personService.child.HMOId = this.personService.person.HMOId;
    this.personService.child.ParentId = this.personService.person.Id;
    console.log(this.personService.person.Id)
     this.personService.children.push(this.personService.child);
    this.reset();
  }
  reset(){
    this.personService.child = new Person("","","",new Date(),true,-1,undefined);
    this.flagErrorChild = false;
  }
  HMOControl = new FormControl('', Validators.required);
  name = new FormControl('', [Validators.required]);
  date = new FormControl('', [Validators.required]);
  idNumber = new FormControl('', [Validators.required]);
  MoF = new FormControl(null, Validators.required);
  getErrorMessage() {
    if (this.name.hasError('required')) {
      return 'You must enter a correct value';
    }
    return " "
  }
}
