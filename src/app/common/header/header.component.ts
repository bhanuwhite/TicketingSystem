import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

user = localStorage.getItem('name');
constructor( private router: Router){

}
logout() {
  this.router.navigateByUrl('/login');
  localStorage.clear();
}
}
