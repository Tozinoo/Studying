import React from "react";
import "./ScssLogin.scss";

const Login = () => {
    return (
        <div className="LoginComponent">
            <div className="login-title">로긴</div>
            <form>
                <div className="login-form">
                    <div className="login-id">
                        <div className="login-sub">아이디</div>
                        <input className="login-input" type="text"></input>
                    </div>
                    <div className="login-pwd">
                        <div className="login-sub">패스워드</div>
                        <input className="login-input" type="password"></input>
                    </div>
                    <div className="login-btn">
                        <button>로그인</button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Login;
