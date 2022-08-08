import Button from "../../components/Button";
import TextInput from "../../components/TextInput";
import loginImage from "../../assets/login.png";

const Login = () => {
  console.log("Login");

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
          <TextInput inputType={"text"} label="User Name" name={"userName"} />
          <TextInput inputType={"text"} label="Password" name={"password"} />
          <Button name="Login" />
        </div>
      </div>
    </div>
  );
};

export default Login;
