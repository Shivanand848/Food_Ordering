import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Cart = () => {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const carts = JSON.parse(localStorage.getItem('cart')) || [];
    const fixedCart = carts.map(item => ({
      ...item,
      quantity: Number(item.quantity) > 0 ? Number(item.quantity) : 1
    }));
    setCart(fixedCart);
  }, []);

  const updateCart = (updatedCart) => {
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const handleRemoveItem = (index) => {
    const updatedCart = cart.filter((_, i) => i !== index);
    updateCart(updatedCart);
    toast.error('Item removed from cart');
  };

  const handleQuantityChange = (index, delta) => {
    const updatedCart = [...cart];
    const item = updatedCart[index];
    item.quantity += delta;

    if (item.quantity <= 0) {
      handleRemoveItem(index);
    } else {
      updateCart(updatedCart);
      toast.info('Quantity updated');
    }
  };

  const handleProceed = () => {
    toast.success('Proceeding to checkout...');
    navigate('/checkout');
  };

  const grandTotal = cart.reduce((total, item) => total + Number(item.quantity) * 299, 0);

  return (
    <>
      <Navbar />
      <div className="container py-5">
        {cart.length > 0 ? (
          <div className="shadow-lg p-5 rounded-5 bg-white">
            <h2 className="text-center fw-bold text-warning mb-4">🛒 Your Cart</h2>

            <div className="row gy-4">
              {cart.map((item, index) => (
                <div
                  key={index}
                  className="col-12 d-flex flex-column flex-md-row align-items-center justify-content-between border rounded-4 p-3 bg-light shadow-sm"
                  style={{ transition: '0.3s ease', background: '#fafafa' }}
                >
                  <div className="d-flex align-items-center gap-3">
                    <img
                      src={item.strMealThumb}
                      alt={item.strMeal}
                      className="rounded-4 shadow-sm"
                      style={{
                        width: '110px',
                        height: '90px',
                        objectFit: 'cover',
                        border: '2px solid #ffc107',
                      }}
                    />
                    <div>
                      <h5 className="fw-bold mb-1 text-dark">{item.strMeal}</h5>
                      <p className="mb-1 text-muted">₹299 × {item.quantity}</p>
                      <h6 className="fw-semibold text-success">
                        Total: ₹{Number(item.quantity) * 299}
                      </h6>
                    </div>
                  </div>

                  <div className="d-flex align-items-center gap-2 mt-3 mt-md-0">
                    <button
                      className="btn btn-outline-warning fw-bold"
                      onClick={() => handleQuantityChange(index, -1)}
                    >−</button>

                    <span className="px-3 fw-semibold fs-5">{item.quantity}</span>

                    <button
                      className="btn btn-outline-warning fw-bold"
                      onClick={() => handleQuantityChange(index, 1)}
                    >+</button>

                    <button
                      className="btn btn-outline-danger ms-3"
                      onClick={() => handleRemoveItem(index)}
                    >
                      <i className="bi bi-trash3-fill"></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="d-flex justify-content-between align-items-center mt-5 flex-wrap gap-3 border-top pt-4">
              <h4 className="m-0 text-dark">
                <span className="text-muted">Grand Total:</span>{' '}
                <span className="text-success">₹{grandTotal}</span>
              </h4>
              <button className="btn btn-success btn-lg px-4 shadow" onClick={handleProceed}>
                Proceed to Checkout
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center mt-5 p-5 bg-light rounded-4 shadow-lg">
            <h3 className="text-secondary">Your Cart is Empty</h3>
            <i className="bi bi-cart-x-fill text-danger" style={{ fontSize: '4rem' }}></i>
            <div className="mt-4">
              <button className="btn btn-warning px-4 py-2 fs-5" onClick={() => navigate('/')}>
                Browse Meals
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
