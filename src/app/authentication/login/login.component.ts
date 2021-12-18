import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../auth.service";
import {Router} from "@angular/router";
import {AngularFirestore} from "@angular/fire/compat/firestore";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  profileForm = new FormGroup({
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    email: new FormControl('', Validators.required)
  });

  constructor(public authService: AuthService, public router: Router, private firestore: AngularFirestore) {
  }

  ngOnInit(): void {

  }

  get email() {
    return this.profileForm.get('email')
  }

  get password() {
    return this.profileForm.get('password')
  }

  onLoginGoogle() {
    this.authService.googleAuth().then((data: any) => {
      const userId = data.multiFactor.user.uid;

      this.firestore.collection("admins", ref => ref.where("userId", "==", userId))
        .get().subscribe(snaps => {
        snaps.forEach(snap => {
          this.authService.makeUserAdmin();
          localStorage.setItem("uid", userId);
        })
        this.router.navigate(["/products"]);
      })

    })
  }

  onLoginUsernamePassword() {
    this.authService.loginWithEmailAndPassword(this.email?.value, this.password?.value).then((r: any) => {
      const userId = r.user.multiFactor.user.uid;
      this.firestore.collection("admins", ref => ref.where("userId", "==", userId))
        .get().subscribe(snaps => {
        snaps.forEach(snap => {
          this.authService.makeUserAdmin();
          localStorage.setItem("uid", userId);

        })
        this.router.navigate(["/products"]);
      })
    });
  }


}
