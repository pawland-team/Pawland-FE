import { RoomState } from '../model';

export const checkRoomStateExist = (roomState: RoomState | undefined): roomState is RoomState => {
  if (roomState === undefined) {
    console.error('roomState is undefined on ChatRoom component');

    return false;
  }

  return true;
};
