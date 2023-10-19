import axios from 'axios';
import { USERS_API } from '../../api\'s/USERS_API';

const fetchUserProfile = async (userId) => {
  try {
    const userResponse = await axios.get(`${USERS_API}/${userId}`);
    const userData = userResponse.data;

    return { user: userData };
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return null;
  }
};

export default fetchUserProfile;
