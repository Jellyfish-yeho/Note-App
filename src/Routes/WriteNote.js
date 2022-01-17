import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";
import Button from "../Components/Button";
import { useEffect, useRef, useState } from "react";
import moment from "moment";
import { GetNote, SetNote } from "../Components/LocalStorage";

const Form = styled.form`
    margin-bottom: 5rem;
`;
const FormTitle = styled.legend`
    font-size: 2rem;
    text-align: center;
    font-weight: 700;
    margin-bottom: 2rem;
`;
const FormContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    margin: 1rem 0;
`;
const FormLabel = styled.label`
    font-size: 1.8rem;
    font-weight: 700;
    margin-right: 0.8rem;
`;
const InputArea = styled.input`
    border: none;
    border-bottom: 0.2rem solid #f6a89e;
    background-color: transparent;
    width: 100%;
    padding: 1rem 0.5rem;
    margin: 2rem 0;
    font-size: 1.2rem;
    &:focus {
        outline: none;
    }
`;
const TextArea = styled.textarea`
    resize: none;
    border: none;
    height: auto;
    border-bottom: 0.2rem solid #f6a89e;
    background-color: transparent;
    width: 100%;
    padding: 1rem 0.5rem;
    margin: 2rem 0;
    font-size: 1.2rem;
    &:focus {
        outline: none;
    }
`;

function WriteNote() {
    let history = useHistory();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [textAreaHeight, setTextAreaHeight] = useState("auto");
    const date = moment().format("YYYY-MM-DD HH:mm:ss a");
    const refTextArea = useRef(null);
    const titleSet = (e) => setTitle(e.target.value);
    const contentSet = (e) => {
        setContent(e.target.value);
        setTextAreaHeight("auto");
    };
    let note = {};
    let NoteApp = GetNote();
    const onSubmit = (e) => {
        e.preventDefault();
        //현재 적혀진 값 가져오기
        note = { title, content, date };
        //localstorage에 값이 있는 경우, 현재 적혀진 값을 추가해 주기
        if (NoteApp !== null) {
            NoteApp = [note, ...NoteApp];
            //만약 값이 없을 경우, note만 추가해 주기
        } else if (NoteApp === null) {
            NoteApp = [note];
        }
        //localStorage에 업데이트된 값 다시 넣어주기
        SetNote(NoteApp);
        history.push("/");
    };
    useEffect(() => {
        setTextAreaHeight(`${refTextArea.current.scrollHeight}px`);
    }, [content]);

    return (
        <div>
            <Form onSubmit={onSubmit}>
                <FormTitle>New Note</FormTitle>
                <FormContainer>
                    <FormLabel htmlFor="title">Title</FormLabel>
                    <InputArea
                        name="title"
                        onChange={titleSet}
                        value={title}
                        required
                    />
                </FormContainer>
                <FormContainer>
                    <FormLabel htmlFor="content">Content</FormLabel>
                    <TextArea
                        ref={refTextArea}
                        name="content"
                        onChange={contentSet}
                        rows={1}
                        style={{ height: textAreaHeight }}
                        value={content}
                        required
                    ></TextArea>
                </FormContainer>
                <Button add text="Save" />
            </Form>
            <Link to="/">
                <Button normal text="Back" />
            </Link>
        </div>
    );
}

export default WriteNote;
