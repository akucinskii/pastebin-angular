import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

interface PasteInterface {
  title: string;
  content: string;
  total_views: number;
}

@Component({
  selector: 'app-read-paste',
  templateUrl: './read-paste.component.html',
  styleUrls: ['./read-paste.component.css'],
})
export class ReadPasteComponent implements OnInit {
  public id: string | null;
  public paste: PasteInterface;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');

    this.http
      .get(`http://localhost:3001/api/post/${this.id}`)
      .subscribe((res: any) => {
        this.paste = res;
        console.log(res);
      });
  }
}
