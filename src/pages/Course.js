import React, { useState, useEffect } from "react";
import { useAuth } from "../components/Auth/Auth";
import firebase from "../firebase";
import { v4 as uuidv4 } from "uuid";
import { Button, Form, Row, Col } from "react-bootstrap";
import Navbar from "../components/common/Navbar/Navbar";
import { SidebarDataProf } from "./Professor/Content/SidebarDataProf";
import { SidebarDataStudent } from "./Student/Content/SidebarDataStudent";
import Sidebar from "../components/common/Sidebar/Sidebar";
import * as BsIcons from "react-icons/bs";
import LessonCard from "./LessonCard";
import TaskCard from "./TaskCard";

function Course({ match }) {
  const { currentUser } = useAuth();
  const [lessons, setLessons] = useState([]);
  const [course, setCourse] = useState();
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  //hardcode
  const task = { title: "Task 1", description: "JS functions" };
  const obj = {
    title: "Lesson 4",
    description: "Flow control & variable scope",
  };

  const db = firebase.firestore();

  const lessonRef = db
    .collection("Lessons")
    .where("courseId", "==", match.params.id);

  useEffect(() => {
    getCourse();
    getLessons();
  }, []);

  function getCourse() {
    setLoading(true);
    db.collection("Courses")
      .doc(match.params.id)
      .onSnapshot((doc) => {
        setCourse(doc.data());
      });
    setLoading(false);
  }

  function getLessons() {
    setLoading(true);
    lessonRef.onSnapshot((querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });
      setLessons(items);
    });
    setLoading(false);
  }

  console.log(course);

  function addLessons(e) {
    e.preventDefault();
    const newLesson = {
      courseId: match.params.id,
      id: uuidv4(),
      title: title,
      description: desc,
    };
    db.collection("Lessons")
      .doc(newLesson.id)
      .set(newLesson)
      .catch((err) => {
        console.error(err);
      });
    setTitle("");
    setDesc("");
  }

  function deleteLesson(lesson) {
    db.collection("Lessons")
      .doc(lesson.id)
      .delete()
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <>
      <Navbar />
      {currentUser.email.includes("@prof") ? (
        <Sidebar data={SidebarDataProf} />
      ) : (
        <Sidebar data={SidebarDataStudent} />
      )}
      {course && (
        <div className="content">
          <div className="m-3">
            <h1 className="title">{course.title}</h1>
            <h3>{course.description}</h3>
          </div>

          {currentUser.email.includes("@prof") && (
            <div>
              <a
                className="btn p-0 text-primary ml-2"
                onClick={() => {
                  setShowForm(!showForm);
                }}
              >
                Add lesson
                {showForm ? (
                  <BsIcons.BsChevronDown size="10" />
                ) : (
                  <BsIcons.BsChevronRight size="10" />
                )}
              </a>
              {showForm && (
                <Form className="container" onSubmit={addLessons}>
                  <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2">
                      Title
                    </Form.Label>
                    <Col sm="10">
                      <Form.Control
                        required
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2">
                      Description
                    </Form.Label>
                    <Col sm="10">
                      <Form.Control
                        required
                        type="text"
                        value={desc}
                        onChange={(e) => setDesc(e.target.value)}
                      />
                    </Col>
                  </Form.Group>
                  <Button type="submit">Add lesson</Button>
                </Form>
              )}
            </div>
          )}

          <div className="mx-auto">
            {lessons.map((lesson) => (
              <LessonCard
                key={lesson.id}
                data={lesson}
                onDelete={() => deleteLesson(lesson)}
              />
            ))}
            <TaskCard data={task}></TaskCard>
            <LessonCard data={obj} />
          </div>
        </div>
      )}
    </>
  );
}

export default Course;
