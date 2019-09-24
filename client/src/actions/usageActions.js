import {
  SET_MOUSE_POSITION,
  CALENDAR_BUTTON_CLICK,
} from './types';

export const setMousePosition = (mouseX, mouseY) => (dispatch) => {
  return dispatch({
    type: SET_MOUSE_POSITION,
    payload: { mouseX, mouseY },
  });
};


export const typeButtonCalendar = (button) => (dispatch) => {
  console.log('Reducer ', button);
  return dispatch({
    type: CALENDAR_BUTTON_CLICK,
    payload: button,
  });
};
