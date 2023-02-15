import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormComponent } from './form/form.component';
import { InformationComponent } from './information/information.component';
const routes: Routes = [
  { path: '', redirectTo: '/information', pathMatch: 'full' },
  { path: 'information', component: InformationComponent },
  { path: 'form', component: FormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
