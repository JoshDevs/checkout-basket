import ShoppingCart from "@mui/icons-material/ShoppingCart";
import Button from "@mui/material/Button";
import styles from "./BasketContainer.module.css";
import React from "react";
import { useAppSelector } from "../../../app/hooks";

const BasketButton: React.FC<{setOpenCheckoutModal: (flag: boolean) => void}> = ({setOpenCheckoutModal}) => {
    const basketSum = useAppSelector(state => state.basket.sum);

    const onClickHandler = () => setOpenCheckoutModal(true);
    return (
        <div className={styles["basket-button-container"]}>
          <Button sx={{background: "white"}} className="shopping-cart-button" onClick={basketSum > 0 ? onClickHandler : undefined} size="large">
              <ShoppingCart fontSize="large"/>
              {basketSum > 0 ? <div className="basket-sum">{basketSum}</div> : <></>}
          </Button>
        </div>
    );
};

export default BasketButton;