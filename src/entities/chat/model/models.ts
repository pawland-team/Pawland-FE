import { Client, IFrame, IMessage } from '@stomp/stompjs';

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
  previewMessage: ChatContent | null;
  orderId: number;
  /**
   * - infiniteQuery에서 nextPageParam이 제대로 동작하지 않아서 추가함
   * - 페이지 벗어났다가(->언마운트 됐다가) 다시 마운트 됐을 때 nextCursor를 사용해서 불러와야 하는데 이전 커서를 이용해서 똑같은 데이터 불러오는 현상이 있었음
   * @default null
   */
  nextCursor: string | null;
};

interface SetRoomMapArgs extends Omit<RoomState, 'messageList' | 'previewMessage' | 'nextCursor'> {
  /**
   * socket json response message
   *
   * http response때는 없음
   */
  unParsedMessage?: IMessage;
}

/**
 * @see https://docs.pmnd.rs/zustand/integrations/persisting-store-data#how-do-i-use-it-with-map-and-set
 */
type RoomMap = Map<RoomState['roomId'], RoomState>;

export interface ChatStoreState {
  roomMap: RoomMap;
  destroyRoomList: VoidFunction;
  selectedChatRoomId?: RoomState['roomId'];
  webSocketClient?: Client;
  setRoomMap: (setRoomMapArgs: SetRoomMapArgs) => void;
  setInitialRoomMap: (initialChatRoomList: ChatRoomListResponse) => void;
  setSelectedChatRoomId: (roomId?: RoomState['roomId']) => void;
  setWebSocketClient: VoidFunction;
  connectWebSocket: (
    onConnect: ({ frame, webSocketClient }: { frame: IFrame; webSocketClient: Client }) => void,
  ) => Client;
  sendChatMessage: ({ chatRequestBody }: { chatRequestBody: ChatRequest }) => void;
  appendPreviousMessageList: ({
    roomId,
    previousMessageList,
    nextCursor,
  }: {
    roomId: RoomState['roomId'];
    previousMessageList: ChatContent[];
    nextCursor: RoomState['nextCursor'];
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
