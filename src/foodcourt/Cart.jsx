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
    toast.error('Item removed');
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
          <div className="cart-wrapper shadow-lg p-4 bg-white rounded-4">
            <h2 className="text-center mb-4">🛒 Your Cart</h2>
            <div className="row gy-4">
              {cart.map((item, index) => (
                <div
                  key={index}
                  className="col-12 d-flex flex-column flex-md-row align-items-center justify-content-between cart-item p-3 rounded-3 shadow-sm bg-light"
                >
                  <div className="d-flex align-items-center gap-3">
                    <img
                      src={item.strMealThumb}
                      alt={item.strMeal}
                      className="rounded"
                      style={{ width: '100px', height: '80px', objectFit: 'cover' }}
                      onError={(e) => (e.target.src = 'https://via.placeholder.com/100')}
                    />
                    <div>
                      <h5 className="mb-1">{item.strMeal}</h5>
                      <p className="mb-1 text-muted">₹299 × {(Number(item.quantity))}</p>
                      <h6>Total: ₹{(Number(item.quantity) || 1) * 299
}</h6>
                    </div>
                  </div>

                  <div className="d-flex align-items-center gap-2 mt-3 mt-md-0">
                    <button
                      className="btn btn-outline-secondary"
                      onClick={() => handleQuantityChange(index, -1)}
                    >−</button>
                    <span>{Number(item.quantity)}</span>
                    <button
                      className="btn btn-outline-secondary"
                      onClick={() => handleQuantityChange(index, 1)}
                    >+</button>

                    <button
                      className="btn btn-outline-danger ms-3"
                      onClick={() => handleRemoveItem(index)}
                    >
                      <i className="bi bi-trash-fill"></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="d-flex justify-content-between align-items-center mt-4 flex-wrap gap-3">
              <h4 className="m-0">Grand Total: ₹{grandTotal}</h4>
              <button className="btn btn-success px-4" onClick={handleProceed}>
                Proceed to Checkout
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center mt-5 p-4 shadow rounded-4 bg-light">
            <h3>Your Cart is Empty</h3>
            <i className="bi bi-cart-x text-danger" style={{ fontSize: '4rem' }}></i>
            <div className="mt-4">
              <button className="btn btn-warning px-4" onClick={() => navigate('/')}>
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
