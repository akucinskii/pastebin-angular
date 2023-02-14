import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css'],
})
export class ProfilePageComponent implements OnInit {
  constructor(private _router: Router) {}

  ngOnInit(): void {
    if (!localStorage.getItem('token')) {
      this._router.navigate(['login']);
    }
  }
}