import React, { useState, useEffect } from "react";
import Navbar from "../../../components/common/Navbar/Navbar";
import Sidebar from "../../../components/common/Sidebar/Sidebar";
import { useAuth } from "../../../components/Auth/Auth";
import firebase from "../../../firebase";
import { SidebarDataStudent } from "./SidebarDataStudent";
import CourseCard from "../../CourseCard";
import { Container, Row, Col } from "react-bootstrap";

function HomeStudent() {
  const { currentUser } = useAuth();
  const [courses, setCourses] = useState([]);
  const [course, setCourse] = useState();
  // const [show, setShow] = useState('home');
  const [loading, setLoading] = useState(false);
  const db = firebase.firestore();

  async function fetchCourses() {
    const courses = await db
      .collection(`Users/${currentUser.email}/Attending`)
      .get();

    const courseDocs = await Promise.all(
      courses.docs.map((doc) => db.doc(`Courses/${doc.id}`).get())
    );

    return courseDocs
      .filter((doc) => doc.exists)
      .map((doc) => ({ id: doc.id, ...doc.data() }));
  }

  useEffect(() => {
    fetchCourses().then(function getCourses(value) {
      setCourses(value);
    });
  }, []);

  return (
    <>
      <Navbar />
      <Sidebar data={SidebarDataStudent} />
      <div className="content">
        <h1 className="title m-4">Home</h1>
        <Container>
          <Row>
            {courses.map((course) => (
              <Col md={4}>
                <CourseCard key={course.id} data={course} />
              </Col>
            ))}
          </Row>
        </Container>
      </div>
    </>
  );
}

export default HomeStudent;
