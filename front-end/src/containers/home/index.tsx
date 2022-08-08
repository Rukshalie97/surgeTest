import { FiEye, FiEdit, FiTrash2 } from "react-icons/fi";

const noteList = [
  {
    id: 1,
    name: "title 1",
    description:
      "How can I create a JSON with this format in Android: Since the API that I will be passing will parse JsonArray then the object. Or would it be okay if just to pass a json object? Since I will just have to insert 1 transaction per service call.",
  },
  {
    id: 2,
    name: "title 2",
    description:
      "How can I create a JSON with this format in Android: Since the API that I will be passing will parse JsonArray then the object. Or would it be okay if just to pass a json object? Since I will just have to insert 1 transaction per service call.",
  },
  {
    id: 3,
    name: "title 3",
    description:
      "How can I create a JSON with this format in Android: Since the API that I will be passing will parse JsonArray then the object. Or would it be okay if just to pass a json object? Since I will just have to insert 1 transaction per service call.",
  },
  {
    id: 4,
    name: "title 4",
    description:
      "How can I create a JSON with this format in Android: Since the API that I will be passing will parse JsonArray then the object. Or would it be okay if just to pass a json object? Since I will just have to insert 1 transaction per service call.",
  },
];

const Home = () => {
  console.log("Login");

  return (
    <div>
      <h1 style={{ color: "#7b96d4" }}>My Notes List</h1>
      {noteList.map((note) => {
        return (
          <div
            key={note.id}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(5, 1fr)",
              marginBottom: 10,
              backgroundColor: "rgb(236 241 251 / 77%)",
            }}
          >
            <div style={{}}>{note.name}</div>
            <div style={{}}>{note.description}</div>
            <div style={{}}>
              <FiEye size={20} />
            </div>
            <div style={{}}>
              <FiEdit />
            </div>
            <div style={{}}>
              <FiTrash2 />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Home;
