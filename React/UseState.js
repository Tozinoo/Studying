import React, { useState } from "react";

const UseState = () => {
    const [name, setName] = useState("");
    const [nickname, setNickname] = useState("");

    const onChangeName = (e) => {
        setName(e.target.value);
    };

    const onChangeNickname = (e) => {
        setNickname(e.target.value);
    };

    return (
        <div>
            <div>
                <div>
                    <input value={name} onChange={onChangeName} />
                </div>
                <div>
                    <input value={nickname} onChange={onChangeNickname} />
                </div>
            </div>
            <div>
                <div>
                    <b>이름 : </b> {name}
                </div>
                <div>
                    <b>닉네임 : </b> {nickname}
                </div>
            </div>
        </div>
    );
};

export default UseState;
