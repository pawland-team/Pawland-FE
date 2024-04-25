export const Modal = ({ content, onClick }) => {
  return (
    <div>
      <div>
        <p>{content}</p>
        <button type='button' onClick={onClick}>
          확인
        </button>
      </div>
    </div>
  );
};
