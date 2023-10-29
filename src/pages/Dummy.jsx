import { Link, useParams } from "react-router-dom"
import Sidebar from "../components/Sidebar"
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { useState } from 'react'

function test(name,parent) {
    alert("name:" + name + "; parent:" + parent)
}

const Dummy = () => {
    const {"*": currentPath} = useParams()
    
    const [show,setShow] = useState(false)
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    console.log(currentPath)
    if(currentPath === "") {
        return(
            <>
                <h1>Dummy page for testing</h1>
                <p>in the future replace this code with an automatic redirect to </p>
                <Link to={"/*"}>
                    <button>here</button>
                </Link>

                <p>if you're here to test the groups page go </p>
                <Link to={"Instituicao"}>
                    <button>here</button>
                </Link>
            </>
        )
    }
    const instituicao = {
        "Instituicao": {
                "turma1": ["grupo1","grupo2","grupo3"],
                "test": {
                    "sub turma1": ["grupo1","grupo2","grupo3"],
                    "sub turma2": ["grupo1","grupo2","grupo3"]
                },
                "turma2": ["grupo1","grupo2","grupo3"],
                "turma3": ["grupo1","grupo2","grupo3"],
                "turma4": ["grupo1","grupo2","grupo3"],
            }
        }
    return(
        <>
            <div className="d-flex flex-column" style={{height: "100%"}}>
                <CreateGroupModal show={show} handleClose={handleClose}/>
                <Sidebar content={instituicao} activeLink={currentPath} onClick={handleShow}/>
                {/* alternative a onClick seria inline: (name,parent) => { conteudo da funcao } */}
            </div>
        </>
    )
}

function CreateGroupModal({show,handleClose}) {
    return(
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Create a new group</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <form>
                    <div className="mb-3">
                        <label for="formGroupName" className="form-label">Group name</label>
                        <input type="text" className="form-control" id="formGroupName"/>
                    </div>
                </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Create
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}


export default Dummy