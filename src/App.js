import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import Note from "./Components/Note";
import Home from "./Routes/Home";
import WriteNote from "./Routes/WriteNote";

const GlobalStyles = createGlobalStyle`
  ${reset};
  html{
    font-size: 10px;
  }
  body{
    margin: 0;
    padding: 0;
    background-color: #8CD4CB;
    font-family: 'Roboto', sans-serif;
    color : #33322E;
    word-break: break-all;
    width: 100%;
    height: 100%;
  }
  *{
    box-sizing: border-box;
  }
  a{
    color: inherit;
    text-decoration: none;
  }
  textarea{
    font-family: 'Roboto', sans-serif;
    resize: none;
    overflow: hidden;
  }
  input{
    font-family: 'Roboto', sans-serif;
  }
`;

const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
`;
const Pop = styled.div`
    margin-top: 3rem;
    max-width: calc(100% - 10rem);
    width: 50rem;
    height:  fit-content;
    background-color: #f9f3e5;
    padding: 3.5rem 3rem;
    box-shadow: 1.2rem 1.2rem 0 #33322e;
    border-radius: 3.6rem;
    border: 0.4rem solid #33322e;
    position: relative;
`;

const Title = styled.h1`
    text-align: center;
    font-size: 3rem;
    font-weight: 800;
    padding: 0 0 1rem;
    border-bottom: 0.4rem solid #33322e;
    margin-bottom: 1.5rem;
`;


function App(){
     return (
        <>
            <GlobalStyles />
            <Container>
                <Pop>
                    <Title>Note App</Title>
                    <Router basename={process.env.PUBLIC_URL}>
                        <Switch>
                            <Route path="/" exact>
                                <Home />
                            </Route>
                            <Route path="/writeNote">
                                <WriteNote />
                            </Route>
                            <Route path="/note/:noteIndex">
                                <Note />
                            </Route>
                        </Switch>
                    </Router>
                </Pop>
            </Container>
        </>
    );
  }

export default App;
