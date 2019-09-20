import {
  SET_MOUSE_POSITION,
} from './types';

export const setMousePosition = (mouseX, mouseY) => ({
  type: SET_MOUSE_POSITION,
  payload: { mouseX, mouseY },
});