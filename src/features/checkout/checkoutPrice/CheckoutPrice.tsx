import React from "react";
import { useAppSelector } from "../../../app/hooks";
import { BasketItem } from "../../../interfaces/BasketItem";
import { selectProductBySku } from "../../product/productList/productSlice";
import styles from "./CheckoutPrice.module.css";

const CheckoutPrice: React.FC<{basketItems: BasketItem[]}> = ({basketItems}) => {
    const state = useAppSelector(state => state);
    const totalPrice = basketItems.reduce((previous, current) => previous += (current.quantity * (selectProductBySku(state, current.sku)?.price || 0)) , 0);
    return (
        <div className={styles["checkout-price"]}>Total: £{totalPrice.toFixed(2)}</div>
    );
};

export default CheckoutPrice;
