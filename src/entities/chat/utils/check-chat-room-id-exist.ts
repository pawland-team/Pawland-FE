export const checkChatRoomIdExist = (roomId: number | undefined): roomId is number => {
  if (roomId === undefined) {
    console.error('roomId is undefined on ChatRoom component');

    return false;
  }

  return true;
};
