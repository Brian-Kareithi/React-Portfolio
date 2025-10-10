import "../styles/LoadingScreen.css";

export default function LoadingScreen() {
  return (
    <div className="loading-wrapper">
      <div className="loading-circle"></div>
      <p className="loading-text">LOADING...</p>
    </div>
  );
}
