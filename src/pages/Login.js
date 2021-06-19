import React, { useContext, useState } from "react";
import { Button, Form } from "semantic-ui-react";
import axios from "axios";
import { AuthContext } from "../context/auth";

const api = axios.create({
  baseURL: `http://localhost:3000/api`,
});
function Login(props) {
  const context = useContext(AuthContext);
  // eslint-disable-next-line no-unused-vars
  const [errors, setErrors] = useState({});
  const [state, setState] = React.useState({
    username: "",
    password: "",
  });

  const onChange = (event) => {
    const value = event.target.value;
    setState({
      ...state,
      [event.target.name]: value,
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const userInfo = {
      username: state.username,
      password: state.password,
    };
    api
      .post("/users/login", userInfo)
      .then((res) => {
        if (res.status === 200) {
          const loggedUser = {
            email: res.data.user.email,
            username: res.data.user.username,
            token: res.data.token,
            id: res.data.user._id,
            createdAt: res.data.user.created,
            games: res.data.user.games,
          };
          context.login(loggedUser);
          props.history.push("/");
        } else {
          const error = new Error(res.error);
          throw error;
        }
      })
      .catch((err) => {
        console.log(err);
        alert("Error Logging in please try again");
      });
  };

  return (
    <div className="form-container">
      <Form onSubmit={onSubmit}>
        <h1>Login</h1>
        <Form.Input
          label="Username"
          placeholder="Username.."
          name="username"
          type="text"
          //   value={values.username}
          error={errors.username ? true : false}
          onChange={onChange}
        />
        <Form.Input
          label="Password"
          placeholder="Password.."
          name="password"
          type="password"
          //   value={values.password}
          error={errors.password ? true : false}
          onChange={onChange}
        />
        <Button type="submit" primary>
          Login
        </Button>
      </Form>
      {Object.keys(errors).length > 0 && (
        <div className="ui error message">
          <ul className="list">
            {Object.values(errors).map((value) => (
              <li key={value}>{value}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Login;
