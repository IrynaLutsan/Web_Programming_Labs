import './Loader.css'; 

function Loader() {
  return (
    <div className="loader-container">
      <div className="spinner"></div> 
      <p>Завантаження даних, зачекайте...</p>
    </div>
  );
}

export default Loader;