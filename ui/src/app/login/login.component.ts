import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../state/app.state';
import { Observable } from 'rxjs/internal/Observable';
import { User } from '../state/user.model';
import { login } from '../state/user.actions';
import jwtDecode from 'jwt-decode';
interface UserInput {
  username: string;
  password: string;
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public alert: string;
  user: Observable<User>;

  constructor(
    private http: HttpClient,
    private _router: Router,
    private store: Store<AppState>
  ) {
    this.http = http;
  }

  ngOnInit(): void {}

  login(userInput: UserInput) {
    this.http
      .post('http://localhost:3001/api/user/login', userInput)
      .subscribe({
        next: (res: any) => {
          localStorage.setItem('token', res.accessToken);
          this.store.dispatch(login());
          this.alert = 'Login successful';
          this._router.navigate([`/`]);
        },
        error: (err) => {
          this.alert = err.error.message || 'Something went wrong';
        },
      });
  }
}
