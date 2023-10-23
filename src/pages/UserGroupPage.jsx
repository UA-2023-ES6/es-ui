import Header from "../components/Header"
import Footer from "../components/Footer"
import Feed from "../components/Feed"
import GroupThumbnail from "../components/GroupThumbnail"

const UserGroupPage = () => {
    const userGroups = [
        "grupo 1",
        "grupo 2",
        "grupo 3",
        "grupo 4"
    ] // retirar após criar ligação entre páginas

    return(
        <>
        <div className="d-flex flex-column" style={{height: "100vh"}}>
            <Header userGroups={userGroups}/>
            <GroupThumbnail />
            <Feed />
            <Footer />
        </div>
        </>
    )
}

export default UserGroupPage
