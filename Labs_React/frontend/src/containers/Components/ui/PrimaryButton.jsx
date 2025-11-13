import './PrimaryButton.css'; 

// 'as' - пропс. За замовчуванням це буде 'button'
function PrimaryButton({ children, as: Component = 'button', ...props }) {
  return (
    <Component className="primary-button" {...props}>
      {children}
    </Component>
  );
}

export default PrimaryButton;