import React, { useState } from 'react';
import { USERS_API } from '../../api\'s/USERS_API';
import axios from 'axios';
import { Button, Card, CardBody, Form, FormGroup, Input, Label } from 'reactstrap';


function SignUp({onAddUser}) {
const [isSubmitting, setIsSubmitting] = useState(false);
const [newUser, setNewUser] = useState({
  name: "",
  password: "",
  favoriteMovie: "",
  favMovieReview: ''
})

const handleNewUserChange = (e) => {
  const { name, value } = e.target;
  setNewUser({
    ...newUser,
    [name]: value,
  });
  console.log('Updated state:', newUser);
};

const handleAddUser = async (e) => {
e.preventDefault();
console.log('Submit button clicked, handling user addition...');
console.log('Submitting user:', newUser);
setIsSubmitting(true);
  try {
    // Send a POST request to add the new user
    const response = await axios.post(USERS_API, newUser);
    // Clear the form fields
    setNewUser({
      name: "",
      password: "",
      favoriteMovie: "",
      favMovieReview: 0
    });
    // Notify the parent component that a new user has been added
    console.log(response);
    onAddUser(response.data);
    

  } 
  catch (error) {
    console.error('Error adding user:', error);
  } finally {
    // Re-enable the submit button when the operation is complete
    setIsSubmitting(false);
  }
};

  return ( 
    <Card>
      <CardBody>
    <div className='sign-up-sheet'>
      <h2>Enter Info Below!</h2>
      <div className='sign-up-form'>
    
      
    <Form onSubmit={handleAddUser}>
      <FormGroup>
        <Label for='name' >Name</Label>
        <Input name='name' type='text' placeholder='Username' value={newUser.name} onChange={handleNewUserChange}/>
      </FormGroup>
      <FormGroup>
        <Label for='password' >Password</Label>
        <Input name='password' type='password' placeholder='Password' value={newUser.password} onChange={handleNewUserChange}/>
      </FormGroup>
      <h2>Movie Details</h2>
      <FormGroup>
        <Label for='favoriteMovie'>Movie Name</Label>
        <Input name='favoriteMovie' type='text' placeholder='Favorite Movie Name' value={newUser.favoriteMovie} onChange={handleNewUserChange}/>
      </FormGroup>
      <FormGroup>
        <Label for='favMovieReview'>Movie Review</Label>
        <Input name='favMovieReview' type='text' placeholder="Fav Movie Review" value={newUser.favMovieReview} onChange={handleNewUserChange}/>
      </FormGroup>
      <Button color="primary" type='submit' >Submit</Button>
    </Form>
    
    
      </div>
      <div></div>
    </div>
    </CardBody>
    </Card>
   );
}

export default SignUp;