import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { UserComponent } from './users/user/user.component';
import { ServersComponent } from './servers/servers.component';
import { ServerComponent } from './servers/server/server.component';
import { EditServerComponent } from './servers/edit-server/edit-server.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { NgModule } from '@angular/core';
import { AuthGuardService } from './auth-guard.service';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'users', component: UsersComponent, children: [
      { path: ':id', component: UserComponent },
    ]
  },
  { path: 'servers', component: ServersComponent,
    canActivate: [AuthGuardService], // list of Services implementing CanActivate. Route is loaded only if all instances return true
    children: [
      // note that for the child routes we need to add a router outlet in ServersComponent !
      { path: ':id', component: ServerComponent },
      { path: ':id/edit', component: EditServerComponent },
    ]
  },
  {
    path: 'not-found', // path under which a 404 feedback component is reachable
    component: PageNotFoundComponent
  },
  {
    path: '**', // catch all unknown paths not handled by the other routes before. --> here the order matters!
    redirectTo: 'not-found' // redirect to another path
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule] // from this module, if I were to add this module to the imports list of
  // another module, what should be accessible to the consuming module
})
export class AppRoutingModule {

}


