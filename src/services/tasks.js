import api from '~/api';

const tasksServices = {
  async create(accessToken, taskData) {
    const creationResponse = await api.post('/tasks', taskData, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    const { task } = creationResponse.data;

    return task;
  },

  async list(accessToken) {
    const listResponse = await api.get('/tasks', {
      headers: { Authorization: `Bearer ${accessToken}` },
      params: { paginate: false },
    });
    const { tasks } = listResponse.data;

    return tasks;
  },

  async edit(accessToken, taskId, newTaskData) {
    await api.put(`/tasks/${taskId}`, newTaskData, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  },

  async remove(accessToken, taskId) {
    await api.delete(`/tasks/${taskId}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  },
};

export default tasksServices;
