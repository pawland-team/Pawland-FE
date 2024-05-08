import { toast } from 'react-toastify';

import Image from 'next/image';
import { useRouter } from 'next/router';

const LinkCopyButton = () => {
  const router = useRouter();

  const handleClickCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_LOCAL_HOST}/${router.asPath}`);
      toast.success('클립보드에 복사되었습니다.');
    } catch (error) {
      toast.error('다시 시도해 주세요.');
    }
  };

  return (
    <button type='button' onClick={handleClickCopyUrl}>
      <Image src='/images/icon/link-copy-icon.svg' width={24} height={24} alt='상품 상세 링크 복사 버튼' />
    </button>
  );
};

export { LinkCopyButton };
