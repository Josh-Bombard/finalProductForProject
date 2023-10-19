import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { USERS_API } from '../../api\'s/USERS_API';
import axios from 'axios';
import UserUpdateForm from './UpdateUser';
// import Login from './Login';
import { useUser } from './UserContext';
import ReviewStatus from '../ReviewComps/ReviewStatus'
import { REVIEWS_API } from '../../api\'s/REVIEWS_API';

function UsersList({users, onDeleteUser, setUsers}) {
  console.log('Received users:', users);

  const [selectedUser, setSelectedUser] = useState("");
  const navigate = useNavigate();
  const {user: loggedUser, login} = useUser();
  const [reviews, setReviews] = useState([]);




  const handleDeleteClick = (user) => {
    console.log('Deleting user:', user);
    axios.delete(USERS_API +`/${user.id}`)
      .then(() => {
        onDeleteUser(user.id);
        console.log('User deleted:', user.id);
      })
      .catch((error) => {
        console.error('Error deleting user:', error);
      });
  };


  const handleUpdateClick = (user) => {
    setSelectedUser(user);
  }
  
  const handleUpdateUser = (updatedUser) => {
    // Send the updated user data to the server (axios PUT request)
    console.log(`Updated User: ${updatedUser}`)
    axios
      .put(`${USERS_API}/${updatedUser.id}`, updatedUser)
      .then((response) => {
        
        const updatedUserData = response.data;
  
        // Update users list with the updated user data
        const updatedUsers = users.map((user) =>
          user.id === updatedUserData.id ? updatedUserData : user
        );
  
        setUsers(updatedUsers);
        setSelectedUser(null); // Clear the selected user after updating
      })
      .catch((error) => {
        console.error('Error updating user:', error);
      });
  };





  const handleUserClick = (user) => {
    login(user);
    console.log(`Logged in user: ${user.name}, ${user.favoriteMovie}, ${user.favMovieReview}`);
    navigate(`/user/${user.id}`);
  };

  const handleLogin = () => {
    // Redirect to the user profile when login is successful
    navigate(`/user/${loggedUser.id}`);
  };
  

  console.log('Rendering users:', users);

  useEffect(()=> {
    fetchReviews()
  }, [])
  
    const fetchReviews = async () => {
      try {
        console.log()
        const response = await axios.get(`${REVIEWS_API}`);
        setReviews(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

  
  return ( 
    <div>
{/* Check if a user is logged in */}
{/* {loggedUser ? ( 
        <Login onLogin={handleLogin} />
      ) : null} */}

    <Table dark striped className='container text-center'>
      <thead>
        <tr>
        <td>ID</td>
        <td>Name</td>
        <td>Favorite Movie</td>
        <td>Rating of Fav Movie</td>
        <td>Reviewed Movies</td>
        <td>Update</td>
        <td>Delete</td>
        </tr>
      </thead>
      <tbody>
      {users.map((user) => {
        return (
        <tr key={user.id}>
          <td>{user.id}</td>
          <td>
            <button onClick={() => handleUserClick(user)}>
            {user.name}
            </button>
          </td>

          <td>
            {user.favoriteMovie}
          </td>

          <td>
            {user.favMovieReview}
          </td>

          <td onClick={console.log(`Sending Parameter: ${reviews}`)}>
            {<ReviewStatus reviews={reviews} userid = {user.id}/>}
          </td>

          <td>
            <Button onClick={() => handleUpdateClick(user)} color='primary'>Update</Button>
            </td>
            
            <td>
            <Button onClick={() => handleDeleteClick(user)} color='danger'>Delete</Button>
            </td>
        </tr>
)})}
        </tbody>
    </Table>


    {selectedUser && (
        <UserUpdateForm user={selectedUser} onUpdateUser={handleUpdateUser} />
      )}
    </div>
   );
}

export default UsersList;