import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  code: string;
  message: string;

  ngOnInit() {
    this.code = this.route.snapshot.paramMap.get('code');
    if (this.code === '404') {
      this.message = 'The resourse That you are looking for is not found';
    }
  }
}
