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
  const [tasks, setTasks] = useState([]);
  const [course, setCourse] = useState();
  const [loading, setLoading] = useState(false);
  const [showFormPost, setShowFormPost] = useState(false);
  const [showFormTask, setShowFormTask] = useState(false);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const db = firebase.firestore();

  const lessonRef = db
    .collection("Posts")
    .where("courseId", "==", match.params.id);

  const taskRef = db
    .collection("Tasks")
    .where("courseId", "==", match.params.id);

  useEffect(() => {
    getCourse();
    getLessons();
    getTasks();
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
    const id = lessons.length ? lessons.pop().id + 1 : uuidv4();
    const newQuiz = {
      lessonId: id,
      id: uuidv4(),
    };
    const newLesson = {
      courseId: match.params.id,
      id: id,
      title: title,
      description: desc,
      quizId: newQuiz.id,
    };
    db.collection("Posts")
      .doc(newLesson.id)
      .set(newLesson)
      .catch((err) => {
        console.error(err);
      });

    db.collection("Quizzes")
      .doc(newQuiz.id)
      .set(newQuiz)
      .catch((err) => {
        console.error(err);
      });
    setTitle("");
    setDesc("");
  }

  function deleteLesson(lesson) {
    db.collection("Posts")
      .doc(lesson.id)
      .delete()
      .catch((err) => {
        console.error(err);
      });

    const quizRef = db.collection("Quizzes").where("lessonId", "==", lesson.id);
    quizRef.get().then((res) => {
      res.forEach((element) => {
        element.ref.delete();
      });
    });
  }

  function getTasks() {
    setLoading(true);
    taskRef.onSnapshot((querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });
      setTasks(items);
    });
    setLoading(false);
  }

  function addTask(e) {
    e.preventDefault();
    const id = tasks.length ? tasks.pop().id + 100 : uuidv4();
    var utc = new Date().toJSON().slice(0, 10).replace(/-/g, "/");
    const newTask = {
      courseId: match.params.id,
      id: id,
      title: title,
      maxPoints: 100,
      deadline: utc,
      contribution: 0,
    };

    db.collection("Tasks")
      .doc(newTask.id)
      .set(newTask)
      .catch((err) => {
        console.error(err);
      });
    setTitle("");
    setDesc("");
  }

  function deleteTask(task) {
    db.collection("Tasks")
      .doc(task.id)
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
                  setShowFormPost(!showFormPost);
                }}
              >
                New post
                {showFormPost ? (
                  <BsIcons.BsChevronDown size="10" />
                ) : (
                  <BsIcons.BsChevronRight size="10" />
                )}
              </a>
              {showFormPost && (
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
                        type="text"
                        value={desc}
                        onChange={(e) => setDesc(e.target.value)}
                      />
                    </Col>
                  </Form.Group>
                  <Button type="submit">Add post</Button>
                </Form>
              )}
              <a
                className="btn p-0 text-primary ml-2"
                onClick={() => {
                  setShowFormTask(!showFormTask);
                }}
              >
                New task
                {showFormTask ? (
                  <BsIcons.BsChevronDown size="10" />
                ) : (
                  <BsIcons.BsChevronRight size="10" />
                )}
              </a>
              {showFormTask && (
                <Form className="container" onSubmit={addTask}>
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
                  <Button type="submit">Add task</Button>
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
          </div>

          <div className="mx-auto">
            {tasks.map((task) => (
              <TaskCard
                key={task.id}
                data={task}
                onDelete={() => deleteTask(task)}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default Course;
