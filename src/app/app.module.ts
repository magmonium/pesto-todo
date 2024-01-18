import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { provideFirebaseApp, initializeApp } from '@angular/fire/app'
import { getFirestore, provideFirestore } from '@angular/fire/firestore'
import { environment } from 'src/environments/environment'
import { AuthModule, getAuth, provideAuth } from '@angular/fire/auth'

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    AuthModule,
    provideFirebaseApp(() => initializeApp(environment.fdescribe)),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
