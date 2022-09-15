import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../state/app.state';
import { User } from '../state/user.model';
import { userLoginStatus, userSelector } from '../state/user.selectors';
import jwtDecode from 'jwt-decode';
import { userReducer } from '../state/user.reducer';
import { login } from '../state/user.actions';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  user: Observable<User>;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');

    console.log(token);

    if (token) {
      const decodedToken: { name: string } = jwtDecode(token);

      console.log(decodedToken.name);
      this.store.dispatch(login({ name: decodedToken.name }));

      this.user = this.store.select(userSelector);
    } else {
      this.store.dispatch({ type: 'Logout' });
      this.user = this.store.select(userSelector);
    }
  }

  logout() {
    this.store.dispatch({ type: 'Logout' });
    localStorage.removeItem('token');
  }
}
