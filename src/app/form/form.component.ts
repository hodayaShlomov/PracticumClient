import { Component, OnInit } from '@angular/core';
import Person from '../models/person';
import { PersonService } from '../services/person.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, Validators } from '@angular/forms';
import { HMOService } from '../services/hmo.service';
import * as XLSX from 'xlsx';
import Hmo from '../models/HMO';
import HMO from '../models/HMO';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

title = 'angular-app';
fileName= 'ExcelSheet.xlsx';
 HMOs: Hmo[]
 currenthmo:Observable<HMO>
 flagError=false;
 selected = this.personService.person.IsMale;
  constructor(public personService: PersonService,private _snackBar:MatSnackBar,public HMOService:HMOService ) { }
  ngOnInit(): void {
    try {
      this.HMOService.getAllHMOs().subscribe(ok => {
        this.HMOs = ok
        console.log(this.HMOs);
      });
    } catch (Error) {
      alert("התרחשה שגיאה בהתחברות לשרת")
  }
}
 saveUser(){
  if( this.personService.person.IdNumber.length !=9
    || this.personService.person.DateOfBirth > new Date() 
    ||this.personService.person.LastName == "" || this.personService.person.FirstName == ""
    || this.personService.person.HMOId==-1||this.flagError==true){  
     this.flagError=true;
      return;
    }
 this.flagError=false;
   let errorMsg = "";
   console.log(this.personService.person)
  
    this.personService.addPerson(this.personService.person).subscribe((res:any)=>{
       if(res != undefined && res["personId"]!= undefined){
        this.personService.person.Id = res["personId"];
        if(this.personService.children.length == 0){
          this.showFinishMessage();
        }
        this.personService.children.forEach((child:Person,index) => {
          this.personService.addPerson(child).subscribe((childRes:any)=>{
            console.log(childRes)
            if(childRes == null){
              errorMsg += `\n child ${child.FirstName} - TZ already exists`;
            }
            if(index == this.personService.children.length-1){
              this.showFinishMessage(errorMsg);
            }
          })
        });
      }
      else{
        this._snackBar.open("TZ Already exists", "Error");
      }
    })
  
    let element = document.getElementById('excel-table');
      const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);
    
      /* generate workbook and add the worksheet */
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    
    //   /* save to file */  
      XLSX.writeFile(wb, this.fileName);
 }
  showFinishMessage(errorMsg = ""){
    let msg = ``;
    msg += errorMsg;
     this._snackBar.open(msg, "Success");
    this.personService.children = [];
    this.personService.person = new Person("","","",new Date(),true,-1);
  }
 //var t=(this.personService.addPerson(this.personService.person).subscribe((suss)=>{console.log("הרשמת בהצלחה")},(error)=>{console.log("not good")})) 
 
 HMOControl = new FormControl('', Validators.required);
 selectFormControl = new FormControl('', Validators.required);
 name = new FormControl('', [Validators.required]);
 lastName = new FormControl('', [Validators.required]);
 date = new FormControl('', [Validators.required]);
 idNumber = new FormControl('', [Validators.required]);
 MoF = new FormControl(null, Validators.required);
 getErrorMessage() {
   if (this.name.hasError('required')) {
     return 'You must enter a correct value';
   }
   return " "
 }
 gender(per:Person)
 {
   if(per.IsMale==false)
   return "בת"
  return "בן"
 }

}
