import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../../../services/pokemon.service';
import { CommonModule } from '@angular/common';
import { PokemonGridComponent } from '../../pokemon-grid/pokemon-grid.component';
import { SearchBarComponent } from '../../search-bar/search-bar.component';
import { FilterComponent } from '../../filter/filter.component';
import { Pokemon } from '../../../app/models/pokemon.model'; 
import { Observable, forkJoin } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, PokemonGridComponent, SearchBarComponent, FilterComponent],
  templateUrl: 'homepage.component.html',
  styleUrls: ['homepage.component.css']
})

export class HomepageComponent implements OnInit {
  title = 'pokedex';
  pokemons: any[] = [];
  displayedPokemons: any[] = [];
  filteredPokemons: Pokemon[] = [];
  displayCount = 12; 
  showFilter = false;
  isFilterOpen = false;

  constructor(private pokemonService: PokemonService) {}

  ngOnInit() {
    this.pokemonService.getPokemonList().subscribe((data: any) => {
      const requests: Observable<any>[] = data.results.map((pokemon: any) =>
        this.pokemonService.getPokemonDetails(pokemon.url)
      );
  
      forkJoin(requests).subscribe((fullPokemons: any[]) => {
        this.pokemons = fullPokemons;
        this.filteredPokemons = fullPokemons;
        this.displayedPokemons = fullPokemons.slice(0, this.displayCount); 
      });
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
    this.displayedPokemons = this.filteredPokemons.slice(0, this.displayCount);
  }
  
  toggleFilter() {
    this.showFilter = !this.showFilter;
  }
  
  applyFilters(filters: any) {
    const { type, totalStat, height } = filters;
  
    this.displayedPokemons = this.pokemons.filter(pokemon => {
      const matchesType = !type || pokemon.types.some((t: { type: { name: string } }) => t.type.name === type);
  
      const total = pokemon.stats.reduce((acc: number, stat: { base_stat: number }) => acc + stat.base_stat, 0);
      const matchesTotalStat = !totalStat || total >= +totalStat;
  
      const matchesHeight = !height || pokemon.height <= +height;
  
      return matchesType && matchesTotalStat && matchesHeight;
    });
    this.showFilter = false; 
  }
}