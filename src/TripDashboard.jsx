import { useState } from "react";
import { DAILY_PLAN, TRIP_DATA } from "./data.js";

const STATUS_CFG = {
  locked:       { label: "Locked In",      color: "#15803d", bg: "#dcfce7", dot: "#16a34a" },
  paytomorrow:  { label: "Pay Today",      color: "#7c3aed", bg: "#ede9fe", dot: "#8b5cf6" },
  suggested:    { label: "Suggested",      color: "#64748b", bg: "#f1f5f9", dot: "#94a3b8" },
  onarrival:    { label: "On Arrival",     color: "#0369a1", bg: "#e0f2fe", dot: "#0ea5e9" },
  buyatstation: { label: "Buy at Station", color: "#b45309", bg: "#fef3c7", dot: "#d97706" },
  tbc:          { label: "To Book",        color: "#dc2626", bg: "#fee2e2", dot: "#ef4444" },
};

const ACT_CFG = {
  locked:    { color: "#15803d", bg: "#dcfce7", dot: "#16a34a", label: "Locked In" },
  agreed:    { color: "#0369a1", bg: "#dbeafe", dot: "#3b82f6", label: "Agreed" },
  suggested: { color: "#64748b", bg: "#f1f5f9", dot: "#94a3b8", label: "Suggested" },
  todo:      { color: "#b45309", bg: "#fef3c7", dot: "#d97706", label: "To Action" },
};

const uC = { urgent: "#ef4444", high: "#f97316", medium: "#eab308", low: "#22c55e" };
const uB = { urgent: "#fef2f2", high: "#fff7ed", medium: "#fefce8", low: "#f0fdf4" };

const Badge = ({ text, color, bg }) => (
  <span style={{ background: bg, color, borderRadius: 4, padding: "2px 6px", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.4, whiteSpace: "nowrap" }}>{text}</span>
);

function DayCard({ d }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ marginBottom: 8 }}>
      <div onClick={() => setOpen(o => !o)} style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: open ? "8px 8px 0 0" : 8, padding: "9px 12px", cursor: "pointer", userSelect: "none" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <span style={{ fontWeight: 700, fontSize: 13, color: "#1e293b" }}>{d.day}</span>
            <span style={{ fontSize: 12, color: "#64748b", marginLeft: 8 }}>{d.date}</span>
            <span style={{ fontSize: 12, color: "#94a3b8", marginLeft: 8 }}>— {d.title}</span>
          </div>
          <span style={{ fontSize: 11, color: "#94a3b8" }}>{open ? "▲" : "▼"}</span>
        </div>
      </div>
      {open && (
        <div style={{ border: "1px solid #e2e8f0", borderTop: "none", borderRadius: "0 0 8px 8px", overflow: "hidden" }}>
          {d.items.map((item, i) => {
            const c = ACT_CFG[item.type] || ACT_CFG.suggested;
            return (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "7px 12px", background: i % 2 === 0 ? "#fff" : "#fafafa", borderTop: i > 0 ? "1px solid #f1f5f9" : "none" }}>
                <div style={{ width: 7, height: 7, borderRadius: "50%", background: c.dot, flexShrink: 0, marginTop: 5 }} />
                <div style={{ width: 70, flexShrink: 0 }}><span style={{ fontSize: 10, color: "#94a3b8", fontWeight: 600 }}>{item.time}</span></div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <span style={{ fontSize: 12, color: "#1e293b" }}>{item.activity}</span>
                  {item.note && <div style={{ fontSize: 10, color: "#94a3b8", marginTop: 2 }}>{item.note}</div>}
                </div>
                <Badge text={c.label} color={c.color} bg={c.bg} />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function LegCard({ leg }) {
  const [open, setOpen] = useState(false);
  const lc = { "🗼": "#e11d48", "🏔️": "#0369a1", "⛩️": "#7c3aed", "🕊️": "#475569", "🏙️": "#f97316", "🏖️": "#d97706", "✈️": "#6366f1" };
  const accent = lc[leg.icon] || "#64748b";
  const isTbc = leg.accommodation.startsWith("TBC");
  return (
    <div style={{ marginBottom: 12 }}>
      <div onClick={() => setOpen(o => !o)} style={{ background: "#fff", border: `2px solid ${accent}22`, borderLeft: `4px solid ${accent}`, borderRadius: open ? "8px 8px 0 0" : 8, padding: "11px 14px", cursor: "pointer", userSelect: "none" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 18 }}>{leg.icon}</span>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ fontWeight: 700, fontSize: 14, color: accent }}>{leg.leg}</span>
                {leg.nights > 0 && <span style={{ fontSize: 11, color: "#94a3b8" }}>{leg.nights} nights</span>}
                {isTbc && <Badge text="No hotel" color="#dc2626" bg="#fee2e2" />}
              </div>
              <div style={{ fontSize: 11, color: isTbc ? "#dc2626" : "#64748b", marginTop: 2 }}>{leg.accommodation}</div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 11, color: "#64748b" }}>{leg.dates}</span>
            <span style={{ fontSize: 11, color: "#94a3b8" }}>{open ? "▲" : "▼"}</span>
          </div>
        </div>
      </div>
      {open && (
        <div style={{ border: "2px solid #e2e8f0", borderTop: "none", borderRadius: "0 0 8px 8px", padding: "12px", background: "#fafafa" }}>
          {leg.days.map((day, i) => <DayCard key={i} d={day} />)}
        </div>
      )}
    </div>
  );
}

