import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';

@Component({
  selector: 'app-create-paste',
  templateUrl: './create-paste.component.html',
  styleUrls: ['./create-paste.component.css'],
})
export class CreatePasteComponent implements OnInit {
  constructor(private http: HttpClient, private _router: Router) {
    this.http = http;
  }

  ngOnInit(): void {}

  onPasteCreate(paste: { title: string; content: string }) {
    const token = localStorage.getItem('token');

    this.http
      .post('http://localhost:3001/api/post/', paste, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
      .subscribe((res: any) => {
        this._router.navigate([`/read/${res.id}`]);
      });
  }
}
