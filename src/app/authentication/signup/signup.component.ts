import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../auth.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  profileForm = new FormGroup({
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    repeatPassword: new FormControl('', [Validators.required, Validators.minLength(8), this.checkPassword.bind(this)]),
    email: new FormControl('', Validators.required)
  });

  constructor(public authService: AuthService, public router: Router) {
  }

  ngOnInit(): void {
  }

  get email() {
    return this.profileForm.get('email')
  }

  get password() {
    return this.profileForm.get('password')
  }

  get repeatPassword() {
    return this.profileForm.get('repeatPassword')
  }

  onClick(){
    return this.authService.createUserWithEmailAndPassword(this.email?.value,this.password?.value);
  }
  checkPassword(val:any): any {

    if(this.profileForm) {
      const pass = this.profileForm.get('password')?.value;
      const repeatPass = this.profileForm.get('repeatPassword')?.value;
      if (pass  && repeatPass  && pass !== repeatPass) {
        return {error: 'Password Error'}
      }
    }
    return null;

  }


}
