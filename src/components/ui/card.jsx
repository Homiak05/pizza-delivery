export function Card({ children }) {
  return <div className="border rounded-xl shadow p-4">{children}</div>;
}
export function CardContent({ children, ...props }) {
  return <div {...props}>{children}</div>;
}
