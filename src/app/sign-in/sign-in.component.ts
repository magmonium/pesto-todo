import { Component, inject } from '@angular/core'
import { FormControl, ReactiveFormsModule, FormGroup } from '@angular/forms'
import { getAuth, signInWithEmailAndPassword , createUserWithEmailAndPassword} from "firebase/auth"
import { Auth } from '@angular/fire/auth'

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.sass'
})
export class SignInComponent {

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  })
  signupForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    rePassword: new FormControl(''),
  })
  #auth: Auth = inject(Auth);
  isSignUp : boolean = true

  signIn = ():void => {
    const auth = getAuth()
    const {email, password} = this.loginForm.value
    signInWithEmailAndPassword(auth, <string>email, <string>password).then((userCredential) => {
      const user = userCredential.user;
    })
    .catch((error) => {
      console.log(error)
      const errorCode = error.code;
      const errorMessage = error.message;
    })


    // this.#auth.
    /*
    const auth = getAuth()
    const {email, password} = this.loginForm.value
    createUserWithEmailAndPassword(auth, <string>email, <string>password)
    .then((userCredential) => {
      // Signed up 
      const user = userCredential.user;
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
    /*
    signInWithEmailAndPassword(auth, <string>email, <string>password).then((userCredential) => {
      const user = userCredential.user;
    })
    .catch((error) => {
      console.log(error)
      const errorCode = error.code;
      const errorMessage = error.message;
    });
    */
  }

  signUp = ():void => {
    
  }

}
