import { Component, Input, inject } from '@angular/core'
import { FormControl, ReactiveFormsModule, FormGroup, Validators, FormControlState, FormControlStatus } from '@angular/forms'
import { Auth , signInWithEmailAndPassword, createUserWithEmailAndPassword} from '@angular/fire/auth'
import { RouterLink } from '@angular/router'
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [
    NgbAlert,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.sass'
})
export class SignInComponent {

  @Input()
  set action(data:string){
    this.act = data
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
  #auth: Auth = inject(Auth);

  constructor(
  ){
    this.loginForm.statusChanges.subscribe((status:FormControlStatus) => {
      this.isValid = status === 'VALID'
    })
  }


  onSubmit = () => {
    const {email, password} = <Record<'email'|'password', string>>this.loginForm.value

    switch(this.act){

      case 'sign-up':
        createUserWithEmailAndPassword(this.#auth,email,password).then((userCredential) => {
          console.log({userCredential})
        }).catch(({message}) => {
          this.error = message
        })
        break

      case 'sign-in':
        signInWithEmailAndPassword(this.#auth,email,password)
        .then((userCredential) => {
          console.log({userCredential})
        }).catch(({message}) => {
          this.error = message
        })
        break
    }
  }

  close = () => {
    this.error = undefined
  }

}
