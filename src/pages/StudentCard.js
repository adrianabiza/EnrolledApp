import React, { useState } from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import img from "./student.png";

function StudentCard(props) {
  const [student] = useState(props.data);

  return (
    <Card className="text-center mb-4">
      <Card.Img variant="top" className="w-50 h-50 mx-auto my-2" src={img} />
      <Card.Title>
        <Link to="/student/lala">
          {student.firstName} {student.lastName}
        </Link>
      </Card.Title>
      <button onClick={props.onDelete} className="btn btn-outline-info m-2">
        Remove
      </button>
    </Card>
  );
}

export default StudentCard;
