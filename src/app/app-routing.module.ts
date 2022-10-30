import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { HomeComponent } from './components/home/home.component'
import { ProjectResolve } from './core/resolver/project-resolve'

const routes: Routes = [
  { path: '', redirectTo: 'project', pathMatch: 'full' },
  {
    path: 'project',
    component: HomeComponent,
    resolve: {
      // add a project resolve
      ready: ProjectResolve,
    },
  },
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      // enabledBlocking for SSR, but also enabledNonBlocking is not as good as it sounds in this setup
      initialNavigation: 'enabledBlocking',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
