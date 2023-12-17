import { MDBListGroupItem} from 'mdb-react-ui-kit';

const UserListItem = ({ user, invite, setCheckedUsers }) => {

    return (
        <MDBListGroupItem className='d-flex justify-content-between align-items-center'>
            <div>
                <div className='fw-bold'>{user.name}</div>
                <div className='text-muted'>{user.email}</div>
            </div>
            {invite && (
                <input
                    type='checkbox'
                    onChange={(e) => setCheckedUsers(user, e.target.checked)}
                />
            )}
        </MDBListGroupItem>
    );
};

export {UserListItem};