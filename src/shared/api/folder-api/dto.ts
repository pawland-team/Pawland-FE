export interface Folder {
  id: number;
  created_at: string;
  favorite: boolean;
  name: string;
}

export interface FolderWithUserId extends Folder {
  user_id: number;
}

/**
 * 유저의 모든 폴더 조회
 */
export interface FolderWithLinkCount extends Folder {
  link_count: number;
}
