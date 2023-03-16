import React, { useState, useEffect } from 'react'
import { Container, Spinner } from 'react-bootstrap'
import { API } from "./api"
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function EditPage() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [loader, setLoader] = useState(false);
    const [form, setForm] = useState({
        productName: "",
        description: "",
        price: "",
        qty: ""
    })


    const handleText = (e) => {
        const name = e.target.name
        const value = e.target.value
        setForm({ ...form, [name]: value })
    }
    const handleImage = (e) => {
        setForm({
            ...form, image: e.target.files[0]
        })
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoader(true);
        try {
            const config = {
                headers: {
                    'content-type': 'multipart/form-data',
                },
            };
            axios.put(`${API}/editProduct`, { ...form, id: id }, config).then(async (response) => {
                if (response.data.success === true) {
                    setLoader(false);
                    setForm({})
                    await navigate("/")
                } else {
                    return
                }
            });

        } catch (error) {
            console.log(error);
        }

    }


    const fetchProduct = async () => {
        try {
            const resp = await fetch(`${API}/getProductById`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id: id,
                })
            })
            const { data, success } = await resp.json();

            if (success) {
                setLoader(false)
                setForm({
                    productName: data.productName,
                    description: data.description,
                    price: data.price,
                    qty: data.qty
                })

            } else {
                return;
            }
        } catch (error) {
            alert(error.message)
        }
    }

    useEffect(() => {
        fetchProduct();

        // eslint-disable-next-line
    }, [])
    return (

        <Container fluid className="p-0 mt-5">
            <div className="spacer">
                <h1 className='my-4'>
                    Edit Product
                </h1>
                <div className="loader mt-3">
                    {
                        loader && <Spinner size={30} variant='info' animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    }

                </div>
                <div className="textForm">
                    <form onSubmit={handleSubmit}>

                        <div class="mb-3">
                            <label for="exampleFormControlInput1" class="form-label">Product Name (max-length : 50)</label>
                            <input type="text" class="form-control" name="productName" value={form.productName} onChange={handleText} id="exampleFormControlInput1" placeholder="My name is john" maxLength={50} required={true} />
                        </div>
                        <div class="mb-3">
                            <label for="exampleFormControlTextarea1" class="form-label">Description (max-charactor:200)</label>
                            <textarea class="form-control" name="description" value={form.description} onChange={handleText} id="exampleFormControlTextarea1" rows="3" required={true}></textarea>
                        </div>

                        <div class="mb-3">
                            <label for="formFile" class="form-label">Choose Thumbnail</label>
                            <input class="form-control" type="file" accept="image/*" onInput={(e) => handleImage(e)} id="formFile" required={true} />
                        </div>

                        <div class="mb-3">
                            <label for="formFile" class="form-label">Price (₹)</label>
                            <input class="form-control" type="text" name="price" value={form.price} onChange={(e) => handleText(e)} id="formFile" maxLength={6} required={true} />
                        </div>

                        <div class="mb-3">
                            <label for="formFile" class="form-label">Qty</label>
                            <input class="form-control" type="text" name="qty" value={form.qty} onChange={(e) => handleText(e)} id="formFile" maxLength={5} required={true} />
                        </div>




                        <div className="my-5">


                            <button className='btn-upload'>Add Product</button>


                        </div>

                    </form>
                </div>


            </div>


        </Container>

    )
}

export default EditPage