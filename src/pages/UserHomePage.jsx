const UserHomePage = ({userGroups}) => {
    return(
        <>
        <div className="d-flex flex-column" style={{height: "100%"}}>
            <div style={{flex: "1"}}>
                {userGroups.length === 0 ? <NoGroups /> : <Test groups={userGroups}/>}
            </div>
        </div>
        </>
    )
}

function NoGroups() {
    return(
        <div className="d-flex flex-column justify-content-center align-items-center">
            <p className="fs-1">It appears you dont have any groups</p>
            <button type="button" className="btn btn-primary">Join a group</button>
        </div>
    )
}

function Test({groups}) {
    return (
        <>
            <div className="d-flex flex-column align-items-center">
                <h1>Check the news on your groups</h1>
                <ul className="list-group">
                    {groups.map((groupName) => {
                        return <li className="list-group-item" key={groupName}><a className="text-black link-underline link-underline-opacity-0" href="#">{groupName}</a></li>
                    })}
                </ul>
            </div>
        </>
    )
}

export default UserHomePage