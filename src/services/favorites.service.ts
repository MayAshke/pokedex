import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private favorites: any[] = [];
  private favoritesSubject = new BehaviorSubject<any[]>([]);
  
  favorites$: Observable<any[]> = this.favoritesSubject.asObservable();

  add(pokemon: any) {
    if (!this.isFavorite(pokemon)) {
      this.favorites.push(pokemon);
      this.favoritesSubject.next(this.favorites);
    }
  }

  remove(pokemon: any) {
    this.favorites = this.favorites.filter(p => p.id !== pokemon.id);
    this.favoritesSubject.next(this.favorites);
  }

  isFavorite(pokemon: any): boolean {
    return this.favorites.some(p => p.id === pokemon.id);
  }

  getFavorites(): any[] {
    return this.favorites;
  }
}