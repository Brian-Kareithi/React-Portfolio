export const Background = () => {
  return (
    <div className="background-container">
      {/* Floating Bubbles */}
      <div className="bubbles">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="bubble"
            style={{
              ['--size' as any]: `${Math.random() * 8 + 4}rem`,
              ['--left' as any]: `${Math.random() * 100}%`,
              ['--duration' as any]: `${Math.random() * 20 + 15}s`,
              ['--delay' as any]: `${Math.random() * 15}s`,
            }}
          ></div>
        ))}
      </div>

      {/* Decorative floating elements */}
      <div className="floating-element el-1"></div>
      <div className="floating-element el-2"></div>
      <div className="floating-element el-3"></div>
      <div className="floating-element el-4"></div>
      <div className="floating-element el-5"></div>
      <div className="floating-element el-6"></div>
      
      {/* Purple gradient overlays */}
      <div className="gradient-overlay gradient-1"></div>
      <div className="gradient-overlay gradient-2"></div>
      <div className="gradient-overlay gradient-3"></div>
    </div>
  );
};