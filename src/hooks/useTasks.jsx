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

  useEffect(() => {
    if (!isAuthenticated) return;

    (async () => {
      setIsLoading(true);

      const requestedTasks = await makeAuthenticatedRequest(tasksServices.list);

      const { completed, uncompleted } = requestedTasks.reduce(
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

      setTasks({ completed, uncompleted });
      setIsLoading(false);
    })();
  }, [isAuthenticated, makeAuthenticatedRequest]);

  const sortTasks = useCallback((criteria, order) => {
    const ascending = order === 'ascending';
    const sort = getSortingFunction(criteria);

    setTasks(({ completed, uncompleted }) => ({
      completed: sort(completed, ascending),
      uncompleted: sort(uncompleted, ascending),
    }));
  }, []);

  const insertSortedTask = useCallback((newTask, criteria, order) => {
    const ascending = order === 'ascending';

    setTasks(({ completed, uncompleted }) => {
      const sort = getSortingFunction(criteria);

      if (newTask.isCompleted) {
        const newCompleted = sort([...completed, newTask], ascending);
        return { completed: newCompleted, uncompleted };
      }

      const newUncompleted = sort([...uncompleted, newTask], ascending);
      return { completed, uncompleted: newUncompleted };
    });
  }, []);

  const editSortedTask = useCallback((taskId, newTaskData, criteria, order) => {
    const ascending = order === 'ascending';

    setTasks(({ completed, uncompleted }) => {
      const sort = getSortingFunction(criteria);
      const updateIfTaskBeingEdited = (task) => {
        const isTaskBeingEdited = task.id === taskId;
        return isTaskBeingEdited ? { ...task, ...newTaskData } : task;
      };

      const updatedCompleted = completed.map(updateIfTaskBeingEdited);
      const updatedUncompleted = uncompleted.map(updateIfTaskBeingEdited);

      return {
        completed: sort(updatedCompleted, ascending),
        uncompleted: sort(updatedUncompleted, ascending),
      };
    });
  }, []);

  const createTask = useCallback(
    async ({ name, priority }, { sortingCriteria, sortingOrder }) => {
      if (!isAuthenticated) return;

      const createdTask = await makeAuthenticatedRequest((accessToken) =>
        tasksServices.create(accessToken, { name, priority }),
      );
      insertSortedTask(createdTask, sortingCriteria, sortingOrder);
    },
    [isAuthenticated, makeAuthenticatedRequest, insertSortedTask],
  );

  const editTask = useCallback(
    (taskId, newTaskData, { sortingCriteria, sortingOrder }) => {
      if (!isAuthenticated) return;

      makeAuthenticatedRequest((accessToken) =>
        tasksServices.edit(accessToken, taskId, newTaskData),
      );

      editSortedTask(taskId, newTaskData, sortingCriteria, sortingOrder);
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

  return { tasks, isLoading, sortTasks, createTask, editTask, removeTask };
}

export default useTasks;
