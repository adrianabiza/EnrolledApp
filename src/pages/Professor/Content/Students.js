import React from "react";
import Navbar from "../../../components/common/Navbar/Navbar";
import Sidebar from "../../../components/common/Sidebar/Sidebar";
import { SidebarDataProf } from "./SidebarDataProf";
import StudentCard from "../../StudentCard";
import { Container, Col, Row } from "react-bootstrap";

function Students() {
  const student1 = { firstName: "John", lastName: "Student" };
  const student2 = { firstName: "Bryson", lastName: "Jaramillo" };
  const student3 = { firstName: "Zarah", lastName: "Burnett" };
  const student4 = { firstName: "Franciszek", lastName: "Hines" };
  const student5 = { firstName: "Jason", lastName: "Booth" };
  const student6 = { firstName: "Felix", lastName: "Dale" };

  return (
    <>
      <Navbar />
      <Sidebar data={SidebarDataProf} />
      <div className="content">
        <h1 className="title">Students</h1>
        <Container>
          <Row>
            <Col md={3}>
              <StudentCard data={student1} />
            </Col>
            <Col md={3}>
              <StudentCard data={student2} />
            </Col>
            <Col md={3}>
              <StudentCard data={student3} />
            </Col>
            <Col md={3}>
              <StudentCard data={student4} />
            </Col>
            <Col md={3}>
              <StudentCard data={student5} />
            </Col>
            <Col md={3}>
              <StudentCard data={student6} />
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default Students;
