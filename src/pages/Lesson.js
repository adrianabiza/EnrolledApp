import React, { useState, useEffect } from "react";
import Navbar from "../components/common/Navbar/Navbar";
import Sidebar from "../components/common/Sidebar/Sidebar";
import { SidebarDataProf } from "./Professor/Content/SidebarDataProf";
import { SidebarDataStudent } from "./Student/Content/SidebarDataStudent";
import { useAuth } from "../components/Auth/Auth";
import firebase from "../firebase";
import Quiz from "./Quiz";
import { IconContext } from "react-icons";
import * as AiIcons from "react-icons/ai";
import { Button } from "react-bootstrap";
import { Document, Page } from "react-pdf";
import pdf from "./somepdf.pdf";

function Lesson({ match }) {
  const { currentUser } = useAuth();
  const [lesson, setLesson] = useState();
  const [loading, setLoading] = useState(false);
  const [editState, setEditState] = useState(false);
  const [fileUrl, setFileUrl] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  const db = firebase.firestore();

  const onFileChange = async (e) => {
    const file = e.target.files[0];
    const storageRef = firebase.storage().ref();
    const fileRef = storageRef.child(file.name);
    await fileRef.put(file);
    setFileUrl(await fileRef.getDownloadURL());
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!fileUrl) {
      return;
    }
    await db.collection("Posts").doc(match.params.id).update({
      content: fileUrl,
    });
    setEditState(false);
  };

  useEffect(() => {
    getLesson();
  }, []);

  function getLesson() {
    setLoading(true);
    db.collection("Posts")
      .doc(match.params.id)
      .onSnapshot((doc) => {
        setLesson(doc.data());
      });
    setLoading(false);
  }

  const editHandler = () => {
    setEditState(!editState);
  };

  return (
    <>
      <Navbar />
      {currentUser.email.includes("@prof") ? (
        <Sidebar data={SidebarDataProf} />
      ) : (
        <Sidebar data={SidebarDataStudent} />
      )}
      {lesson && (
        <div className="content text-center">
          <h2 className="title">{lesson.title}</h2>
          <h4>{lesson.description}</h4>

          <div className="my-3">
            {currentUser.email.includes("@prof") && (
              <IconContext.Provider value={{ color: "#3a3b3c" }}>
                <Button
                  variant="link"
                  className="rounded-circle"
                  onClick={editHandler}
                >
                  <AiIcons.AiFillEdit size="30" />
                </Button>
              </IconContext.Provider>
            )}
            {editState && (
              <form onSubmit={onSubmit}>
                <input type="file" onChange={onFileChange} />
                <button className="btn btn-outline-primary">Save</button>
              </form>
            )}
          </div>

          {lesson.content && lesson.content.includes("mp4") ? (
            <video width="700" height="400" controls>
              <source src={lesson.content} type="video/mp4" />
            </video>
          ) : (
            <div>
              <Document
                file={lesson.content}
                onLoadSuccess={onDocumentLoadSuccess}
              >
                <Page pageNumber={pageNumber} />
              </Document>
              <p>
                Page {pageNumber} of {numPages}
              </p>
            </div>
          )}

          <Quiz data={lesson} />
        </div>
      )}
    </>
  );
}

export default Lesson;
