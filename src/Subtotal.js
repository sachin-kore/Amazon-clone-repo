import React from "react";
import "./Subtotal.css";
import CurrencyFormat from "react-currency-format";
import { useStateValue } from "./StateProvider";
import { getBasketTotal } from "./reducer";
// import { useHistory } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Subtotal() {
    const navigate = useNavigate();
    const [{ basket }, dispatch] = useStateValue();

    const handleCheckout = () => {
        navigate('/payment');
    }

    return (
        <div className="subtotal">
            <CurrencyFormat
                renderText={(value) => (
                    <>
                        <p>
                            {/* Part of the homework */}
                            Subtotal ({basket.length} items): <strong>{value ? value : 0}</strong>
                        </p>
                        <small className="subtotal__gift">
                            <input type="checkbox" /> This order contains a gift
                        </small>
                    </>
                )}
                decimalScale={2}
                value={getBasketTotal(basket)} // Part of the homework
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$"}
            />

            <button onClick={handleCheckout}>Proceed to Checkout</button>
        </div>
    );
}

export default Subtotal;