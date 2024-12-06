export default function ({ $axios, redirect, store }) {
  // Add a response interceptor

  $axios.onRequest((config) => {
    const token = store.state.token;

    console.log("text state : ", store.state.test)
    console.log("token axios : ", token)

    if (token) {
      $axios.setToken(token, 'Bearer');
      // if (+auth.is_pfa) {
      //   $axios.setHeader("PERAN", auth.peranSelected);
      // }
    } else {
      console.log("token axios kosong")
    }
  });
  $axios.onResponseError((error) => {
    // Check if the error response status is 401
    if (error.response && error.response.status === 401) {
      // Clear user-related data if necessary
      // store.commit('auth/CLEAR_USER_DATA'); // Example mutation
      // Redirect to the login page
      redirect('/auth/login');
    }
    return Promise.reject(error); // Ensure other errors are handled appropriately
  })
}
