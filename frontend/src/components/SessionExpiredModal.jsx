import { useDispatch, useSelector } from "react-redux";
import { resetSessionExpired, logout } from "../slices/authSlice";
import { useNavigate } from "react-router-dom";
import "./SessionExpiredModal.css";

export default function SessionExpiredModal() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const show = useSelector((state) => state.auth.sessionExpiredShown);

  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Sessão expirada</h2>
        <p>Faça login novamente para continuar.</p>
        <button
          className="btn-login"
          onClick={() => {
            dispatch(resetSessionExpired());
            dispatch(logout());
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            sessionStorage.clear();
            navigate("/login", { replace: true });
          }}
        >
          Ir para login
        </button>
      </div>
    </div>
  );
}
