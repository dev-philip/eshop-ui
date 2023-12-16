export interface Product {
    id: number, //-
    productLink?: string, 
    addToCartImg?: string //
    defaultImg: string, //
    hoverImg: string, //
    productName: string, //-
    productPrice: number, //-
    currency: string,// -
    // isDiscount: boolean,//
    Discount: boolean,
    discountPrice: number,// -
    isLabel: boolean,//
    label: string,// -
    labelClass: string;//
    category: string; // -

    size?: string; // -
    product_description?: string; // -
    product_count?: string // -
  
  }

  export interface Item {
    id: number;
    name: string;
    price: number;
   
  }
