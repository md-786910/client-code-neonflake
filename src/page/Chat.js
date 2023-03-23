import React, { useEffect, useRef, useState } from 'react'
import { Container, Spinner } from 'react-bootstrap'
import { API } from "./api"
import axios from 'axios';

function Chat() {
    const [loader, setLoader] = useState(false)
    const [para, setPara] = useState("")
    const divRef = useRef();
    const [chatResp, setChatResp] = useState(["Hello! How can I assist you today?"])

    const [ques, setQues] = useState(["Hi"]);
    const chatBtn = async () => {
        setLoader(true);
        try {
            if (para) {
                setQues([...ques, para]);
                axios.post(`${API}/chat`, { para: para }).then(async (response) => {
                    if (response.data.success === true) {
                        console.log(response.data.resp.content.split("\n").join("\n"));
                        setLoader(false);
                        setChatResp([...chatResp, response.data.resp.content.split("\n").join("\n")
                        ])
                        setPara("")
                    } else {
                        if (response.data.success === false) {
                            alert(response.data.message)
                        }
                    }
                });
            } else {
                return;
            }
        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        var objDiv = document.getElementById("your_div");
        objDiv.scrollTop = objDiv.scrollHeight + 50;
    }, [])

    return (
        <Container fluid className="p-0 mt-5">
            <div className="spacer1">
                <div >
                    <div className="chatBox" id="your_div">
                        {
                            ques && ques.map((que, index) => {
                                return (
                                    <div className="mb-3" key={index} id="your_div">
                                        <div className="rightChatBox ">
                                            <p key={index}>user : {que}</p>
                                        </div>
                                        <div className="leftChatBox d-flex align-items-center gap-3" >
                                            <img src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDyjzMOo0F0BAhDNmTS0mGWPjENA69z6FBgg&usqp=CAU"} width="40" alt="assis" />
                                            <code><p dangerouslySetInnerHTML={{ __html: chatResp[index] }} /></code>
                                        </div>
                                    </div>
                                )
                            })
                        }


                        <div className="loader mt-3">
                            {
                                loader && <Spinner size={30} variant='info' animation="border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </Spinner>
                            }
                        </div>


                    </div>
                    <div className="">
                        <div>
                            <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="john doe" name="para" value={para} onChange={(e) => setPara(e.target.value)} />
                        </div>
                        <button className='mt-1 btn btn-outline-dark' onClick={() => chatBtn()}>submit</button>


                    </div>
                </div>

            </div>
        </Container>
    )
}

export default Chat