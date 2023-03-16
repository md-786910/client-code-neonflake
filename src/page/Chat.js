import React, { useEffect, useState } from 'react'
import { Container, Spinner } from 'react-bootstrap'
import { API } from "./api"
import { css } from '@emotion/css'
import ScrollToBottom from 'react-scroll-to-bottom';
import axios from 'axios';



function Chat() {
    const [loader, setLoader] = useState(false)
    const [para, setPara] = useState("")
    const [chatResp, setChatResp] = useState(["Hello! How can I assist you today?"])
    const [ques, setQues] = useState(["Hi"]);
    const chatBtn = async () => {
        setLoader(true);
        try {
            if (para) {
                setQues([...ques, para]);
                axios.post(`${API}/chat`, { para: para }).then(async (response) => {
                    console.log(response);
                    if (response.data.success === true) {
                        setLoader(false);
                        setChatResp([...chatResp, response.data.resp.content])
                        setPara("")
                    }
                });
            } else {
                return;
            }
        } catch (error) {
            console.log(error);
        }
    }

    const ROOT_CSS = css({
        height: 500,
        width: 400
    });
    return (
        <Container fluid className="p-0 mt-5">
            <div className="spacer">
                <h1 className='my-4'>
                    Chat
                </h1>

                <div >
                    <div className="chatBox">
                        <div className="leftChat">
                            <ScrollToBottom className={ROOT_CSS} mode={'bottom'} checkInterval={150}>
                                {
                                    chatResp && chatResp.map((res, index) => {
                                        return (
                                            <div className="leftChatBox" key={index}>
                                                <code><p dangerouslySetInnerHTML={{ __html: res }} /></code>
                                                <img src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDyjzMOo0F0BAhDNmTS0mGWPjENA69z6FBgg&usqp=CAU"} width="40" alt="assis" />

                                            </div>
                                        )
                                    })
                                }
                            </ScrollToBottom>
                            <div className="loader mt-3">
                                {
                                    loader && <Spinner size={30} variant='info' animation="border" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </Spinner>
                                }
                            </div>
                        </div>
                        <div className="rightChat">
                            {
                                ques && ques.map((que, index) => {
                                    return (
                                        <div className="rightChatBox">
                                            <p key={index}>{que}</p>
                                        </div>
                                    )
                                })
                            }

                        </div>

                    </div>
                    <div className="mt-3">
                        <div class="mb-3">
                            <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="john doe" name="para" value={para} onChange={(e) => setPara(e.target.value)} />
                        </div>
                        <button className='btn btn-outline-dark' onClick={() => chatBtn()}>submit</button>


                    </div>
                </div>

            </div>
        </Container>
    )
}

export default Chat