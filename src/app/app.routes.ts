import { Routes } from '@angular/router';
import { HomepageComponent } from '../components/pages/homepage/homepage.component';
import { FavoritesComponent } from '../components/pages/favorites/favorites-page.component';
import { InternalpageComponent } from '../components/pages/internalpage/internal-page.component';

export const routes: Routes = [
  { path: 'home', component: HomepageComponent },
  { path: 'favorites', component: FavoritesComponent },
  { path: 'pokemon/:name', component: InternalpageComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];