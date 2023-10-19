import axios from 'axios';
import { USERS_API } from './USERS_API';

// Define a function to update the user's profile
export const updateUserProfile = async (userId, updatedProfileData) => {
  try {
    // Make a PUT or PATCH request to your API to update the user's profile
    const response = await axios.put(`${USERS_API}/${userId}`, updatedProfileData);
    return response.data;
  } catch (error) {
    throw error;
  }
};
