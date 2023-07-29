import React, { useState, useEffect } from 'react';
import { useAppDispatch } from '../../../hooks';
import { userActions } from '../../../Store/Users/userAction';
import Modal from 'react-bootstrap/Modal';
import { User } from "../../../types/User"


const AdminUsers: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [show, setShow] = useState<boolean>(false);
  const [userId, setUserId] = useState<string>('');

  const [isLoading, setLoading] = useState<Boolean>(false);
  const [error, setError] = useState<string>('');

  const dispatch = useAppDispatch();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setLoading(true);
    dispatch(userActions.onGetUsers({userType:"all"})).then((res: any) => {
      if (res?.data) {
        setUsers(res?.data);
      }
      setLoading(false);
    });
  };

  const handleClose = () => setShow(false);
  const handleShow = (id:string) => {
    setShow(true);
    setUserId(id);
  };
  const handleDelete = (id:string) => {
    setLoading(true);
    dispatch(userActions.onDeleteUser(id)).then((res: any) => {
      loadData();
      setShow(false);
      setLoading(false);
    });
  };



  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete this user?</p>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-secondary" onClick={handleClose}>
            Close
          </button>
          <button onClick={()=>handleDelete(userId)} className="btn btn-danger">Yes</button>
        </Modal.Footer>
      </Modal>
      <div className="row p-4 mx-2 white-bg rounded">
        <table className="table table-borderless">
          <thead>
            <tr>
            <th scope="col" className='mob-remove'>
                id
              </th>
              <th scope="col">
                Name
              </th>
              <th scope="col" >
               Email
              </th>
              <th scope="col" >Type</th>
              <th scope="col" >
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((x, i) => {
              return (
                <tr key={i}>
                  <td >{x._id}</td>
                  <td >{x.name}</td>
                  <td >{x.email}</td>
                  <td >{x.userType}</td>
                  <td><a href={`/dashboard/users/view/${x._id}`}>View</a>
                  <button onClick={()=>handleShow(x._id)}>Delete</button></td>
                </tr>
              );
            })}
          </tbody>
        </table>

      </div>
    </>
  );
};

export default AdminUsers;
