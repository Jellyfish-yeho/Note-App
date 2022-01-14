import { useState } from "react";
import styled from "styled-components";

const Pop = styled.div`
    width: 500px;
    height: 500px;
    background-color: #f7d794;
    padding: 3.5rem 3rem;
    border-radius: 3rem;
`;

const Title = styled.h1`
    font-size: 3rem;
    font-weight: 800;
    padding: 1rem 0;
`;

const SubTitle = styled.p`
    font-size: 1.7rem;
`;

const InputArea = styled.input`
    border: none;
    border-radius: 0.5rem;
    background-color: #fff;
    width: 80%;
    padding: 1rem 2rem;
    margin: 2rem 1rem 2rem 0;
    font-size: 1.2rem;
    &:focus{
        outline: none;
    }
`;

const AddBtn = styled.button`
    border: none;
    background-color: #f19066;
    color: #fff;
    border-radius: 1rem;
    padding: 1rem 2rem;
`;

const MemoArea = styled.ul`
    width: 100%;
    height: 65%;
    overflow-y: scroll;
`;

const MemoItem = styled.li`
    display: block;
    width: 95%;
    padding: 1rem;
    margin: .5rem 0;
    background-color: #fff;
    font-size: 1.2rem;
`;

const CurrentMemo = [];
for(let i=0; i<5; i++){
    CurrentMemo.push(`Wanna go home...(${i})`);
}

function Popup() {
    const [memo, setMemo] = useState("");
    const [memos, setMemos] = useState(CurrentMemo);
    const onSubmit = (e) => {
        e.preventDefault();
        if (memo === "") {
            return;
        }
        setMemo("");
        setMemos((current) => [memo, ...current]);
    };
    const onChange = (e) => setMemo(e.target.value);
    return (
        <Pop>
            <Title>Note App</Title>
            <SubTitle>Write your memo.</SubTitle>
            <form onSubmit={onSubmit}>
                <InputArea
                    value={memo}
                    onChange={onChange}
                    placeholder="Enter new memo..."
                />
                <AddBtn>Add</AddBtn>
            </form>
            <MemoArea>
                {memos.map((memo, index) => (
                    <MemoItem key={index}>{memo}</MemoItem>
                ))}
            </MemoArea>
        </Pop>
    );
}

export default Popup;
