import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
    currentRoute: string = '';

    constructor(private router: Router) {}
  
    // עדכון currentRoute כאשר לוחצים על כפתור
    setCurrentRoute(route: string) {
      this.currentRoute = route;
    }
}