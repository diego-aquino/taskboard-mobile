import { useCallback, useEffect, useState } from 'react';

import { useAuth } from '~/contexts/AuthContext';
import tasksServices from '~/services/tasks';

function sortTasksByPriority(tasks, ascending) {
  const sortingFactor = ascending ? 1 : -1;
  const comparedTo = {
    high: { high: 0, low: 1 * sortingFactor },
    low: { high: -1 * sortingFactor, low: 0 },
  };

  return tasks.sort(
    (task, taskToCompare) => comparedTo[task.priority][taskToCompare.priority],
  );
}

function sortTasksByName(tasks, ascending) {
  const sortingFactor = ascending ? 1 : -1;

  return tasks.sort((task, taskToCompare) => {
    const taskName = task.name.toLowerCase();
    const taskToCompareName = taskToCompare.name.toLowerCase();

    if (taskName > taskToCompareName) return 1 * sortingFactor;
    if (taskName < taskToCompareName) return -1 * sortingFactor;
    return 0;
  });
}

function getSortingFunction(criteria) {
  return criteria === 'priority' ? sortTasksByPriority : sortTasksByName;
}

function useTasks() {
  const { isAuthenticated, makeAuthenticatedRequest } = useAuth();

  const [tasks, setTasks] = useState({ completed: [], uncompleted: [] });
  const [isLoading, setIsLoading] = useState(true);

  const [sortingCriteria, setSortingCriteria] = useState('completed');
  const [sortingOrders, setSortingOrders] = useState({
    priority: 'ascending',
    name: 'ascending',
    completed: 'ascending',
  });

  useEffect(() => {
    if (!isAuthenticated || !isLoading) return;

    const splitTasksByCompletionStatus = (baseTasks) =>
      baseTasks.reduce(
        (accumulated, task) => {
          if (task.isCompleted) {
            accumulated.completed.push(task);
          } else {
            accumulated.uncompleted.push(task);
          }
          return accumulated;
        },
        { completed: [], uncompleted: [] },
      );

    const loadTasks = async () => {
      const listedTasks = await makeAuthenticatedRequest(tasksServices.list);
      const { completed, uncompleted } = splitTasksByCompletionStatus(
        listedTasks,
      );
      setTasks({ completed, uncompleted });
      setIsLoading(false);
    };

    loadTasks();
  }, [isAuthenticated, isLoading, makeAuthenticatedRequest]);

  useEffect(() => {
    if (isLoading) return;
    sortTasks();
  }, [isLoading, sortTasks, sortingCriteria, sortingOrders]);

  const sortTasks = useCallback(() => {
    const sort = getSortingFunction(sortingCriteria);
    const currentOrder = sortingOrders[sortingCriteria];
    const ascending = currentOrder === 'ascending';

    setTasks(({ completed, uncompleted }) => ({
      completed: sort(completed, ascending),
      uncompleted: sort(uncompleted, ascending),
    }));
  }, [sortingCriteria, sortingOrders]);

  const insertSortedTask = useCallback(
    (newTask) => {
      const sort = getSortingFunction(sortingCriteria);
      const currentOrder = sortingOrders[sortingCriteria];
      const ascending = currentOrder === 'ascending';

      setTasks(({ completed, uncompleted }) => {
        if (newTask.isCompleted) {
          const newCompletedList = sort([...completed, newTask], ascending);
          return { completed: newCompletedList, uncompleted };
        }

        const newUncompletedList = sort([...uncompleted, newTask], ascending);
        return { completed, uncompleted: newUncompletedList };
      });
    },
    [sortingCriteria, sortingOrders],
  );

  const editSortedTask = useCallback(
    (taskId, newTaskData) => {
      const sort = getSortingFunction(sortingCriteria);
      const currentOrder = sortingOrders[sortingCriteria];
      const ascending = currentOrder === 'ascending';

      setTasks(({ completed, uncompleted }) => {
        const isTaskBeingEdited = (task) => task.id === taskId;

        const taskBeingEdited =
          completed.find(isTaskBeingEdited) ??
          uncompleted.find(isTaskBeingEdited);

        const completionStatusIsUnchanged =
          newTaskData.isCompleted === undefined ||
          newTaskData.isCompleted === taskBeingEdited.isCompleted;

        const updatedTask = { ...taskBeingEdited, ...newTaskData };

        if (completionStatusIsUnchanged) {
          const updateTaskIfBeingEdited = (task) =>
            task.id === taskId ? updatedTask : task;

          const newCompletedList = taskBeingEdited.isCompleted
            ? sort(completed.map(updateTaskIfBeingEdited), ascending)
            : completed;
          const newUncompletedList = !taskBeingEdited.isCompleted
            ? sort(uncompleted.map(updateTaskIfBeingEdited), ascending)
            : uncompleted;

          return {
            completed: newCompletedList,
            uncompleted: newUncompletedList,
          };
        }

        const isNotTaskBeingEdited = (task) => task.id !== taskId;

        const newCompletedList = updatedTask.isCompleted
          ? sort([...completed, updatedTask], ascending)
          : completed.filter(isNotTaskBeingEdited);
        const newUncompletedList = !updatedTask.isCompleted
          ? sort([...uncompleted, updatedTask], ascending)
          : uncompleted.filter(isNotTaskBeingEdited);

        return {
          completed: newCompletedList,
          uncompleted: newUncompletedList,
        };
      });
    },
    [sortingCriteria, sortingOrders],
  );

  const createTask = useCallback(
    async ({ name, priority }) => {
      if (!isAuthenticated) return;

      const createdTask = await makeAuthenticatedRequest((accessToken) =>
        tasksServices.create(accessToken, { name, priority }),
      );
      insertSortedTask(createdTask);
    },
    [isAuthenticated, makeAuthenticatedRequest, insertSortedTask],
  );

  const editTask = useCallback(
    (taskId, newTaskData) => {
      if (!isAuthenticated) return;

      makeAuthenticatedRequest((accessToken) =>
        tasksServices.edit(accessToken, taskId, newTaskData),
      );
      editSortedTask(taskId, newTaskData);
    },
    [editSortedTask, isAuthenticated, makeAuthenticatedRequest],
  );

  const removeTask = useCallback(
    (taskId) => {
      if (!isAuthenticated) return;

      makeAuthenticatedRequest((accessToken) =>
        tasksServices.remove(accessToken, taskId),
      );

      const isNotBeingDeleted = (task) => task.id !== taskId;

      setTasks(({ completed, uncompleted }) => ({
        completed: completed.filter(isNotBeingDeleted),
        uncompleted: uncompleted.filter(isNotBeingDeleted),
      }));
    },
    [isAuthenticated, makeAuthenticatedRequest],
  );

  return {
    tasks,
    isLoading,
    sortingCriteria,
    setSortingCriteria,
    sortingOrders,
    setSortingOrders,
    sortTasks,
    createTask,
    editTask,
    removeTask,
  };
}

export default useTasks;
