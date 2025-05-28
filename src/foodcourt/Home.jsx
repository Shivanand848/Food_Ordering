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


       <footer class="shadow-lg bg-white pt-4 text-dark" style={{marginTop:"10%"}}>
        <div class="container text-md-start text-center">
            <div class="row">
                <div class="col-md-3 col-lg-3 col-xl-3 mb-4 mx-auto ">
                    <h4 class="fw-bold">ECOM</h4>
                    <ul class="list-unstyled">
                        <li><span class="bi bi-geo-alt"></span> 123 Main St, Anytown, USA 12345</li>
                        <li><span class="bi bi-telephone"></span>7408345650</li>
                        <li><span class="bi bi-envelope-at"></span> Email:
                            <a href="abhishek@gmail.com">abhishek@gmail.com</a>
                        </li>
                    </ul>
                </div>

                <div class="mx-auto col-md-2  mb-4">
                    <h4 class="fw-bold">Quick Links</h4>
                    <ul class="list-unstyled">
                        <li class="nav-item"><a href="" class="nav-link fs-5 textdec">Home</a></li>
                        <li class="nav-item"><a href="" class="nav-link fs-5">Services</a></li>
                        <li class="nav-item"><a href="" class="nav-link fs-5">About Us</a></li>
                        <li class="nav-item"><a href="" class="nav-link fs-5">Contact</a></li>
                        <li class="nav-item"><a href="" class="nav-link fs-5">Query</a></li>
                    </ul>
                </div>


                <div class="mx-auto col-md-2  mb-4">
                    <h4 class="fw-bold">Customer Services</h4>
                    <ul class="list-unstyled">
                        <li class="nav-item"><a href="" class="nav-link fs-5 textdec">Return</a></li>
                        <li class="nav-item"><a href="" class="nav-link fs-5">Refund</a></li>
                        <li class="nav-item"><a href="" class="nav-link fs-5">Cashback</a></li>
                        <li class="nav-item"><a href="" class="nav-link fs-5">Discount</a></li>
                        <li class="nav-item"><a href="" class="nav-link fs-5">Sale</a></li>
                    </ul>
                </div>

                <div class="mx-auto col-md-2  mb-4">
                    <h4 class="fw-bold">Our Menu</h4>
                    <ul class="list-unstyled">
                        <li class="nav-item"><a href="" class="nav-link fs-5 textdec">Breakfast</a></li>
                        <li class="nav-item"><a href="" class="nav-link fs-5"></a>Lunch</li>
                        <li class="nav-item"><a href="" class="nav-link fs-5">Dinner</a></li>
                    </ul>
                </div>
            </div>

            <div class="row mt-2">
                <ul class="list-unstyled d-flex gap-3 justify-content-center">
                    <li><span class="bi bi-facebook"></span></li>
                    <li><span class="bi bi-instagram"></span></li>
                    <li><span class="bi bi-twitter"></span></li>
                    <li><span class="bi bi-whatsapp"></span></li>
                </ul>
            </div>

            <div class="row">
                <div class="row-cols-md-12">
                    <p class="text-center">&copy; 2025 Example Company. All rights reserved.</p>
                </div>
            </div>
        </div>
    </footer>
    </>
  )
}

export default Home
