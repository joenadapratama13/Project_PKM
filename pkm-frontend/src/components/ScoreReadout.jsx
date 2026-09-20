export function ScoreReadout({ score }) {
  const color = score === 100 ? "text-clean" : score >= 60 ? "text-flag" : "text-flag";
  return (
    <div className="flex items-baseline gap-1 font-mono">
      <span className={`text-5xl font-semibold leading-none ${color}`}>
        {Number(score).toFixed(1)}
      </span>
      <span className="text-lg text-muted">%</span>
    </div>
  );
}
