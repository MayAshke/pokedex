import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pokemon-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.css']
})
export class PokemonCardComponent {
  @Input() pokemon: any;
  
  constructor(private router: Router) {}

  getPokemonId(): string {
    const urlParts = this.pokemon.url.split('/');
    return urlParts[urlParts.length - 2];
  }

  getFormattedPokemonId(): string {
    const id = this.getPokemonId();
    return id.toString().padStart(3, '0');
  }

  getPokemonImageUrl(): string {
    const id = this.getPokemonId();
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
  }

  goToDetails() {
    this.router.navigate(['/pokemon', this.pokemon.name]);
  }
}