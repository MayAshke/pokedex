import { Routes } from '@angular/router';
import { HomepageComponent } from '../components/pages/homepage/homepage.component';
import { FavoritesComponent } from '../components/pages/favorites/favorites-page.component';

export const routes: Routes = [
  { path: 'home', component: HomepageComponent },
  { path: 'favorites', component: FavoritesComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];