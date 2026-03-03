export default function AdminKpiCard({ title, value, trend, icon }) {
  const [highlightText, ...restText] = trend.split(" ");
  const isPositive = highlightText.startsWith("+");

  return (
    <div className="ps-widget bgc-white rounded-xl p20 mb20 shadow-sm ring-1 ring-slate-100 transition-all hover:shadow-md d-flex align-items-center justify-content-between">
      <div className="details">
        <div className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1">{title}</div>
        <div className="title text-2xl font-bold text-slate-900 leading-tight tracking-tight">{value}</div>
        <div className="text-[11px] font-bold mt-1">
          <span className="text-[#6200ee]">{highlightText}</span>{" "}
          <span className="text-slate-400">{restText.join(" ")}</span>
        </div>
      </div>
      <div className="icon text-center bg-slate-50/50 rounded-lg h-12 w-12 d-flex align-items-center justify-content-center border border-slate-100">
        <i className={`${icon} text-[#443297] text-xl`} />
      </div>
    </div>
  );
}
