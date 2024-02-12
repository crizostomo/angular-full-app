import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Observable, Subscription } from 'rxjs';
import * as fromRoot from '../../app.reducer';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() sidenavToggle = new EventEmitter<void>();
  authSubscription!: Subscription;
  isAuth$!: Observable<boolean>

  constructor(
    private authService: AuthService,
    private store: Store<fromRoot.State>
    ) { }

  onLogout() {
    this.authService.logout();
  }

  //ngOnDestroy() {
  //  this.authSubscription.unsubscribe();
  //}

  ngOnInit() {
    //this.authSubscription = this.authService.authChange.subscribe(authStatus => {
    //  this.isAuth = authStatus;
    //});
    this.isAuth$ = this.store.select(fromRoot.getIsAuth);
  }

  onToggleSidenav() {
    this.sidenavToggle.emit();
  }
}
