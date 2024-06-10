import { useState } from "react";
import { useStore } from "../useStore";

export const useFilterByAssignee = () => {
  const [assignee, setAssignee] = useState("all");

  const { columns } = useStore();

  const allAssignees = [
    ...new Set(
      Object.values(columns)
        .map((col) => col.list)
        .flat()
        .map((task) => task.assignee)
    ),
  ];

  const AllAssignees = (
    <select className="select AllAssignees" onChange={(e) => setAssignee(e.target.value)}>
      <option value="all">All</option>
      {allAssignees.map((assignee) => (
        <option key={assignee} value={assignee}>
          {assignee}
        </option>
      ))}
    </select>
  );

  const filteredByAssignee = (assignee) => {
    const newColumns = {};
    for (const col of Object.values(columns)) {
      newColumns[col.id] = {
        id: col.id,
        list: col.list.filter((task) => task.assignee === assignee),
      };
    }
    return newColumns;
  };

  const filteredColumns =
    assignee === "all" ? columns : filteredByAssignee(assignee);

  return { AllAssignees, filteredColumns };
};
