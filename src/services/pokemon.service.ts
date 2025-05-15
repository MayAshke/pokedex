import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pokemon } from '../app/models/pokemon.model';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private apiUrl = 'https://pokeapi.co/api/v2/pokemon';

  constructor(private http: HttpClient) {}

  getPokemonList(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
  
  getPokemonDetails(url: string): Observable<Pokemon> {
    return this.http.get<Pokemon>(url);
  }
}