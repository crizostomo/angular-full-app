import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import * as fromRoot from '../../app.reducer';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit {
  @Output() closeSidenav = new EventEmitter<void>();
  isAuth$!: Observable<boolean>
  authSubscription!: Subscription;

  constructor(
    private authService: AuthService,
    private store: Store<fromRoot.State>
    ) { }

  onLogout() {
    this.onClose();
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

  onClose() {
    this.closeSidenav.emit();
  }

}
