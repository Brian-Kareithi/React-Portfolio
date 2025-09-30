export const Background = () => {
  return (
    <div className="background-container">
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