import axios from "axios";
import Button from "../../components/Button";
import TextInput from "../../components/TextInput";
import loginImage from "../../assets/login.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = () => {
    setIsLoading(true);
    const loginData = {
      user_name: userName,
      password: password,
    };

    axios.post("http://localhost:4000/users/login", loginData).then((res) => {
      if (res.data.message === "Invalid credentials") {
        setIsLoading(false);
        alert(res.data.message);
      } else {
        localStorage.setItem("token", res.data.token);
        if (res.data.user.account_type === "admin") {
          localStorage.setItem("userId", res.data._id);
          setIsLoading(false);
          navigate("/users");
        } else {
          localStorage.setItem("userId", res.data.user._id);
          setIsLoading(false);
          navigate("/home");
        }
      }
    });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <div
        style={{
          height: "100%",
          width: "50%",
          float: "left",
          overflow: "hidden",
        }}
      >
        <img src={loginImage} alt="Logo" width={"600px"} height={"640px"} />
      </div>
      <div
        style={{
          width: "50%",
          height: "100%",
          float: "right",
        }}
      >
        <div style={{ width: 350, margin: "0 auto" }}>
          <h1 style={{ color: "#7b96d4" }}>Welcome</h1>
          <TextInput
            inputType={"text"}
            label="User Name"
            name={"userName"}
            onChange={(e: any) => {
              setUserName(e.target.value);
            }}
          />
          <TextInput
            inputType={"text"}
            label="Password"
            name={"password"}
            onChange={(e: any) => {
              setPassword(e.target.value);
            }}
          />
          <Button
            name="Login"
            onButtonClick={handleLogin}
            loading={isLoading}
            disabled={isLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
