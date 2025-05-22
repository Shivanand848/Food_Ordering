import React, { useEffect, useState } from 'react'
import SimpleSlider from './SimpleSlider'
import Navbar from './Navbar'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Home = () => {
  const [apiData, setapiData] = useState([])
  const [filter, setFilter] = useState('indian')
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const fetchMeals = async () => {
    setLoading(true)
    const apiURL = search
      ? `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`
      : `https://www.themealdb.com/api/json/v1/1/filter.php?a=${filter}`

    try {
      const response = await fetch(apiURL)
      const data = await response.json()
      setapiData(data.meals || [])
    } catch (error) {
      console.error('API error:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMeals()
  }, [filter, search])

  const addToCart = (meal) => {
    const existingCart = JSON.parse(localStorage.getItem('cart')) || []
    const exists = existingCart.find(item => item.idMeal === meal.idMeal)

    if (exists) {
      toast.info('Item already in cart')
    } else {
      const updatedCart = [...existingCart, meal]
      localStorage.setItem('cart', JSON.stringify(updatedCart))
      toast.success('Item added to cart')
    }
  }

  const filters = ['indian', 'canadian', 'british', 'thai', 'chinese', 'russian']

  return (
    <>
      <Navbar setsearch={setSearch} />
      <div className="container-fluid p-0" style={{ overflowX: 'hidden' }}>
        <SimpleSlider />

        
        <div className="filter-bar d-flex justify-content-center flex-wrap gap-3 py-3 mt-4 ">
          {filters.map((f) => (
            <button
              key={f}
              className={`btn btn-${filter === f ? 'warning' : 'outline-warning'} text-capitalize`}
              onClick={() => setFilter(f)}
            >
              <i className="bi bi-filter"></i> {f}
            </button>
          ))}
        </div>

        <div className="container mt-4">
          {loading ? (
            <div className="text-center">
              <div className="spinner-border text-warning" role="status" />
              <p className="mt-2">Loading meals...</p>
            </div>
          ) : apiData.length === 0 ? (
            <p className="text-center fs-5">No meals found.</p>
          ) : (
            <div className="row g-4 justify-content-center">
              {apiData.map(meal => (
                <div
                  key={meal.idMeal}
                  className="col-6 col-sm-6 col-md-4 col-lg-3"
                >
                  <div className="card meal-card h-100 shadow-sm border-0">
                    <img
                      src={meal.strMealThumb}
                      className="card-img-top meal-img"
                      alt={meal.strMeal}
                      style={{ objectFit: 'cover', height: '200px' }}
                    />
                    <div className="card-body text-center">
                      <h5 className="card-title text-truncate">{meal.strMeal}</h5>
                      <p className="price">₹299</p>
                    </div>
                    <div className="card-footer bg-transparent border-0">
                      <button
                        className="btn btn-warning w-100"
                        onClick={() => addToCart(meal)}
                      >
                        <i className="bi bi-cart-plus"></i> Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Home
