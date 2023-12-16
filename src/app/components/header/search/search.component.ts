import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SearchService } from 'src/app/services/search/search.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { LoginModalService } from 'src/app/services/login-modal/login-modal.service';
import { selectUser } from "../../../store/selectors/user.selectors";
import { Store } from '@ngrx/store';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit{

  searchControl: FormControl = new FormControl(''); // Initialize the FormControl
  currentUrl: string;
  user: any;


  constructor(
    private store: Store, 
    private searchService: SearchService,
    private location: Location,
    private router: Router,
    private loginModalService: LoginModalService,
    ){
    this.currentUrl = this.location.path();
  }


  // loggedUser$ = this.store.select(selectUser);


  ngOnInit() {
    // this.loggedUser$.subscribe((user) => {
    //   console.log('useer:', user);
      
    // });
  
  }

  // Define the event handler function
  onInput(event: Event) {
    // console.log(this.currentUrl);
    console.log((event.target as HTMLInputElement).value);

    // const inputValue = (event.target as HTMLInputElement).value;

    const inputValue = this.searchControl.value;

    //search logic comes here

    if(!(this.currentUrl.includes("products"))){
      this.router.navigate(['/products']);
    }
    this.searchService.setSearchInput(inputValue);
  }


  openAuthModal(){
    this.loginModalService.openModal();
  }

  clearInput(){
    this.searchControl.setValue('');

     // Trigger the search again with an empty string to get full results
     this.onInput({ target: { value: '' } } as unknown as Event);
  }

}
