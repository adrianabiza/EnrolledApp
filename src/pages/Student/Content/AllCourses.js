import React, { useState, useEffect, useRef } from "react";
import firebase from "../../../firebase";
import Navbar from "../../../components/common/Navbar/Navbar";
import Sidebar from "../../../components/common/Sidebar/Sidebar";
import { useAuth } from "../../../components/Auth/Auth";
import { SidebarDataStudent } from "./SidebarDataStudent";
import { Alert, Container, Row, Col, Card } from "react-bootstrap";
import img from "../../course.jpg";
import { TextField } from "@material-ui/core";

function AllCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [accessCode, setAccessCode] = useState();
  const [userDetails, setUserDetails] = useState();
  const [error, setError] = useState("");
  const { currentUser } = useAuth();
  const db = firebase.firestore();

  const courseRef = db.collection("Courses");

  function getUser() {
    setLoading(true);
    if (currentUser) {
      db.collection("Users")
        .doc(currentUser.uid)
        .onSnapshot((doc) => {
          setUserDetails(doc.data());
        });
    }
    setLoading(false);
  }

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

  async function attendCourse(studentId, course) {
    if (course.accessCode == accessCode) {
      const attendingRef = db.doc(`Users/${studentId}/Attending/${course.id}`);
      const attendeeRef = db.doc(`Courses/${course.id}/Attendees/${studentId}`);

      const batch = db.batch();
      batch.set(attendingRef, {});
      batch.set(attendeeRef, {});
      await batch.commit();
    } else {
      setError("Access code is incorrect");
    }
  }

  useEffect(() => {
    getUser();
    getCourses();
  }, []);

  return (
    <>
      <Navbar />
      <Sidebar data={SidebarDataStudent} />
      <div className="content">
        <h1 className="title m-4">All courses</h1>
        <TextField label="Search" className="mb-4" />
        <Container>
          <Row>
            {courses.map((course) => (
              <Col md={4}>
                <Card className="text-center mb-4">
                  <Card.Img variant="top" src={img} />
                  <Card.Body>
                    <Card.Title>
                      <h2>{course.title}</h2>
                    </Card.Title>
                    <Card.Text>{course.description}</Card.Text>
                    <Card.Text>Access code</Card.Text>
                    <form>
                      {error && <Alert variant="danger">{error}</Alert>}
                      <input
                        type="number"
                        id="accessCode"
                        onChange={(e) => setAccessCode(e.target.value)}
                        required
                      />
                      <button
                        className="btn btn-outline-primary ml-3"
                        type="reset"
                        onClick={() => attendCourse(currentUser.email, course)}
                      >
                        Enroll
                      </button>
                    </form>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </div>
    </>
  );
}

export default AllCourses;
