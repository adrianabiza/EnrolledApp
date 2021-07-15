import React, { useState, useEffect } from "react";
import Navbar from "../../../components/common/Navbar/Navbar";
import Sidebar from "../../../components/common/Sidebar/Sidebar";
import { SidebarDataProf } from "./SidebarDataProf";
import StudentCard from "../../StudentCard";
import { Container, Col, Row } from "react-bootstrap";
import { TextField } from "@material-ui/core";
import firebase from "../../../firebase";
import { useAuth } from "../../../components/Auth/Auth";

function Students() {
  const { currentUser } = useAuth();
  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState([]);
  const db = firebase.firestore();

  useEffect(() => {
    getCourses();
    getStudents();
  }, []);

  function getCourses() {
    db.collection("Courses")
      .where("owner", "==", currentUser.email)
      .onSnapshot((querySnapshot) => {
        const items = [];
        querySnapshot.forEach((doc) => {
          items.push(doc.data());
        });
        setCourses(items);
      });
  }

  function getStudents() {
    db.collection("Users")
      .where("isProf", "==", "false")
      .onSnapshot((querySnapshot) => {
        const items = [];
        querySnapshot.forEach((doc) => {
          items.push(doc.data());
        });
        setStudents(items);
      });
  }

  const handleDelete = (student) => {
    courses.forEach((course) => {
      db.collection("Students")
        .doc(student.id)
        .collection("Attending")
        .doc(course.id)
        .delete()
        .catch((err) => {
          console.error(err);
        });
    });
  };

  return (
    <>
      <Navbar />
      <Sidebar data={SidebarDataProf} />
      <div className="content">
        <h1 className="title">Students</h1>
        <TextField label="Search" className="mb-4" />
        <Container>
          <Row>
            {students.map((student) => (
              <Col md={3}>
                <StudentCard
                  data={student}
                  onDelete={() => handleDelete(student)}
                />
              </Col>
            ))}
          </Row>
        </Container>
      </div>
    </>
  );
}

export default Students;
