import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { MainComponent } from './view/containers/main/main.component';
import { MainResolver } from './view/resolvers/main';

const routes: Routes = [
  { path: '', component: MainComponent, resolve: { main: MainResolver } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
