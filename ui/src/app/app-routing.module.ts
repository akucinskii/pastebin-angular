import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatePasteComponent } from './create-paste/create-paste.component';
import { ReadPasteComponent } from './read-paste/read-paste.component';

const routes: Routes = [
  { path: 'create', component: CreatePasteComponent },
  { path: 'read/:id', component: ReadPasteComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
