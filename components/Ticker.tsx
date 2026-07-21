const ITEMS = [
  "Brand Films",
  "Day In The Life",
  "Automotive",
  "Fitness",
  "Events",
  "Social Cutdowns",
];

export default function Ticker() {
  const row = [...ITEMS, ...ITEMS];
  return (
    <div className="ticker" aria-hidden>
      <div className="run">
        {row.map((t, i) => (
          <span key={i}>
            <i>◆</i>
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}
