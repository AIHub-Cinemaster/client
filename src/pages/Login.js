import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import $ from "jquery";
import port from "./../components/data/port.json";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import "./../assets/css/Login.css";

const Login = () => {
  
  
  // $( document ).ready( function(){
  //   $('.message a').click(function(){
  //     $('form').animate({height: "toggle", opacity: "toggle"}, "slow");
  //   });
  // })

  
  //----------------------------- 공통 -----------------------------//
  const [isSignUp, setSignUp] = useState(false);
  const navigate = useNavigate();
  //----------------------------- 로그인 -----------------------------//
  const [inErrorMessage, setInErrorMessage] = useState("");
  const [signInData, setSignInData] = useState({
    email: "",
    password: "",
  });

  useEffect(()=>{
    $('.message span').click(function(){
      $('form').animate({height: "toggle", opacity: "toggle"}, "slow");
    });
  },[])


  const [cookies, setCookie, removeCookie] = useCookies(["userData"]);

  const onClickLoginButton = () => {
    if (signInData.email === "") {
      alert("이메일을 입력해주세요.");
      $("#email").focus();
      return;
    }

    if (signInData.password === "") {
      alert("패스워드를 입력해주세요.");
      $("#password").focus();
      return;
    }

    sendSignInData()
      .then((res) => {
        console.log("res", res.data);
        setCookie("userData", res.data, { path: "/" });
        navigate("/");

        alert("로그인이 완료되었습니다.");

      })
      .catch((e) => {
        console.log(e);
        setInErrorMessage(e.response.data.fail);
      })
      .finally(() => {
        console.log("final", cookies.userData);
      });
  };

  // 로그인 data를 입력받는 함수
  const onChangeSignInData = (event) => {
    setSignInData({
      ...signInData,
      [event.target.name]: event.target.value,
    });
  };

  const sendSignInData = async () => {
    console.log(signInData);
    return await axios.post(`${port.url}/user/login`, signInData);
  };

  //----------------------------- 회원가입 -----------------------------//
  const [upErrorMessage, setUpErrorMessage] = useState("");
  const [signUpData, setSignUpData] = useState({
    email: "",
    password: "",
    rePassword: "",
    name: "",
  });
  const onClickSignUpButton = () => {
    console.log(signUpData);
    if (signUpData.email === "") {
      alert("이메일을 입력해주세요.");
      $("#emailUp").focus();
      return;
    }

    if (signUpData.password === "") {
      alert("패스워드를 입력해주세요.");
      $("#passwordUp").focus();
      return;
    }

    if (signUpData.rePassword === "") {
      alert("확인 패스워드를 입력해주세요.");
      $("#rePasswordUp").focus();
      return;
    }

    if (signUpData.name === "") {
      alert("이름을 입력해주세요.");
      $("#nameUp").focus();
      return;
    }

    if (signUpData.password !== signUpData.rePassword) {
      alert("비밀번호와 확인 비밀번호가 같지 않습니다.");
      setSignUpData({
        ...signUpData,
        password: "",
        rePassword: "",
      });
      $("#passwordUp").focus();
      return;
    }

    sendSignUpData()
      .then((res) => {
        alert(res.data.result);
        window.location.reload(); // window는 실행하는 최고 객체 즉 브라우저. 브라우저를 새로 고침
      })
      .catch((e) => {
        setUpErrorMessage(e.response.data.error);
      });
  };

  const sendSignUpData = async () => {
    console.log("signUpdaata");
    return await axios.post(`${port.url}/user/signUp`, signUpData);
  };

  // 회원가입 data를 입력받는 함수
  const onChangeSignUpData = (event) => {
    setSignUpData({
      ...signUpData,
      [event.target.name]: event.target.value,
    });
  };


  return (
    <>
      {
        cookies.userData ? (
          <>
            {/* <button onClick={()=>{navigate('/')}}>test</button> */}
          </>
        ):(
          <div className="login-page">
            <div className="form">
                  {/* 로그인 */}
                  <form className="login-form">
                    <input 
                      id="email"
                      name="email"
                      type="text"
                      placeholder="Email"
                      value={signInData.email}
                      onChange={onChangeSignInData}
                    />
                    <input 
                      type="password"
                      placeholder="Password"
                      onChange={onChangeSignInData}
                      name="password"
                      id="password"
                      value={signInData.password}
                    />
                    <p className="warning-text">{inErrorMessage}</p>
                    <button onClick={onClickLoginButton}>login</button>
                    {/* <button onClick={()=>{navigate('/')}}>test</button> */}

                    <p className="message">Not registered? <span><strong>Create an account</strong></span></p>
                  </form>
                
                  {/* 회원가입 */}
                  <form className="register-form">
                    <input 
                      id="emailUp"
                      name="email"
                      type="email"
                      placeholder="Email"
                      value={signUpData.email}
                      onChange={onChangeSignUpData}
                    />
                    <input 
                      id="passwordUp"
                      name="password"
                      type="password"
                      placeholder="Password"
                      value={signUpData.password}
                      onChange={onChangeSignUpData}
                    />
                    <input 
                      id="rePasswordUp"
                      name="rePassword"
                      type="password"
                      placeholder="re-Password"
                      value={signUpData.rePassword}
                      onChange={onChangeSignUpData}
                    />
                    <input 
                      id="nameUp"
                      name="name"
                      type="text"
                      placeholder="Name"
                      value={signUpData.name}
                      onChange={onChangeSignUpData}
                    />
                    <p className="warning-text">{upErrorMessage}</p>
                    <button onClick={onClickSignUpButton}>Sign Up</button>
                    <p className="message">Already registered? <span><strong>Sign In</strong></span></p>
                  </form>
            </div>
          </div>
        )
      }
    </>
  )
}

export default Login;