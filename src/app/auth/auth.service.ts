import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Injectable } from '@angular/core';
import { User } from './user.model';
import { AuthData } from './auth-data.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authChange = new Subject<boolean>();
  private user!: User | null;

  constructor(
    private router: Router,
    private angularFireAuth: AngularFireAuth
    ) { }

  registerUser(authData: AuthData) {
      // To register without the need of using AngularFireAuth
      //this.user = {
      //  email: authData.email,
      //  userId: Math.round(Math.random() * 10000).toString()
      //};
      this.angularFireAuth.createUserWithEmailAndPassword(
        authData.email,
        authData.password
        ).then(response => {
          console.log(response);
          this.authSuccess();
        })
        .catch(error => {console.log(error);});

      //this.authSuccess();
  }

  login(authData: AuthData) {
    // To log in without the need of using AngularFireAuth
    //this.user = {
    //  email: authData.email,
    //  userId: Math.round(Math.random() * 10000).toString()
    //};
    this.angularFireAuth.signInWithEmailAndPassword(
      authData.email,
      authData.password
      ).then(response => {
        console.log(response);
        this.authSuccess();
      })
      .catch(error => {console.log(error);});

    //this.authSuccess();
  }

  logout() {
    this.user = null;
    this.authChange.next(false);
    this.router.navigate(['/login']);
  }

  getUser() {
    return { ... this.user };
  }

  isAuth(): boolean {
    return Boolean (this.user);
  }

  private authSuccess() {
    this.authChange.next(true);
    this.router.navigate(['/training']);
  }

}
