import { Client, IMessage } from '@stomp/stompjs';

import { ChatContent, ChatRequest, ChatRoomListResponse } from '@shared/apis/chat-api';
import { UserEntity } from '@shared/apis/user-api';

// preview list of rooms 영역이랑
// detail chat 영역이랑 따로 관리해줘야 함.

export type RoomInfo = ChatRoomListResponse[number];

/**
 * sender는 number로 유지하자
 */
export type RoomState = {
  roomId: RoomInfo['roomId'];
  productInfo: RoomInfo['productInfo'];
  opponentUser: RoomInfo['opponentUser'];
  messageList: ChatContent[];
  previewMessage?: ChatContent;
  orderId: number;
};

interface SetRoomMapArgs extends Omit<RoomState, 'messageList' | 'previewMessage'> {
  /**
   * socket json response message
   *
   * http response때는 없음
   */
  unParsedMessage?: IMessage;
  /**
   * http response message list
   *
   * socket json response때는 없음
   */
  // previousMessageList?: ChatContent[];
  // nextCursor: string;
  // hasNext: boolean;
}

/**
 * @see https://docs.pmnd.rs/zustand/integrations/persisting-store-data#how-do-i-use-it-with-map-and-set
 */
type RoomMap = Map<RoomState['roomId'], RoomState>;

export interface ChatStoreState {
  roomMap: RoomMap;
  destroyRoomList: () => void;
  selectedChatRoomId?: RoomState['roomId'];
  webSocketClient?: Client;
  setRoomMap: (setRoomMapArgs: SetRoomMapArgs) => void;
  // setInitialRoomMap: (initialRoomInfo: RoomInfo) => void;
  setInitialRoomMap: (initialChatRoomList: ChatRoomListResponse) => void;
  setSelectedChatRoomId: (roomId: RoomState['roomId']) => void;
  setWebSocketClient: (webSocketClient: Client) => void;
  sendChatMessage: ({ chatRequestBody }: { chatRequestBody: ChatRequest }) => void;
  setInitialMessageList: ({
    roomId,
    initialMessageList,
  }: {
    roomId: RoomState['roomId'];
    initialMessageList: ChatContent[];
  }) => void;
  appendPreviousMessageList: ({
    roomId,
    previousMessageList,
  }: {
    roomId: RoomState['roomId'];
    previousMessageList: ChatContent[];
  }) => void;
}

interface BaseMessageGroupForDisplay {
  /**
   * uuid
   */
  messageGroupId: string;
  /**
   * 해당 메시지 그룹의 타입
   * - DATE: 날짜 디스플레이
   * - MESSAGE: 메시지 디스플레이
   */
  messageGroupType: 'MESSAGE' | 'DATE';
  /**
   * 해당 그룹의 시간
   * - 그룹 중 가장 오래된 메시지의 시간을 기준으로 한다.
   * {@link MessageGroupWithMessageTypeForDisplay} 의 messageListInGroup의 마지막 인덱스의 messageTime )
   * - 분 단위가 달라지면 새로운 그룹으로 분류한다.
   * - messageGroupType이 MESSAGE면 해당 시간은 해당 메시지의 시간이다.(ms는 0으로 초기화)
   * - messageGroupType이 DATE면 해당 시간은 00:00:00(정각)이어야 한다.
   * - 예를 들어 아래와 같은 DATE 타입 형태를 갖게 된다.
   *    - 2024-04-25T00:00:00.000Z
   */
  messageGroupTime: Date;
}

export interface MessageGroupWithMessageTypeForDisplay extends BaseMessageGroupForDisplay {
  messageGroupType: 'MESSAGE';
  /**
   * 해당 그룹에 담긴 메시지 리스트
   */
  messageListInGroup: ChatContent[];
  sender: UserEntity['id'];
}

export interface MessageGroupWithDateTypeForDisplay extends BaseMessageGroupForDisplay {
  messageGroupType: 'DATE';
  /**
   * 날짜 디스플레이 메시지
   * - 표시되는 Date 날짜 디스플레이는 앞뒤 메시지 그룹간의 시간 차이에 맞춰서 계속 위치가 변경된다.
   */
  timeDisplayMessage: string;
}

export type MessageGroupListForDisplay = Array<
  MessageGroupWithMessageTypeForDisplay | MessageGroupWithDateTypeForDisplay
>;

export interface ChangedTextAreaHeight {
  initialHeight: number;
  currentHeight: number;
  changedHeight: number;
}
