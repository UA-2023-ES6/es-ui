import { useEffect, useRef, useState } from 'react'
import {CognitoUser} from "amazon-cognito-identity-js"
import {
  MDBContainer,
  MDBBtn,
  MDBInput,
}
from 'mdb-react-ui-kit';
import userPool from "../UserPool";
import { useLocation,useNavigate} from 'react-router-dom';
import SuccessMessage from '../components/SuccessMessage';
import ErrorMessage from '../components/ErrorMessage';

function Confirmation() {
    const navigate = useNavigate();
    const {state} = useLocation()
    const [username,setUsername] = useState("")
    const [confirmation_pin, setCode] = useState("")
    const [sucess,setSucess] = useState("")
    const [error,setError] = useState("")

    useEffect(() => {
        console.log(state)
        if(state != null && "username" in state) {
            setUsername(state.username)
            console.log(username)
        }
        else {
            navigate("/")
        }
    },[state])

    function confirm() {
        console.log(username)
        const userData = {
            Username: username,
            Pool: userPool
        }
        const cognitoUser = new CognitoUser(userData)
        cognitoUser.confirmRegistration(confirmation_pin,false,(err,result) => {
            if(err) {
                setError("Invalid code. Please make sure the code is correct.\nIf the error persists please request a new code.")
            }
            else {
                navigate("/auth",{state: {confirmed: true}})
            }
        })
    }

    function resend() {
        const userData = {
            Username: username,
            Pool: userPool
        }
        const cognitoUser = new CognitoUser(userData)
        cognitoUser.resendConfirmationCode((err,result) => {
            if(err) {
            }
            else {
                setSucess("Code has been resent")
            }
        })
    }

    return (
            <MDBContainer className="p-3 my-5 d-flex flex-column align-items-center justify-content-center w-25">
                {sucess ? <SuccessMessage message={sucess}/> : null}
                {error ? <ErrorMessage message={error}/> : null}
                <h1 className="mb-4">Email Confirmation</h1>

                
                <p className="mb-4 text-center">
                    We have sent you an email with a confirmation code to verify your email address.
                    Please enter the code below to confirm your email address.
                </p>
                
                <MDBInput wrapperClass='mb-4' label='Confirmation Code' id='form1' type='confirmation-pin' value={confirmation_pin} onChange={(event) => setCode(event.target.value)}/>
                
                <MDBBtn className="mb-4 w-50" onClick={confirm}>Confirm Email</MDBBtn>
                <MDBBtn className="mb-4 w-50" style={{backgroundColor: "grey"}} onClick={resend}>Resend Code</MDBBtn>
            </MDBContainer>
    );
}

export default Confirmation;