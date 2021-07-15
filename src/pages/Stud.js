import React from "react";
import Navbar from "../components/common/Navbar/Navbar";
import Sidebar from "../components/common/Sidebar/Sidebar";
import { SidebarDataProf } from "./Professor/Content/SidebarDataProf";
import {
  Card,
  ProgressBar,
  Container,
  Row,
  Col,
  Button,
} from "react-bootstrap";
import Rating from "@material-ui/lab/Rating";

export default function Stud() {
  return (
    <>
      <Navbar />
      <Sidebar data={SidebarDataProf} />
      <div className="content">
        <h2 className="title mb-3">Student Name</h2>
        <Container>
          <Row>
            <Col md={6}>
              <Card className="text-center mb-4">
                <Card.Body>
                  <Card.Title>JavaScript</Card.Title>
                  <ProgressBar now="90" label="90%" />

                  <Card.Text className="mt-2 d-flex justify-content-between align-items-center">
                    Lesson 1 - Quiz
                    <strong>100%</strong>
                  </Card.Text>

                  <Card.Text className="mt-2 d-flex justify-content-between align-items-center">
                    Task 1
                    <Rating name="hover-feedback" value="4.5" precision={0.5} />
                    <Button variant="outline-primary" size="sm">
                      Review
                    </Button>
                  </Card.Text>

                  <Card.Text className="mt-2 d-flex justify-content-between align-items-center">
                    Lesson 2 - Quiz
                    <strong>100%</strong>
                  </Card.Text>

                  <Card.Text className="mt-2 d-flex justify-content-between align-items-center">
                    Lesson 3 - Quiz
                    <strong>85.7%</strong>
                  </Card.Text>

                  <Card.Text className="mt-2 d-flex justify-content-between align-items-center">
                    Lesson 4 - Quiz
                    <strong>85.7%</strong>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6}>
              <Card className="text-center mb-4">
                <Card.Body>
                  <Card.Title>React</Card.Title>
                  <ProgressBar now="30" label="30%" />
                  <Card.Text className="mt-2 d-flex justify-content-between align-items-center">
                    Lesson 1 - Quiz
                    <strong>100%</strong>
                  </Card.Text>

                  <Card.Text className="mt-2 d-flex justify-content-between align-items-center">
                    TODO 1
                    <Rating name="hover-feedback" value="4" precision={0.5} />
                    <Button variant="outline-primary" size="sm">
                      Review
                    </Button>
                  </Card.Text>

                  <Card.Text className="mt-2 d-flex justify-content-between align-items-center">
                    Lesson 2 - Quiz
                    <strong>88.8%</strong>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}
