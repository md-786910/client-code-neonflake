import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { API } from "../page/api"
import axios from 'axios';
function Navbar() {

    const [len, setLen] = useState([]);


    const fetchProduct = async () => {
        try {
            const resp = await axios(`${API}/getCart`)
            if (resp.data.success) {
                setLen(resp.data.data)
            } else {
                return;
            }
        } catch (error) {
            alert(error.message)
        }
    }
    useEffect(() => {
        fetchProduct();
    }, [])

    // <li className="nav-item ">
    // <Link className="nav-link active" aria-current="page" to="/add-product">Add Product</Link>
    // </li>

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-success fixed-top1 ">
            <div className="container-fluid ">
                <Link className="navbar-brand" to="/">
                    <span className="logo fw-bold">
                        Product
                    </span>
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">

                        <li className="nav-item ">
                            <Link className="nav-link active" aria-current="page" to="/chat">Chat</Link>
                        </li>


                    </ul>
                    <div className="cart">
                        <Link className="nav-link active" aria-current="page" to="/carts">
                            <button className='btn btn-warning'>Carts &nbsp;
                                <span class="badge bg-danger">{len.length}</span>
                            </button>
                        </Link>
                    </div>

                </div>
            </div>
        </nav>
    )
}

export default Navbar