import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Injectable } from '@angular/core';
import { User } from './user.model';
import { AuthData } from './auth-data.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { TrainingService } from '../training/training.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UIService } from '../shared/ui.service';
import { Store } from '@ngrx/store';
import { State } from '../app.reducer';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authChange = new Subject<boolean>();
  //private user!: User | null;
  private isAuthenticated = false;

  constructor(
    private router: Router,
    private angularFireAuth: AngularFireAuth,
    private trainingService: TrainingService,
    //private snackbar: MatSnackBar,
    private uiService: UIService,
    private store: Store<{ui: State}>
    ) { }


  initAuthListener() {
    this.angularFireAuth.authState.subscribe(user => {
      if (user) {
        this.isAuthenticated = true;
        this.authChange.next(true);
        this.router.navigate(['/training']);
      } else {
        this.trainingService.cancelSubscriptions();
        this.authChange.next(false);
        this.router.navigate(['/login']);
        this.isAuthenticated = false;
      }
    });
  }

  registerUser(authData: AuthData) {
      // To register without the need of using AngularFireAuth
      //this.user = {
      //  email: authData.email,
      //  userId: Math.round(Math.random() * 10000).toString()
      //};
      /**
       * COMMENTING LINE BELOW TO WORK WITH NgRx, UNCOMMENT TO KEEP LOCALLY + FIREBASE
       */
      //this.uiService.loadingStateChanged.next(true);
      this.store.dispatch({type: 'START_LOADING'});
      this.angularFireAuth.createUserWithEmailAndPassword(
        authData.email,
        authData.password
        ).then(response => {
          //this.uiService.loadingStateChanged.next(false);
          this.store.dispatch({type: 'STOP_LOADING'});
          console.log(response);
          //this.authSuccess();
        })
        .catch(error => {
          //console.log(error);
          //this.uiService.loadingStateChanged.next(false);
          this.store.dispatch({type: 'STOP_LOADING'});
          this.uiService.showSnackbar(error.message, undefined, 2000);
          //this.snackbar.open(error.message, undefined, {duration: 2000});
        });
      //this.authSuccess();
  }

  login(authData: AuthData) {
    // To log in without the need of using AngularFireAuth
    //this.user = {
    //  email: authData.email,
    //  userId: Math.round(Math.random() * 10000).toString()
    //};
    /**
    * COMMENTING LINE BELOW TO WORK WITH NgRx, UNCOMMENT TO KEEP LOCALLY + FIREBASE
    */
    //this.uiService.loadingStateChanged.next(true);
    this.store.dispatch({type: 'START_LOADING'});
    this.angularFireAuth.signInWithEmailAndPassword(
      authData.email,
      authData.password
      ).then(response => {
        //this.uiService.loadingStateChanged.next(false);
        this.store.dispatch({type: 'STOP_LOADING'});
        console.log(response);
        //this.authSuccess();
      })
      .catch(error => {
        //console.log(error);
        //this.uiService.loadingStateChanged.next(false);
        this.store.dispatch({type: 'STOP_LOADING'});
        this.uiService.showSnackbar(error.message, undefined, 2000);
        //this.snackbar.open(error.message, undefined, {duration: 2000});
      });
    //this.authSuccess();
  }

  logout() {
    //this.user = null;
    this.angularFireAuth.signOut();

  }

  //getUser() {
  //  return { ... this.user };
  //}

  isAuth(): boolean {
    //return Boolean (this.user);
    return this.isAuthenticated;
  }

  //private authSuccess() {
  //  this.isAuthenticated = true;
  //  this.authChange.next(true);
  //  this.router.navigate(['/training']);
  //}

}
