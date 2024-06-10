// 3rd Party Imports
import toast from "react-hot-toast";

import { useStore } from "../useStore";
import { useState } from "react";
import CustomModal from "./CustomModal";

const notifyAllFields = () =>
  toast.error("All Fields Needs To Be Filled.", {
    duration: 2000,
    position: "top-right",
  });

const success = () =>
  toast.success("New Task Is Created.", {
    duration: 2000,
    position: "top-right",
  });

const AddNewTask = ({ modalIsOpen, setModalIsOpen, status }) => {
  const [state, setState] = useState({
    title: "",
    description: "",
    status,
    assignee: "",
  });

  const { addTask } = useStore();

  const onSubmit = () => {
    if (!state.title || !state.description || !state.assignee) {
      notifyAllFields();
      return;
    }
    addTask({ ...state });
    success();
    setModalIsOpen(false);
  };

  return (
    <CustomModal
      modalIsOpen={modalIsOpen}
      setModalIsOpen={setModalIsOpen}
      modalBody={
        <div className="add-new-task-container">
          <div className="title-container">
            <input
              className="input-style"
              placeholder="Enter the title"
              onChange={(e) =>
                setState((prev) => ({ ...prev, title: e.target.value }))
              }
            />
          </div>
          <div className="form-container">
            <textarea
              className="input-style"
              placeholder="Enter the description"
              onChange={(e) =>
                setState((prev) => ({ ...prev, description: e.target.value }))
              }
            />
            <select
              className="select"
              defaultValue={state.status}
              onChange={(e) =>
                setState((prev) => ({ ...prev, status: e.target.value }))
              }
            >
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </select>
            <input
              className="input-style"
              placeholder="Select The Assignee"
              onChange={(e) =>
                setState((prev) => ({ ...prev, assignee: e.target.value }))
              }
            />
          </div>
          <button type="button" onClick={onSubmit}>
            ✔
          </button>
        </div>
      }
    />
  );
};

export default AddNewTask;
