import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pokemon-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.css']
})
export class PokemonCardComponent {
  @Input() pokemon: any;

  getPokemonId(): string {
    const urlParts = this.pokemon.url.split('/');
    return urlParts[urlParts.length - 2];
  }

  getPokemonImageUrl(): string {
    const id = this.getPokemonId();
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
  }
}