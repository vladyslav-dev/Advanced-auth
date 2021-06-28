import $api from "../api/index";
import axios from 'axios'

export default class AuthService {
  static async login(email, password) {
    return $api.post("/login", { email, password });
  }

  static async registration(email, password) {
    return $api.post("/registration", { email, password });
  }

  static async logout() {
    return $api.post("/logout");
  }
}


const API_URL = "http://localhost:5000/api";



export const checkAuth = async () => {
  try {
      const response = await axios.get(`${API_URL}/refresh`, {withCredentials: true})
      console.log(response);
      localStorage.setItem('token', response.data.accessToken);
      return true
  } catch (e) {
    
      console.log(e.response);
      return false
  }
}
