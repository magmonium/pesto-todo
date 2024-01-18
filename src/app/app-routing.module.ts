import { NgModule, inject } from '@angular/core'
import { CanActivateFn, Router, RouterModule, Routes } from '@angular/router'

function authenticationGuard(): CanActivateFn {
  return () => {
    if (sessionStorage.getItem('user')) return true
    const router = inject(Router)
    router.navigate(['auth', 'sign-in'])
    return false
  }
}

const routes: Routes = [
  { path: 'auth/:action', loadComponent: () => import('src/app/sign-in/sign-in.component').then(m => m.SignInComponent) },
  { path: '', loadComponent: () => import('src/app/home/home.component').then(m => m.HomeComponent),  canActivate: [authenticationGuard()]},
  { path: '**', redirectTo: ''}
]

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    bindToComponentInputs: true 
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
