import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import Cart from './Cart';
import { AuthContext } from '../Context/Authprovider';

const Navbar = ({ setsearch }) => {
    // const [user, setUser] = useState();
    const { user, logout } = useContext(AuthContext)
    const navigate = useNavigate();
    const [cartCount, setCartCount] = useState(0);



    // useEffect(() => {
    //     const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    //     if (loggedInUser) {
    //         setUser(loggedInUser);
    //     }
    // }, [user]);

    useEffect(() => {
        const cartCounts = JSON.parse(localStorage.getItem('cart')) || []
        setCartCount(cartCounts.length)
    }, [])


    const handleLogout = () => {
        logout()
        navigate('/login')
    }
    return (
        <>
            <nav className='navbar navbar-expand-lg bg-warning  position-sticky top-0 z-2' >
                <div className='container-fluid'>
                    <Link to="#" className='navbar-brand text-white fw-bold fs-3'><span className='bi bi-egg-fried'></span> FOOD COURT</Link>

                    <button type='button' className='navbar-toggler bg-white text-secondary' data-bs-toggle="collapse" data-bs-target="#navbar">
                        <span className='navbar-toggler-icon'></span>
                    </button>

                    <div className='collapse navbar-collapse' id="navbar">
                        <ul className='navbar-nav mx-auto'>
                            <li className='fs-5'>
                                <Link className='text-white nav-link' to={'/'}>Home</Link>
                            </li>
                            <li className='fs-5'>
                                <Link className='nav-link text-white ' to={'/contact'}>Contact</Link>
                            </li>
                            <li className='fs-5'>
                                <Link className='nav-link text-white ' to={'/cart'}><span className='bi bi-cart p-2 badge bg-danger'>{cartCount}</span>
                                </Link>
                            </li>
                            <li className='nav-link'>
                                <input type="text" name="" id="" placeholder='Search Food . . .' className='form-control' onChange={(e) => setsearch(e.target.value)} />
                            </li>
                        </ul>
                        <div className='ms-auto'>
                            {
                                user ? (
                                    <>
                                        <button className='btn bg-info-subtle'>
                                            <span className='bi bi-person me-2'></span>
                                            {user.name}
                                        </button>
                                        <button className='btn btn-outline-danger ms-3' onClick={handleLogout}>
                                            Logout
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <button className='btn btn-primary'>
                                            <Link className='nav-link' to={'/login'}>Login</Link>
                                        </button>
                                        <button className='btn btn-primary ms-3'>
                                            <Link className='nav-link' to={'/register'}>Register</Link>
                                        </button>
                                    </>
                                )
                            }
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}
export default Navbar