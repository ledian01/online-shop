import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor() { }

  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);


  ngOnInit(): void {
  }

}
