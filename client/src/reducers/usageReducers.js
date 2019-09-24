import {
  SET_MOUSE_POSITION, CALENDAR_BUTTON_CLICK,
} from '../actions/types';

const initialState = {
  mouseX: 0,
  mouseY: 0,
  button: '',
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_MOUSE_POSITION:
      console.log('Click in reducer', action.payload.mouseX);
      return {
        ...state,
        mouseX: action.payload.mouseX,
        mouseY: action.payload.mouseY,
      };
    case CALENDAR_BUTTON_CLICK:
      console.log('Click in reducer cal btn click', action.payload);
      return {
        ...state,
        button: action.payload,
      };
    default:
      return state;
  }
}
