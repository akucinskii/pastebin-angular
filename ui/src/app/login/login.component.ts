import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
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
  constructor(private http: HttpClient, private _router: Router) {
    this.http = http;
  }

  ngOnInit(): void {}

  login(userInput: UserInput) {
    this.http
      .post('http://localhost:3001/api/user/login', userInput)
      .subscribe({
        next: (res: any) => {
          localStorage.setItem('token', res.accessToken);
          this.alert = 'Login successful';
          this._router.navigate([`/`]);
        },
        error: (err) => {
          this.alert = err.error.message || 'Something went wrong';
        },
      });
  }
}
