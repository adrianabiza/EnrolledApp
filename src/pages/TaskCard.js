import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../components/Auth/Auth";
import { IconContext } from "react-icons";
import * as AiIcons from "react-icons/ai";

function TaskCard(props) {
  const [task] = useState(props.data);
  const { currentUser } = useAuth();
  return (
    <IconContext.Provider value={{ color: "#3a3b3c" }}>
      <div className="lesson">
        <div className="d-flex align-items-center">
          <AiIcons.AiFillPlusCircle size="25" className="m-2" />
          <Link className="mr-2" to={`/task`}>
            {task.title}
          </Link>
          -<div className="ml-2">{task.description}</div>
        </div>

        {currentUser.email.includes("@stud") && (
          <strong className="mb-0 mr-2">Due 24 ian.</strong>
        )}
        {currentUser.email.includes("@prof") && (
          <AiIcons.AiFillDelete size="20" className="mx-3" />
        )}
      </div>
    </IconContext.Provider>
  );
}

export default TaskCard;
