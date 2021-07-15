import React, { useState, useEffect } from "react";
import Navbar from "../components/common/Navbar/Navbar";
import Sidebar from "../components/common/Sidebar/Sidebar";
import { SidebarDataProf } from "./Professor/Content/SidebarDataProf";
import { SidebarDataStudent } from "./Student/Content/SidebarDataStudent";
import { useAuth } from "../components/Auth/Auth";
import { Button, Form } from "react-bootstrap";
import * as BsIcons from "react-icons/bs";
import * as AiIcons from "react-icons/ai";
import { IconContext } from "react-icons";
import firebase from "../firebase";
import { v4 as uuidv4 } from "uuid";

function Task({ match }) {
  const { currentUser } = useAuth();
  const [task, setTask] = useState();
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState();
  const [deadline, setDeadline] = useState();
  const [maxPoints, setMaxPoints] = useState();
  const [contribution, setContribution] = useState();
  const [saveState, setSavedState] = useState(true);
  const [showForm, setShow] = useState(false);
  const [fileUrl, setFileUrl] = useState(null);
  const [fileName, setFileName] = useState(null);
  const [results, setResults] = useState([]);
  const [submitted, setSubmitted] = useState();

  const db = firebase.firestore();
  const taskRef = db.collection("Tasks").doc(match.params.id);

  const ColoredLine = () => (
    <hr
      style={{
        color: "gray",
        backgroundColor: "gray",
        height: 1,
      }}
    />
  );

  useEffect(() => {
    getTask();
    getResults();
    getSubmitted();
  }, []);

  function getTask() {
    setLoading(true);
    taskRef.onSnapshot((doc) => {
      setTask(doc.data());
    });
    setLoading(false);
  }

  function getResults() {
    db.collection("Results")
      .where("taskId", "==", match.params.id)
      .onSnapshot((querySnapshot) => {
        const items = [];
        querySnapshot.forEach((doc) => {
          items.push(doc.data());
        });
        setResults(items);
      });
  }

  function getSubmitted() {
    var query = db
      .collection("Results")
      .where("taskId", "==", match.params.id)
      .where("studentId", "==", currentUser.email);

    query.onSnapshot((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        doc.data() && setSubmitted(doc.data());
      });
    });
  }

  const editHandler = () => {
    setContent(task.content);
    setDeadline(task.deadline);
    setMaxPoints(task.maxPoints);
    setContribution(task.contribution);
    setSavedState(!saveState);
  };

  const editTask = (e) => {
    setLoading();
    e.preventDefault();

    taskRef
      .update({
        content: `${content}`,
        maxPoints: `${maxPoints}`,
        deadline: `${deadline}`,
        contribution: `${contribution}`,
      })
      .catch((err) => {
        console.error(err);
      });
    setSavedState(true);
  };

  const onFileChange = async (e) => {
    const file = e.target.files[0];
    const storageRef = firebase.storage().ref();
    const fileRef = storageRef.child(file.name);
    await fileRef.put(file);
    setFileName(file.name);
    setFileUrl(await fileRef.getDownloadURL());
  };

  const handleUpload = (e) => {
    e.preventDefault();
    if (!fileUrl) {
      return;
    }
    setShow(false);
    const newResult = {
      id: uuidv4(),
      taskId: task.id,
      studentId: currentUser.email,
      courseId: task.courseId,
      submitted: fileUrl,
      fileName: fileName,
    };
    db.collection("Results")
      .doc(newResult.id)
      .set(newResult)
      .catch((err) => {
        console.error(err);
      });
  };

  const handleDownload = (event) => {
    const storageRef = firebase.storage().ref();
    storageRef
      .child(fileName)
      .getDownloadURL()
      .then((url) => {
        // `url` is the download URL for 'images/stars.jpg'

        // This can be downloaded directly:
        var xhr = new XMLHttpRequest();
        xhr.responseType = "blob";
        xhr.onload = (event) => {
          var blob = xhr.response;
        };
        xhr.open("GET", url);
        xhr.send();
      })
      .catch((error) => {
        // Handle any errors
      });
  };

  console.log(task);
  return (
    <>
      <Navbar />
      {currentUser.email.includes("@prof") ? (
        <Sidebar data={SidebarDataProf} />
      ) : (
        <Sidebar data={SidebarDataStudent} />
      )}
      {task && (
        <div className="content align-items-start d-flex justify-content-around">
          <div className="m-4 w-75">
            <h2 className="d-flex justify-content-between align-items-center">
              <span>{task.title}</span>
              {currentUser.email.includes("@prof") && (
                <IconContext.Provider value={{ color: "#3a3b3c" }}>
                  <Button
                    variant="link"
                    className="rounded-circle"
                    onClick={editHandler}
                  >
                    <AiIcons.AiFillEdit size="20" />
                  </Button>
                </IconContext.Provider>
              )}
            </h2>
            <h5 className="text-secondary">{task.description}</h5>

            {currentUser.email.includes("@stud") && (
              <div>
                <div className="d-flex justify-content-between">
                  <p className="font-weight-bold">{task.maxPoints} points</p>
                  <p className="font-weight-bold">Deadline: {task.deadline}</p>
                </div>
                <p className="mt-0">{task.content}</p>
              </div>
            )}

            {currentUser.email.includes("@prof") && (
              <Form onSubmit={editTask}>
                <div className="d-flex justify-content-between">
                  <div className="d-flex">
                    {saveState ? (
                      <p className="mr-1 font-weight-bold ">{task.maxPoints}</p>
                    ) : (
                      <input
                        type="text"
                        value={maxPoints}
                        placeholder={task.maxPoints}
                        className="border-0 font-weight-bold points"
                        onChange={(e) => setMaxPoints(e.target.value)}
                      />
                    )}
                    <p className="font-weight-bold mb-0 mr-3">points</p>
                    {saveState ? (
                      <p className="mr-1 font-weight-bold ">
                        {task.contribution}
                      </p>
                    ) : (
                      <input
                        type="text"
                        value={contribution}
                        placeholder={task.contribution}
                        className="border-0 font-weight-bold points"
                        onChange={(e) => setContribution(e.target.value)}
                      />
                    )}
                    <p className="font-weight-bold mb-0">%</p>
                  </div>
                  <div className="d-flex">
                    <p className="font-weight-bold mb-0 mr-1">Deadline:</p>
                    {saveState ? (
                      <p className="font-weight-bold ">{task.deadline}</p>
                    ) : (
                      <input
                        type="date"
                        placeholder={task.deadline}
                        className="border-0 font-weight-bold"
                        onChange={(e) => setDeadline(e.target.value)}
                      />
                    )}
                    {!saveState && (
                      <input
                        type="time"
                        placeholder={task.deadline}
                        className="border-0 font-weight-bold"
                      />
                    )}
                  </div>
                </div>

                <ColoredLine />

                {saveState ? (
                  <p>{task.content}</p>
                ) : (
                  <Form.Control
                    as="textarea"
                    rows={8}
                    value={content}
                    placeholder={task.content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                )}
                {!saveState && <Button type="submit">Save</Button>}
              </Form>
            )}
          </div>

          {currentUser.email.includes("@stud") && (
            <div className="m-4 w-25 d-flex flex-column text-center border rounded p-3 shadow">
              <h2>Your task</h2>
              {!showForm && submitted && (
                <button className="m-3 btn btn-outline-succes">
                  {fileName}
                </button>
              )}
              {!showForm && (
                <button
                  className="m-3 btn btn-outline-secondary"
                  onClick={() => setShow(true)}
                >
                  <BsIcons.BsPlus size="25" className="mr-1" />
                  Add file
                </button>
              )}
              {showForm && (
                <form onSubmit={handleUpload}>
                  <input type="file" onChange={onFileChange}></input>
                  <button type="submit" className="m-3 btn btn-primary">
                    Upload
                  </button>
                </form>
              )}
            </div>
          )}

          {currentUser.email.includes("@prof") && (
            <div className="m-4 w-25 d-flex flex-column text-center border rounded p-3 shadow">
              <h2>Submited</h2>
              <p>Total submissions: {results.length} </p>
              {results.map((result) => (
                <button
                  className="m-3 btn btn-outline-secondary"
                  key={result.id}
                  onClick={(e) => handleDownload()}
                >
                  {result.studentId}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default Task;
