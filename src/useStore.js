// 3rd Party Imports
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import { DummyTasks } from "./DummyTasks";
import { STATUS } from "./enums";

const defaultColumns = {
  [STATUS.TO_DO]: {
    id: STATUS.TO_DO,
    list: DummyTasks.filter((task) => task.status === STATUS.TO_DO),
  },
  [STATUS.IN_PROGRESS]: {
    id: STATUS.IN_PROGRESS,
    list: DummyTasks.filter((task) => task.status === STATUS.IN_PROGRESS),
  },
  [STATUS.DONE]: {
    id: STATUS.DONE,
    list: DummyTasks.filter((task) => task.status === STATUS.DONE),
  },
};

export const useStore = create(
  persist(
    (set) => ({
      columns: defaultColumns,
      setColumns: (columns) =>
        set((state) => ({
          columns: {
            ...state.columns,
            ...columns,
          },
        })),
      addTask: (task) =>
        set((state) => {
          const newColumns = { ...state.columns };
          newColumns[task.status].list.push(task);
          return { columns: newColumns };
        }),
      deleteTask: (task) =>
        set((state) => {
          const newColumns = { ...state.columns };
          newColumns[task.status].list = newColumns[task.status].list.filter(
            (t) => t.description !== task.description
          );
          return { columns: newColumns };
        }),
      changeInitial: (newTasks) => {
        set((state) => {
          const newColumns = { ...state.columns };
          newColumns[STATUS.TO_DO].list = newTasks.filter(
            (task) => task.status === STATUS.TO_DO
          );
          newColumns[STATUS.IN_PROGRESS].list = newTasks.filter(
            (task) => task.status === STATUS.IN_PROGRESS
          );
          newColumns[STATUS.DONE].list = newTasks.filter(
            (task) => task.status === STATUS.DONE
          );
          return { columns: newColumns };
        });
      },
    }),
    {
      name: "tasks-storage", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
