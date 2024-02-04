import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AuthService } from '../auth.service';
import { UIService } from 'src/app/shared/ui.service';
import { Observable, Subscription } from 'rxjs';
import * as fromRoot from '../../app.reducer'
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  maxDate: any;
  isLoading$!: Observable<boolean>;
  //private loadingSubscription!: Subscription;

  constructor(
    private authService: AuthService,
    private uiService: UIService,
    private store: Store<fromRoot.State>
    ) { }

  ngOnInit() {
  /**
  * COMMENTED LINES BELOW TO WORK WITH NgRx
  */
    //this.loadingSubscription = this.uiService.loadingStateChanged.subscribe(isLoading => {
    //  this.isLoading = isLoading;
    //});
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }

  /**
  * COMMENTED LINE BELOW TO WORK WITH NgRx
  */
  //ngOnDestroy() {
  //  if (this.loadingSubscription) {
  //    this.loadingSubscription.unsubscribe();
  //  }
  //}

  onSubmit(form: NgForm) {
    this.authService.registerUser({
      email: form.value.email,
      password: form.value.password
    });
  }

}