const TabBtn = ({ id, label, active, onClick, alert }) => (
  <button onClick={() => onClick(id)} style={{ padding: "7px 13px", border: "none", borderBottom: active ? "3px solid #e11d48" : "3px solid transparent", background: "none", cursor: "pointer", fontWeight: active ? 700 : 400, color: active ? "#e11d48" : "#64748b", fontSize: 12, whiteSpace: "nowrap", display: "flex", alignItems: "center", gap: 4 }}>
  {label}
  {alert && !active && <span style={{ background: "#fee2e2", color: "#dc2626", fontSize: 10, fontWeight: 700, borderRadius: 10, padding: "1px 5px" }}>{alert}</span>}
</button>
);

export default function TripDashboard() {
  const [tab, setTab] = useState("dailyplan");
  const urgentCount = TRIP_DATA.todos.filter(t => t.urgency === "urgent").length;

  return (
    <div style={{ fontFamily: "system-ui, -apple-system, sans-serif", maxWidth: 700, margin: "0 auto", padding: "0 0 40px" }}>
      <div style={{ background: "linear-gradient(135deg, #e11d48 0%, #9f1239 100%)", borderRadius: 12, padding: "18px 20px", marginBottom: 16, color: "#fff" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 8 }}>
          <div>
            <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: -0.5 }}>Japan + Philippines 2026</div>
            <div style={{ fontSize: 12, opacity: 0.85, marginTop: 3 }}>Andrew & Leah · 2 Jul – 23 Jul · 21 nights · QFF 2013874546</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 11, opacity: 0.8 }}>Departs in</div>
            <div style={{ fontSize: 22, fontWeight: 800 }}>10 days</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 8, marginTop: 14, flexWrap: "wrap" }}>
          {[
            { label: "Flights", val: "5 booked", ok: true },
            { label: "Hakone", val: "Confirmed", ok: true },
            { label: "Hotels", val: "3 unbooked", ok: false },
            { label: "Go-karts", val: "Booked", ok: true },
          ].map(s => (
            <div key={s.label} style={{ background: s.ok ? "rgba(255,255,255,0.15)" : "rgba(255,200,0,0.25)", borderRadius: 8, padding: "6px 12px", fontSize: 11 }}>
              <div style={{ opacity: 0.75, fontSize: 10 }}>{s.label}</div>
              <div style={{ fontWeight: 700 }}>{s.val}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: "flex", borderBottom: "2px solid #f1f5f9", overflowX: "auto", marginBottom: 16 }}>
        {[
          { id: "dailyplan", label: "Daily Plan" },
          { id: "bookings", label: "Bookings" },
          { id: "todos", label: "To-do", alert: urgentCount },
          { id: "transport", label: "Transport" },
          { id: "gear", label: "Gear" },
          { id: "budget", label: "Budget" },
        ].map(t => <TabBtn key={t.id} {...t} active={tab === t.id} onClick={setTab} />)}
      </div>

      <div style={{ padding: "0 2px" }}>
        {tab === "dailyplan" && (
          <div>
            <div style={{ fontSize: 11, color: "#94a3b8", marginBottom: 12 }}>Click a leg to expand · Click a day to see the full schedule</div>
            {DAILY_PLAN.map((leg, i) => <LegCard key={i} leg={leg} />)}
          </div>
        )}

        {tab === "bookings" && (
          <div>
            {TRIP_DATA.bookings.map((b, i) => {
              const c = STATUS_CFG[b.status] || STATUS_CFG.suggested;
              return (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "9px 0", borderBottom: i < TRIP_DATA.bookings.length - 1 ? "1px solid #f1f5f9" : "none" }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: c.dot, flexShrink: 0, marginTop: 5 }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 600, fontSize: 12, color: "#1e293b" }}>{b.detail}</div>
                    <div style={{ fontSize: 11, color: "#64748b", marginTop: 1 }}>{b.date}</div>
                    {b.ref !== "TBC" && !b.ref.includes("PENDING") && <div style={{ fontSize: 10, color: "#94a3b8", marginTop: 1, fontFamily: "monospace" }}>REF: {b.ref}</div>}
                  </div>
                  <div style={{ textAlign: "right", flexShrink: 0 }}>
                    <div style={{ fontSize: 11, fontWeight: 600, color: c.color }}>{b.cost}</div>
                    <div style={{ marginTop: 3 }}><Badge text={c.label} color={c.color} bg={c.bg} /></div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {tab === "todos" && (
          <div>
            {["urgent","high","medium","low"].map(level => {
              const items = TRIP_DATA.todos.filter(t => t.urgency === level);
              if (!items.length) return null;
              const emoji = { urgent: "🚨", high: "🔴", medium: "🟡", low: "🟢" }[level];
              return (
                <div key={level} style={{ marginBottom: 16 }}>
                  <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, color: uC[level], marginBottom: 6 }}>{emoji} {level}</div>
                  {items.map((t, i) => (
                    <div key={i} style={{ background: uB[level], border: `1px solid ${uC[level]}33`, borderRadius: 8, padding: "8px 11px", marginBottom: 6 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 3 }}>
                        <span style={{ fontWeight: 600, fontSize: 12, color: "#1e293b" }}>{t.item}</span>
                        <span style={{ fontSize: 11, fontWeight: 600, color: "#64748b" }}>{t.cost}</span>
                      </div>
                      <div style={{ fontSize: 11, color: "#475569", marginTop: 3 }}>{t.notes}</div>
                      <div style={{ fontSize: 10, color: "#94a3b8", marginTop: 3 }}>When: {t.when}</div>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        )}

        {tab === "transport" && (
          <div>
            <div style={{ background: "#fef9c3", border: "1px solid #fde047", borderRadius: 8, padding: "8px 11px", marginBottom: 12, fontSize: 11, color: "#713f12" }}>
              <strong>JR Pass: do not buy.</strong> Individual Shinkansen tickets ~$645 vs $934 for two 7-day passes. Saving ~$289.
            </div>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11 }}>
                <thead><tr style={{ background: "#f8fafc" }}>
                  {["Leg","How","Cost (two)","Book where"].map(h => <th key={h} style={{ padding: "6px 9px", textAlign: "left", fontWeight: 600, color: "#475569", borderBottom: "2px solid #e2e8f0" }}>{h}</th>)}
                </tr></thead>
                <tbody>
                  {TRIP_DATA.transport.map((t, i) => (
                    <tr key={i} style={{ borderBottom: "1px solid #f1f5f9" }}>
                      <td style={{ padding: "6px 9px", fontWeight: 600, color: "#1e293b" }}>{t.leg}</td>
                      <td style={{ padding: "6px 9px", color: "#475569" }}>{t.how}</td>
                      <td style={{ padding: "6px 9px", color: "#16a34a", fontWeight: 600 }}>{t.cost}</td>
                      <td style={{ padding: "6px 9px", color: "#64748b" }}>{t.book}</td>
                    </tr>
                  ))}
                  <tr style={{ background: "#f0fdf4", borderTop: "2px solid #86efac" }}>
                    <td colSpan={2} style={{ padding: "6px 9px", fontWeight: 700, color: "#166534" }}>TOTAL Japan Transport (est.)</td>
                    <td style={{ padding: "6px 9px", fontWeight: 700, color: "#166534" }}>~$857 for two</td>
                    <td />
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {tab === "gear" && (
          <div>
            {TRIP_DATA.gear.map((g, i) => {
              const icon = g.status === "done" ? "✅" : g.status === "tomorrow" ? "💳" : "⬜";
              const bg = g.status === "done" ? "#f0fdf4" : g.status === "tomorrow" ? "#f5f3ff" : "#f8fafc";
              const bdr = g.status === "done" ? "1px solid #86efac" : g.status === "tomorrow" ? "1px solid #c4b5fd" : "1px solid #e2e8f0";
              const cc = g.status === "done" ? "#16a34a" : g.status === "tomorrow" ? "#7c3aed" : "#475569";
              return (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 9, padding: "8px 11px", borderRadius: 8, background: bg, marginBottom: 6, border: bdr }}>
                  <span style={{ fontSize: 16, marginTop: 1 }}>{icon}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 600, fontSize: 12, color: "#1e293b" }}>{g.item}</div>
                    <div style={{ fontSize: 11, color: "#64748b", marginTop: 2 }}>{g.notes}</div>
                  </div>
                  <div style={{ fontSize: 11, fontWeight: 600, color: cc, flexShrink: 0 }}>{g.cost}</div>
                </div>
              );
            })}
          </div>
        )}

        {tab === "budget" && (
          <div>
            {TRIP_DATA.budget.map((b, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: i < TRIP_DATA.budget.length - 1 ? "1px solid #f1f5f9" : "none" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                  <span style={{ fontSize: 12, color: "#1e293b" }}>{b.item}</span>
                  {b.status === "paid" && <Badge text="Paid" color="#15803d" bg="#dcfce7" />}
                  {b.status === "tomorrow" && <Badge text="Pay today" color="#7c3aed" bg="#ede9fe" />}
                  {b.status === "todo" && <Badge text="To buy" color="#b45309" bg="#fef3c7" />}
                  {b.status === "est" && <Badge text="Est." color="#64748b" bg="#f1f5f9" />}
                </div>
                <span style={{ fontWeight: 600, fontSize: 12, color: b.status === "paid" ? "#16a34a" : b.status === "tomorrow" ? "#7c3aed" : "#1e293b", flexShrink: 0, marginLeft: 8 }}>{b.cost}</span>
              </div>
            ))}
            <div style={{ marginTop: 12, padding: "11px 13px", background: "#f0fdf4", borderRadius: 8, border: "1px solid #86efac" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontWeight: 700, fontSize: 13, color: "#166534" }}>Total est. remaining cash outlay</span>
                <span style={{ fontWeight: 800, fontSize: 16, color: "#166534" }}>~$4,200</span>
              </div>
              <div style={{ fontSize: 11, color: "#166534", marginTop: 4 }}>Cash available: $2-3k + $5k credit card backup = $7-8k total · <strong>Comfortably covered</strong></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
