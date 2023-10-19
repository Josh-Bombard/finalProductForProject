import { useEffect, useState } from 'react'
import { USERS_API } from './api\'s/USERS_API'
import './App'
import NavBar from './components/NavBar'
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'
import SignUp from './components/SignUpComps/SignUp'
import UsersList from './components/UserComps/UsersList'
import Home from './components/Home'
import MovieSearch from './components/MovieComps/MovieSearch'
import axios from 'axios'
import UserProfile from './components/UserComps/UserProfile'
import MovieDetails from './components/MovieComps/MovieDetails'
import { UserProvider } from './components/UserComps/UserContext'
import './Stylesheets/Movies.css'


function App() {
  const [users, setUsers] = useState([]);


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



  

  return (
  <>
  
   <UserProvider >
      <NavBar/>
      <Routes>
        <Route path='/' element={<Home users={users} />}/>
          <Route path='/sign-up' element={<SignUp users={users} onAddUser={handleUserAdded}/>}/>
          <Route path='/users' element={<UsersList users={users} onDeleteUser={onDeleteUser} setUsers={setUsers}/>}/>
          <Route path='/sign-up' element={<SignUp onAddUser={handleUserAdded}/>}/>
          <Route path="/user/:userId" element={<UserProfile />} />
          <Route path='/movie-search' element={<MovieSearch />}/>
          <Route path='/movie/:imdbID' element={<MovieDetails />}/>
        </Routes>
    </UserProvider>
    
    </>
  )
}

export default App
