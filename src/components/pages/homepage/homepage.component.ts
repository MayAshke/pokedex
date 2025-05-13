import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../../../services/pokemon.service';
import { CommonModule } from '@angular/common';
import { PokemonCardComponent } from '../../pokemon-card/pokemon-card.component';
import { PokemonGridComponent } from '../../pokemon-grid/pokemon-grid.component';
import { SearchBarComponent } from '../../search-bar/search-bar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, PokemonCardComponent, PokemonGridComponent, SearchBarComponent],
  templateUrl: 'homepage.component.html',
  styleUrls: ['homepage.component.css']
})

export class HomepageComponent implements OnInit {
  title = 'pokedex';
  pokemons: any[] = [];
  displayedPokemons: any[] = []; // הפוקימונים שמוצגים בפועל
  displayCount = 12; // כמה פוקימונים מוצגים בהתחלה

  constructor(private pokemonService: PokemonService) {}

  ngOnInit() {
    this.pokemonService.getPokemonList().subscribe((data: any) => {
      this.pokemons = data.results; // התוצאה נמצאת בתוך results!
      this.displayedPokemons = this.pokemons.slice(0, this.displayCount);
    });
  }

  onSearchPokemon(term: string) {
    if (!term.trim()) {
      this.displayedPokemons = this.pokemons.slice(0, this.displayCount);
    } else {
      const lowerTerm = term.toLowerCase();
      this.displayedPokemons = this.pokemons.filter(pokemon =>
        pokemon.name.toLowerCase().includes(lowerTerm)
      );
    }
  }
  
  loadMore() {
    this.displayCount += 12;
    this.displayedPokemons = this.pokemons.slice(0, this.displayCount);
  }
}