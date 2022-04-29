import { useState} from "react";
import { useNavigate } from "react-router-dom";
import {
    post,
  } from "../services/apiService";
import store from "../services/store";

function Login()  {
   const [email, setEmail] = useState();
   const [error, setError] = useState(false);
   let navigate = useNavigate();
   const [password, setPassword] = useState();
   const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await post('login',{ email: email , password: password});
      setError(false);
      if (data && data.token)
      {
        const currentUser = {
            name: `${data.firstName} ${data.lastName}`,
            id : data.userId,
            email: data.email,
            token: data.token
        }
        localStorage.setItem('user',JSON.stringify(currentUser));
        const userAction = {type:'ADD_USER',user: currentUser }

        store.dispatch(userAction);

        navigate("/tasks");
      }
      else
      setError(true);
      } catch (error) {
        setError(true);
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
        <div className="error-message" style={{ display: error ? "block" : "none" }}>Username or password mismatched </div>
      </div>)

}

export default Login