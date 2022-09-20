import { FormEvent, useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../hooks/input/redux/hooks";
import { resetCart } from "../productSlice";
import axios from "axios";

function PaymentComponent() {
  const { cart } = useAppSelector((state) => state.product);

  const dispatch = useAppDispatch();

  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState("");

  const totalQty = cart.reduce((acc, item) => acc + item.quantity, 0);

  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    if (totalQty === 0) return;

    if (paymentStatus !== "succeeded") return;
    dispatch(resetCart());
  });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (totalQty === 0) return;
    if (!stripe || !elements) return;

    const cardEl = elements.getElement(CardElement);

    setIsProcessing(true);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_API}/stripe`,
        { cart }
      );

      const { client_secret: clientSecret } = response.data;

      const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardEl!,
        },
      });

      if (!paymentIntent) {
        setPaymentStatus("payment failed");
      } else {
        setPaymentStatus(paymentIntent.status);
      }

    } catch (error) {
      console.error(error);
      setPaymentStatus("payment failed");
      setIsProcessing(false);
    }
  };

  return (
    <div style={{ fontSize: "20px" }}>
      <form onSubmit={handleSubmit} id="payment-form">
        <label htmlFor="card-element">Place Order</label>
        <CardElement id="card-element" />
        {!isProcessing && (
          <button
            style={{
              marginTop: "16px",
              height: "31px",
              backgroundColor: "#f0c14b",
              color: "black",
              display: "flex",
              fontWeight: 600,
              fontSize: "20px",
              padding: "24px",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
              width: "100%",
            }}
          >
            Pay
          </button>
        )}
        {isProcessing && <div>Processing...</div>}
        {!isProcessing && paymentStatus && <div>Status: {paymentStatus}</div>}
      </form>
    </div>
  );
}

const PaymentGateway = () => {
  const stripePromise = loadStripe(
    "pk_test_51LkAv3HyFcviQZ0ztVkHI2AFsroxJxwQ5mRqSCpEGVEZlhuu8mm6qu1iK74VTgfWQvMRvVqN1ouj6oUp4NWWXiw800nZkwvyP4"
  );

  return (
    <Elements stripe={stripePromise}>
      <PaymentComponent />
    </Elements>
  );
};

export default PaymentGateway;
