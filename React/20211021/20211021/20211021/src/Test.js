import { forEach } from "lodash";
import React, { Component } from "react";

class Test extends Component {
    constructor(props) {
        super(props);
        this.state = {
            a: ["서울", "도쿄", "베이징", "워싱턴"],
        };
    }

    componentDidMount() {
        // var jsString = "자바";
        // var jsString1 = "입니다.\n다음은";
        // console.log(jsString + "문자열" + jsString1);
        // var ES6string = "ES6";
        // var ES6string1 = "입니당";
        // console.log(`${ES6string}문자열 ${ES6string1}`);
        // var longString = "ES6에 추가 된 스트링..";
        // console.log(longString.startsWith("ES6"));
        // console.log(longString.endsWith("스트링"));
        // console.log(longString.includes("추가 된"));
        // ES5
        // var varArr1 = ["num1", "num2"];
        // var varArr2 = ["num3", "num4"];
        // var sumArr = [].concat(varArr1, varArr2);
        // console.log(sumArr);
        // var obj1 = { key1: "value1", key2: "value2" };
        // var obj2 = { key3: "value3", key4: "value4" };
        // var sumObj = Object.assign({}, obj1, obj2);
        // console.log(sumObj);
        // // ES6
        // let sumLetArr = [...varArr1, ...varArr2];
        // var sumObj_six = { ...obj1, ...obj2 };
        // console.log("ES6 : ", sumLetArr);
        // console.log("ES6 : ", sumObj_six);
        // var ForeachArr = [3, 3, 19, 29];
        // var newArr = [];
        // ForeachArr.forEach((e) => {
        //     newArr.push(e);
        // });
        // console.log(newArr);
        // var map_arr = [1, 2, 3, 4];
        // let map_newArr = map_arr.map((x) => x);
        // let map_newArr1 = map_arr.map((x) => x * 2);
        // console.log(map_newArr);
        // console.log(map_newArr1);
    }

    render() {
        return (
            <div>
                <ul>
                    {this.state.a.map((e) => {
                        return <li>{e}</li>;
                    })}
                </ul>
            </div>
        );
    }
}

export default Test;
