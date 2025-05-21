import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Cart = () => {
  const [cart, setCart] = useState([]);
  useEffect(() => {
    const carts = JSON.parse(localStorage.getItem('cart'));
    setCart(carts || []);
  }, []);


  const handleProceed = () => {
  };

  const navigate=useNavigate()

  const handleRemoveItem = (index) => {
    const updatedCart = cart.filter((_, i) => i !== index);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    navigate('/')
    toast.error('Food Removed')
  };

  return (
    <div>
      <Navbar />
      <div>
        {
          cart.length > 0 ?
            (
              <>
                <div className='shadow-lg p-4 container col-lg-8 mt-5'>
                  <h1>Your Cart</h1>
                  {
                    cart.map((cartItem, index) => (
                      <div key={index} className='d-flex flex-row justify-content-center align-items-center shadow-lg p-4'>
                        <img src={cartItem.strMealThumb} style={{ width: "150px" }} alt="" />
                        <div className='d-flex flex-grow-1 justify-content-center gap-5'>
                          <h4>{cartItem.strMeal}</h4>
                          <h4>&#8377; 299</h4>
                        </div>
                        <div>
                          <button className='btn btn-danger' onClick={() => handleRemoveItem(index)}>
                            <span className='bi bi-trash'></span>
                          </button>
                        </div>
                      </div>
                    ))
                  }
                  <div>
                    <button className='btn btn-primary mt-4' onClick={handleProceed}>Proceed to CheckOut</button>
                  </div>
                </div>
              </>
            ) :
            (
              <>
                <div className='text-center mt-5 shadow-lg col-4 container p-3 rounded-3'>
                  <h1>Your Cart is Empty</h1>
                  <span className='bi bi-cart-x-fill text-danger fs-1'></span>
                </div>
              </>
            )
        }
      </div>
    </div>
  );
};

export default Cart;
