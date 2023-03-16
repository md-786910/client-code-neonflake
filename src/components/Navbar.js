import React from 'react'
import { Link } from 'react-router-dom'
import VDO from "../image/vdo.svg"
function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-success fixed-top ">
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
                            <Link className="nav-link active" aria-current="page" to="/add-product">Add Product</Link>
                        </li>

                    </ul>

                </div>
            </div>
        </nav>
    )
}

export default Navbar