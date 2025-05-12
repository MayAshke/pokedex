import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../services/pokemon.service';
import { CommonModule } from '@angular/common';
import { PokemonCardComponent } from '../components/pokemon-card/pokemon-card.component';
import { PokemonGridComponent } from '../components/pokemon-grid/pokemon-grid.component';
import { SearchBarComponent } from '../components/search-bar/search-bar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, PokemonCardComponent, PokemonGridComponent, SearchBarComponent],
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})
export class AppComponent implements OnInit {
  title = 'pokedex';
  pokemons: any[] = [];

  constructor(private pokemonService: PokemonService) {}

  ngOnInit() {
    this.pokemonService.getPokemonList().subscribe(response => {
      this.pokemons = response.results;
    });
  }

  onSearchPokemon(term: string) {
    console.log('חיפוש על:', term);
  }
}