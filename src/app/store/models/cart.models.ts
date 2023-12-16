export interface CartItem {
    productId: number;
    productName: string;
    productPrice: number;
    quantity: number;
    cartImg?: string;
    currency: string;
  }
  
  export interface CartState {
    items: CartItem[];
  }


  export interface  CartItemId{
    productId: number;
  }
  export interface addToCartDataType {
    productId: number;
    productName: string;
    productPrice: number;
    quantity: number;
    cartImg: string;
    currency: string;
  }

 
  