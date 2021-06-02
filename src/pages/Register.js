import React, { useContext, useState } from "react";
import { Button, Form } from "semantic-ui-react";
import axios from "axios";

import { AuthContext } from "../context/auth";
import { useForm } from "../utils/hooks";
const api = axios.create({
  baseURL: `http://localhost:3000/api`,
});
function Register(props) {
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});
  const [state, setState] = React.useState({
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
  });
  //   const { onChange, onSubmit, values } = useForm(registerUser, {
  //     username: "",
  //     email: "",
  //     password: "",
  //     confirmPassword: "",
  //   });

  //   const [addUser, { loading }] = useMutation(REGISTER_USER, {
  //     update(_, { data: { register: userData } }) {
  //       context.login(userData);
  //       props.history.push("/");
  //     },
  //     onError(err) {
  //       setErrors(err.graphQLErrors[0].extensions.exception.errors);
  //     },
  //     variables: values,
  //   });

  //   function registerUser() {
  //     addUser();
  //   }
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
      email: state.email,
      password: state.password,
      username: state.username,
      confirmPassword: state.confirmPassword,
    };
    console.log(userInfo);
    api
      .post("/users/", userInfo)
      .then((res) => {
        if (res.status === 200) {
          const loggedUser = {
            email: res.data.user.email,
            username: res.data.user.username,
            token: res.data.token,
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
        <h1>Register</h1>
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
          label="Email"
          placeholder="Email.."
          name="email"
          type="email"
          //   value={values.email}
          error={errors.email ? true : false}
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
        <Form.Input
          label="Confirm Password"
          placeholder="Confirm Password.."
          name="confirmPassword"
          type="password"
          //   value={values.confirmPassword}
          error={errors.confirmPassword ? true : false}
          onChange={onChange}
        />
        <Button type="submit" primary>
          Register
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
// const REGISTER_USER = gql`
//   mutation register(
//     $username: String!
//     $email: String!
//     $password: String!
//     $confirmPassword: String!
//   ) {
//     register(
//       registerInput: {
//         username: $username
//         email: $email
//         password: $password
//         confirmPassword: $confirmPassword
//       }
//     ) {
//       id
//       email
//       username
//       createdAt
//       token
//     }
//   }
// `;

export default Register;
