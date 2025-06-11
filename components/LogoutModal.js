'use client';

export default function LogoutModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="logout-modal-overlay">
      <div className="logout-modal">
        <h2>Log Out</h2>
        <p>Are you sure you want to log out?</p>
        <div className="logout-modal-buttons">
          <button onClick={onClose} className="cancel-button">
            Cancel
          </button>
          <button onClick={onConfirm} className="logout-button">
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
} 