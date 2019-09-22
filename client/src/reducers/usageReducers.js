import {
  SET_MOUSE_POSITION, CALENDAR_BUTTON_CLICK,
} from '../actions/types';

const initialState = {
  mouseX: 0,
  mouseY: 0,
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
      return {
        ...state,
        button: action.button,
      };
    default:
      return state;
  }
}
