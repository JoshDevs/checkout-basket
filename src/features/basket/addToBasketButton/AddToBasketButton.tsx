import React from "react";
import Button from "@mui/material/Button";
import { AddShoppingCart } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { Product } from "../../../interfaces/Product";
import { addToBasket, selectBasketItemBySku } from "../basketButton/basketSlice";

const AddToBasketButton: React.FC<{counterValue: number, product: Product}> = ({counterValue, product}) => {
    const state = useAppSelector(state => state);
    const selectedBasketItem = selectBasketItemBySku(state, product.sku);
    const dispatch = useAppDispatch();

    const onClickHandler = () => {
      counterValue > 0 && dispatch(addToBasket({quantity: counterValue, sku: product.sku}))
    }

    return (
        <Button
        disabled={selectedBasketItem && selectedBasketItem.quantity >= product.basketLimit}
        className="add-to-basket-button"
        onClick={onClickHandler}>
          <AddShoppingCart fontSize="large" />
        </Button>
    )
}

export default AddToBasketButton;
