import "../styles/LoadingScreen.css";

export default function LoadingScreen() {
  return (
    <div className="loading-wrapper">
      <div className="liquid-container">
        <div className="liquid-spinner">
          <div className="liquid-core"></div>
          <div className="orbital-system">
            <div className="orbit-ring ring-1"></div>
            <div className="orbit-ring ring-2"></div>
            <div className="orbit-ring ring-3"></div>
            <div className="orbital-dot dot-1"></div>
            <div className="orbital-dot dot-2"></div>
            <div className="orbital-dot dot-3"></div>
          </div>
        </div>
        <p className="loading-text">LOADING...</p>
      </div>
      <div className="liquid-background">
        <div className="liquid-shape shape-1"></div>
        <div className="liquid-shape shape-2"></div>
        <div className="liquid-shape shape-3"></div>
      </div>
    </div>
  );
}