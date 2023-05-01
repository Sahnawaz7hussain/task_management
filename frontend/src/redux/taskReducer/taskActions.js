import * as types from "./taskActionTypes";
import axios from "axios";

const base_url = import.meta.env.VITE_BASE_URL;

// add new TASK;
const postTaskActionFn = (task) => (dispatch) => {
  dispatch({ type: types.ADD_TASK_REQUEST });
  return axios
    .post(`${base_url}/task/create`, task, {
      headers: {
        authorization: `Bearer ${JSON.parse(localStorage.getItem("TOKEN"))}`,
      },
    })
    .then((res) => {
      return dispatch({ type: types.ADD_TASK_SUCCESS, payload: res.data });
    })
    .catch((err) => {
      return dispatch({
        type: types.ADD_TASK_FAILURE,
        payload: err.response.data,
      });
    });
};

// get list TASKs
const getTaskActionFn =
  (params = {}) =>
  (dispatch) => {
    dispatch({ type: types.GET_TASK_REQUEST });
    return axios(
      `${base_url}/task/get`,
      {
        headers: {
          authorization: `Bearer ${JSON.parse(localStorage.getItem("TOKEN"))}`,
        },
      },
      { params }
    )
      .then((res) => {
        return dispatch({
          type: types.GET_TASK_SUCCESS,
          payload: res.data.task,
        });
      })
      .catch((err) => {
        return dispatch({ type: types.GET_TASK_FAILURE, payload: err });
      });
  };

// get by id
const getTaskByIdActionFn = (id) => (dispatch) => {
  dispatch({ type: types.GET_TASK_REQUEST });
  return axios(`${base_url}/task/getById/${id}`, {
    headers: {
      authorization: `Bearer ${JSON.parse(localStorage.getItem("TOKEN"))}`,
    },
  })
    .then((res) => {
      return dispatch({
        type: types.GET_TASK_SUCCESS,
        payload: res.data.task,
      });
    })
    .catch((err) => {
      return dispatch({ type: types.GET_TASK_FAILURE });
    });
};
// delete TASK;
const deleteTaskActionFn = (id) => (dispatch) => {
  dispatch({ type: types.DELETE_TASK_REQUEST });
  return axios
    .delete(`${base_url}/task/delete/${id}`, {
      headers: {
        authorization: `Bearer ${JSON.parse(localStorage.getItem("TOKEN"))}`,
      },
    })
    .then((res) => {
      return dispatch({
        type: types.DELETE_TASK_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      return dispatch({ type: types.DELETE_TASK_FAILURE, payload: err });
    });
};
const updateTaskActionFn = (id, data) => (dispatch) => {
  dispatch({ type: types.UPDATE_TASK_REQUEST });
  return axios
    .put(`${base_url}/task/update/${id}`, data, {
      headers: {
        authorization: `Bearer ${JSON.parse(localStorage.getItem("TOKEN"))}`,
      },
    })
    .then((res) => {
      return dispatch({
        type: types.UPDATE_TASK_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      return dispatch({ type: types.UPDATE_TASK_FAILURE, payload: err });
    });
};
const updateCollaboratiosActionFn = (id, invitationsId) => (dispatch) => {
  dispatch({ type: types.UPDATE_TASK_REQUEST });
  return axios
    .put(
      `${base_url}/task/updateCollaborator/${id}`,
      (invitationsId = "dummyid"),
      {
        headers: {
          authorization: `Bearer ${JSON.parse(localStorage.getItem("TOKEN"))}`,
        },
      }
    )
    .then((res) => {
      return dispatch({
        type: types.UPDATE_TASK_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      return dispatch({ type: types.UPDATE_TASK_FAILURE, payload: err });
    });
};

export {
  getTaskActionFn,
  getTaskByIdActionFn,
  postTaskActionFn,
  updateTaskActionFn,
  deleteTaskActionFn,
  updateCollaboratiosActionFn,
};
