import React, { useState } from "react";
import Navbar from "../components/common/Navbar/Navbar";
import Sidebar from "../components/common/Sidebar/Sidebar";
import { SidebarDataProf } from "./Professor/Content/SidebarDataProf";
import { SidebarDataStudent } from "./Student/Content/SidebarDataStudent";
import { useAuth } from "../components/Auth/Auth";
import Quiz from "./Quiz";
import video from "./video.mp4";

function Lesson() {
  const { currentUser } = useAuth();

  return (
    <>
      <Navbar />
      {currentUser.email.includes("@prof") ? (
        <Sidebar data={SidebarDataProf} />
      ) : (
        <Sidebar data={SidebarDataStudent} />
      )}
      <div className="content text-center">
        <h2 className="title">Lesson1 </h2>
        <h4>Basic JavaScript</h4>
        <div className="text-center mb-4">
          <video width="600" height="400" controls>
            <source src={video} type="video/mp4" />
          </video>
        </div>
        <Quiz />
      </div>
    </>
  );
}

export default Lesson;
