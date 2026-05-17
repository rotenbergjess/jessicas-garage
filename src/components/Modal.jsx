export default function Modal({ title, subtitle, icon, children, onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-sheet" onClick={e => e.stopPropagation()}>
        <div className="modal-handle" />
        {icon && (
          <div style={{ fontSize: 48, textAlign: 'center', marginBottom: 12 }}>{icon}</div>
        )}
        {title && (
          <h2 style={{ textAlign: 'center', marginBottom: 6 }}>{title}</h2>
        )}
        {subtitle && (
          <p style={{ textAlign: 'center', marginBottom: 20 }}>{subtitle}</p>
        )}
        {children}
      </div>
    </div>
  );
}
