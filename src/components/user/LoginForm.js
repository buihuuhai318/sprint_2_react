import React, {useEffect, useState} from 'react';
import {Field, Form, Formik} from "formik";
import * as AuthService from "../../service/user/AuthService";
import {toast} from "react-toastify";
import {Link, useNavigate} from "react-router-dom";
import {RingLoader} from "react-spinners";
import '../../css/user/spinner.css'
import '../../css/user/login.css'
import {Helmet} from "react-helmet";
import {BsFacebook, IconName} from "react-icons/bs";
import {AiOutlineFacebook} from "@react-icons/all-files/ai/AiOutlineFacebook";
import {AiFillFacebook} from "react-icons/ai";
import {GrFacebook} from "react-icons/gr";
import Swal from "sweetalert2";
import {LoginSocialFacebook} from "reactjs-social-login";


function LoginForm() {

    const [user, setUser] = useState({
        userName: "",
        otp: ""
    });

    const navigate = useNavigate();
    const [isOTPVisible, setOTPVisible] = useState(false);
    const [isOTPReset, setOTPReset] = useState(false);
    const [countdown, setCountdown] = useState(5);
    const [isCounting, setIsCounting] = useState(false);
    const [loading, setLoading] = useState(false);
    const [value, setValue] = useState(null);
    const [userName, setUserName] = useState("");
    const [forgot, setForgot] = useState(false);

    const handleClick = () => {
        setLoading(true);
    };


    useEffect(() => {
        let timer;
        if (isCounting && countdown > 0) {
            timer = setTimeout(() => {
                setCountdown(countdown - 1);
            }, 1000);
        } else if (countdown === 0) {
            setIsCounting(false);
            setCountdown(5);
        }
        return () => clearTimeout(timer);
    }, [countdown, isCounting]);

    useEffect(() => {

    }, [forgot]);

    useEffect(() => {
        document.title = "#Thehome - Login"; // Đặt tiêu đề mới tại đây
    }, []);


    const startCountdown = () => {
        setIsCounting(true);
    };

    const handleButtonClick = () => {
        if (!isCounting) {
            startCountdown();
            // Thực hiện công việc khi nút được nhấn
        }
    };


    const showOTP = () => {
        setOTPVisible(true);
    };

    const showResetOTP = () => {
        setOTPReset(true);
    };

    const resetOTP = async () => {
        try {
            handleClick();
            handleButtonClick();
            let initOtp = {
                userName: user.userName
            }
            const res = await AuthService.resetOTP(initOtp);
            if (res.status === 200) {
                toast("OTP đã được gửi qua mail của bạn");
            } else {
                toast.error("Vui lòng đăng nhập lại");
            }
            setLoading(false);
        } catch (e) {
            setLoading(false);
            toast.error("Vui lòng đăng nhập lại");
        }
    }

    const initAccount = {
        userName: "",
        password: ""
    }

    const handleLogin = async (resolve) => {
        try {

            const result = await AuthService.loginWithFacebook(resolve.data);
            console.log(resolve)
            AuthService.addJwtTokenToLocalStorage(result.data.jwtToken);
            const tempURL = localStorage.getItem("tempURL");
            localStorage.removeItem("tempURL");
            if (tempURL) {
                navigate(tempURL);
            } else {
                navigate('/');

            }
        } catch (e) {
            Swal.fire({
                icon: 'error',
                title: e.response.data,
            })
        }
    }

    const loginWithFacebook = async (resolve) => {
        console.log(resolve);
        Swal.fire({
            text: 'Chào ' + resolve.data.name + ', bạn có muốn đăng nhập thông qua facebook ' + resolve.data.email + " không?",
            showDenyButton: true,
            confirmButtonText: 'Xác nhận',
            denyButtonText: `Thoát`,
        }).then((result) => {

            if (result.isConfirmed) {
                handleLogin(resolve)
            } else if (result.isDenied) {

            }
        })

    }

    const login = async (data) => {
        try {
            const res = await AuthService.login(data);
            const initOtp = {
                userName: res.data.userName,
                otp: ""
            }
            setUserName(res.data.userName);
            setValue(res.data.employeeName);
            setUser(initOtp);
            if (res.status === 200) {
                showOTP();
                toast("OTP đã được gửi qua mail của bạn");
            } else {
                setForgot(true);
                toast.error("Sai tên đăng nhâp hoặc mật khẩu");
            }
            setLoading(false);
            setForgot(false);
        } catch (e) {
            setLoading(false);
            setForgot(true);
            toast.error("Sai tên đăng nhâp hoặc mật khẩu");
        }
    }


    const auth = async (data) => {
        try {
            let initOtp = {
                ...data,
                userName: user.userName
            }
            const res = await AuthService.auth(initOtp);
            AuthService.addJwtTokenToLocalStorage(res.data.jwtToken);
            const tempURL = localStorage.getItem("tempURL");
            localStorage.removeItem("tempURL");
            if (res.status === 200) {
                if (tempURL) {
                    navigate(tempURL);
                } else {
                    navigate("/admin/home")
                }
                toast("Đăng nhập thành công");
            } else {
                showResetOTP();
                toast.error("Đăng nhập thất bại");
            }
            setLoading(false);
        } catch (e) {
            setLoading(false);
            showResetOTP();
            toast.error("Đăng nhập thất bại");
        }
    }


    return (
        <>
            <div>
                <Helmet>
                    <body className="custom-background-HaiBH"/>
                </Helmet>
            </div>
            <div className="spinner-overlay" style={{display: loading ? 'flex' : 'none'}}>
                <div className="ring-loader">
                    <RingLoader color="white"/>
                </div>
            </div>
            <div style={{width: '40%', height: '30%', margin: '0% auto 0% auto', padding: '10% 0 15% 0'}}>
                <div className="transparent-div-HaiBH card"
                     style={{backgroundColor: 'rgba(192, 192, 192, 0.3)', border: "0 solid", borderRadius: "10%"}}>
                    <div style={{width: "80%", marginRight: "auto", marginLeft: "auto"}} className="mt-4 mb-2">
                        <img
                            src="https://i.imgur.com/QkqytXc.png" // Đường dẫn đến hình ảnh logo của bạn
                            alt="Home"
                            width="100%"

                        />
                    </div>
                    <hr/>
                    <div className="card-body" style={{width: "70%", marginLeft: "auto", marginRight: "auto"}}>
                        <div>
                            <Formik
                                initialValues={initAccount}
                                onSubmit={(values) => {
                                    login(values);
                                }}
                            >
                                <Form>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail1"
                                               className="form-label"
                                               style={{color: 'black'}} hidden={isOTPVisible}>Tên Đăng Nhập</label>

                                        <Field type={!isOTPVisible ? "text" : "hidden"} className="form-control"
                                               id="exampleInputEmail1"
                                               aria-describedby="emailHelp" name="userName"
                                               style={{color: 'black', backgroundColor: 'rgba(192, 192, 192, 0.0)'}}/>

                                        <p className="" hidden={!isOTPVisible}>
                                            Xin Chào: {value ? value : userName} !
                                        </p>


                                    </div>
                                    <div className="mb-3" style={{display: isOTPVisible ? 'none' : 'block'}}>
                                        <div>
                                            <label htmlFor="exampleInputPassword1"
                                                   className="form-label"
                                                   style={{color: 'black'}}>Mật Khẩu</label>
                                            <Field type="password" className="form-control"
                                                   id="exampleInputPassword1"
                                                   name="password"
                                                   style={{
                                                       color: 'black',
                                                       backgroundColor: 'rgba(192, 192, 192, 0.0)'
                                                   }}/>
                                        </div>
                                        <div className="row" hidden={!forgot}>
                                            <div className="ml-auto col-12"
                                                 style={{textAlign: "right", marginTop: "10px"}}>
                                                <Link to="/" style={{color: "black"}}>Quên mật khẩu</Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{
                                        display: isOTPVisible ? 'none' : 'block',
                                        marginTop: forgot ? '20px' : '54px'
                                    }}>
                                        <div style={{width: '55%', marginLeft: 'auto', marginRight: 'auto'}}>
                                            <button type="submit" style={{
                                                width: '70%',
                                                color: 'black',
                                                backgroundColor: 'rgba(192, 192, 192, 0.4)',
                                                marginLeft: "auto",
                                                marginRight: "2%"
                                            }}
                                                    className="btn btn-light" onClick={handleClick}>
                                                Đăng Nhập
                                            </button>

                                            <LoginSocialFacebook
                                                className="btn border-0"
                                                onResolve={(resolve) => {
                                                    loginWithFacebook(resolve);
                                                }}
                                                appId="263186536240807" onReject="9b7840e0e3c737ca4f9d6535c1006239">
                                                <BsFacebook color="black" size={30}/>
                                            </LoginSocialFacebook >
                                        </div>
                                    </div>
                                    <div className="mt-3 pt-2"
                                         style={{display: isOTPVisible ? 'none' : 'block', textAlign: "center"}}>
                                        <div style={{marginLeft: 'auto', marginRight: 'auto', color: "black"}}>
                                            <label style={{marginRight: "2%"}}>
                                                Bạn mới biết đến #Thehome:
                                            </label>
                                            <Link to="/" style={{color: "black"}}>Đăng Ký</Link>
                                        </div>
                                    </div>
                                </Form>
                            </Formik>
                            <Formik
                                initialValues={user}
                                onSubmit={(values) => {
                                    auth(values);
                                }}
                            >
                                <Form>
                                    <div id="hiddenDiv" style={{display: isOTPVisible ? 'block' : 'none'}}>
                                        <div className="mb-3">
                                            <label htmlFor="otp" className="form-label">Mã Xác
                                                Nhận</label>
                                            <Field type="text" className="form-control" name="otp"
                                                   id="otp"
                                                   style={{
                                                       color: 'white',
                                                       backgroundColor: 'rgba(192, 192, 192, 0.0)'
                                                   }}/>
                                        </div>
                                        <div className="mt-4">
                                            <div style={{
                                                width: '50%',
                                                marginLeft: 'auto',
                                                marginRight: 'auto',
                                                display: isOTPReset ? 'none' : 'block'
                                            }}>
                                                <button type="submit" style={{
                                                    width: '100%',
                                                    backgroundColor: 'rgba(192, 192, 192, 0.4)'
                                                }}
                                                        className="btn btn-light">
                                                    Xác Nhận
                                                </button>
                                            </div>
                                            <div className="row" style={{
                                                display: isOTPReset ? 'block' : 'none',
                                                marginLeft: '5%',
                                                marginRight: '5%'
                                            }}>
                                                <button type="button"
                                                        style={{
                                                            width: '50%',
                                                            marginLeft: 'auto',
                                                            marginRight: 'auto',
                                                            backgroundColor: 'rgba(192, 192, 192, 0.4)'
                                                        }}
                                                        className="btn btn-light" disabled={isCounting}
                                                        onClick={() => resetOTP()}>
                                                    {isCounting ? `${countdown}s` : 'Gửi Lại OTP'}
                                                </button>
                                                <button type="submit"
                                                        style={{
                                                            width: '40%',
                                                            marginLeft: '10%',
                                                            marginRight: 'auto',
                                                            backgroundColor: 'rgba(192, 192, 192, 0.4)'
                                                        }}
                                                        className="btn btn-light" onClick={handleClick}>Xác Nhận
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </Form>
                            </Formik>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default LoginForm;
