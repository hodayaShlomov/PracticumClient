import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PersonService } from '../services/person.service';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.scss']
})
export class InformationComponent implements OnInit {

  constructor(public personService: PersonService) { }
 
  ngOnInit(): void {

  } 



}
