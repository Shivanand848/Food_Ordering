import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'; // Make sure react-toastify is installed and configured

const ProceedToCheckOut = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(savedCart);
  }, []);

  const grandTotal = cart.reduce(
    (total, item) => total + (Number(item.quantity) || 1) * 299,
    0
  );

  const handlePayNow = () => {
    if (cart.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }
    // Here you can add real payment integration logic
    toast.info("Payment processing...");
    // For demo, clear cart and navigate back or show success message after a delay
    setTimeout(() => {
      localStorage.removeItem('cart');
      toast.success("Payment successful! Thank you for your order.");
      navigate('/');
    }, 2000);
  };

  return (
    <div
      className="container d-flex flex-column justify-content-center align-items-center vh-100 bg-light p-4"
      style={{ textAlign: 'center', maxWidth: '600px' }}
    >
      <i
        className="bi bi-check-circle-fill text-success"
        style={{ fontSize: '6rem', marginBottom: '1rem' }}
        aria-hidden="true"
      ></i>
      <h1 className="mb-3">Thank you for your order!</h1>
      <p className="mb-4 fs-5 text-muted">
        Your order has been successfully placed. We will notify you once it ships.
      </p>

      {cart.length > 0 && (
        <div
          className="order-summary w-100 mb-4"
          style={{
            backgroundColor: '#fff',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            padding: '1rem',
            maxHeight: '300px',
            overflowY: 'auto',
          }}
          aria-label="Order summary"
        >
          <h4 className="mb-3 text-start">Order Summary</h4>
          {cart.map((item, idx) => (
            <div
              key={idx}
              className="d-flex align-items-center mb-3"
              style={{ gap: '1rem' }}
            >
              <img
                src={item.strMealThumb}
                alt={item.strMeal}
                style={{
                  width: '60px',
                  height: '50px',
                  objectFit: 'cover',
                  borderRadius: '8px',
                }}
                onError={(e) =>
                  (e.target.src = 'https://via.placeholder.com/60x50?text=No+Image')
                }
              />
              <div className="text-start flex-grow-1">
                <p className="mb-1 fw-semibold" style={{ fontWeight: '600' }}>
                  {item.strMeal}
                </p>
                <small className="text-muted">
                  Qty: {Number(item.quantity) || 1} × ₹299
                </small>
              </div>
              <p className="mb-0 fw-bold">
                ₹{(Number(item.quantity) || 1) * 299}
              </p>
            </div>
          ))}
          <hr />
          <h5 className="text-end fw-bold">Grand Total: ₹{grandTotal}</h5>
        </div>
      )}

      <div className="d-flex gap-3 flex-wrap justify-content-center">
        <button
          className="btn btn-primary btn-lg"
          onClick={handlePayNow}
          aria-label="Pay now"
        >
          Pay Now
        </button>

        <button
          className="btn btn-warning btn-lg"
          onClick={() => navigate('/')}
          aria-label="Back to home"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default ProceedToCheckOut;
