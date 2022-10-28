import React, { useState } from "react";
import styles from "./CheckoutItem.module.css";
import Counter from "../../counter/Counter";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { BasketItem } from "../../../interfaces/BasketItem";
import { selectProductBySku } from "../../product/productList/productSlice";
import Button from "@mui/material/Button";
import { removeAllFromBasket, updateBasket } from "../../basket/basketButton/basketSlice";

const CheckoutItem: React.FC<{basketItem: BasketItem}> = ({basketItem}) => {
    const state = useAppSelector(state => state);
    const product = selectProductBySku(state, basketItem.sku)
    const dispatch = useAppDispatch();
    const [checkoutCounter, setCheckoutCounter] = useState(basketItem.quantity);

    const onRemoveAllClickHandler = () => dispatch(removeAllFromBasket({sku: basketItem.sku}));
    const onUpdateClickHandler = () => dispatch(updateBasket({sku: basketItem.sku, quantity: checkoutCounter}));

    return (
        <>
        {product && <div className={styles["checkout-item-container"]} key={basketItem.sku}>
            <div className="checkout-item-product-name">{product.name}</div>
            <div className="checkout-item-product-price">£{product.price}</div>
            <Counter basketLimit={product.basketLimit} counterValue={checkoutCounter} setCounterValue={setCheckoutCounter} />
            <Button variant="outlined" onClick={onRemoveAllClickHandler}>
                Remove All
            </Button>
            <Button variant="outlined"
            disabled={basketItem.quantity === checkoutCounter}
            onClick={onUpdateClickHandler}>
                Update
            </Button>
        </div>}
        </>
    )
}

export default CheckoutItem;