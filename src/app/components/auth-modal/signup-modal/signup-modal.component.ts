import { Component, OnInit } from '@angular/core';
import { SignupModalService } from 'src/app/services/signup-modal/signup-modal.service';
import { LoginModalService } from 'src/app/services/login-modal/login-modal.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {saveJwtToken, logout, isJwtTokenExpired, getJwtToken, getJwtTokenData } from "../../../utils/auth";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup-modal',
  templateUrl: './signup-modal.component.html',
  styleUrls: ['./signup-modal.component.css']
})
export class SignupModalComponent implements OnInit  {

  mySignupForm: FormGroup;
  loading: boolean = false; 
  isPasswordVisible: boolean = false;

  constructor(
    private signupModalService: SignupModalService,
    private formBuilder: FormBuilder,
    private loginModalService: LoginModalService,
    private toastr: ToastrService
    ) {
    this.mySignupForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
   }

  ngOnInit() {
    
  }

  openSignInModal(){
    this.loginModalService.openModal();
    this.signupModalService.closeModal();
  }

  

  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  closeModal() {
    this.signupModalService.closeModal();
  }

  onSubmit() {
  
    if (this.mySignupForm.invalid) {
      // Form is valid, perform signup logic
      console.log("error");
      return
    } 

    this.loading = true; 
    // Access form values here
    const firstName = this.mySignupForm.get('firstName')?.value;
    const lastName = this.mySignupForm.get('lastName')?.value;
    const email = this.mySignupForm.get('email')?.value;
    const password = this.mySignupForm.get('password')?.value;

    // Call a function to send data to the backend
    this.signupModalService.register(firstName, lastName, email, password).subscribe(
      (response) => {
        console.log('Post successful:', response);
        this.loading = false;
        this.openSignInModal();
        // Perform any additional actions on successful response if needed
      },
      (error) => {
        console.error('Error posting data:', error);
        // Handle error if needed
      }
    ).add(() => {
      // this.loading = false; // Set loading back to false after the request (regardless of success or error)
    });

    // alert(firstName + " " + lastName + " "  + email + " " + password);
  }

  // sendDataToBackend(firstName:string, lastName: string, email: string, password: string) {
  //   return this.signupModalService.register(firstName, lastName, email, password);
  // }


}
