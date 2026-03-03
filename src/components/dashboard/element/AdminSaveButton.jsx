export default function AdminSaveButton({
  label = "Save",
  type = "button",
  className = "",
}) {
  return (
    <button 
      type={type} 
      className={`ud-btn btn-thm ${className}`}
    >
      {label}
      <i className="fal fa-arrow-right-long" />
    </button>
  );
}
