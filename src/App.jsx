import { useEffect, useState } from 'react'
import { USERS_API } from './api\'s/USERS_API'
import './App'
import './Stylesheets/Movies.css'
import './Stylesheets/ReviewList.css'
import './Stylesheets/UserProfile.css'
import './Stylesheets/MovieDetails.css'
import './Stylesheets/SignUp.css'
import './Stylesheets/UserList.css'
import NavBar from './components/NavBar'
import { Route, Routes } from 'react-router-dom'
import SignUp from './components/SignUpComps/SignUp'
import UsersList from './components/UserComps/UsersList'
import Home from './components/Home'
import MovieSearch from './components/MovieComps/MovieSearch'
import axios from 'axios'
import UserProfile from './components/UserComps/UserProfile'
import MovieDetails from './components/MovieComps/MovieDetails'
import { UserProvider } from './components/UserComps/UserContext'

import { REVIEWS_API } from './api\'s/REVIEWS_API'


function App() {
  const [users, setUsers] = useState([]);
  const [homeReviews, setHomeReviews] = useState([]);


  const getUsers = async () => {
    try {
      const response = await axios.get(USERS_API);
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    getUsers();
  }, [])


  const handleUserAdded = (newUser) => {
    console.log('User added:', newUser);
    console.log('Current users:', users);
    // Add the newly created user to the current list of use
    setUsers([...users, newUser]);
    console.log('Updated users:', users);
  };


  const onDeleteUser = (userId) => {
    console.log('Deleting user with ID:', userId);
    const updatedUsers = users.filter((user) => user.id !== userId);
    setUsers(updatedUsers);
    console.log('Updated users:', users);
  };

  const onDeleteReview = (reviewId) => {
    console.log('Deleting user with ID: ', reviewId);
    const updatedReviews = homeReviews.filter((review) => review.id !== reviewId);
    setHomeReviews(updatedReviews);
    console.log('Updated Reviews: ', homeReviews)
  };


  useEffect(() => {
    fetchReviews()
  }, [])

  const fetchReviews = async () => {
    try {
      console.log()
      const response = await axios.get(`${REVIEWS_API}`);
      setHomeReviews(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  console.log(homeReviews)

  return (
    <>

<UserProvider>
  <NavBar />
  <Routes>
    <Route
      path="/"
      element={<Home users={users} reviews={homeReviews} />}
    />
    <Route
      path="/sign-up"
      element={<SignUp users={users} onAddUser={handleUserAdded} />}
    />
    <Route
      path="/users"
      element={
        <UsersList
          users={users}
          onDeleteUser={onDeleteUser}
          setUsers={setUsers}
        />
      }
    />
    <Route path="/sign-up" element={<SignUp onAddUser={handleUserAdded} />} />
    <Route
      path="/user/:userId"
      element={
        <UserProfile
          users={users}
          reviews={homeReviews}
          onDeleteReviewCallback={onDeleteReview}
        />
      }
    />
    <Route path="/movie-search" element={<MovieSearch />} />
    <Route path="/movie/:imdbID" element={<MovieDetails />} />
  </Routes>
</UserProvider>

    </>
  )
}

export default App
