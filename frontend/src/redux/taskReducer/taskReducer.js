import * as types from "./taskActionTypes";
let initData = {
  isLoading: false,
  isError: false,
  data: [],
};

export const taskReducer = (state = initData, action) => {
  let { type, payload } = action;
  switch (type) {
    case types.GET_TASK_REQUEST:
      return {
        ...state,
        isLoading: true,
        isError: false,
        data: [],
      };
    case types.GET_TASK_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: payload,
      };
    case types.GET_TASK_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
        data: [],
      };
    default:
      return state;
  }
};
