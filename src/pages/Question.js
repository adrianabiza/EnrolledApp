import React, { useState, useEffect } from "react";
import { Card, ButtonGroup, ToggleButton, Button } from "react-bootstrap";
import { useAuth } from "../components/Auth/Auth";
import firebase from "../firebase";
import * as AiIcons from "react-icons/ai";

function Question({ data, disabled, updateQuiz }) {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [checked, setChecked] = useState(false);

  const db = firebase.firestore();

  useEffect(() => {
    getAnswers();
  }, []);

  function getAnswers() {
    setLoading(true);
    db.collection("Answers")
      .where("questionId", "==", data.id)
      .onSnapshot((querySnapshot) => {
        let items = [];
        querySnapshot.forEach((doc) => {
          items.push(doc.data());
        });
        items.forEach((item) => {
          item.checked = false;
        });
        setAnswers(items);
      });
    setLoading(false);
  }

  const handleChange = (id) => {
    const answersCopy = [...answers];
    let response = false;
    answersCopy.forEach((el) => {
      if (el.id === id) {
        el.checked = true;
        response = el.correct;
      } else {
        el.checked = false;
      }
    });
    setAnswers(answersCopy);
    updateQuiz(data.id, response);
  };

  const handleDelete = () => {
    db.collection("Questions")
      .doc(data.id)
      .delete()
      .catch((err) => {
        console.error(err);
      });

    answers.forEach((ans) => {
      db.collection("Answers")
        .doc(ans.id)
        .delete()
        .catch((err) => {
          console.error(err);
        });
    });
  };

  return (
    <Card className="m-3">
      <Card.Text className="text-secondary font-weight-bold mt-2">
        {data.text}
        {currentUser.email.includes("@prof") && (
          <button className="btn btn-link mb-1">
            <AiIcons.AiFillDelete
              onClick={handleDelete}
              size="20"
              className="mx-3"
            />
          </button>
        )}
      </Card.Text>
      <ButtonGroup>
        {answers.map((ans) => (
          <ToggleButton
            key={ans.id}
            id={ans.id}
            name={data.id}
            type="radio"
            variant="outline-primary"
            className="mx-3 text-secondary text-left d-block"
            onChange={() => handleChange(ans.id)}
            checked={ans.checked}
            disabled={disabled}
          >
            <span className="ml-2">{ans.text}</span>
          </ToggleButton>
        ))}
      </ButtonGroup>
    </Card>
  );
}

export default Question;
