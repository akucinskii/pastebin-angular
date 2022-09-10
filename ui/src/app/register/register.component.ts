import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
interface UserInput {
  username: string;
  password: string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  constructor(private http: HttpClient, private _router: Router) {
    this.http = http;
  }

  ngOnInit(): void {}

  register(userInput: UserInput) {
    this.http
      .post('http://localhost:3001/api/user/', userInput)
      .subscribe((res: any) => {
        this._router.navigate([`/login`]);
      });
  }
}
