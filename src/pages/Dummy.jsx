import { Link, useParams } from "react-router-dom"
import Sidebar from "../components/Sidebar"

function test(name,parent) {
    alert("name:" + name + "; parent:" + parent)
}

const Dummy = () => {
    const {"*": currentPath} = useParams()
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
                <Sidebar content={instituicao} activeLink={currentPath} onClick={test}/>
                {/* alternative a onClick seria inline: (name,parent) => { conteudo da funcao } */}
            </div>
        </>
    )
}


export default Dummy