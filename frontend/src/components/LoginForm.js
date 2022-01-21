import React, { useState } from "react";
import axios from "axios"
import { useNavigate } from "react-router-dom";

const LoginForm = (props) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  // const validate = () => {
  //   if (email === "") {
  //     setError("Please Enter Email");
  //     return;
  //   }
  //   if (password === "") {
  //     setError("Please Enter Password");
  //     return;
  //   }
  //   setError("");
  //   props.onSave(email, password);
  // };
  const validate = (loginData) => {
    console.log(loginData)

    return axios
    .post("http://localhost:8081/login", loginData)
    .then((response) => {
      console.log("response", response);
    })
   .then(navigate("/mapview"));
  }

  const handleSubmit = event => {
    event.preventDefault();
    if (
      email === "" ||
      password === ""    
    ) {
      setError(true);
    }
    validate({email, password})
  }

  return (

    <main>
      <section className="login">
      {error && (
        <h1>🔥 Please fill the email and password fields, or register to start using 🦝Trash Panda🐼 🔥</h1>
      )}
        <form autoComplete="off" onSubmit={handleSubmit}>
          <label>Email: </label>
          <input
            className=""
            name="email"
            type="email"
            placeholder="email"


            value={email}
            onChange={(event) => setEmail(event.target.value)}

          />

          <label>Password: </label>
          <input
            className=""
            name="password"
            type="password"
            placeholder="password"


            value={password}
            onChange={(event) => setPassword(event.target.password)}
          />
        </form>

      </section>
      <section className="">
        <section className="">

          {/* <Button onClick={validate}{ your code goes here }>Login</Button> */}
          <button onClick={handleSubmit}>Login</button>

        </section>
      </section>
    </main>
  );
};

export default LoginForm;