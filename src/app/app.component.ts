import { Component, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'eshop-ui';

   isThereNotification: boolean = false;
  notificationMessage: string = "";

  constructor(private socket: Socket, private router: Router) {}

  ngOnInit() {
    

    this.socket.on('category', (data: any) => {
      this.isThereNotification = true;
      this.notificationMessage = data.message;
      console.log('New Category Event Received app base:', data);
    });

    this.socket.on('Product', (data: any) => {
      this.isThereNotification = true;
      this.notificationMessage = data.message;
      console.log('New Product Event Received app base:', data);
    });

  }

  reloadPage(){
    const currentUrl = this.router.url;
    window.location.reload();
  }
}
