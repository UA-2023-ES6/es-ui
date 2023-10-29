import Feed from "../components/Feed"
import GroupThumbnail from "../components/GroupThumbnail"

const UserGroupPage = () => {
    return(
        <>
        <div className="d-flex flex-column" style={{height: "100%"}}>
            <GroupThumbnail />
            <Feed />
        </div>
        </>
    )
}

export default UserGroupPage
