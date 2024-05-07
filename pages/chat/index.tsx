import { withAuth } from '@app/hoc/withAuth';
import { ChatPage } from '@pages/chat';

export default withAuth(ChatPage);

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// export const getServerSideProps: GetServerSideProps<{ a: string }> = withGetServerSideProps(async (context) => {
//   return {
//     props: {
//       a: 'a',
//     },
//   };
// });
