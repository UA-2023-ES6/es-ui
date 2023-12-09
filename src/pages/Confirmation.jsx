import React from 'react';
import {
  MDBContainer,
  MDBBtn,
  MDBInput,
}
from 'mdb-react-ui-kit';

function Confirmation() {

    const [confirmation_pin, setCode] = React.useState("")

    function confirm() {
        console.log(confirmation_pin)
    }

    function resend() {
        console.log("Resend")
    }

    return (
            <MDBContainer className="p-3 my-5 d-flex flex-column align-items-center justify-content-center w-25">

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