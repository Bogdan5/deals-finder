import {
  SET_MOUSE_POSITION
} from '../actions/types';

const initialState = {
  mouseX: 0,
  mouseY: 0,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_MOUSE_POSITION:
      console.log('Click in reducer');
      return {
        ...state,
        mouseX: action.payload.mouseX,
        mouseY: action.payload.mouseY,
      };
    default:
      return state;
  }
}
