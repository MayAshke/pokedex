import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pokemon-info-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pokemon-info-card.component.html',
  styleUrls: ['./pokemon-info-card.component.css']
})
export class PokemonInfoCardComponent {
  @Input() pokemon: any;
  
  constructor(private router: Router) {}

  getPokemonId(): string {
    return this.pokemon?.id?.toString() ?? '';
  }

  getFormattedPokemonId(): string {
    const id = this.getPokemonId();
    return id.toString().padStart(3, '0');
  }

  getPokemonImageUrl(): string {
    const id = this.getPokemonId();
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
  }

  getTotalStats(): number {
    if (!this.pokemon?.stats) return 0;
    return this.pokemon.stats.reduce((total: number, stat: any) => total + stat.base_stat, 0);
  }

  getTypeColor(typeName: string): string {
    const typeColors: { [key: string]: string } = {
      normal:   '#A8A77A',
      fire:   '#EE8130',
      water:   '#6390F0',
      electric:   '#F7D02C',
      grass:   '#7AC74C',
      ice:   '#96D9D6',
      fighting:   '#C22E28',
      poison:   '#A33EA1',
      ground:   '#E2BF65',
      flying:   '#A98FF3',
      psychic:   '#F95587',
      bug:   '#A6B91A',
      rock:   '#B6A136',
      ghost:   '#735797',
      dragon:   '#6F35FC',
      dark:   '#705746',
      steel:   '#B7B7CE',
      fairy:   '#D685AD'
    };
    return typeColors[typeName] || '#A8A878';
  }
}