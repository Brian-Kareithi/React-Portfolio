/**
 * The project on the bench right now: a client point of sale, still in progress.
 * Every line here describes something visible in the live demo; nothing is projected.
 */
export const currentProject = {
  id: "pos",
  status: "In progress",
  kind: "Client project",
  title: "Point of sale",
  titleAccent: "for multi-branch retail",
  summary:
    "A till and back office in one: selling, stock across branches, reorder insights, accounting and an audit trail. I'm building it for a client now.",
  demo: "https://pos-zeta-eight.vercel.app/",
  facts: [
    { label: "Roles", value: "Owner, Manager, Cashier, Stockkeeper" },
    { label: "Payments", value: "Cash, card, M-Pesa, bank transfer" },
    { label: "Exports", value: "CSV, Excel and PDF" },
  ],
  screens: [
    { src: "/projects/pos/overview.png", title: "Dashboard", caption: "Net sales, profit and cash flow, today against yesterday." },
    { src: "/projects/pos/sell.png", title: "Sell", caption: "Scan or tap to sell, with keyboard shortcuts for search, charge, hold and discount." },
    { src: "/projects/pos/inventory.png", title: "Inventory", caption: "Stock by branch, expiry batches and low-stock status." },
    { src: "/projects/pos/insights.png", title: "Insights", caption: "What to reorder and when the shop is busiest, from its own sales history." },
    { src: "/projects/pos/accounting.png", title: "Accounting", caption: "Income, expenses and profit for any period." },
    { src: "/projects/pos/audit.png", title: "Audit log", caption: "Who changed prices, gave discounts, voided sales or issued refunds." },
  ],
};
