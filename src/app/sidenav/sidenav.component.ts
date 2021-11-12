import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomLoaderComponent } from '../custom-loader/custom-loader.component';

@Component({
  selector: 'ud-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  mySpinner = CustomLoaderComponent;

  constructor(private router:Router) { }

  sidenavStatus: boolean = false;
  ngOnInit(): void {
    // document.addEventListener('touchmove', handleTouchMove, {passive:false, capture:true});
  }

  changeToRoute (route){
    this.router.navigateByUrl(route)
  }

}

