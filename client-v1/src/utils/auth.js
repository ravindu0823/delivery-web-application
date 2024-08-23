// // src/utils/auth.js

// const API_BASE_URL =' https://checkmateapi20240716235602.azurewebsites.net';
// const USERNAME = 'serendib@gmail.com';
// const PASSWORD = 'Anubaba@123';
// const ORGANIZATION = '1e7071f0-dacb-4a98-f264-08dcb066d923';

// const getAccessToken = async () => {
//   const token = localStorage.getItem('token');

//   console.log("Hi Pahan");
//   if (token) {
//     return token;
//   }

//   try {
//     const response = await fetch(`${API_BASE_URL}/connect/token`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/x-www-form-urlencoded',
//       },
//       body: new URLSearchParams({
//         grant_type: 'password',
//         username: USERNAME,
//         password: PASSWORD,
//         organization: ORGANIZATION,
//         scope: 'organization',
//       }),
//     });

//     if (!response.ok) {
//       throw new Error(`HTTP error! Status: ${response.status}`);
//     }

//     const data = await response.json();
//     return data.access_token;
//   } catch (error) {
//     console.error('Error fetching access token:', error.message || error);
//     return null;
//   }
// };

// export default getAccessToken;
