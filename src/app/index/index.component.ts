import { Component, OnInit } from '@angular/core';

import { AuthService } from '../_gnosiss_services/auth.service'; 

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }
}
