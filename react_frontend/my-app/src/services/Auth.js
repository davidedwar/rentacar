import axios from "axios";

const api = 'http://localhost:5000/user/';

class Auth {
  login(email, password) {
    return axios
      .post(api + "signin", {
        email,
        password
      })
      .then(response => {
        if (response.data.token) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
      })
  }

  logout() {
    localStorage.removeItem("user");
    window.location.replace('/');
  }

  register(username, email, phoneNumber, password, companyName) {
    return axios.post(api + "register", {
      username, email, password, phoneNumber, companyName
    })
  }

  getCurrentUser() {
    const user = localStorage.getItem('user')
  //  console.log(user);
    if(user)
      return JSON.parse(user);
    else{
      return {username: 'Guest', isAdmin: false, isGuest: true};
    }
  }
}

export default new Auth();