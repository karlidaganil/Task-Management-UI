// 3rd Party Imports
import DraggableContents from "./components/DraggableContents";

import ChangeInitialJson from "./components/ChangeInitialJson";
import { useFilterByAssignee } from "./hooks/useFilterByAssignee";

const App = () => {
  const { AllAssignees, filteredColumns } = useFilterByAssignee();

  return (
    <div className="container">
      <div className="filters-container">
        <span>Filter By Assignee:</span>
        {AllAssignees}
        <ChangeInitialJson />
      </div>
      <DraggableContents filteredColumns={filteredColumns} />
    </div>
  );
};

export default App;
