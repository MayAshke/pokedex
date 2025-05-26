import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, of } from 'rxjs';
import { Pokemon } from '../types/pokemon.type';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private allPokemonsCache: Pokemon[] | null = null;
  private apiUrl = 'https://pokeapi.co/api/v2/pokemon';

  constructor(private http: HttpClient) {}

  getPokemonList(limit: number, offset: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?limit=${limit}&offset=${offset}`);
  }
  
  getPokemonDetails(url: string): Observable<Pokemon> {
    return this.http.get<Pokemon>(url);
  }

  getAllPokemons(): Observable<Pokemon[]> {
    if (this.allPokemonsCache) {
      return of(this.allPokemonsCache);
    }

    return this.getPokemonList(1302, 0).pipe(
      switchMap((data: any) => {
        const requests: Observable<Pokemon>[] = data.results.map((pokemon: any) =>
          this.getPokemonDetails(pokemon.url)
        );

        return forkJoin(requests).pipe(
          map((pokemons: Pokemon[]) => {
            this.allPokemonsCache = pokemons;
            return pokemons;
          })
        );
      })
    );
  }
}