import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useAppDispatch } from "../../../app/hooks";
import { resetBasket } from "../../basket/basketButton/basketSlice";
import styles from "./Success.module.css";
import { resetPayment } from "../paymentSlice";

const Success: React.FC<{setCloseSuccess: (value: boolean) => void, setOpenCheckoutModal: (value: boolean) => void}> = ({setCloseSuccess, setOpenCheckoutModal}) => {
    const dispatch = useAppDispatch();

    const onClickHandler = () => {
        dispatch(resetBasket());
        dispatch(resetPayment());
        setCloseSuccess(true);
        setOpenCheckoutModal(false);
    };

    return (
      <Box className={styles["payment-successful"]}>
            <div>Payment Succeeded</div>
            <Button 
            onClick={onClickHandler}
            variant="outlined"
            >
                Ok
            </Button>
        </Box>
    );
};

export default Success;
