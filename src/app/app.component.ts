import { Component, OnInit, inject } from '@angular/core'
import { NavigationEnd, Router } from '@angular/router'
import { filter } from 'rxjs'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {

  title = 'pesto-todo'
  hasLoggedIn !: boolean
  router = inject(Router)

  constructor() {
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe((event) => {
      this.hasLoggedIn = !!sessionStorage.getItem('user')
    })
  }
  

  logOut = () => {
    sessionStorage.removeItem('user')
    this.router.navigate(['auth', 'sign-in'])
  }
}
