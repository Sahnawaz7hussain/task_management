import * as types from "./inviteActionTypes";
let initData = {
  isLoading: false,
  isError: false,
  data: [],
};

export const inviteReducer = (state = initData, action) => {
  let { type, payload } = action;
  switch (type) {
    case types.GET_INVITE_REQUEST:
      return {
        ...state,
        isLoading: true,
        isError: false,
        data: [],
      };
    case types.GET_INVITE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: payload,
      };
    case types.GET_INVITE_FAILURE:
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
