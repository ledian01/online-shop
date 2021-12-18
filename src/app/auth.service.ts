import {Injectable} from '@angular/core';
import {GoogleAuthProvider} from 'firebase/auth';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {AngularFirestore} from "@angular/fire/compat/firestore";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAdmin: boolean = false;

  isUserAdmin() {
    return this.isAdmin;
  }

  constructor(private auth: AngularFireAuth, private firestore: AngularFirestore) {
    const userId = localStorage.getItem("uid");
      this.firestore.collection("admins", ref => ref.where("userId", "==", userId))
        .get().subscribe(snaps => {
        snaps.forEach(snap => {
          this.isAdmin = true;
        })
      })
  }

  googleAuth() {
    return this.authLogin(new GoogleAuthProvider());
  }

  makeUserAdmin() {
    this.isAdmin = true;
  }

  logout() {
    this.isAdmin = false;
    localStorage.removeItem("uid");
    this.auth.signOut();
  }

  createUserWithEmailAndPassword(email: string, password: string) {
    return this.auth.createUserWithEmailAndPassword(email, password);
  }

  loginWithEmailAndPassword(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password).catch(function (error) {
      let errorCode = error.code;
      let errorMessage = error.message;
      if (errorCode === 'auth/wrong-password') {
        alert('Wrong password.');
      } else {
        alert(errorMessage);
      }
      console.log(error);
    });
  }

  authLogin(provider: any) {
    return this.auth.signInWithPopup(provider)
      .then((result) => {
        return result.user
      }).catch((error) => {
        console.log(error)
      })
  }

}
