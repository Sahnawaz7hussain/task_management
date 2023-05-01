import * as types from "./inviteActionTypes";
import axios from "axios";

const base_url = import.meta.env.VITE_BASE_URL;

// invite
const postInviteActionFn = (invite) => (dispatch) => {
  dispatch({ type: types.ADD_INVITE_REQUEST });
  return axios
    .post(`${base_url}/invite/add`, invite, {
      headers: {
        authorization: `Bearer ${JSON.parse(localStorage.getItem("TOKEN"))}`,
      },
    })
    .then((res) => {
      return dispatch({ type: types.ADD_INVITE_SUCCESS, payload: res.data });
    })
    .catch((err) => {
      return dispatch({
        type: types.ADD_INVITE_FAILURE,
        payload: err.response.data,
      });
    });
};

// get list INVITEs
const getInviteActionFn = () => (dispatch) => {
  dispatch({ type: types.GET_INVITE_REQUEST });
  return axios(`${base_url}/invite/get`, {
    headers: {
      authorization: `Bearer ${JSON.parse(localStorage.getItem("TOKEN"))}`,
    },
  })
    .then((res) => {
      return dispatch({
        type: types.GET_INVITE_SUCCESS,
        payload: res.data.invitations,
      });
    })
    .catch((err) => {
      return dispatch({ type: types.GET_INVITE_FAILURE, payload: err });
    });
};

// delete INVITE;
const deleteInviteActionFn = (id) => (dispatch) => {
  dispatch({ type: types.DELETE_INVITE_REQUEST });
  return axios
    .delete(`${base_url}/task/delete/${id}`, {
      headers: {
        authorization: `Bearer ${JSON.parse(localStorage.getItem("TOKEN"))}`,
      },
    })
    .then((res) => {
      return dispatch({
        type: types.DELETE_INVITE_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      return dispatch({ type: types.DELETE_INVITE_FAILURE, payload: err });
    });
};

const updateInviteActionFn =
  (id, data = {}) =>
  (dispatch) => {
    dispatch({ type: types.UPDATE_INVITE_REQUEST });
    return axios
      .put(`${base_url}/invite/update/${id}`, data, {
        headers: {
          authorization: `Bearer ${JSON.parse(localStorage.getItem("TOKEN"))}`,
        },
      })
      .then((res) => {
        return dispatch({
          type: types.UPDATE_INVITE_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        return dispatch({ type: types.UPDATE_INVITE_FAILURE, payload: err });
      });
  };

export { getInviteActionFn, postInviteActionFn, updateInviteActionFn };
