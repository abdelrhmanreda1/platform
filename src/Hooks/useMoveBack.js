import { useNavigate } from "react-router-dom";

function useMoveBack(defaultPath = "/") {
  const navigate = useNavigate();
  return () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate(defaultPath);
    }
  };
}

export default useMoveBack;
