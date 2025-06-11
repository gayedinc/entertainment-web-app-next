'use client';

export default function LogoutModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="logout-modal-overlay">
      <div className="logout-modal">
        <h2>Çıkış Yap</h2>
        <p>Çıkış yapmak istediğinizden emin misiniz?</p>
        <div className="logout-modal-buttons">
          <button onClick={onClose} className="cancel-button">
            İptal
          </button>
          <button onClick={onConfirm} className="logout-button">
            Çıkış Yap
          </button>
        </div>
      </div>
    </div>
  );
} 