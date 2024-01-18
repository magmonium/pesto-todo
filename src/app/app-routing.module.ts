import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { SignInComponent } from './sign-in/sign-in.component'

const routes: Routes = [
  { path: 'auth/:action', component: SignInComponent },

  { path: '', redirectTo: 'auth/sign-in', pathMatch: 'full' },
  { path: '*', redirectTo: 'auth/sign-in', pathMatch: 'full' }
]

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    bindToComponentInputs: true 
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
