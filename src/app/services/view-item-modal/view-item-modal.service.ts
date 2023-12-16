import { Injectable, ComponentFactoryResolver, ApplicationRef, Injector, EmbeddedViewRef } from '@angular/core';
import { ViewItemModalComponent } from '../../components/view-item-modal/view-item-modal.component';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ViewItemModalService {

  private modalComponentRef: any;


  private productSource = new BehaviorSubject<any>("");
  currentProduct = this.productSource.asObservable();

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector
  ) { }

  setProduct(product: any) {
    this.productSource.next(product);
  }



  openModal() {
    // Create component reference from the component
    const factory = this.componentFactoryResolver.resolveComponentFactory(ViewItemModalComponent);
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
