export default function LineSection({ title, isH1=false}) {
  return (
    <div className="line-container">
      <div className="line"></div>
        {isH1 ? (          
          <h1 className="line-text line-text--middle">{title}</h1>
        ) : (
          <span className="line-text line-text--middle">{title}</span>
        )}
      <div className="line"></div>
    </div>
  );
}
