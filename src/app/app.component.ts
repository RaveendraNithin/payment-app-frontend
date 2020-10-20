import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title: string = 'Test Payment App';
  page: string;

  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
    // this.route.queryParams.subscribe(params => {
    //   this.page = params['name'];
    // });
    // this.router.events.subscribe((url) => console.log(url));
  }

}
