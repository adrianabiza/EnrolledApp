import React, { useState } from "react";
import * as BsIcons from "react-icons/bs";
import { useAuth } from "../components/Auth/Auth";
import Question from "./Question";
import { Button, Container, Row, Col } from "react-bootstrap";

function Quiz() {
  const { currentUser } = useAuth();
  const q1 = {
    q: "Inside which HTML element do we put the JavaScript?",
    ans1: "<scripting>",
    ans2: "<script>",
    ans3: "<javascript>",
    ans4: "<js>",
  };
  const q2 = {
    q: "How do you write `Hello World` in an alert box?",
    ans1: "alertBox(`Hello World`)",
    ans2: "alert(`Hello World`)",
    ans3: "msg(`Hello World`)",
    ans4: "msgBox(`Hello World`)",
  };
  const q3 = {
    q: "How to write an IF statement in JavaScript?",
    ans1: "if i==5 then",
    ans2: "if i=5",
    ans3: "if (i==5)",
    ans4: "if i=5 then",
  };
  const q4 = {
    q: "How to write an IF statement for executing some code if `i` is NOT equal to 5?",
    ans1: "if i =! 5 then",
    ans2: "if (i <> 5)",
    ans3: "if i <> 5)",
    ans4: "if (i != 5)",
  };

  return (
    <>
      <div>
        <h3>
          <span className="mr-2">Quiz</span>
          <BsIcons.BsQuestionCircle size="25" />
        </h3>
        <Container>
          <Row>
            <Col md={6}>
              <Question data={q1} />
            </Col>
            <Col md={6}>
              <Question data={q2} />
            </Col>
            <Col md={6}>
              <Question data={q3} />
            </Col>
            <Col md={6}>
              <Question data={q4} />
            </Col>
          </Row>
        </Container>
        <Button variant="primary" className="px-5 mb-5">
          {currentUser.email.includes("@prof") ? "Edit" : "Finish"}
        </Button>
      </div>
    </>
  );
}

export default Quiz;
