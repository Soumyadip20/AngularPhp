import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewComponent } from '../app/view/view.component';
import { EditComponent } from './edit/edit.component';
import { InsertComponent } from './insert/insert.component';

export const routes: Routes = [
  { path: '', component: ViewComponent , pathMatch: 'full'},
  { path: 'insert', component: InsertComponent },
  { path: 'edit/:id', component: EditComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule], 
  declarations: []
})
export class AppRoutingModule { }