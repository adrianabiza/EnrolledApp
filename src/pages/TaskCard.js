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
          <Link className="mr-2" to={`/task/${task.id}`}>
            {task.title}
          </Link>
        </div>

        {currentUser.email.includes("@stud") && (
          <strong className="mb-0 mr-2">{task.deadline}</strong>
        )}
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

export default TaskCard;
