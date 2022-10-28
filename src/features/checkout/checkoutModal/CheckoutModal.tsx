import React, { useMemo, useState } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useAppSelector } from "../../../app/hooks";
import { selectBasketItems, selectBasketSum } from "../../basket/basketButton/basketSlice";
import CheckoutItem from "../checkoutItem/CheckoutItem";
import CheckoutPrice from "../checkoutPrice/CheckoutPrice";
import styles from "./CheckoutModal.module.css";
import Link from "@mui/material/Link";
import { selectPaymentSuccess } from "../../payment/paymentSlice";
import PaymentDetails from "../../payment/paymentDetails/PaymentDetails";
import Success from "../../payment/success/Success";


const CheckoutModal: React.FC<{openCheckoutModal: boolean, setOpenCheckoutModal: (flag: boolean) => void}> = ({openCheckoutModal, setOpenCheckoutModal}) => {
    const onClickHandler = () => setOpenCheckoutModal(false);
    const [closeSuccess, setCloseSuccess] = useState(true);

    const state = useAppSelector(state => state);
    const basketItems = selectBasketItems(state);

    const sum = selectBasketSum(state);

    const paymentSuccessful = selectPaymentSuccess(state);

    useMemo(() => {
        if (paymentSuccessful) {
            setCloseSuccess(false);
        }
    }, [paymentSuccessful]);
    
    return (
        <>
        <Modal className="checkout-modal" open={openCheckoutModal && sum >= 0}>
            <Box sx={{
               position: 'absolute' as 'absolute',
               top: '50%',
               left: '50%',
               transform: 'translate(-50%, -50%)',
               width: 550,
               height: "auto",
               bgcolor: 'background.paper',
               border: '0.125rem solid #000',
               boxShadow: 24,
               p: 4,
               borderRadius: "1.563rem"
            }}>
                <div className={styles["checkout-modal-header"]}>
                    <Typography className="checkout-modal-title" variant="h5" component="h1">
                        Checkout
                    </Typography>
                <Link href="#" onClick={onClickHandler} fontSize={"small"} color="inherit">Continue Shopping...</Link>
                </div>
                {basketItems.map(item => <CheckoutItem basketItem={item} key={item.sku}/>)}
                <CheckoutPrice basketItems={basketItems}/>
                {!closeSuccess ? 
                <Success setCloseSuccess={setCloseSuccess} setOpenCheckoutModal={setOpenCheckoutModal} /> : <PaymentDetails />}
            </Box>
        </Modal>
        </>
    );
};

export default CheckoutModal;