import React, { useState, useEffect } from 'react';
import { Form, FormGroup, Input, Button } from 'reactstrap';

function UpdateUserForm({ user, onUpdateUser }) {
  const [updatedUser, setUpdatedUser] = useState({
    name: '',
    favoriteMovie: '',
    favMovieReview: '',
  });

  console.log(`User in UpdateUserForm:`, user);
  console.log(`updatedUser in UpdateUserForm:`, updatedUser);

  const handleUpdateSubmit = () => {
    const updatedUserData = {
      id: user.id,
      name: updatedUser.name,
      favoriteMovie: updatedUser.favoriteMovie,
      favMovieReview: updatedUser.favMovieReview,
    };
    console.log('Updating user with data:', updatedUserData);
    onUpdateUser(updatedUserData);
  };

  useEffect(() => {
    setUpdatedUser({
      name: user.name,
      favoriteMovie: user.favoriteMovie,
      favMovieReview: user.favMovieReview,
    });
  }, [user]);

  return (
    <Form>
      <FormGroup>
        <Input
          type='text'
          placeholder='Name'
          value={updatedUser.name}
          onChange={(e) => 
            setUpdatedUser((prevUser) => ({ ...prevUser, name: e.target.value }))}
        />
      </FormGroup>
      <FormGroup>
        <Input
          type='text'
          placeholder='Favorite Movie'
          value={updatedUser.favoriteMovie}
          onChange={(e) => {
            setUpdatedUser((prevUser) => ({
              ...prevUser,
              favoriteMovie: e.target.value,
            }));
          }}
        />
      </FormGroup>
      <FormGroup>
        <Input
          type='text'
          placeholder='Review of Fav Movie'
          value={updatedUser.favMovieReview}
          onChange={(e) => {
            setUpdatedUser((prevUser) => ({
              ...prevUser,
              favMovieReview: e.target.value,
            }));
          }}
        />
      </FormGroup>
      <Button onClick={handleUpdateSubmit} color='primary'>
        Update User
      </Button>
    </Form>
  );
}

export default UpdateUserForm;

