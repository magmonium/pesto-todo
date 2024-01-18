import { Component, Input, inject } from '@angular/core'
import { FormControl, ReactiveFormsModule, FormGroup, Validators, FormControlState, FormControlStatus } from '@angular/forms'
import { Auth , signInWithEmailAndPassword, createUserWithEmailAndPassword, UserCredential} from '@angular/fire/auth'
import { Router, RouterLink, RouterModule } from '@angular/router'
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [
    NgbAlert,
    ReactiveFormsModule,
    RouterLink,
    RouterModule
  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.sass'
})
export class SignInComponent {

  @Input()
  set action(data:string){
    this.act = data
    this.error = undefined
  }

  loginForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.pattern(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
    ]),
    password: new FormControl('', [
      Validators.minLength(6),
      Validators.required
    ]),
  })
  act !: string
  isValid !: boolean
  error !: string | undefined
  #auth: Auth = inject(Auth)

  constructor(
    private readonly router: Router
  ){
    this.loginForm.statusChanges.subscribe((status:FormControlStatus) => {
      this.isValid = status === 'VALID'
    })
  }


  onSubmit = () => {
    const {email, password} = <Record<'email'|'password', string>>this.loginForm.value

    switch(this.act){

      case 'sign-up':
        createUserWithEmailAndPassword(this.#auth,email,password).then(this.#onAuthSuccess).catch(this.#onAuthError)
        break

      case 'sign-in':
        signInWithEmailAndPassword(this.#auth,email,password).then(this.#onAuthSuccess).catch(this.#onAuthError)
        break
    }
  }

  #onAuthSuccess = ({user}:UserCredential) => {
    sessionStorage.setItem('user', user.uid)
    this.router.navigate(['/'])
  }

  #onAuthError = ({message}:any) => {
    this.error = message
  }

  close = () => {
    this.error = undefined
  }

}
