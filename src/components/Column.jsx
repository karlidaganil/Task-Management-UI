import { useState } from "react";
import Item from "./Item";
import { Droppable } from "react-beautiful-dnd";
import AddNewTask from "./AddNewTask";

const Column = ({ col: { list, id } }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  return (
    <>
      <Droppable droppableId={id}>
        {(provided) => (
          <div className="droppable-container">
            <h2 className="column-title">{id}</h2>
            <div
              className="droppable-content"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {list.map((task, index) => (
                <Item key={task.description} task={task} index={index} />
              ))}
              {provided.placeholder}
              <button onClick={() => setModalIsOpen(true)}>
                Add New Task +
              </button>
            </div>
          </div>
        )}
      </Droppable>
      <AddNewTask
        modalIsOpen={modalIsOpen}
        setModalIsOpen={setModalIsOpen}
        status={id}
      />
    </>
  );
};

export default Column;
