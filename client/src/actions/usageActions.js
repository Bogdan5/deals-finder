import {
  SET_MOUSE_POSITION,
} from './types';

export const setMousePosition = (mouseX, mouseY) => {
  return (dispatch) => {
    console.log('Clicked in usageActions');
    return dispatch({
      type: SET_MOUSE_POSITION,
      payload: { mouseX, mouseY },
    });
  };
}
