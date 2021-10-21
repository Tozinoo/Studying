import React, { Component } from "react";

class LifeCycle extends Component {
    // render: 화면 내용이 변경되어야 할 시점에 자동 호출
    // render() {
    //     console.log("render호출");
    //     return <div>[렌더함수]</div>;
    // }
    ///////////////////////////////////////////////////////
    constructor(props) {
        super(props);
        this.state = {};
        console.log("생성자 함수 호출");
    }
    render() {
        console.log("render호출");
        return <div>[생성자 함수 호출]</div>;
    }
}

export default LifeCycle;
