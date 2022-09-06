import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatePasteComponent } from './create-paste/create-paste.component';
import { LoginComponent } from './login/login.component';
import { ReadPasteComponent } from './read-paste/read-paste.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: 'create', component: CreatePasteComponent },
  { path: 'read/:id', component: ReadPasteComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
