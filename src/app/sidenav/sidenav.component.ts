import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ud-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  constructor(private router:Router) { }

  sidenavStatus: boolean = false;
  ngOnInit(): void {
  }

  changeToRoute (route){
    this.router.navigateByUrl(route)
  }

}
