import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginModalService } from 'src/app/services/login-modal/login-modal.service';
import { SignupModalService } from 'src/app/services/signup-modal/signup-modal.service';
import {saveJwtToken, logout, isJwtTokenExpired, getJwtToken, getJwtTokenData } from "../../../utils/auth";
import { ToastrService } from 'ngx-toastr';
import { Store } from '@ngrx/store';
import { setUser } from "../../../store/actions/user.action";


@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.css']
})
export class LoginModalComponent {

  myLoginForm: FormGroup;
  isPasswordVisible: boolean = false;
  loading = false; // Add loading flag
  loginSuccess = false; // Add loading flag

  constructor(
    private store: Store, 
    private loginModalService: LoginModalService,
    private signupModalService: SignupModalService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
    ) {
      this.myLoginForm = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required]
      });
    }

 getTokens  () {
    console.log(getJwtToken());
    this.toastr.success('Hello world!', 'Toastr fun!');
 }

 logOut  () {
    console.log(logout());
 }

  checkExpired  () {
    console.log(isJwtTokenExpired());
  }

  checkTokenData  () {
    console.log(getJwtTokenData());
  }

  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }


  closeModal() {
    this.loginModalService.closeModal();
  }

  openSignupModal(){
    this.loginModalService.closeModal();
    this.signupModalService.openModal();
  }


  onSubmit() {

    if (this.myLoginForm.invalid) {
      // Form is valid, perform signup logic
      console.log("error validation");
      return
    } 

    // Set loading to true
    this.loading = true;

    // Access form values here
    const email = this.myLoginForm.get('email')?.value;
    const password = this.myLoginForm.get('password')?.value;


    // Call a function to send data to the backend
    this.sendDataToBackend(email, password)
    .subscribe(
      (response) => {
        console.log(response);
        if(response.status){  //if true
          this.toastr.success(response.message);
          saveJwtToken(response.token.accessToken);
          this.loginSuccess = true;
          const user: any = {
            firstName: "Tunde",
            lastName: "Seriki",
            email: "tunde@gmail.com"
          }
          // this.store.dispatch(setUser(user));
          this.closeModal();
        }else{
          this.toastr.error(response.message);
        }
      },
      (error) => {
        console.error('Error logging In:', error);
        // Handle errors here
      }
    ).add(() => {
      // Set loading back to false when the request is completed (success or error)
      this.loading = false;
      
    });

  
  }

  sendDataToBackend(email: string, password: string) {
    return this.loginModalService.logIn(email, password);
  }

}
