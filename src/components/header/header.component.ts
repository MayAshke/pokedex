import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FavoritesService } from '../../services/favorites.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
    currentRoute: string = '';
    favoritesCount$: Observable<number>;

    constructor(private router: Router, private favoritesService: FavoritesService) {
      this.favoritesCount$ = this.favoritesService.favorites$.pipe(
        map(favorites => favorites.length)
      );
    }  

    setCurrentRoute(route: string) {
      this.currentRoute = route;
    }
}