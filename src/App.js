import React, { useState, useEffect } from 'react';
import './App.css';
import ProductList from "./components/product-list";
import Cart from "./components/cart";
import 'h8k-components';

function configProducts(products) {
  // TODO? can we store these values in the data?
  products.map((product, index) => {
      product.id = index + 1;
      product.image = `/images/items/${product.name.toLocaleLowerCase()}.png`;
      product.cartQuantity = 0;
      return product;
  });
  return products;
}

function App () {
  const title = "HackerShop";
  const [products, setProducts] = useState(() => configProducts(PRODUCTS));
  const [cartItems, setCartItems] = useState([]);
  const [cartSubtotal, setCartSubtotal] = useState(0);
  const [cartTotalPrice, setCartTotalPrice] = useState(0);
  const [cartDiscount, setCartDiscount] = useState(0);
  const [cartCoupon, setCartCoupon] = useState('0');

  useEffect(() => {
    document.title = title;
  });

  useEffect(() => {
    if (cartItems.length > 0) {
      const reducer = (accumulator, currentValue) => accumulator + currentValue;
      const prices = cartItems.map(item => item.price * item.cartQuantity);
      setCartSubtotal(prices.reduce(reducer));
    }
  },
    [cartItems]
  );

  useEffect(() => {
    setCartDiscount((cartCoupon / 100) * cartSubtotal);
  },
    [cartCoupon, cartSubtotal]
  );

  useEffect(() => {
    setCartTotalPrice(cartSubtotal - cartDiscount)
  },
    [cartSubtotal, cartCoupon, cartTotalPrice, cartDiscount]
  );

  const couponHandler = (discount) => {
    setCartCoupon(discount);
    setCartDiscount((discount / 100) * cartSubtotal);
  };

  return (
      <div>
          <h8k-navbar header={title}></h8k-navbar>
          <div className="layout-row shop-component">
              <ProductList
                products={products}
                cartItems={cartItems}
                setCartItems={setCartItems}
                cartSubtotal={cartSubtotal}
                setCartSubtotal={setCartSubtotal}/>
              <Cart
                cartItems={cartItems}
                cartSubtotal={cartSubtotal}
                cartTotalPrice={cartTotalPrice}
                cartDiscount={cartDiscount}
                cartCoupon={cartCoupon}
                couponHandler={couponHandler}/>
          </div>
      </div>
  );
}

export const PRODUCTS = [
    {
        heading: "Cap - $10",
        name: "Cap",
        price: 10
    },
    {
        heading: "Hand Bag - $30",
        name: "HandBag",
        price: 30
    },
    {
        heading: "Shirt - $30",
        name: "Shirt",
        price: 30
    },
    {
        heading: "Shoes - $50",
        name: "Shoe",
        price: 50
    },
    {
        heading: "Pant - $40",
        name: "Pant",
        price: 40
    },
    {
        heading: "Slipper - $20",
        name: "Slipper",
        price: 20
    }
];
export default App;
