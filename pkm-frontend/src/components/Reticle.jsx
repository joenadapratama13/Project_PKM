export function Reticle() {
  const corners = [
    "top-3 left-3 border-t-2 border-l-2",
    "top-3 right-3 border-t-2 border-r-2",
    "bottom-3 left-3 border-b-2 border-l-2",
    "bottom-3 right-3 border-b-2 border-r-2",
  ];
  return (
    <>
      {corners.map((cls) => (
        <span key={cls} className={`corner-reticle ${cls} text-scan/70`} />
      ))}
    </>
  );
}
