import axios from "axios";
import { useEffect, useState } from "react";
import Button from "../../components/Button";
import Modal from "react-modal";
import TextInput from "../../components/TextInput";
import { ClipLoader } from "react-spinners";

const getAuthToken = () => {
  const token = localStorage.getItem("token");
  if (token) {
    return token;
  } else return "";
};

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const UserDashBoard = () => {
  const [addModalIsOpen, setAddModalIsOpen] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [userList, setUserList] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");


  const handleAdd = () => {
    setAddModalIsOpen(true);
  };

  const handleSearch = () => {
    const filteredArray = userList.filter(
      (val: { first_name: string | any[] }) =>
        val.first_name.includes(searchValue)
    );

    if (filteredArray) {
      setUserList(filteredArray);
    }
  };



  const handleSave = () => {
    const newUser = {
      first_name: firstName,
      mobile: mobileNo,
      last_name: lastName,
      email: email,
      user_name: userName,
      password: password,
      account_type: "user",
    };

    axios.post("http://localhost:4000/users/user", newUser).then((res) => {
      setAddModalIsOpen(false);
    });
  };

  const closeModal = () => {
    setAddModalIsOpen(false);
  };

  useEffect(() => {
    const token = getAuthToken();
    setIsLoading(true);
    axios
      .get("http://localhost:4000/users/", {
        headers: { authorization: token },
      })
      .then((response) => {
        console.log(response, "response");
        setIsLoading(false);
        setUserList(response.data);
      })
      .catch(function (error) {
        setIsLoading(false);
        console.log(error);
      });
  }, []);

  return (
    <div style={{ margin: 30 }}>
      <div style={{ display: "flex" }}>
        <h1 style={{ color: "#7b96d4" }}>User List</h1>
        <div style={{ width: 150, alignSelf: "center", marginLeft: "auto" }}>
          <Button name="Add User" onButtonClick={handleAdd}></Button>
        </div>

        <div style={{ display: "flex" }}>
        <div style={{ width: "100%" }}>
          <TextInput
            inputType={"text"}
            placeholder="Search by Name"
            onChange={(e: any) => {
              setSearchValue(e.target.value);
            }}
          />
        </div>
        <div style={{ width: 150, alignSelf: "center", marginLeft: "auto" }}>
          <Button name="Search" onButtonClick={handleSearch}></Button>
        </div>
       </div>
       
      </div>

      {/* add modal  */}
      <Modal
        isOpen={addModalIsOpen}
        ariaHideApp={false}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div style={{ width: 450, height: 350 }}>
          <h1 style={{ color: "#7b96d4" }}>Add New User </h1>

          <TextInput
            inputType={"text"}
            label="First Name"
            name={"title"}
            onChange={(e: any) => {
              setFirstName(e.target.value);
            }}
          />
          <TextInput
            inputType={"text"}
            label="Last Name"
            name={"Title"}
            onChange={(e: any) => {
              setLastName(e.target.value);
            }}
          />
          <TextInput
            inputType={"text"}
            label="Mobile No"
            name={"Title"}
            onChange={(e: any) => {
              setMobileNo(e.target.value);
            }}
          />

          <TextInput
            inputType={"text"}
            label="Email"
            name={"Title"}
            onChange={(e: any) => {
              setEmail(e.target.value);
            }}
          />

          <TextInput
            inputType={"text"}
            label="User Name"
            name={"Title"}
            onChange={(e: any) => {
              setUserName(e.target.value);
            }}
          />

          <TextInput
            inputType={"password"}
            label="Password"
            name={"Title"}
            onChange={(e: any) => {
              setPassword(e.target.value);
            }}
          />
          <div style={{ marginTop: 16 }}>
            <Button name="Save" onButtonClick={handleSave} />
          </div>
        </div>
      </Modal>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)",
          marginBottom: 10,
          backgroundColor: "rgb(236 241 251 / 77%)",
          height: 50,
          fontWeight: 500,
          color: "#7b96d4",
        }}
      >
        <div style={{ alignSelf: "center" }}>First Name</div>
        <div style={{ alignSelf: "center" }}>Last Name</div>
        <div style={{ alignSelf: "center" }}>Mobile No</div>
        <div style={{ alignSelf: "center" }}>Email</div>
        <div style={{ alignSelf: "center" }}>User Type</div>
      </div>

      {isLoading ? (
        <ClipLoader color="" loading size={20} speedMultiplier={1} />
      ) : (
        userList?.map((user: any) => {
          return (
            <div
              key={user?._id}
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(5, 1fr)",
                marginBottom: 10,
                backgroundColor: "rgb(236 241 251 / 77%)",
                height: 50,
              }}
            >
              <div style={{ alignSelf: "center" }}>{user?.first_name}</div>
              <div style={{ alignSelf: "center" }}>{user?.last_name}</div>
              <div style={{ alignSelf: "center" }}>{user?.mobile}</div>
              <div style={{ alignSelf: "center" }}>{user?.email}</div>
              <div style={{ alignSelf: "center" }}>{user?.account_type}</div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default UserDashBoard;
