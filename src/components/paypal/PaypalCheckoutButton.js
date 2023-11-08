import {PayPalButtons} from "@paypal/react-paypal-js";
import {useState} from "react";
import * as CartService from "../../service/cart/CartService";
import {useNavigate} from "react-router-dom";


const PaypalCheckoutButton = (props) => {
    const {bill} = props;

    const navigate = useNavigate();
    const [paidFor, setPaidFor] = useState(false);
    const [error, setError] = useState(null);

    const handleApprove = async (orderId) => {
        // Call backend function to fulfill order
        const billFinal = {
            ...bill,
            paymentCode: orderId
        }
        const res = await CartService.getBillTotal(billFinal);
        console.log(res)
        if (res.status === 200) {
            navigate('/bill', { state: res.data });
        } else {
            setPaidFor(true);
        }

        // if response is success
        // Refresh user's account or subscription status

        // if response is error
        // alert("Your payment was processed successfully. However, we are unable to fulfill your purchase. Please contact us at support@designcode.io for assistance.");
    };

    if (paidFor) {
        // Display success message, modal or redirect user to success page
        alert("Thank you for your purchase!");
    }

    if (error) {
        // Display error message, modal or redirect user to error page
        alert(error);
    }

    return (bill &&
        <PayPalButtons
            style={{
                color: "silver",
                layout: "horizontal",
                height: 48,
                tagline: false,
                shape: "pill"
            }}
            onClick={(data, actions) => {
                // Validate on button click, client or server side
                const hasAlreadyBoughtCourse = false;

                if (hasAlreadyBoughtCourse) {
                    setError(
                        "You already bought this course. Go to your account to view your list of courses."
                    );

                    return actions.reject();
                } else {
                    return actions.resolve();
                }
            }}
            createOrder={(data, actions) => {
                return actions.order.create({
                    purchase_units: [
                        {
                            amount: {
                                value: (bill.totalMoney / 23000).toFixed(2),
                            },
                        }
                    ]
                });
            }}
            onApprove={async (data, actions) => {
                const order = await actions.order.capture();
                console.log("order", order);

                handleApprove(data.orderID);
            }}
            onError={(err) => {
                setError(err);
                console.error("PayPal Checkout onError", err);
            }}
            onCancel={() => {
                // Display cancel message, modal or redirect user to cancel page or back to cart
            }}
        />
    );
};

export default PaypalCheckoutButton;