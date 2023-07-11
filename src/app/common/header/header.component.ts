import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { SelectItemGroup } from 'primeng/api';


interface City {
  name: string;
  code: string;
}

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
