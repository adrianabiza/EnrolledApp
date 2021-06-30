import React from "react";
import { Card, ButtonGroup, ToggleButton } from "react-bootstrap";

function Question(props) {
  return (
    <Card className="m-3 ">
      <Card.Text className="text-secondary font-weight-bold mt-2">
        {props.data.q}
      </Card.Text>
      <ToggleButton
        type="radio"
        variant="outline-primary"
        className="mx-3 text-secondary text-left"
        // checked="true"
      >
        <span className="ml-2">{props.data.ans1}</span>
      </ToggleButton>
      <ToggleButton
        type="radio"
        variant="outline-primary"
        className="mx-3 text-secondary text-left"
      >
        <span className="ml-2">{props.data.ans2}</span>
      </ToggleButton>
      <ToggleButton
        type="radio"
        variant="outline-primary"
        className="mx-3 text-secondary text-left"
      >
        <span className="ml-2">{props.data.ans3}</span>
      </ToggleButton>
      <ToggleButton
        type="radio"
        variant="outline-primary"
        className="mx-3 text-secondary text-left"
      >
        <span className="ml-2">{props.data.ans4}</span>
      </ToggleButton>
    </Card>
  );
}

export default Question;
