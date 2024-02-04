import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { AuthService } from '../auth.service';
import { UIService } from 'src/app/shared/ui.service';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { State, getIsLoading } from 'src/app/app.reducer';
import { Observable } from 'rxjs';
import { map } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  isLoading$!: Observable<boolean>; //false;
  //private loadingSubscription!: Subscription;

  constructor(
    private authService: AuthService,
    private uiService: UIService,
    private store: Store<{ui: State}>
    ) {}

  ngOnInit() {
    /**
    * ADDED LINE BELOW TO WORK WITH NgRx
    */
    this.isLoading$ = this.store.select(getIsLoading);
    //this.loadingSubscription = this.uiService.loadingStateChanged.subscribe(isLoading => {
    //  this.isLoading = isLoading;
    //});
    this.loginForm = new FormGroup({
      email: new FormControl('', {
        validators: [Validators.required, Validators.email]
      }),
      password: new FormControl('', { validators: [Validators.required] })
    });
  }

  /**
  * COMMENTED LINE BELOW TO WORK WITH NgRx
  */
  //ngOnDestroy() {
  //  if (this.loadingSubscription) {
  //    this.loadingSubscription.unsubscribe();
  //  }
  //}


  onSubmit() {
    this.authService.login({
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    });
  }
}
