import React, { useState, useEffect } from "react";
import * as BsIcons from "react-icons/bs";
import { useAuth } from "../components/Auth/Auth";
import Question from "./Question";
import { Button, Form, Row, Col, Container } from "react-bootstrap";
import firebase from "../firebase";
import { v4 as uuidv4 } from "uuid";
import { Alert } from "@material-ui/lab";

function Quiz(props) {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [data] = useState(props.data);
  const [questions, setQuestions] = useState([]);
  const [quiz, setQuiz] = useState();
  const [editState, setEditState] = useState(false);
  const [text, setText] = useState("");
  const [isFinished, setIsFinished] = useState(false);
  const [result, setResult] = useState(0);
  const [score, setScore] = useState(0);
  const [fields, setFields] = useState([{ value: null, check: false }]);

  const db = firebase.firestore();

  useEffect(() => {
    getQuiz();
    getQuestions();
    getResult();
  }, []);

  function getQuiz() {
    setLoading(true);
    db.collection("Quizzes")
      .doc(data.quizId)
      .onSnapshot((doc) => {
        setQuiz(doc.data());
      });
    setLoading(false);
  }

  function getResult() {
    setLoading(true);
    var query = db.collection("Results");
    query = query.where("quizId", "==", data.quizId);
    query = query.where("studentId", "==", currentUser.email);
    query
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          if (doc.data) {
            setResult(doc.data());
            setIsFinished(true);
          }
        });
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
    setLoading(false);
  }

  function getQuestions() {
    setLoading(true);
    db.collection("Questions")
      .where("quizId", "==", data.quizId)
      .onSnapshot((querySnapshot) => {
        const items = [];
        querySnapshot.forEach((doc) => {
          items.push(doc.data());
        });
        setQuestions(items);
      });
    setLoading(false);
  }

  const handleChange = (i, e) => {
    const values = [...fields];
    e.target.value === "on"
      ? (values[i].check = true)
      : (values[i].value = e.target.value);
    setFields(values);
  };

  const handleAdd = () => {
    const values = [...fields];
    values.push({ value: null, check: false });
    setFields(values);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const qId = uuidv4();
    const newQuestion = {
      quizId: data.quizId,
      id: qId,
      text: text,
    };
    db.collection("Questions")
      .doc(newQuestion.id)
      .set(newQuestion)
      .catch((err) => {
        console.error(err);
      });
    fields.forEach((field) => {
      const newAnswer = {
        questionId: qId,
        id: uuidv4(),
        text: field.value,
        correct: field.check,
      };
      db.collection("Answers")
        .doc(newAnswer.id)
        .set(newAnswer)
        .catch((err) => {
          console.error(err);
        });
    });
    setEditState(false);
    setText("");
    setFields([{ value: null, check: false }]);
  };

  const handleQuestionUpdate = (id, response) => {
    console.log(id, response);
    const questionsCopy = [...questions];
    questionsCopy.forEach((el) => {
      if (el.id === id) {
        el.response = response;
        response && setScore(score + 1);
      }
    });
    setQuestions(questionsCopy);
  };

  const handleFinish = () => {
    setIsFinished(true);
    const newResult = {
      id: uuidv4(),
      quizId: data.quizId,
      studentId: currentUser.email,
      result: (score / questions.length) * 100,
      courseId: data.courseId,
    };
    db.collection("Results")
      .doc(newResult.id)
      .set(newResult)
      .catch((err) => {
        console.error(err);
      });
  };
  return (
    <>
      <div className="mb-4">
        <h3>
          <h4 className="mr-2 mt-4">
            Quiz
            <BsIcons.BsQuestionCircle size="25" className="ml-1" />
          </h4>
        </h3>
        {currentUser.email.includes("@stud") && isFinished && result.result && (
          <Alert
            variant="outlined"
            severity="success"
            color="info"
            className="w-75 mx-auto"
          >
            Results: {result.result}%
          </Alert>
        )}

        {currentUser.email.includes("@stud") && isFinished && !result.result && (
          <Alert
            variant="outlined"
            severity="success"
            color="info"
            className="w-75 mx-auto"
          >
            Results: {score}/{questions.length}
          </Alert>
        )}

        <Container>
          <Row>
            {questions.map((question) => (
              <Col md={6}>
                <Question
                  key={question.id}
                  data={question}
                  updateQuiz={handleQuestionUpdate}
                  disabled={isFinished}
                />
                {isFinished &&
                  !result.result &&
                  (question.response ? (
                    <Alert severity="success">Correct</Alert>
                  ) : (
                    <Alert severity="error" className="mb-3">
                      Wrong
                    </Alert>
                  ))}
              </Col>
            ))}
          </Row>
        </Container>

        {!editState && currentUser.email.includes("@prof") && (
          <Button
            variant="primary"
            className="px-5 mb-5"
            onClick={() => setEditState(!editState)}
          >
            Edit
          </Button>
        )}
        {editState && (
          <Form onSubmit={handleSubmit} className="container text-none">
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="2">
                New Question
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  required
                  type="text"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                />
              </Col>
            </Form.Group>
            {fields.map((field, idx) => (
              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2">
                  Answer
                </Form.Label>
                <Col sm="8">
                  <Form.Control
                    key={idx}
                    type="text"
                    value={field.value}
                    onChange={(e) => handleChange(idx, e)}
                  />
                </Col>
                <Form.Check
                  column
                  sm="2"
                  className="mt-2"
                  onChange={(e) => handleChange(idx, e)}
                />
              </Form.Group>
            ))}
            <Button onClick={() => handleAdd()} className="mr-3 mb-5">
              Add answer
            </Button>
            <Button variant="succes" type="submit" className="mr-3 mb-5">
              Save
            </Button>
            <Button
              variant="dark"
              onClick={() => setEditState(false)}
              className="mb-5"
            >
              Cancel
            </Button>
          </Form>
        )}
        {currentUser.email.includes("@stud") && !isFinished && (
          <Button
            variant="primary"
            className="px-5 mb-5"
            onClick={handleFinish}
          >
            Finish
          </Button>
        )}
      </div>
    </>
  );
}

export default Quiz;
