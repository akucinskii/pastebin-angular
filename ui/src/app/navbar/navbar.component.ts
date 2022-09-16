import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../state/app.state';
import { User } from '../state/user.model';
import { userSelector } from '../state/user.selectors';

import { login, logout } from '../state/user.actions';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  user: Observable<User>;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(login());
    this.user = this.store.select(userSelector);
  }

  logout() {
    this.store.dispatch(logout());
    localStorage.removeItem('token');
  }
}
