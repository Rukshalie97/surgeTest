import axios from "axios";
import { useEffect, useState } from "react";
import { FiEye, FiEdit, FiTrash2, FiXSquare } from "react-icons/fi";
import Button from "../../components/Button";
import Modal from "react-modal";
import TextInput from "../../components/TextInput";
import TextArea from "../../components/TextArea";

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

const viewModalStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const Home = () => {
  const [addModalIsOpen, setAddModalIsOpen] = useState(false);
  const [ViewModalIsOpen, setViewModalIsOpen] = useState(false);
  const [EditModalIsOpen, setEditModalIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [noteList, setNoteList] = useState<any>();
  const [selectedItem, setSelectedItem] = useState<any>();
  const [isSaveButtonLoading, setIsSaveButtonLoading] = useState(false);
  const [deletedItem, setDeletedItem] = useState(false);

  const handleAdd = () => {
    setAddModalIsOpen(true);
  };

  const handleView = (object: any) => {
    setSelectedItem(object);
    setViewModalIsOpen(true);
  };

  const handleEdit = (object: any) => {
    setSelectedItem(object);
    setTitle(object.note_item);
    setDescription(object.note_description);
    setEditModalIsOpen(true);
  };

  const handleUpdate = () => {
    const token = getAuthToken();
    const item = {
      id: selectedItem._id,
      note_item: title,
      note_description: description,
    };

    axios
      .post("http://localhost:4000/notes/update", item, {
        headers: { authorization: token },
      })
      .then((response) => {
        setEditModalIsOpen(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleDelete = (object: any) => {
    const token = getAuthToken();
    if (window.confirm("Are you sure you wish to delete this item?")) {
      const newItem = {
        id: object._id,
      };
      axios
        .post("http://localhost:4000/notes/delete", newItem, {
          headers: { authorization: token },
        })
        .then((res) => {
          setDeletedItem(object._id);
        });
    }
  };

  const handleSave = () => {
    setIsSaveButtonLoading(true);
    const newItem = {
      note_item: title,
      note_description: description,
    };
    const token = getAuthToken();

    axios
      .post("http://localhost:4000/notes/add", newItem, {
        headers: { authorization: token },
      })
      .then((res) => {
        setIsSaveButtonLoading(false);
        setAddModalIsOpen(false);
      });
  };

  const closeModal = () => {
    setAddModalIsOpen(false);
  };

  useEffect(() => {
    const token = getAuthToken();
    axios
      .get("http://localhost:4000/notes/", {
        headers: { authorization: token },
      })
      .then((response) => {
        setNoteList(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [addModalIsOpen, EditModalIsOpen, deletedItem]);

  return (
    <div style={{ margin: 30 }}>
      <div style={{ display: "flex" }}>
        <h1 style={{ color: "#7b96d4" }}>My Notes List</h1>
        <div style={{ width: 150, alignSelf: "center", marginLeft: "auto" }}>
          <Button name="Add New Note" onButtonClick={handleAdd}></Button>
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
          <h1 style={{ color: "#7b96d4" }}>Add New Note</h1>

          <TextInput
            inputType={"text"}
            label="Title"
            name={"title"}
            onChange={(e: any) => {
              setTitle(e.target.value);
            }}
          />
          <TextArea
            label="Description"
            name={"description"}
            onChange={(e: any) => {
              setDescription(e.target.value);
            }}
          />
          <div style={{ marginTop: 16 }}>
            <Button
              name="Save"
              onButtonClick={handleSave}
              loading={isSaveButtonLoading}
            />
          </div>
        </div>
      </Modal>

      {/* View Modal  */}

      <Modal
        isOpen={ViewModalIsOpen}
        ariaHideApp={false}
        onRequestClose={() => {
          setViewModalIsOpen(false);
        }}
        style={viewModalStyles}
        contentLabel="Example Modal"
      >
        <div style={{ width: 450, height: 350 }}>
          <div style={{ display: "flex" }}>
            <h1 style={{ color: "#7b96d4", margin: "0px", paddingBottom: 10 }}>
              Note Details{" "}
            </h1>
            <FiXSquare
              onClick={() => {
                setViewModalIsOpen(false);
              }}
              style={{ alignSelf: "center", marginLeft: "auto" }}
              size={25}
              color={"#7b96d4"}
            />
          </div>

          <div style={{ paddingBottom: 10 }}>
            <h3 style={{ color: "#7b96d4", margin: "0px" }}>Title </h3>
            {selectedItem?.note_item}
          </div>
          <div style={{ paddingBottom: 10 }}>
            <h3 style={{ color: "#7b96d4", margin: "0px" }}>Discretion </h3>
            {selectedItem?.note_description}
          </div>
        </div>
      </Modal>

      {/* Edit Modal */}

      <Modal
        isOpen={EditModalIsOpen}
        ariaHideApp={false}
        onRequestClose={() => {
          setEditModalIsOpen(false);
        }}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div style={{ width: 450, height: 350 }}>
          <div style={{ display: "flex" }}>
            <h1 style={{ color: "#7b96d4" }}>Edit</h1>
            <FiXSquare
              onClick={() => {
                setEditModalIsOpen(false);
              }}
              style={{ alignSelf: "center", marginLeft: "auto" }}
              size={25}
              color={"#7b96d4"}
            />
          </div>
          <TextInput
            inputType={"text"}
            label="Title"
            name={"title"}
            onChange={(e: any) => {
              setTitle(e.target.value);
            }}
            value={title}
          />

          <TextArea
            label="Description"
            name={"description"}
            onChange={(e: any) => {
              setDescription(e.target.value);
            }}
            value={description}
          />

          <div style={{ marginTop: 16 }}>
            <Button name="Update" onButtonClick={handleUpdate} />
          </div>
        </div>
      </Modal>

      {noteList?.map((note: any) => {
        return (
          <div
            key={note?._id}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(5, 1fr)",
              marginBottom: 10,
              backgroundColor: "rgb(236 241 251 / 77%)",
              height: 50,
            }}
          >
            <div style={{ alignSelf: "center" }}>{note?.note_item}</div>
            <div style={{ alignSelf: "center" }}>{note?.note_description}</div>
            <div style={{ alignSelf: "center" }}>
              <FiEye
                size={20}
                onClick={() => {
                  handleView(note);
                }}
              />
            </div>
            <div style={{ alignSelf: "center" }}>
              <FiEdit
                onClick={() => {
                  handleEdit(note);
                }}
              />
            </div>
            <div style={{ alignSelf: "center" }}>
              <FiTrash2
                onClick={() => {
                  handleDelete(note);
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Home;
