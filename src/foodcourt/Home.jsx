import React, { useEffect, useState } from 'react';
import SimpleSlider from './SimpleSlider';
import Navbar from './Navbar';
import { toast } from 'react-toastify';

const Home = () => {
  const [apiData, setApiData] = useState([]);
  const [filter, setFilter] = useState('indian');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchMeals = async () => {
    setLoading(true);
    const apiURL = search
      ? `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`
      : `https://www.themealdb.com/api/json/v1/1/filter.php?a=${filter}`;

    try {
      const response = await fetch(apiURL);
      const data = await response.json();
      setApiData(data.meals || []);
    } catch (error) {
      console.error('API error:', error);
      toast.error('Failed to fetch meals');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMeals();
  }, [filter, search]);

  const addToCart = (meal) => {
    const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
    const exists = existingCart.find((item) => item.idMeal === meal.idMeal);

    if (exists) {
      toast.info('Item already in cart');
    } else {
      const updatedCart = [...existingCart, meal];
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      toast.success('Item added to cart');
    }
  };

  const filters = ['indian', 'canadian', 'british', 'thai', 'chinese', 'russian'];

  // Styles
  const styles = {
    filterBtn: (active) => ({
      transition: 'all 0.3s ease',
      borderRadius: '50px',
      padding: '0.5rem 1.2rem',
      fontWeight: '600',
      color: active ? '#212529' : '#ffc107',
      backgroundColor: active ? '#ffc107' : 'transparent',
      border: `2px solid #ffc107`,
      cursor: 'pointer',
      boxShadow: active ? '0 4px 8px rgba(255,193,7,0.4)' : 'none',
    }),
    card: {
      borderRadius: '15px',
      boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      cursor: 'pointer',
      overflow: 'hidden',
      backgroundColor: 'white',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
    },
    cardHover: {
      transform: 'translateY(-8px)',
      boxShadow: '0 16px 32px rgba(0,0,0,0.15)',
    },
    cardImg: {
      objectFit: 'cover',
      height: '200px',
      borderTopLeftRadius: '15px',
      borderTopRightRadius: '15px',
    },
    btnAddCart: {
      background: 'linear-gradient(90deg, #fbc531, #e1b12c)',
      border: 'none',
      fontWeight: '600',
      letterSpacing: '0.05em',
      transition: 'background 0.3s ease',
    },
    btnAddCartHover: {
      background: 'linear-gradient(90deg, #e1b12c, #fbc531)',
    },
    footerLink: {
      color: '#212529',
      textDecoration: 'none',
      transition: 'color 0.3s',
    },
    footerLinkHover: {
      color: '#ffc107',
      textDecoration: 'underline',
    },
    socialIcon: {
      fontSize: '1.5rem',
      color: '#ffc107',
      cursor: 'pointer',
      transition: 'color 0.3s',
    },
  };

  // Card hover effect state
  const [hoveredCard, setHoveredCard] = React.useState(null);

  return (
    <>
      <Navbar setsearch={setSearch} />
      <div className="container-fluid p-0" style={{ overflowX: 'hidden' }}>
        <SimpleSlider />

        {/* Filter Bar */}
        <div className="d-flex justify-content-center flex-wrap gap-3 py-3 mt-4">
          {filters.map((f) => (
            <button
              key={f}
              type="button"
              aria-pressed={filter === f}
              onClick={() => setFilter(f)}
              style={styles.filterBtn(filter === f)}
            >
              <i className="bi bi-filter me-1"></i>
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        {/* Meals Grid */}
        <div className="container mt-4">
          {loading ? (
            <div className="text-center">
              <div className="spinner-border text-warning" role="status" aria-label="Loading meals"></div>
              <p className="mt-2 fs-5">Loading meals...</p>
            </div>
          ) : apiData.length === 0 ? (
            <p className="text-center fs-5">No meals found.</p>
          ) : (
            <div className="row g-4 justify-content-center">
              {apiData.map((meal) => (
                <div
                  key={meal.idMeal}
                  className="col-6 col-sm-6 col-md-4 col-lg-3"
                  onMouseEnter={() => setHoveredCard(meal.idMeal)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <div
                    className="card h-100"
                    style={{
                      ...styles.card,
                      ...(hoveredCard === meal.idMeal ? styles.cardHover : {}),
                    }}
                  >
                    <img
                      src={meal.strMealThumb}
                      alt={meal.strMeal}
                      style={styles.cardImg}
                      loading="lazy"
                    />
                    <div className="card-body text-center flex-grow-1 d-flex flex-column justify-content-between">
                      <h5
                        className="card-title text-truncate"
                        title={meal.strMeal}
                        style={{ fontWeight: '700', fontSize: '1.1rem', color: '#333' }}
                      >
                        {meal.strMeal}
                      </h5>
                      <p className="price fw-bold fs-5 text-warning">₹299</p>
                    </div>
                    <div className="card-footer bg-transparent border-0 p-3">
                      <button
                        type="button"
                        aria-label={`Add ${meal.strMeal} to cart`}
                        className="btn w-100"
                        style={styles.btnAddCart}
                        onMouseEnter={e => (e.currentTarget.style.background = styles.btnAddCartHover.background)}
                        onMouseLeave={e => (e.currentTarget.style.background = styles.btnAddCart.background)}
                        onClick={() => addToCart(meal)}
                      >
                        <i className="bi bi-cart-plus me-2"></i> Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="shadow-lg bg-white pt-5 text-dark mt-5 border-top" role="contentinfo">
        <div className="container text-md-start text-center">
          <div className="row">
            <div className="col-md-3 col-lg-3 col-xl-3 mb-4 mx-auto">
              <h4 className="fw-bold mb-3">FOOD COURT</h4>
              <ul className="list-unstyled fs-6">
                <li className="mb-2">
                  <i className="bi bi-geo-alt-fill me-2 text-warning"></i>
                  123 Main St, Anytown, USA 12345
                </li>
                <li className="mb-2">
                  <i className="bi bi-telephone-fill me-2 text-warning"></i>
                  +1 740 834 5650
                </li>
                <li>
                  <i className="bi bi-envelope-fill me-2 text-warning"></i>
                  Email:{' '}
                  <a
                    href="mailto:abhishek@gmail.com"
                    style={styles.footerLink}
                    onMouseEnter={e => (e.currentTarget.style.color = styles.footerLinkHover.color)}
                    onMouseLeave={e => (e.currentTarget.style.color = styles.footerLink.color)}
                  >
                    abhishek@gmail.com
                  </a>
                </li>
              </ul>
            </div>

            <div className="col-md-2 mb-4 mx-auto">
              <h4 className="fw-bold mb-3">Quick Links</h4>
              <ul className="list-unstyled fs-6">
                {['Home', 'Services', 'About Us', 'Contact', 'Query'].map((item) => (
                  <li key={item} className="mb-2">
                    <a
                      href="#"
                      style={styles.footerLink}
                      onMouseEnter={e => (e.currentTarget.style.color = styles.footerLinkHover.color)}
                      onMouseLeave={e => (e.currentTarget.style.color = styles.footerLink.color)}
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="col-md-2 mb-4 mx-auto">
              <h4 className="fw-bold mb-3">Customer Services</h4>
              <ul className="list-unstyled fs-6">
                {['Return', 'Refund', 'Cashback', 'Discount', 'Sale'].map((item) => (
                  <li key={item} className="mb-2">
                    <a
                      href="#"
                      style={styles.footerLink}
                      onMouseEnter={e => (e.currentTarget.style.color = styles.footerLinkHover.color)}
                      onMouseLeave={e => (e.currentTarget.style.color = styles.footerLink.color)}
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="col-md-2 mb-4 mx-auto">
              <h4 className="fw-bold mb-3">Our Menu</h4>
              <ul className="list-unstyled fs-6">
                {['Breakfast', 'Lunch', 'Dinner'].map((item) => (
                  <li key={item} className="mb-2">
                    <a
                      href="#"
                      style={styles.footerLink}
                      onMouseEnter={e => (e.currentTarget.style.color = styles.footerLinkHover.color)}
                      onMouseLeave={e => (e.currentTarget.style.color = styles.footerLink.color)}
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="col-md-3 mb-4 mx-auto">
              <h4 className="fw-bold mb-3">Social Media</h4>
              <div className="d-flex gap-3 fs-4 justify-content-center justify-content-md-start">
                {[
                  { icon: 'bi-facebook', href: 'https://facebook.com' },
                  { icon: 'bi-twitter', href: 'https://twitter.com' },
                  { icon: 'bi-instagram', href: 'https://instagram.com' },
                  { icon: 'bi-linkedin', href: 'https://linkedin.com' },
                ].map(({ icon, href }) => (
                  <a
                    key={icon}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={icon.replace('bi-', '')}
                    style={styles.socialIcon}
                    onMouseEnter={e => (e.currentTarget.style.color = '#e1b12c')}
                    onMouseLeave={e => (e.currentTarget.style.color = '#ffc107')}
                  >
                    <i className={`bi ${icon}`}></i>
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="text-center mt-4 pb-4 fs-6 text-muted">
            &copy; {new Date().getFullYear()} ECOM. All rights reserved.
          </div>
        </div>
      </footer>
    </>
  );
};

export default Home;
