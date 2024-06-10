import { DragDropContext } from "react-beautiful-dnd";
import Column from "./Column";
import { useStore } from "../useStore";

const DraggableContents = ({ filteredColumns }) => {
  const { columns, setColumns } = useStore();

  const onDragEnd = ({ source, destination }) => {
    // Make sure we have a valid destination
    if (destination === undefined || destination === null) return null;

    // Make sure we're actually moving the item
    if (
      source.droppableId === destination.droppableId &&
      destination.index === source.index
    )
      return null;

    // Set start and end variables
    const start = columns[source.droppableId];
    const end = columns[destination.droppableId];

    // If start is the same as end, we're in the same column
    if (start === end) {
      // Move the item within the list
      // Start by making a new list without the dragged item
      const newList = start.list.filter((_, idx) => idx !== source.index);

      // Then insert the item at the right location
      newList.splice(destination.index, 0, start.list[source.index]);

      // Then create a new copy of the column object
      const newCol = {
        id: start.id,
        list: newList,
      };

      // Update the state
      setColumns({ [newCol.id]: newCol });
      return null;
    } else {
      // If start is different from end, we need to update multiple columns
      // Filter the start list like before
      const newStartList = start.list.filter((_, idx) => idx !== source.index);

      // Create a new start column
      const newStartCol = {
        id: start.id,
        list: newStartList,
      };

      // Make a new end list array
      const newEndList = end.list;

      // Insert the item into the end list
      newEndList.splice(destination.index, 0, start.list[source.index]);

      // Create a new end column
      const newEndCol = {
        id: end.id,
        // also update the status of the tasks
        list: newEndList.map((task) => ({ ...task, status: end.id })),
      };

      // Update the state
      setColumns({
        [newStartCol.id]: newStartCol,
        [newEndCol.id]: newEndCol,
      });

      return null;
    }
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="columns-container">
        {Object.values(filteredColumns).map((col) => (
          <Column col={col} key={col.id} />
        ))}
      </div>
    </DragDropContext>
  );
};

export default DraggableContents;
