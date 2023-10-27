import Sidebar from "../components/Sidebar"

const Dummy = () => {
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
                <Sidebar content={instituicao} activeLink="Instituicao"/>
            </div>
        </>
    )
}


export default Dummy