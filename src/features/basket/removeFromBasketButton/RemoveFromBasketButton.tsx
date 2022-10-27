import React from "react";
import Button from "@mui/material/Button";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { RemoveShoppingCart } from "@mui/icons-material";
import { removeFromBasket, selectBasketItemBySku } from "../basketButton/basketSlice";
import { Product } from "../../../interfaces/Product";

const RemoveFromBasketButton: React.FC<{product: Product, counterValue: number}> = ({counterValue, product}) => {
    const dispatch = useAppDispatch();
    const state = useAppSelector(state => state);
    const basketItem = selectBasketItemBySku(state, product.sku);
    return (
        <Button disabled={!!basketItem} onClick={() => {
            dispatch(removeFromBasket({sku: product.sku, quantity: counterValue}))
        }}>
            <RemoveShoppingCart />
        </Button>
    );
}

export default RemoveFromBasketButton;