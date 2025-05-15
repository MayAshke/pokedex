import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Pokemon } from '../types/pokemon.type';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private favoritesSubject = new BehaviorSubject<Pokemon[]>([]);
  private readonly STORAGE_KEY = 'favorites';

  favorites$: Observable<Pokemon[]> = this.favoritesSubject.asObservable();
  
  constructor() {
    const saved = localStorage.getItem(this.STORAGE_KEY);
    const initialFavorites = saved ? JSON.parse(saved) : [];

    this.favoritesSubject = new BehaviorSubject<Pokemon[]>(initialFavorites);
    this.favorites$ = this.favoritesSubject.asObservable();
  }

  private saveToStorage(favorites: Pokemon[]) {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(favorites));
  }

  add(pokemon: Pokemon) {
    const current = this.favoritesSubject.value;
    if (!current.some(p => p.id === pokemon.id)) {
      const updated = [...current, pokemon];
      this.favoritesSubject.next(updated);
      this.saveToStorage(updated);
    }
  }

  remove(pokemon: Pokemon) {
    const current = this.favoritesSubject.value;
    const updated = current.filter(p => p.id !== pokemon.id);
    this.favoritesSubject.next(updated);
    this.saveToStorage(updated);
  }

  isFavorite(pokemon: Pokemon): boolean {
    return this.favoritesSubject.value.some(p => p.id === pokemon.id);
  }

  getFavorites(): Pokemon[] {
    return this.favoritesSubject.value;
  }
}