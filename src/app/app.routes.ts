import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PkmnComponent } from './pages/pkmn/pkmn.component';
import { DbzComponent } from './pages/dbz/dbz.component';
import { ErrorComponent } from './pages/error/error.component';
import { CotlsComponent } from './pages/cotls/cotls.component';

export const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch:'full'},
    {path:'home', component:HomeComponent},
    {path:'pokemon', component:PkmnComponent},
    {path:'dragonballz', component:DbzComponent},
    {path:'cocteles', component:CotlsComponent},
    {path:'miapi', loadChildren:() => import('./pages/miapi/miapi-routing.module').then(m => m.MiapiRoutingModule)},
    {path: '**', component:ErrorComponent}
];
