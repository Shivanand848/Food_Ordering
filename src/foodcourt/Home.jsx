import React, { useEffect, useState } from 'react'
import SimpleSlider from './SimpleSlider'
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Home = () => {
  const [apiData, setapiData] = useState([]);
  const [filtter, setfiltter] = useState('indian')
  const [search, setsearch] = useState()
  const [cart, setCart] = useState([])
  const navigate = useNavigate()

  const apifetch = async () => {
    const Api = search ? (`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`) : (`https://www.themealdb.com/api/json/v1/1/filter.php?a=${filtter}`);
    const response = await fetch(Api)
    const data = await response.json();
    setapiData(data.meals || [])
  }

  useEffect(() => {
    apifetch()
  }, [filtter, search])

  const addtocart = (fooditem) => {
    const alreadyfood = JSON.parse(localStorage.getItem('cart'))||[]
    const foods = [...alreadyfood, fooditem]
    setCart(foods)
    localStorage.setItem('cart', JSON.stringify(foods))
    toast.success('Food Added')
    navigate('/cart')
  }
  return (
    <>
      <Navbar setsearch={setsearch} />
      <div style={{ overflow: "hidden" }}>
        <SimpleSlider />

        <div className='d-flex justify-content-center gap-5 mt-5 flex-wrap ' >
          <button className='btn btn-outline-warning' onClick={() => setfiltter('indian')}><span className='bi bi-filter'></span> Indian</button>
          <button className='btn btn-outline-warning' onClick={() => setfiltter('canadian')}><span className='bi bi-filter'></span> Canadian</button>
          <button className='btn btn-outline-warning' onClick={() => setfiltter('british')} ><span className='bi bi-filter'></span> British</button>
          <button className='btn btn-outline-warning' onClick={() => setfiltter('thai')}><span className='bi bi-filter'></span> Thai</button>
          <button className='btn btn-outline-warning' onClick={() => setfiltter('chinese')}><span className='bi bi-filter'></span> Chinese</button>
          <button className='btn btn-outline-warning' onClick={() => setfiltter('russian')}><span className='bi bi-filter'></span> Russian</button>
        </div>

        <div className='d-flex justify-content-center flex-wrap gap-4 mt-5'>
          {
            apiData.map((fooditem, index) => (
              <div key={fooditem.idMeal} className='card col-lg-3 col-md-5 col-sm-4 col-10 shadow-lg rounded-5 m-4 bg-transparent'>
                <img src={fooditem.strMealThumb} className=' rounded- ' style={{ borderRadius: "50%" }} alt="" /> <div />
                <div className='car-body p-3 d-flex flex-column align-items-center'>
                  <h4>{fooditem.strMeal}</h4>
                  <h5 style={{ fontFamily: "initial" }}>&#8377; 299</h5>
                </div>
                <div className='card-footer'>
                  <button className='btn btn-warning w-100' onClick={() => addtocart(fooditem)}><span className='bi bi-cart-plus' ></span> Add To Cart</button>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </>
  )
}

export default Home