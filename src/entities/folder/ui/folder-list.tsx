import { FolderWithLinkCount } from '@shared/api/folder-api';

interface FolderListProps {
  folderList: FolderWithLinkCount[];
}

export const FolderList = ({ folderList }: FolderListProps) => {
  return (
    <div>
      {folderList.map((folder) => (
        <div key={folder.id}>{folder.name}</div>
      ))}
    </div>
  );
};
