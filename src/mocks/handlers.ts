import { CommunityListHandlers } from '@shared/apis/community-api/community-list';
import { CommunityPostDetailHandlers } from '@shared/apis/community-api/community-post-detail';

// export const handlers = [...todoHandlers, ...folderHandlers, ...otherHandlers];
export const handlers = [...CommunityListHandlers, ...CommunityPostDetailHandlers];
