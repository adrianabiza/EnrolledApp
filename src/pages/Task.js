import React, { useState } from "react";
import Navbar from "../components/common/Navbar/Navbar";
import Sidebar from "../components/common/Sidebar/Sidebar";
import { SidebarDataProf } from "./Professor/Content/SidebarDataProf";
import { SidebarDataStudent } from "./Student/Content/SidebarDataStudent";
import { useAuth } from "../components/Auth/Auth";
import { Button } from "react-bootstrap";
import * as BsIcons from "react-icons/bs";
import * as AiIcons from "react-icons/ai";
import { IconContext } from "react-icons";

function Task() {
  const { currentUser } = useAuth();
  const task = {
    title: "Task 1",
    description: "JS functions",
    maxPoints: 100,
    deadline: "24 feb.",
  };

  const ColoredLine = () => (
    <hr
      style={{
        color: "gray",
        backgroundColor: "gray",
        height: 1,
      }}
    />
  );

  return (
    <>
      <Navbar />
      {currentUser.email.includes("@prof") ? (
        <Sidebar data={SidebarDataProf} />
      ) : (
        <Sidebar data={SidebarDataStudent} />
      )}
      <div className="content align-items-start d-flex justify-content-around">
        <div className="m-4">
          <h2 className="d-flex justify-content-between align-items-center">
            <span>{task.title}</span>
            {currentUser.email.includes("@prof") && (
              <IconContext.Provider value={{ color: "#3a3b3c" }}>
                <Button variant="outline-primary" className="rounded-circle">
                  <AiIcons.AiFillEdit size="20" />
                </Button>
              </IconContext.Provider>
            )}
          </h2>
          <h5 className="text-secondary">{task.description}</h5>

          {currentUser.email.includes("@stud") && (
            <div className="d-flex justify-content-between">
              <p className="font-weight-bold">{task.maxPoints} points</p>
              <p className="font-weight-bold">Deadline: {task.deadline}</p>
            </div>
          )}

          {currentUser.email.includes("@prof") && (
            <div className="d-flex justify-content-between">
              <div className="d-flex">
                <input
                  type="text"
                  placeholder={task.maxPoints}
                  className="border-0 font-weight-bold points"
                />
                <p className="font-weight-bold mb-0">points</p>
              </div>
              <div className="d-flex">
                <p className="font-weight-bold mb-0 mr-1">Deadline:</p>
                <input
                  type="date"
                  placeholder={task.deadline}
                  className="border-0 font-weight-bold"
                />
              </div>
            </div>
          )}

          <ColoredLine />

          <p className="mt-3">
            1. Create an object called a person
            <br />
            2. The object must contain the following properties: firstName,
            lastName, email, birthYear, pets, zipCode.
            <br />
            3. The pets property should contain an array of objects with three
            positions.
            <br />
            4. Pet objects should contain the following properties: name,
            species, age. <br />
            5. All information can be invented. Do not disclose unnecessary
            personal information.
            <br />
            6. Display the sentence: "My name is: xxx and yyy and I have x
            animals.". Don't forget the length property of the pets array.
            <br />
            7. Display the sentence: "I have the same childhood email: xxx.".
            <br />
            8. Display the sentence: "One of my x animals is species and is
            aged."
            <br />
            9. Calculate and display (using the current year) the year of birth
            of the animal in position 2.
            <br />
            10. Calculate and save in the difference variable the age difference
            between the person and the animal from position 0 and display this
            difference. Use this year.
            <br />
            11. Saves the name of the animal from position 0 in a variable
            called petName.
            <br />
            12. Displays the sentence: "Between firstName and petName there is a
            difference of years."
          </p>
        </div>

        {currentUser.email.includes("@stud") && (
          <div className="m-4 w-25 d-flex flex-column text-center border rounded p-3 shadow">
            <h2>Your task</h2>
            <button className="m-3 btn btn-outline-secondary">
              <BsIcons.BsPlus size="25" className="mr-1" />
              Add file
            </button>
            <button className="m-3 btn btn-primary">Upload</button>
          </div>
        )}

        {currentUser.email.includes("@prof") && (
          <div className="m-4 w-25 d-flex flex-column text-center border rounded p-3 shadow">
            <h2>Submited</h2>
            <p>Total submissions: 4</p>
            <button className="m-3 btn btn-outline-secondary">
              <BsIcons.BsDownload size="25" className="mr-2" />
              John Student
            </button>
            <button className="m-3 btn btn-outline-secondary">
              <BsIcons.BsDownload size="25" className="mr-2" />
              Jason Booth
            </button>
            <button className="m-3 btn btn-outline-secondary">
              <BsIcons.BsDownload size="25" className="mr-2" />
              Zarah Burnett
            </button>
            <button className="m-3 btn btn-outline-secondary">
              <BsIcons.BsDownload size="25" className="mr-2" />
              Felix Dale
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default Task;
