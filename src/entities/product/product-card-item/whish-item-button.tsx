interface WishItemButtonProps {
  handleClick: () => void;
}

const WishItemButton = ({ handleClick }: WishItemButtonProps) => {
  return (
    <>
      <button type='button' onClick={handleClick}>
        X
      </button>
    </>
  );
};

export { WishItemButton };
