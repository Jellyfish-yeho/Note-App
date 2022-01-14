import { Link } from "react-router-dom";
import styled from "styled-components";
import Button from "../Components/Button";
import { GetNote, SetNote } from "../Components/LocalStorage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faTrash,
    faPencilAlt,
    faChevronDown,
    faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const Title = styled.h3`
    font-size: 2rem;
    text-align: center;
    font-weight: 700;
    margin-bottom: 2rem;
`;
const InputArea = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 1.5rem 0;
    svg {
        font-size: 1.5rem;
    }
`;
const SearchInput = styled.input`
    border: none;
    border-bottom: 0.2rem solid #f6a89e;
    background-color: transparent;
    width: 90%;
    padding: 1rem 0.5rem;
    font-size: 1.2rem;
    &:focus {
        outline: none;
    }
`;
const NoteList = styled.ul`
    width: 100%;
    height: calc(100% - 2rem);
    margin-bottom: 7rem;
`;
const NoteItemContainer = styled.details`
    &[open] summary svg {
        transform: rotate(180deg);
    }
    summary {
        &::marker {
            display: none;
            content: "";
        }
        font-size: 1.6rem;
        font-weight: 700;
        margin: 1rem 0;
        cursor: pointer;
    }
    div {
        position: relative;
        display: flex;
        flex-direction: column;
        margin: 1rem 0;
        p {
            white-space: pre;
            font-size: 1.2rem;
            padding: 1rem 0;
            line-height: 1.5;
            &:focus {
                outline: none;
            }
        }
        span {
            font-size: 1rem;
            position: absolute;
            bottom: 5%;
            right: 2%;
            color: rgba(0, 0, 0, 0.5);
        }
    }
`;
const NoteItem = styled.li`
    font-size: 1.6rem;
    background-color: white;
    padding: 1rem;
    border: 0.2rem solid #33322e;
    border-radius: 0.8rem;
    box-shadow: 0.2rem 0.2rem 0 #33322e;
    margin: 1rem 0;
    svg {
        font-size: 1.5rem;
        cursor: pointer;
        margin-left: 1rem;
        &:hover {
            color: #8cd4cb;
        }
    }
`;
const Icons = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-right: 1rem;
`;

function Home() {
    //localStorage 에 있는 값 가져오기
    let NoteApp = GetNote();
    const [noteList, setNoteList] = useState(NoteApp);
    const [searchKeyword, setSearchKeyword] = useState("");
    const onChange = (e) => {
        setSearchKeyword(e.target.value);
    };
    const onClick = (index) => {
        //배열에서 해당 노트 지우기
        let newNoteList = noteList.filter((note, i) => i !== index);
        setNoteList(newNoteList);
        //localstorage에도 반영
        SetNote(newNoteList);
    };
    return (
        <>
            <div>
                <Title>Note List</Title>
                <InputArea>
                    <SearchInput
                        placeholder="Search"
                        value={searchKeyword}
                        onChange={onChange}
                    />
                    <FontAwesomeIcon icon={faSearch} />
                </InputArea>
                <NoteList>
                    {noteList === null || noteList.length === 0 ? (
                        <NoteItem>There is no note written.</NoteItem>
                    ) : (
                        noteList
                            .filter(note => note.title.includes(searchKeyword) || note.content.includes(searchKeyword))
                            .map((note, index) => (
                                <NoteItem key={index}>
                                    <NoteItemContainer>
                                        <summary>
                                            {note.title}
                                            <FontAwesomeIcon
                                                icon={faChevronDown}
                                            />
                                        </summary>
                                        <div>
                                            <p>{note.content}</p>
                                            <span>{note.date}</span>
                                        </div>
                                    </NoteItemContainer>
                                    <Icons>
                                        <Link to={`/note/${index}`} key={index}>
                                            {" "}
                                            <FontAwesomeIcon
                                                icon={faPencilAlt}
                                            />
                                        </Link>
                                        <FontAwesomeIcon
                                            icon={faTrash}
                                            onClick={() => onClick(index)}
                                        />
                                    </Icons>
                                </NoteItem>
                            ))
                    )}
                </NoteList>
            </div>
            <Link to="/writeNote">
                <Button add text="New Note" />
            </Link>
        </>
    );
}

export default Home;
