
export const Background = () => {
  return (
    <div className="background-container">
      {/* Particles */}
      <div className="particles">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              ['--delay' as any]: `${Math.random() * 5}s`,
              ['--size' as any]: `${Math.random() * 6 + 2}px`,
              ['--distance' as any]: `${Math.random() * 30 + 10}vmax`,
              ['--duration' as any]: `${Math.random() * 10 + 10}s`,
              ['--opacity' as any]: `${Math.random() * 0.5 + 0.1}`,
              ['--left' as any]: `${Math.random() * 100}%`,
            }}
          ></div>
        ))}
      </div>

      {/* Floating Bubbles */}
      <div className="bubbles">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="bubble"
            style={{
              ['--size' as any]: `${Math.random() * 6 + 4}rem`,
              ['--left' as any]: `${Math.random() * 100}%`,
              ['--duration' as any]: `${Math.random() * 15 + 10}s`,
              ['--delay' as any]: `${Math.random() * 10}s`,
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
    </div>
  );
};
