import { useState} from "react";
import { useNavigate } from "react-router-dom";
import {
    post,
  } from "../services/apiService";

function Login()  {
   const [email, setEmail] = useState();
   let navigate = useNavigate();
   const [password, setPassword] = useState();
   const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await post('login',{ email: email , password: password});
      if (data && data.token)
      {
        localStorage.setItem('token',data.token);
        navigate("/tasks");
      }
      } catch (error) {
      console.error(error);
    }
  };
    return (
        <div className="container">
        <h1>Login</h1>
        <form>
          <label>
            <p>Username</p>
            <input type="text" onChange={e => setEmail(e.target.value)}/>
          </label>
          <label>
            <p>Password</p>
            <input type="password"  onChange={e => setPassword(e.target.value)}/>
          </label>
          <div>
            <button onClick={handleSubmit}>Submit</button>
          </div>
        </form>
      </div>)

}

export default Login