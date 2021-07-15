import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../components/Auth/Auth";
import { IconContext } from "react-icons";
import * as CgIcons from "react-icons/cg";
import * as AiIcons from "react-icons/ai";

function LessonCard(props) {
  const [lesson] = useState(props.data);
  const { currentUser } = useAuth();
  return (
    <IconContext.Provider value={{ color: "#3a3b3c" }}>
      <div className="lesson">
        <div className="d-flex align-items-center">
          <CgIcons.CgNotes size="25" className="m-2" />
          <Link className="mr-2" to={`/lesson/${lesson.id}`}>
            {lesson.title}
          </Link>
          {lesson.description && (
            <div className="ml-2"> {lesson.description}</div>
          )}
        </div>

        {currentUser.email.includes("@prof") && (
          <button className="btn btn-link">
            <AiIcons.AiFillDelete
              onClick={props.onDelete}
              size="20"
              className="mx-3"
            />
          </button>
        )}
      </div>
    </IconContext.Provider>
  );
}

export default LessonCard;
