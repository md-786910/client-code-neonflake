import React, { useState, useEffect } from 'react'
import { Container, Spinner } from 'react-bootstrap'
import { API } from "./api"
import axios from 'axios';
import { Link } from 'react-router-dom';

function Home() {
    const [loader, setLoader] = useState(true);
    const [product, setProduct] = useState([])

    const fetchProduct = async () => {
        try {
            const resp = await axios(`${API}/getProduct`)
            if (resp.data.success) {
                setProduct(resp.data.data)
                setLoader(false)
            } else {
                return;
            }
        } catch (error) {
            alert(error.message)
        }
    }

    const deleteProduct = async (id) => {
        try {
            const resp = await fetch(`${API}/deleteProduct`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ id: id })
            })
            setLoader(true)
            const data = await resp.json();
            if (data.success) {
                setLoader(false)
                fetchProduct();
            } else {
                return;
            }
        } catch (error) {
            // alert(error.message)
            console.log(error);
        }
    }


    const addToCart = async (id) => {
        try {
            const resp = await fetch(`${API}/carts`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ id: id })
            })
            setLoader(true)
            const data = await resp.json();
            if (data.success) {
                window.location.reload();
                setLoader(false)
                fetchProduct();
            } else {
                return;
            }
        } catch (error) {
            console.log(error);
        }
    }



    useEffect(() => {
        fetchProduct();
    }, [])
    return (

        <Container fluid className="p-0">
            <div className="spacer">

                <div className="loader ">
                    {
                        loader && <Spinner size={30} variant='success' animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    }
                </div>

                {
                    product.length > 0 ? <div className="">
                        <table class="table table-group-divider table-hover table-responsive table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">S.No</th>
                                    <th scope="col">Product Name</th>
                                    <th scope="col">Product Description</th>
                                    <th scope="col">Qty</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">Image</th>
                                    <th scope="col">Last Upadates</th>
                                    <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody>

                                {
                                    product && product.map((p, index) => {
                                        return (
                                            <tr key={p._id}>
                                                <th scope="row1">{index + 1}</th>
                                                <td>{p.productName}</td>
                                                <td>{p.description}</td>
                                                <td>{p.qty}</td>
                                                <td>{p.price}</td>
                                                <td style={{ width: "10%" }}>
                                                    <img src={p.image} alt="img" style={{ width: "100%" }} />
                                                </td>
                                                <td>{new Date(p.updatedAt).toUTCString()}</td>
                                                <td>
                                                    <div className="actionBtn d-flex gap-2 justify-content-between align-items-center">

                                                        <button className='btn btn-info' onClick={() => addToCart(p._id)}>Add  To Cart</button>

                                                    </div>

                                                </td>
                                            </tr>
                                        )
                                    })
                                }

                            </tbody>
                        </table>

                    </div> : <div>
                        <h4>Empty Product</h4>
                        <Link to="/add-product">
                            <button className='btn btn-success'>Add Product</button>
                        </Link>
                    </div>
                }


            </div>


        </Container>

    )

}

/*     <Link to={`/add-product/${p._id}`}><button className='btn btn-primary'>Edit</button></Link>
                                                        <button className='btn btn-danger' onClick={() => deleteProduct(p._id)}>Delete</button> */

export default Home