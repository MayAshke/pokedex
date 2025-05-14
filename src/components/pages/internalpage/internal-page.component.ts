import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { PokemonInfoCardComponent } from '../../pokemon-info-card/pokemon-info-card.component';

@Component({
  selector: 'app-internalpage',
  standalone: true,
  imports: [CommonModule, PokemonInfoCardComponent],
  templateUrl: './internal-page.component.html',
  styleUrls: ['./internal-page.component.css']
})
export class InternalpageComponent implements OnInit {
  pokemon: any;

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    const name = this.route.snapshot.paramMap.get('name');
    if (name) {
      this.http.get(`https://pokeapi.co/api/v2/pokemon/${name}`).subscribe(data => {
        this.pokemon = data;
      });
    }
  }

  goHome() {
    this.router.navigate(['/home']); 
  }
}