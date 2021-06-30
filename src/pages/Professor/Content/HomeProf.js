import React, { useState, useEffect } from "react";
import Navbar from "../../../components/common/Navbar/Navbar";
import Sidebar from "../../../components/common/Sidebar/Sidebar";
import firebase from "../../../firebase";
import { useAuth } from "../../../components/Auth/Auth";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";
import { SidebarDataProf } from "./SidebarDataProf";
import CourseCard from "../../CourseCard";
import * as BsIcons from "react-icons/bs";

function HomeProf() {
  const [courses, setCourses] = useState([]);
  const [course, setCourse] = useState();
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [show, setShow] = useState("home");
  const [desc, setDesc] = useState("");
  const [showForm, setShowForm] = useState(false);
  const { currentUser } = useAuth();
  const db = firebase.firestore();

  const courseRef = db
    .collection("Courses")
    .where("owner", "==", currentUser.email);

  //REALTIME GET FUNCTION
  function getCourses() {
    setLoading(true);
    courseRef.onSnapshot((querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });
      setCourses(items);
    });
    setLoading(false);
  }

  useEffect(() => {
    getCourses();
  }, []);

  function addCourse(e) {
    e.preventDefault();
    const newCourse = {
      owner: currentUser.email,
      id: uuidv4(),
      title: title,
      description: desc,
      accessCode: Math.floor(Math.random() * (10000 - 1000)) + 1000,
    };
    db.collection("Courses")
      .doc(newCourse.id)
      .set(newCourse)
      .catch((err) => {
        console.error(err);
      });
    setTitle("");
    setDesc("");
  }

  //DELETE FUNCTION
  function deleteCourse(course) {
    db.collection("Courses")
      .doc(course.id)
      .delete()
      .catch((err) => {
        console.error(err);
      });
  }

  // EDIT FUNCTION
  function editCourse(updatedCourse) {
    setLoading();
    courseRef
      .doc(updatedCourse.id)
      .update(updatedCourse)
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <>
      <Navbar />
      <Sidebar data={SidebarDataProf} />
      <div className="content container">
        <h1 className="title">Courses</h1>
        <div className="m-3">
          <a
            className="btn p-0 text-primary ml-2"
            onClick={() => {
              setShowForm(!showForm);
            }}
          >
            Add new course
            {showForm ? (
              <BsIcons.BsChevronDown size="10" />
            ) : (
              <BsIcons.BsChevronRight size="10" />
            )}
          </a>
          {showForm == true && (
            <Form className="container" onSubmit={addCourse}>
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
              <Button type="submit">Add course</Button>
            </Form>
          )}
        </div>
        <Container>
          <Row>
            {courses.map((course) => (
              <Col md={4}>
                <CourseCard
                  key={course.id}
                  data={course}
                  onDelete={() => deleteCourse(course)}
                />
              </Col>
            ))}
          </Row>
        </Container>
      </div>
    </>
  );
}

export default HomeProf;
