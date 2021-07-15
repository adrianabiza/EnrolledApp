import React, { useState, useEffect } from "react";
import { Card, ProgressBar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../components/Auth/Auth";
import img from "./course.jpg";
import firebase from "../firebase";

function CourseCard(props) {
  const [course] = useState(props.data);
  const { currentUser } = useAuth();
  const [results, setResults] = useState(0);
  const [posts, setPosts] = useState(0);
  const [tasks, setTasks] = useState(0);

  const db = firebase.firestore();

  useEffect(() => {
    getResults();
    getLessons();
    getTasks();
  }, []);

  function getResults() {
    var query = db.collection("Results");
    query = query.where("courseId", "==", course.id);
    query = query.where("studentId", "==", currentUser.email);
    query
      .get()
      .then((querySnapshot) => {
        let noItems = 0;
        querySnapshot.forEach((doc) => {
          noItems += 1;
        });
        setResults(noItems);
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  }

  function getLessons() {
    db.collection("Posts")
      .where("courseId", "==", course.id)
      .onSnapshot((querySnapshot) => {
        let noItems = 0;
        querySnapshot.forEach((doc) => {
          noItems += 1;
        });
        setPosts(noItems);
      });
  }

  function getTasks() {
    db.collection("Tasks")
      .where("courseId", "==", course.id)
      .onSnapshot((querySnapshot) => {
        let noItems = 0;
        querySnapshot.forEach((doc) => {
          noItems += 1;
        });
        setTasks(noItems);
      });
  }

  const progress = results ? (results / (posts + tasks)) * 100 : 0;
  return (
    <Card className="text-center mb-4">
      <Card.Img variant="top" src={img} />
      <Card.Body>
        <Card.Title>
          <Link to={`/home/${course.id}`}>{course.title}</Link>
        </Card.Title>
        <Card.Text>{course.description}</Card.Text>
        {currentUser.email.includes("@stud") && (
          <ProgressBar now={progress} label={`${progress}%`} />
        )}
        {currentUser.email.includes("@prof") && (
          <Card.Text>Access code: {course.accessCode}</Card.Text>
        )}
      </Card.Body>
      {currentUser.email.includes("@prof") && (
        <button
          onClick={props.onDelete}
          className="btn btn-outline-primary m-2"
        >
          Delete
        </button>
      )}
    </Card>
  );
}

export default CourseCard;
