import useMoveBack from "../Hooks/useMoveBack";
function MoveBack() {
  const moveBack = useMoveBack("/");
  return (
    <div onClick={moveBack} className="fixed top-8 md:top-12 left-7 w-8 h-8 object-cover cursor-pointer">
      <img src="/backArrow.png" alt="back arrow" />
    </div>
  );
}

export default MoveBack;
