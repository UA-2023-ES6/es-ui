import { Link, useParams } from "react-router-dom"
import {Sidebar,SidebarGroup,SidebarElement} from "../components/Sidebar"
import {Tabs} from "../components/Tabs"
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { useEffect, useState } from 'react'


const test = {
    data: [
      {
        id: 1,
        name: "Default Institution",
        usersIds: [],
        subGroup: [
          {
            id: 2,
            name: "5",
            usersIds: [],
            subGroup: [
              {
                id: 3,
                name: "Group 1.1",
                usersIds: [],
                subGroup: [
                  {
                    id: 4,
                    name: "Group 1.1.1",
                    usersIds: [],
                    subGroup: []
                  },
                  {
                    id: 7,
                    name: "5",
                    usersIds: [],
                    subGroup: []
                  }
                ]
              },
              {
                id: 5,
                name: "Group 1.2",
                usersIds: [],
                subGroup: []
              }
            ]
          },
          {
            id: 6,
            name: "Group 2",
            usersIds: [],
            subGroup: []
          }
        ]
      }
    ]
  }

const SERVER_API = "http://localhost:5000/api"

const Dummy = () => {
    const {"*": currentPath} = useParams()
    const [groupName,setGroupName] = useState("")
    const [path,setPath] = useState("/" + test.name)
    const [sidebarContent,setSidebarContent] = useState([])
    //test.groups[0].groups = sidebarContent

    //const [updateFlag,setUpdateFlag] = useState(false)
    const [id,setGroupID] = useState(-1)

    const [show,setShow] = useState(false)
    const handleClose = () => setShow(false)
    const handleShow = (id) => { 
        setGroupID(id)
        setShow(true) 
    }

    const handleChange = (e) => setGroupName(e.target.value)
    const handleCreate = () => {
        console.log(groupName)
        const data = {
            name: groupName,
            parentGroupId: id
        }

        const t = JSON.stringify(data)
        console.log(t)

        fetch(`${SERVER_API}/Group`,{
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json"
            },
            body: t
        }).catch(err => console.log(err))
        handleClose()
    }


    useEffect(() => {
        getGroups().then((data) => {
            setSidebarContent(data)
        })
    },[])

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

    return(
        <>
            <div className="d-flex" style={{ height: "100%" }}>
                <div>
                    <div className="d-flex flex-column" style={{ height: "100%" }}>
                    <CreateGroupModal show={show} handleClose={handleClose} onNameChange={handleChange} onCreate={handleCreate}/>
                    <MySidebar content={sidebarContent} onAddClick={handleShow} onElementClick={(path) => {setPath(path)}} activeLink={path} basePath={""}/>
                    </div>
                </div>

                <div className="flex-grow-1">
                    <Tabs />
                </div>
            </div>
        </>
    )
}

async function getGroups() {
    try{
        const response = await fetch(`${SERVER_API}/Group?Take=100&Skip=0`)
        const data = await response.json()
        return data.data
    }
    catch {
        console.log("error")
        return []
    }
}

function MySidebar({content,onAddClick,onElementClick,activeLink,basePath}) {
    return(
        <Sidebar>
            {content.map((institution) => <SidebarContent key={institution.name} content={institution} onAddClick={onAddClick} onElementClick={onElementClick} activeLink={activeLink} parentPath={basePath}/> )}
        </Sidebar>
    )
}

function SidebarContent({content,onAddClick,parentPath,onElementClick,activeLink}) {
    var innerContent = ""
    const path = parentPath + "/" + content.name
    if(content.constructor === Object && "subGroup" in content && content.subGroup.length > 0) {
        innerContent = <>
            <SidebarGroup>
                <Group title={content.name} onAddClick={onAddClick} activeLink={activeLink} onElementClick={onElementClick} path={path} id={content.id} headerKey={"g" + content.id}>
                    {
                        content.subGroup.map((group) => {return <SidebarContent key={group.name} content={group} onAddClick={onAddClick} parentPath={path} onElementClick={onElementClick} activeLink={activeLink}/>})
                    }
                </Group>
            </SidebarGroup>
        </>
    }
    else {
        innerContent = <>
            <SidebarElement>
                <LinkElement name={content.name} activeLink={activeLink} onAddClick={onAddClick} path={path} onElementClick={onElementClick} id={content.id}/>
            </SidebarElement>
        </>
    }

    return(
        <>
            {innerContent}
        </>
    )
}

function CreateGroupModal({show,handleClose,onNameChange,onCreate}) {
    return(
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Create a new group</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <form>
                    <div className="mb-3">
                        <label className="form-label">Group name</label>
                        <input type="text" className="form-control" id="formGroupName" onChange={onNameChange} />
                    </div>
                </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={onCreate}>
                        Create
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

//sidebar helper functions
function Group({title,onAddClick,activeLink,onElementClick,path,id,headerKey,children}) {
    return(
        <>
            <div className="d-flex add-btn-group align-items-center">
                <div className="d-flex align-items-center" style={{flex: "1"}}>
                    <button className="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed" data-bs-toggle="collapse" data-bs-target={"#" + headerKey + "-collapse"} aria-expanded="true"/>
                    <LinkButton name={title} activeLink={activeLink} onElementClick={onElementClick} path={path}/>
                </div>
                <AddBtn onClick={onAddClick} id={id}/>
            </div>
            <div className="collapse show" style={{paddingLeft: "2rem"}} id={headerKey + "-collapse"}>
                <ul className="btn-toggle-nav list-unstyled">
                    {children}
                </ul>
            </div>
        </>
    )
}

function LinkElement({activeLink,name,onAddClick,path,onElementClick,id}) {
    return(
        <div className="d-flex add-btn-group align-items-center">
            <div style={{flex: "1"}}>
                <LinkButton name={name} activeLink={activeLink} path={path} onElementClick={onElementClick}/>
            </div>
            <AddBtn onClick={onAddClick} id={id}/>
        </div>
    )
}

function LinkButton({name,activeLink,path,onElementClick}) {
    const active = activeLink === path
    return(
        <button className={"btn border-0 rounded p-2 " + (active ? "btn-primary" : "")} onClick={() => {onElementClick(path)}}>
            {name}
        </button>
    )
}

function AddBtn({onClick,id}) {
    return(
        <button className="btn add-btn" onClick={() => {onClick(id)}}/>
    )
}


export default Dummy