import { Injectable, ComponentFactoryResolver, ApplicationRef, Injector, EmbeddedViewRef } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { LoginModalComponent } from '../../components/auth-modal/login-modal/login-modal.component';

@Injectable({
  providedIn: 'root'
})
export class LoginModalService {

  private modalComponentRef: any;
  private baseUrl = environment.apiUrlForEshopApp; 

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector,
    private http: HttpClient
  ) { }

  logIn(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/admin/login`, {
      email, password
    });
  }

  openModal() {
    // Create component reference from the component
    const factory = this.componentFactoryResolver.resolveComponentFactory(LoginModalComponent);
    this.modalComponentRef = factory.create(this.injector);

    // Attach component to the appRef so that it's inside the ng component tree
    this.appRef.attachView(this.modalComponentRef.hostView);

    // Get DOM element from component
    const domElem = (this.modalComponentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;

    // Append DOM element to the body
    document.body.appendChild(domElem);
  }


  closeModal() {
    if (this.modalComponentRef) {
      this.appRef.detachView(this.modalComponentRef.hostView);
      this.modalComponentRef.destroy();
    }
  }
}
