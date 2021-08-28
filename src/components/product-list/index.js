import React from "react";
import "./index.css";

export default function ProductList({products,
                                    cartItems,
                                    setCartItems,
                                    cartSubtotal,
                                    setCartSubtotal}) {
    // TODO? should this be broken out into two Components:
    // ProductList and a Product component?
    return (
        <div className="layout-row wrap justify-content-center flex-70 app-product-list">
            {products.map((product, i) => {
                return (
                    <section className="w-30"
                             data-testid={'product-item-' + i}
                             key={product.id}>
                        <div className="card ma-16">
                            <img alt="Your Cart" src={product.image}
                                 className="d-inline-block align-top product-image"/>
                            <div className="card-text pa-4">
                                <h5 className="ma-0 text-center">{product.name}</h5>
                                <p className="ma-0 mt-8 text-center">${product.price}</p>
                            </div>
                            <div className="card-actions justify-content-center pa-4">
                                <button className="x-small outlined"
                                        data-testid="btn-item-add"
                                        onClick={() => {
                                            product.cartQuantity = product.cartQuantity + 1;
                                            if (!cartItems.includes(product)) {
                                              setCartItems([...cartItems, product])
                                            }
                                            else {
                                              setCartItems([...cartItems])
                                            }
                                        }}>
                                    Add To Cart
                                </button>

                                <button className="x-small danger"
                                        data-testid="btn-item-remove"
                                        onClick={() => {
                                          setCartItems(cartItems.filter(item => item.id !== product.id))
                                          setCartSubtotal(cartSubtotal - product.price * product.cartQuantity);
                                          product.cartQuantity = 0;
                                        }}>
                                    Remove
                                </button>
                            </div>
                        </div>
                    </section>
                )
            })}
        </div>

    );
}
