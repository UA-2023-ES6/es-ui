import React from 'react';
import {
  MDBContainer,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
  MDBBtn,
  MDBInput,
}
from 'mdb-react-ui-kit';

import { useState, useContext } from "react"
import { AccountContext } from "../components/Account"
import userPool from "../UserPool"
import { useNavigate } from "react-router-dom";
import SuccessMessage from '../components/SuccessMessage';
import ErrorMessage from '../components/ErrorMessage';

function LoginPage({setLoggedIn,setIdToken,_setUsername}) {

  const [justifyActive, setJustifyActive] = useState('tab1');;

  const [username,setUsername] = useState("")
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")

  const [error,setError] = useState("")
  const [success,setSuccess] = useState("")

  const {authenticate} = useContext(AccountContext)

  const navigate = useNavigate();

  const signIn = (event) => {
      event.preventDefault()
      authenticate(email,password)
      .then((data) => {
          console.log(data)
          setLoggedIn(true)
          setIdToken(data.idToken.jwtToken)
          _setUsername(data.idToken.payload["cognito:username"])
          navigate("/dummy/institution", {state:{success:"Logged in successfully."}})
      })
      .catch((err) => {
          setError(err.message)
      })
      
  }

  const signUp = (event) => {
    event.preventDefault()
    userPool.signUp(email,password,[{"Name":"custom:username","Value":username}],null, (err,data) => {
        if(err){
            console.error(err)
            setError(err.message)
        } else {
          console.log(data)
          handleJustifyClick('tab1')
          setSuccess("User created successfully. Please check your email to confirm your account.")
        }
      })
  }

  const handleJustifyClick = (value) => {
    if (value === justifyActive) {
      return;
    }
    setUsername("")
    setEmail("")
    setPassword("")
    setError("")
    setSuccess("")
    setJustifyActive(value);
  };

  return (
    <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
      {error ? <ErrorMessage message={error}/> : null}
      {success ? <SuccessMessage message={success}/> : null}

      <MDBTabs pills justify className='mb-3 d-flex flex-row justify-content-between'>
        <MDBTabsItem>
          <MDBTabsLink onClick={() => handleJustifyClick('tab1')} active={justifyActive === 'tab1' ? 1 : 0}>
            Login
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink onClick={() => handleJustifyClick('tab2')} active={justifyActive === 'tab2' ? 1 : 0}>
            Register
          </MDBTabsLink>
        </MDBTabsItem>
      </MDBTabs>

      <MDBTabsContent>

        <MDBTabsPane open={justifyActive === 'tab1' ? 1 : 0}>

          <MDBInput wrapperClass='mb-4' label='Email' id='form1' type='email' value={email} onChange={(event) => setEmail(event.target.value)}/>
          <MDBInput wrapperClass='mb-4' label='Password' id='form2' type='password' value={password} onChange={(event) => setPassword(event.target.value)}/>

          <MDBBtn className="mb-4 w-100" onClick={signIn}>Sign in</MDBBtn>


          <p className="text-center">Not a member? <a onClick={() => handleJustifyClick('tab2')} active={justifyActive === 'tab2' ? 1 : 0} href='#'>Register</a></p>

        </MDBTabsPane>

        <MDBTabsPane open={justifyActive === 'tab2' ? 1 : 0}>
            
          <MDBInput wrapperClass='mb-4' label='Username' id='form1' type='text' value={username} onChange={(event) => setUsername(event.target.value)} />
          <MDBInput wrapperClass='mb-4' label='Email' id='form1' type='email' value={email} onChange={(event) => setEmail(event.target.value)} />
          <MDBInput wrapperClass='mb-4' label='Password' id='form1' type='password' value={password} onChange={(event) => setPassword(event.target.value)} />

          <MDBBtn className="mb-4 w-100" onClick={signUp}>Sign up</MDBBtn>

        </MDBTabsPane>

      </MDBTabsContent>

    </MDBContainer>
  );
}

export default LoginPage;