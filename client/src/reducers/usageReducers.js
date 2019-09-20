import {
  SET_MOUSE_POSITION
} from '../actions/types';

const initialState = {
  mouseX: 0,
  mouseY: 0,
};

export default function (state = initialState, action) {
  switch (action) {
    case SET_MOUSE_POSITION:
      return {
        ...state,
        mouseX: action.payload.mouseX,
        mouseY: action.payload.mouseY,
      };
    default:
      return state;
  }
}