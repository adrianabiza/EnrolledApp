import React, { useState } from "react";
import { Card, ProgressBar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../components/Auth/Auth";
import img from "./course.jpg";

function CourseCard(props) {
  const [course] = useState(props.data);
  const { currentUser } = useAuth();
  const [accessCode, setAccessCode] = useState();
  return (
    <Card className="text-center mb-4">
      <Card.Img variant="top" src={img} />
      <Card.Body>
        <Card.Title>
          <Link to={`/home/${course.id}`}>{course.title}</Link>
        </Card.Title>
        {currentUser.email.includes("@stud") && (
          <ProgressBar now={course.progress} label={`${course.progress}%`} />
        )}
        <Card.Text>{course.description}</Card.Text>
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
