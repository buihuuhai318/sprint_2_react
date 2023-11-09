import React, {useEffect, useState} from 'react';
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as AuthService from "../../service/user/AuthService";
import {toast} from "react-toastify";
import {Link, useNavigate, useParams} from "react-router-dom";
import {RingLoader} from "react-spinners";
import '../../css/user/spinner.css'
import '../../css/user/login.css'
import {Helmet} from "react-helmet";
import {BsFacebook} from "react-icons/bs";
import Swal from "sweetalert2";
import {LoginSocialFacebook} from "reactjs-social-login";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import './login.css';
import * as Yup from "yup";


function LoginForm() {

    const [user, setUser] = useState({
        userName: "",
        otp: ""
    });

    const params = useParams();
    const navigate = useNavigate();
    const [isOTPVisible, setOTPVisible] = useState(false);
    const [isOTPReset, setOTPReset] = useState(false);
    const [countdown, setCountdown] = useState(5);
    const [isCounting, setIsCounting] = useState(false);
    const [loading, setLoading] = useState(false);
    const [value, setValue] = useState(null);
    const [userName, setUserName] = useState("");
    const [forgot, setForgot] = useState(false);
    const [showForgot, setShowForgot] = useState(false);
    const [showReset, setShowReset] = useState(false);
    const [userNameForNewPass, setUserNameForNewPass] = useState(null);
    const [url, setUrl] = useState(null);

    const handleClick = () => {
        setLoading(true);
    };

    const signup = async (data) => {
        try {
            const res = await AuthService.signup(data);
            console.log(res)
            if (res.status === 200) {
                toast("Bạn đã tạo mới tài khoản thành công");
            } else if (res.status === 201) {
                toast.warning(res.data);
            } else {
                toast.error("Tạo tài khoản thất bại");
            }
            setLoading(false);
        } catch (e) {
            setLoading(false);
            toast.error("Tạo tài khoản thất bại");
        }
    }

    const forgotPassword = async (data) => {
        try {
            const res = await AuthService.forgot(data);
            if (res.status === 200) {
                toast("Yêu cầu đã được gửi qua mail của bạn");
            } else if (res.status === 201) {
                toast.warning(res.data);
            } else {
                toast.error("Email không tồn tại");
            }
            setLoading(false);
        } catch (e) {
            setLoading(false);
            toast.error("Email không tồn tại");
        }
    }

    const resetPassword = async (data) => {
        try {
            const res = await AuthService.resetPass(userNameForNewPass, url, data);
            if (res.status === 200) {
                toast("Cập nhật mật khẩu thành công");
                setShowReset(false);
                getTitle("Đăng nhập")
            } else {
                toast.error("Cập nhật mật khẩu thât bại");
            }
            setLoading(false);
        } catch (e) {
            setLoading(false);
            toast.error("Cập nhật mật khẩu thât bại");
        }
    }


    const getTitle = (tittle) => {
        document.title = "#Thehome - " + tittle;
    }


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

    const check = async (username, url) => {
        if (username && url) {
            try {
                const res = await AuthService.check(username, url);
                console.log(res)
                if (res.status === 200) {
                    setShowReset(true);
                } else {
                    toast.warning("Yêu cầu đã hết hiệu lực");
                }
            } catch (e) {
                toast.warning("Yêu cầu đã hết hiệu lực");
            }
        }
    }

    useEffect(() => {
        document.title = "#Thehome - Đăng nhập"; // Đặt tiêu đề mới tại đây
        setUserNameForNewPass(params.userName);
        setUrl(params.urlPass);

        check(params.userName, params.urlPass);

    }, []);


    const startCountdown = () => {
        setIsCounting(true);
    };

    const handleButtonClick = () => {
        if (!isCounting) {
            startCountdown();
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
        password: "",
        email: ""
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
                    {
                        showReset ?
                            <>
                                <hr/>
                                <div className="card-body"
                                     style={{width: "70%", marginLeft: "auto", marginRight: "auto"}}>
                                    <div>
                                        <Formik
                                            initialValues={initAccount}
                                            onSubmit={(values) => {
                                                resetPassword(values);
                                            }}
                                            validationSchema={Yup.object({
                                                password: Yup.string()//
                                                    .required('Mật khẩu là bắt buộc')
                                                    .min(6, "Không đủ ký tự cho phép (6 ký tự).")
                                                    .max(20, "Quá ký tự cho phép (20 ký tự)."),
                                                confirmPass: Yup.string()//
                                                    .required('Nhập lại mật khẩu là bắt buộc')
                                                    .min(6, "Không đủ ký tự cho phép (6 ký tự).")
                                                    .max(20, "Quá ký tự cho phép (20 ký tự).")
                                                    .oneOf([Yup.ref('password'), null], "Mật khẩu không trùng khớp")
                                            })}
                                        >
                                            <Form>
                                                <div className="mb-3">
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
                                                        <ErrorMessage name="password" component="span"
                                                                      style={{color: "white"}}></ErrorMessage>
                                                    </div>
                                                </div>
                                                <div className="mb-3">
                                                    <div>
                                                        <label htmlFor="exampleInputPassword1"
                                                               className="form-label"
                                                               style={{color: 'black'}}>Nhập Lại Mật Khẩu</label>
                                                        <Field type="password" className="form-control"
                                                               id="exampleInputPassword1"
                                                               name="confirmPass"
                                                               style={{
                                                                   color: 'black',
                                                                   backgroundColor: 'rgba(192, 192, 192, 0.0)'
                                                               }}/>
                                                        <ErrorMessage name="confirmPass" component="span"
                                                                      style={{color: "white"}}></ErrorMessage>
                                                    </div>
                                                </div>
                                                <div style={{paddingTop: "4%", marginBottom: "5%"}}>
                                                    <div
                                                        style={{width: '55%', marginLeft: 'auto', marginRight: 'auto'}}>
                                                        <button type="submit" style={{
                                                            width: '100%',
                                                            color: 'black',
                                                            backgroundColor: 'rgba(192, 192, 192, 0.4)',
                                                            marginLeft: "auto",
                                                            marginRight: "2%"
                                                        }}
                                                                onClick={handleClick}
                                                                className="btn btn-light">
                                                            Lưu Mật Khẩu Mới
                                                        </button>
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
                                                                    className="btn btn-light" onClick={handleClick}>Xác
                                                                Nhận
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Form>
                                        </Formik>
                                    </div>
                                </div>
                            </>
                            :
                            showForgot ?
                                <>
                                    <hr/>
                                    <div className="card-body"
                                         style={{width: "70%", marginLeft: "auto", marginRight: "auto"}}>
                                        <div>
                                            <Formik
                                                initialValues={initAccount}
                                                onSubmit={(values) => {
                                                    forgotPassword(values);
                                                }}
                                            >
                                                <Form>
                                                    <div className="mb-3">
                                                        <label htmlFor="exampleInputEmail1"
                                                               className="form-label"
                                                               style={{color: 'black'}}>Email</label>

                                                        <Field type="email" className="form-control"
                                                               id="exampleInputEmail1"
                                                               aria-describedby="emailHelp" name="email"
                                                               style={{
                                                                   color: 'black',
                                                                   backgroundColor: 'rgba(192, 192, 192, 0.0)'
                                                               }}/>
                                                    </div>
                                                    <div style={{
                                                        marginLeft: '5%',
                                                        marginRight: '5%'
                                                    }}>
                                                        <div style={{
                                                            width: '91%',
                                                            marginLeft: 'auto',
                                                            marginRight: 'auto',
                                                            marginBottom: "5%",
                                                            paddingTop: "5%"
                                                        }}>
                                                            <button type="button"
                                                                    style={{
                                                                        width: '50%',
                                                                        marginLeft: 'auto',
                                                                        marginRight: 'auto',
                                                                        backgroundColor: 'rgba(192, 192, 192, 0.4)'
                                                                    }}
                                                                    onClick={() => {
                                                                        setShowForgot(false);
                                                                        getTitle("Đăng nhập")
                                                                    }}
                                                                    className="btn btn-light">
                                                                Trở Về
                                                            </button>
                                                            <button type="submit"
                                                                    style={{
                                                                        width: '40%',
                                                                        marginLeft: '10%',
                                                                        marginRight: 'auto',
                                                                        backgroundColor: 'rgba(192, 192, 192, 0.4)'
                                                                    }}
                                                                    className="btn btn-light" onClick={handleClick}>Gửi
                                                            </button>
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
                                                    <div id="hiddenDiv"
                                                         style={{display: isOTPVisible ? 'block' : 'none'}}>
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
                                                                        className="btn btn-light"
                                                                        onClick={handleClick}>Xác Nhận
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Form>
                                            </Formik>
                                        </div>
                                    </div>
                                </>
                                :
                                <Tabs
                                    defaultActiveKey="login"
                                    id="justify-tab-example"
                                    className="mb-3"
                                    justify
                                    style={{marginTop: "3%"}}
                                >
                                    <Tab eventKey="login" title="Đăng Nhập" style={{ borderBottom: "1px", borderBottomColor:"black"}} onKeyUp={() => {
                                        getTitle("Đăng Nhập")
                                    }}>
                                        <div className="card-body"
                                             style={{width: "70%", marginLeft: "auto", marginRight: "auto"}}>
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
                                                                   style={{color: 'black'}} hidden={isOTPVisible}>Tên
                                                                Đăng Nhập</label>

                                                            <Field type={!isOTPVisible ? "text" : "hidden"}
                                                                   className="form-control"
                                                                   id="exampleInputEmail1"
                                                                   aria-describedby="emailHelp" name="userName"
                                                                   style={{
                                                                       color: 'black',
                                                                       backgroundColor: 'rgba(192, 192, 192, 0.0)'
                                                                   }}/>

                                                            <p className="" hidden={!isOTPVisible}>
                                                                Xin Chào: {value ? value : userName} !
                                                            </p>


                                                        </div>
                                                        <div className="mb-3"
                                                             style={{display: isOTPVisible ? 'none' : 'block'}}>
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
                                                                    <Link to="" onClick={() => {
                                                                        setShowForgot(true);
                                                                        getTitle("Lấy lại mật khẩu")
                                                                    }}
                                                                          style={{color: "black"}}>Quên mật khẩu</Link>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div style={{
                                                            display: isOTPVisible ? 'none' : 'block',
                                                            marginTop: forgot ? '20px' : '54px',
                                                            marginBottom: "5%"
                                                        }}>
                                                            <div style={{
                                                                width: '55%',
                                                                marginLeft: 'auto',
                                                                marginRight: 'auto'
                                                            }}>
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
                                                                    appId="263186536240807"
                                                                    onReject="9b7840e0e3c737ca4f9d6535c1006239">
                                                                    <BsFacebook color="black" size={30}/>
                                                                </LoginSocialFacebook>
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
                                                        <div id="hiddenDiv"
                                                             style={{display: isOTPVisible ? 'block' : 'none'}}>
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
                                                                            className="btn btn-light"
                                                                            disabled={isCounting}
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
                                                                            className="btn btn-light"
                                                                            onClick={handleClick}>Xác Nhận
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Form>
                                                </Formik>
                                            </div>
                                        </div>
                                    </Tab>
                                    <Tab eventKey="signup" title="Đăng Ký" onKeyUp={() => {
                                        getTitle("Đăng ký")
                                    }}>
                                        <div className="card-body"
                                             style={{width: "70%", marginLeft: "auto", marginRight: "auto"}}>
                                            <div>
                                                <Formik
                                                    initialValues={{
                                                        email: "",
                                                        userName: "",
                                                        password: "",
                                                        comfirmPass: ""
                                                    }}
                                                    onSubmit={(values) => {
                                                        signup(values);
                                                    }}
                                                    validationSchema={Yup.object({
                                                        email: Yup.string()//
                                                            .required('Email là bắt buộc.')
                                                            .min(6, "Không đủ ký tự cho phép (6 ký tự).")
                                                            .max(30, "Quá ký tự cho phép (30 ký tự)."),
                                                        userName: Yup.string()//
                                                            .required('Tên đăng nhập là bắt buộc.')
                                                            .min(6, "Không đủ ký tự cho phép (6 ký tự).")
                                                            .max(20, "Quá ký tự cho phép (20 ký tự)."),
                                                        password: Yup.string()//
                                                            .required('Mật khẩu là bắt buộc')
                                                            .min(6, "Không đủ ký tự cho phép (6 ký tự).")
                                                            .max(20, "Quá ký tự cho phép (20 ký tự)."),
                                                        confirmPass: Yup.string()//
                                                            .required('Nhập lại mật khẩu là bắt buộc')
                                                            .min(6, "Không đủ ký tự cho phép (6 ký tự).")
                                                            .max(20, "Quá ký tự cho phép (20 ký tự).")
                                                            .oneOf([Yup.ref('password'), null], "Mật khẩu không trùng khớp")
                                                    })}
                                                >
                                                    <Form>
                                                        <div className="mb-3">
                                                            <label htmlFor="exampleInputEmail1"
                                                                   className="form-label"
                                                                   style={{color: 'black'}}>Email</label>
                                                            <Field type="email" className="form-control"
                                                                   id="exampleInputEmail1"
                                                                   aria-describedby="emailHelp" name="email"
                                                                   style={{
                                                                       color: 'black',
                                                                       backgroundColor: 'rgba(192, 192, 192, 0.0)'
                                                                   }}/>
                                                            <ErrorMessage name="email" component="span"
                                                                          style={{
                                                                              color: "white",
                                                                              paddingTop: "3%"
                                                                          }}></ErrorMessage>
                                                        </div>
                                                        <div className="mb-3">
                                                            <label htmlFor="exampleInputEmail1"
                                                                   className="form-label"
                                                                   style={{color: 'black'}}>Tên Đăng Nhập</label>
                                                            <Field type="text" className="form-control"
                                                                   id="exampleInputEmail1"
                                                                   aria-describedby="emailHelp" name="userName"
                                                                   style={{
                                                                       color: 'black',
                                                                       backgroundColor: 'rgba(192, 192, 192, 0.0)'
                                                                   }}/>
                                                            <ErrorMessage name="userName" component="span"
                                                                          style={{
                                                                              color: "white",
                                                                              paddingTop: "3%"
                                                                          }}></ErrorMessage>
                                                        </div>
                                                        <div className="mb-3">
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
                                                                <ErrorMessage name="password" component="span"
                                                                              style={{color: "white"}}></ErrorMessage>
                                                            </div>
                                                        </div>
                                                        <div className="mb-3">
                                                            <div>
                                                                <label htmlFor="exampleInputPassword1"
                                                                       className="form-label"
                                                                       style={{color: 'black'}}>Nhập Lại Mật
                                                                    Khẩu</label>
                                                                <Field type="password" className="form-control"
                                                                       id="exampleInputPassword1"
                                                                       name="confirmPass"
                                                                       style={{
                                                                           color: 'black',
                                                                           backgroundColor: 'rgba(192, 192, 192, 0.0)'
                                                                       }}/>
                                                                <ErrorMessage name="confirmPass" component="span"
                                                                              style={{color: "white"}}></ErrorMessage>
                                                            </div>
                                                        </div>
                                                        <div style={{paddingTop: "4%", marginBottom: "5%"}}>
                                                            <div style={{
                                                                width: '55%',
                                                                marginLeft: 'auto',
                                                                marginRight: 'auto'
                                                            }}>
                                                                <button type="submit" style={{
                                                                    width: '100%',
                                                                    color: 'black',
                                                                    backgroundColor: 'rgba(192, 192, 192, 0.4)',
                                                                    marginLeft: "auto",
                                                                    marginRight: "2%"
                                                                }}
                                                                        onClick={handleClick}
                                                                        className="btn btn-light">
                                                                    Đăng Ký
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </Form>
                                                </Formik>
                                            </div>
                                        </div>
                                    </Tab>
                                </Tabs>
                    }
                </div>
            </div>
        </>
    );
}

export default LoginForm;
