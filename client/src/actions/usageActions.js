import {
  SET_MOUSE_POSITION,
  CALENDAR_BUTTON_CLICK,
  RECORD_CALENDAR_DATA,
} from './types';

export const setMousePosition = (mouseX, mouseY) => (dispatch) => {
  return dispatch({
    type: SET_MOUSE_POSITION,
    payload: { mouseX, mouseY },
  });
};


export const typeButtonCalendar = (button, horizontal, vertical) => (dispatch) => {
  return dispatch({
    type: CALENDAR_BUTTON_CLICK,
    payload: { button, horizontal, vertical },
  });
};

export const recordCalendarData = (data) => (dispatch) => dispatch({
  type: RECORD_CALENDAR_DATA,
  payload: data,
});
