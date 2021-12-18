import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TitleComponent } from './title/title.component';
import { NavbarComponent } from './navbar/navbar.component';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {NgbDropdownModule} from "@ng-bootstrap/ng-bootstrap";
import {RouterModule} from "@angular/router";
import {FormsModule} from "@angular/forms";



@NgModule({
    declarations: [
        TitleComponent,
        NavbarComponent
    ],
  exports: [
    TitleComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    NgbDropdownModule,
    RouterModule,
    FormsModule
  ]
})
export class HeaderModule { }
