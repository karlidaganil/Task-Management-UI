import { Draggable } from "react-beautiful-dnd";

import { LongTextControl, getInitialLetterOfName } from "../helpers";
import { useStore } from "../useStore";

import deleteIcon from "../../public/delete.png";

import toast from "react-hot-toast";

const deletedToast = () =>
  toast.success("Task Is Deleted.", {
    duration: 2000,
    position: "top-right",
  });

const Item = ({ task, index }) => {
  const { title, description, status, assignee } = task;
  const { deleteTask } = useStore();

  return (
    <Draggable draggableId={description} index={index}>
      {(provided) => (
        <div
          className="task-container"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div className="title-container">
            <h5>{title}</h5>
            <img
              width={20}
              height={20}
              src={deleteIcon}
              alt="delete"
              onClick={() => {
                deleteTask(task);
                deletedToast();
              }}
            />
          </div>
          <p title={description}>{LongTextControl(description, 65)}</p>
          <div className="bottom-container">
            <span className="status">{status}</span>
            <div className="assignee" title={assignee}>
              {getInitialLetterOfName(assignee)}
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default Item;
