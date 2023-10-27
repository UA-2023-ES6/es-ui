import { Link } from "react-router-dom"

var _activeLink = ""
//exemplo de activeLink: Instituicao/test/subturma1

const Sidebar = ({content,activeLink=""}) => {
    const turmas = {
        "turma1": ["grupo1","grupo2","grupo3"],
        "test": {
            "sub turma1": ["grupo1","grupo2","grupo3"],
            "sub turma2": ["grupo1","grupo2","grupo3"]
        },
        "turma2": ["grupo1","grupo2","grupo3"],
        "turma3": ["grupo1","grupo2","grupo3"],
        "turma4": ["grupo1","grupo2","grupo3"],
    }
    _activeLink = activeLink
    return(
    <div className="d-flex flex-column p-3 bg-body-tertiary" style={{width: "280px",flex: "1"}}>
    <ul className="nav nav-pills flex-column mb-auto">
      <li className="nav-item ps-3">
        <LinkButton name="Instituicao" parentLink=""/>
        <div className="d-flex flex-column">
            <ul className="nav nav-pills flex-column mb-auto">
                {
                    <CollapsableGroup content={turmas} parent="Instituicao/" />
                }
            </ul>
        </div>
      </li>
    </ul>
  </div>
    )
}

function CollapsableGroup({content= null,parent}) {
    var x = ""

    if(content != null) {
        if(content.constructor == Object) {
            x = Object.entries(content).map(([_name,_content]) => {
                return <Group name={_name} content={_content} parent={parent} key={_name} />
            })
        }
        else {
            x = content.map((_name) => {
                return <ListElement text={_name} parent={parent} key={_name} />
            })
        }
    }


    return(
        <div>
            {x}
        </div>
    )
}

function Group({name,content,parent}) {
    return(
        <>
            <div className="d-flex align-items-center">
                <button className="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed" data-bs-toggle="collapse" data-bs-target={"#" + name.replace(/\s/g, "") + "-collapse"} aria-expanded="true"/>
                <LinkButton name={name} parentLink={parent}/>
            </div>
            <div className="collapse show" style={{paddingLeft: "2rem"}} id={name.replace(/\s+/g, "") + "-collapse"}>
                <ul className="btn-toggle-nav list-unstyled">
                    {
                        <CollapsableGroup content={content} parent={parent + name.replace(/\s+/g, "") + "/"}/>
                    }
                </ul>
            </div>
        </>
    )
}

function ListElement({text,parent}) {
    return(
        <li className="ps-4">
            <LinkButton name={text} parentLink={parent} />
        </li>
    )
}

function LinkButton({name,parentLink}) {
    var link = parentLink + name.replace(/\s+/g, "")
    var active = link == _activeLink
    console.log(_activeLink,link)
    return(
        <>
            <Link to={link}>
                <button className={"btn border-0 rounded p-2 " + (active ? "btn-primary" : "")}>
                    {name}
                </button>
            </Link>
        </>
    )
}

export default Sidebar