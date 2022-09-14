import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ClipboardModule } from 'ngx-clipboard';
import { StoreModule } from '@ngrx/store';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreatePasteComponent } from './create-paste/create-paste.component';
import { ReadPasteComponent } from './read-paste/read-paste.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { userReducer } from './state/user.reducer';

@NgModule({
  declarations: [
    AppComponent,
    CreatePasteComponent,
    ReadPasteComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ClipboardModule,
    StoreModule.forRoot({
      user: userReducer,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
