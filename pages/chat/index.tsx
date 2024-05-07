import { withAuth } from '@app/hoc/withAuth';
import { withGetServerSideProps } from '@app/hoc/withGetServerSideProps';
import { ChatPage } from '@pages/chat';

export default withAuth(ChatPage);

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const getServerSideProps: GetServerSideProps<{ a: string }> = withGetServerSideProps(async (_context) => {
  return {
    props: {
      a: 'a',
    },
  };
});
