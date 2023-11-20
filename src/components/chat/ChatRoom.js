import React, {useEffect, useState, useRef} from 'react'
import {over} from 'stompjs';
import SockJS from 'sockjs-client';
import {Alert, Button, Card, InputGroup, Modal} from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import "./chat.css"
import * as appUserService from "../../service/user/AuthService";

let stompClient = null;
const ChatRoom = () => {

    const [showModal, setShowModal] = useState(false);

    const handleButtonClick = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const buttonRef = useRef(null);

    const [privateChats, setPrivateChats] = useState(new Map());
    const [publicChats, setPublicChats] = useState([]);
    const [tab, setTab] = useState("CHATROOM");
    const [userName, setUsername] = useState(null);
    const [userData, setUserData] = useState({
        username: '',
        receivername: '',
        connected: false,
        message: ''
    });

    const getUsername = async () => {
        try {
            const response = await appUserService.infoAppUserByJwtToken();
            console.log(response)
            setUsername(response.sub);
            setUserData({
                ...userData,
                username: response.sub,
            })
        } catch (e) {

        }
    };

    useEffect(() => {
        console.log(userData);
    }, [userData]);

    useEffect(() => {
        getUsername();
    }, []);

    const registerUser = () => {
        getUsername();
        connect();
    }
    const connect = () => {
        let Sock = new SockJS('http://localhost:8080/ws');
        stompClient = over(Sock);
        stompClient.connect({}, onConnected, onError);
    }

    const onConnected = () => {
        console.log(userData)
        console.log(userName)
        setUserData({...userData, "connected": true});
        stompClient.subscribe('/chatroom/public', onMessageReceived);
        stompClient.subscribe('/user/' + userData.username + '/private', onPrivateMessage);
        userJoin();
    }

    const userJoin = () => {
        let chatMessage = {
            senderName: userData.username,
            status: "JOIN"
        };
        stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
    }

    const onMessageReceived = (payload) => {
        let payloadData = JSON.parse(payload.body);
        switch (payloadData.status) {
            case "JOIN":
                if (!privateChats.get(payloadData.senderName)) {
                    privateChats.set(payloadData.senderName, []);
                    setPrivateChats(new Map(privateChats));
                }
                break;
            case "MESSAGE":
                publicChats.push(payloadData);
                setPublicChats([...publicChats]);
                break;
        }
    }

    const onPrivateMessage = (payload) => {
        console.log(payload);
        let payloadData = JSON.parse(payload.body);
        if (privateChats.get(payloadData.senderName)) {
            privateChats.get(payloadData.senderName).push(payloadData);
            setPrivateChats(new Map(privateChats));
        } else {
            let list = [];
            list.push(payloadData);
            privateChats.set(payloadData.senderName, list);
            setPrivateChats(new Map(privateChats));
        }
    }

    const onError = (err) => {
        console.log(err);
    }

    const handleMessage = (event) => {
        const {value} = event.target;
        setUserData({...userData, "message": value});
    }
    const sendValue = () => {
        if (stompClient) {
            let chatMessage = {
                senderName: userData.username,
                message: userData.message,
                status: "MESSAGE"
            };
            console.log(chatMessage);
            stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
            setUserData({...userData, "message": ""});
        }
    }

    const sendPrivateValue = () => {
        if (stompClient) {
            let chatMessage = {
                senderName: userData.username,
                receiverName: tab,
                message: userData.message,
                status: "MESSAGE"
            };

            if (userData.username !== tab) {
                privateChats.get(tab).push(chatMessage);
                setPrivateChats(new Map(privateChats));
            }
            stompClient.send("/app/private-message", {}, JSON.stringify(chatMessage));
            setUserData({...userData, "message": ""});
        }
        handleScrollToTop();
    }

    const handleUsername = (event) => {
        const {value} = event.target;
        setUserData({...userData, "username": value});
    }

    const handleScrollToTop = () => {
        const targetDiv = document.getElementById('targetTop');
        if (targetDiv) {
            const targetOffset = targetDiv.offsetTop - 70; // Khoảng cách từ phía trên
            window.scrollTo({top: targetOffset, behavior: 'smooth'});
        }
        console.log(1)
    };


    return (
        <>
            <Button
                variant="primary"
                className="floating-button-chat"
                onClick={handleButtonClick}
            >
                Open Modal
            </Button>

            <Modal
                show={showModal}
                onHide={handleCloseModal}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Modal Title</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Hello, this is the modal content!</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleCloseModal}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>

            <div className="container">
                {userData.connected ?
                    <Card style={{height: "100vh"}}>
                        <Card.Header>Featured</Card.Header>
                        <Card.Body>
                            <div className="row">
                                <div className="col-3">
                                    <div className="scrollmenu-chat">
                                        <ul>
                                            {[...privateChats.keys()].map((name, index) => (
                                                name !== userData.username &&
                                                <li onClick={() => {
                                                    setTab(name)
                                                }} style={{backgroundColor: tab === name && "#53b7ae", borderRadius: "10px"}}
                                                    key={index}>{name}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-9">
                                    {tab !== "CHATROOM" &&
                                        <Card style={{height: "90vh"}}>
                                            <Card.Header>{tab}</Card.Header>
                                            <Card.Body>
                                                <Card.Text style={{overflowY: "auto", maxHeight: "70vh"}}>
                                                    <ul>
                                                        {[...privateChats.get(tab)].map((chat, index) => (
                                                            chat.senderName === userData.username ?
                                                                <InputGroup className="mb-3 mt-3">
                                                                    <Alert
                                                                        key="light" variant="light"
                                                                        style={{
                                                                            textAlign: "right",
                                                                            marginLeft: "auto",
                                                                            maxWidth: "604px",
                                                                            marginRight: "4%"
                                                                        }}>
                                                                        {chat.message}
                                                                    </Alert>
                                                                </InputGroup>
                                                                :
                                                                <InputGroup className="mb-3 mt-3">
                                                                    <Alert key="primary" variant="primary" style={{
                                                                        textAlign: "left",
                                                                        marginRight: "auto",
                                                                        maxWidth: "604px"
                                                                    }}>
                                                                        {chat.message}
                                                                    </Alert>
                                                                </InputGroup>
                                                        ))}
                                                    </ul>
                                                    <ul id="targetTop"></ul>
                                                </Card.Text>
                                            </Card.Body>
                                            <Card.Footer className="text-muted">
                                                <InputGroup className="mb-3 mt-3">
                                                    <Form.Control
                                                        placeholder="enter the message"
                                                        value={userData.message}
                                                        onChange={handleMessage}
                                                    />
                                                    <Button variant="outline-secondary" id="button-addon2"
                                                            type="button"
                                                            onClick={sendPrivateValue}>
                                                        send
                                                    </Button>
                                                </InputGroup>
                                            </Card.Footer>
                                        </Card>
                                    }
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                    :
                    <div className="container" style={{width: "50%", marginTop: "10%"}}>
                        <Card className="text-center">
                            <Card.Header>Featured</Card.Header>
                            <Card.Body>
                                <Card.Title>Special title treatment</Card.Title>
                                <InputGroup className="mb-3">
                                    <Button variant="outline-secondary" id="button-addon2" onClick={registerUser}>
                                        Button
                                    </Button>
                                </InputGroup>
                            </Card.Body>
                        </Card>
                    </div>
                }
            </div>
        </>
    )
}

export default ChatRoom
