import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../../../services/pokemon.service';
import { CommonModule } from '@angular/common';
import { PokemonGridComponent } from '../../pokemon-grid/pokemon-grid.component';
import { SearchBarComponent } from '../../search-bar/search-bar.component';
import { FilterComponent } from '../../filter/filter.component';
import { Pokemon } from '../../../types/pokemon.type'; 

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, PokemonGridComponent, SearchBarComponent, FilterComponent],
  templateUrl: 'homepage.component.html',
  styleUrls: ['homepage.component.css']
})

export class HomepageComponent implements OnInit {
  allPokemons: Pokemon[] = [];
  displayedPokemons: Pokemon[] = [];
  searchTerm: string = '';
  filters: any = {};
  limit = 12;
  offset = 0;
  showFilter = false;
  isLoading = false;

  constructor(private pokemonService: PokemonService) {}

  ngOnInit() {
    this.loadAllPokemons();
  }

  loadAllPokemons() {
    this.isLoading = true;
    this.pokemonService.getAllPokemons().subscribe((fullPokemons: Pokemon[]) => {
      this.allPokemons = fullPokemons;
      this.displayedPokemons = this.getFilteredPokemons().slice(0, this.limit);
      this.offset = this.limit;
      this.isLoading = false;
    });
  }

  loadMore() {
    const filtered = this.getFilteredPokemons();
    const nextBatch = filtered.slice(this.offset, this.offset + this.limit);
    this.displayedPokemons = [...this.displayedPokemons, ...nextBatch];
    this.offset += this.limit;
  }

  toggleFilter() {
    this.showFilter = !this.showFilter;
  }

  getFilteredPokemons(): Pokemon[] {
    const term = this.searchTerm.toLowerCase();
    return this.allPokemons.filter(pokemon => {
      const matchesSearch = !term || pokemon.name.toLowerCase().includes(term);
      const { type, totalStat, height } = this.filters;
      const matchesType = !type || pokemon.types.some((t: { type: { name: string } }) => t.type.name === type);
      const total = pokemon.stats.reduce((acc: number, stat: { base_stat: number }) => acc + stat.base_stat, 0);
      const matchesTotalStat = !totalStat || total >= +totalStat;
      const matchesHeight = !height || pokemon.height <= +height;
      return matchesSearch && matchesType && matchesTotalStat && matchesHeight;
    });
  }

  applySearchAndFilter() {
    const filtered = this.getFilteredPokemons();
    this.offset = this.limit;
    this.displayedPokemons = filtered.slice(0, this.limit);
  }

  onSearchPokemon(event: { term: string, filters?: any }) {
    this.searchTerm = event.term;
    this.applySearchAndFilter();
  }

  onFilterApplied(filters: any) {
    this.filters = filters;
    this.showFilter = false;
    this.applySearchAndFilter();
  }

  resetFilters() {
    this.searchTerm = '';
    this.filters = {};
    this.offset = this.limit;
    this.displayedPokemons = this.allPokemons.slice(0, this.limit);
  }
}