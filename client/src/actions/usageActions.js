import {
  SET_MOUSE_POSITION,
  CALENDAR_BUTTON_CLICK,
} from './types';

export const setMousePosition = (mouseX, mouseY) => (dispatch) => (dispatch({
  type: SET_MOUSE_POSITION,
  payload: { mouseX, mouseY },
}));


export const typeButtonCalendar = (button) => (dispatch) => (dispatch({
  type: CALENDAR_BUTTON_CLICK,
  button,
}));
