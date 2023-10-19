// import React, { useState } from 'react';
// import { useUser } from './UserContext';

// function Login() {
//   const [password, setPassword] = useState('');
//   const { user, login, logout } = useUser();

//   const handleLogin = () => {
//     // Validate the password
//     if (password === user.password) {
//       login(user);
      
//     } else {
//       alert('Incorrect password');
//     }
//   };

//   const handleLogout = () => {
//     logout();
//   };

//   return (
//     <div>
//       <h2>Logged in as: {user.name}</h2>
//       {user ? (
//         <>
//           <button onClick={handleLogout}>Logout</button>
//         </>
//       ) : (
//         null
//       )}
//     </div>
//   );
// }

// export default Login;

