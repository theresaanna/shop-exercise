import React from "react";
import "./index.css";

export default function Cart({cartItems,
                              cartSubtotal,
                              cartTotalPrice,
                              cartDiscount,
                              cartCoupon,
                              couponHandler
                            }){

    return (
        <div className="card outlined my-16 mr-25 flex-30">
            <section className="layout-row align-items-center justify-content-center px-16">
                <h4>Your Cart</h4>
            </section>
            <div className="divider"/>
            <table>
                <thead>
                <tr>
                    <th></th>
                    <th>Item</th>
                    <th className="numeric">Quantity</th>
                    <th className="numeric">Price</th>
                </tr>
                </thead>
                <tbody>
                {
                    cartItems.map((cartItem, idx) => {
                        return (
                            <tr data-testid={'cart-item-' + idx}
                                key={idx + 1}
                                className="slide-up-fade-in">
                                <td>{idx + 1}.</td>
                                <td className="name" data-testid="cart-item-name">{cartItem.name}</td>
                                <td className="numeric quantity" data-testid="cart-item-quantity">
                                    {cartItem.cartQuantity}
                                </td>
                                <td className="numeric quantity" data-testid="cart-item-price">
                                    {cartItem.price}
                                </td>
                            </tr>
                        )
                    })
                }

                </tbody>
            </table>
            <div className="layout-row justify-content-between align-items-center px-8 mx-12">
                <h5>Select Coupon</h5>
                <select data-testid="cart-coupon"
                        className="coupon-select"
                        onChange={(e) => couponHandler(e?.target?.value || 0)}>
                    <option value="0">None</option>
                    <option value="10">OFF10</option>
                    <option value="20">OFF20</option>
                </select>
            </div>
            <ul className="bordered inset ma-0 px-8 mt-30">
                <li className="layout-row justify-content-between py-12 caption font-weight-light">
                    <span>Subtotal</span>
                    <span data-testid="cart-subtotal">${cartSubtotal}</span>
                </li>
                <li className="layout-row justify-content-between py-12 caption font-weight-light">
                    <span>Discount (-)</span>
                    <span className="discount" data-testid="cart-discount">${cartDiscount}</span>
                </li>
                <li className="layout-row justify-content-between py-12 font-weight-bold">
                    <span>Total</span>
                    <span data-testid="cart-total">${cartTotalPrice}</span>
                </li>
            </ul>
        </div>

    );
}
