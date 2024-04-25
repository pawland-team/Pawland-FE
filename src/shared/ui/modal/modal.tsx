export const Modal = ({ content, onClose, isOpen }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div>
      <div>
        <p>{content}</p>
        <button type='button' onClick={onClose}>
          확인
        </button>
      </div>
    </div>
  );
};
