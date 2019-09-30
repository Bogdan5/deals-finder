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
      return {
        ...state,
        mouseX: action.payload.mouseX,
        mouseY: action.payload.mouseY,
      };
    case CALENDAR_BUTTON_CLICK:
      return {
        ...state,
        button: action.payload.button,
        horizontal: action.payload.horizontal,
        vertical: action.payload.vertical,
      };
    default:
      return state;
  }
}
