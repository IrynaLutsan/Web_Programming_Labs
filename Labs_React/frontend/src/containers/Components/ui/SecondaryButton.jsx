import './SecondaryButton.css';

function SecondaryButton({ children, ...props }) {
  return (
    <button className="secondary-button" {...props}>
      {children}
    </button>
  );
}

export default SecondaryButton;