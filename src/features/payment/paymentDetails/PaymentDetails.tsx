import React, { ChangeEvent, useMemo, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import styles from "./PaymentDetails.module.css";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { fetchPayment, selectPaymentStatus, selectPaymentSuccess } from "../paymentSlice";
import { ApiStatus } from "../../../enums/ApiStatus";

const PaymentDetails: React.FC = () => {
    const [cardNumber, setCardNumber] = useState("");
    const [paymentFailed, setPaymentFailed] = useState(false);

    const state = useAppSelector(state => state);
    const paymentSuccessful = selectPaymentSuccess(state);
    const paymentStatus = selectPaymentStatus(state);

    const dispatch = useAppDispatch();

    useMemo(() => {
        if (!paymentSuccessful && paymentStatus === ApiStatus.SUCCEEDED) setPaymentFailed(true);
    }, [paymentSuccessful, paymentStatus]);
    
    const onClickHandler = () => dispatch(fetchPayment(cardNumber));
    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => setCardNumber(event.target.value);
    
    return (
        <Box className={styles["payment-form"]} component="form" noValidate autoComplete="off">
            <TextField
            sx={{ width: "20rem" }}
            variant="outlined"
            label="Required"
            defaultValue="Card Number" 
            onChange={onChangeHandler}
            error={cardNumber.length !== 16}
            required
        />
            <Button
            color={!paymentFailed ? "primary" : "error"}
            disabled={cardNumber.length < 16}
            variant="outlined" sx={{ width: "8.75rem" }}
            onClick={onClickHandler}>
                Pay
            </Button>
        </Box>
    );
};

export default PaymentDetails;
