import { recentTransactions } from "@/data/adminDashboard";

const transactionStatusClasses = {
  Released: "bg-emerald-100 text-emerald-700",
  "In Escrow": "bg-blue-100 text-blue-700",
  Pending: "bg-amber-100 text-amber-700",
  "On Hold": "bg-rose-100 text-rose-700",
  Disputed: "bg-rose-100 text-rose-700",
};

export default function AdminRecentTransactionsTable() {
  return (
    <section className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
      <h3 className="text-lg font-semibold text-slate-900">
        Recent Transactions
      </h3>
      <p className="mb-4 text-sm text-slate-500">Latest financial activity</p>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-3 py-2 font-semibold text-slate-600">Txn ID</th>
              <th className="px-3 py-2 font-semibold text-slate-600">User</th>
              <th className="px-3 py-2 font-semibold text-slate-600">Amount</th>
              <th className="px-3 py-2 font-semibold text-slate-600">Status</th>
              <th className="px-3 py-2 font-semibold text-slate-600">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {recentTransactions.map((transaction) => (
              <tr key={transaction.id}>
                <td className="px-3 py-3 font-medium text-slate-900">
                  {transaction.id}
                </td>
                <td className="px-3 py-3 text-slate-600">
                  <div>{transaction.user}</div>
                  <div className="text-xs text-slate-500">
                    {transaction.type || "Transaction"}
                  </div>
                </td>
                <td className="px-3 py-3 font-medium text-slate-900">
                  {transaction.amount}
                </td>
                <td className="px-3 py-3">
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                      transactionStatusClasses[transaction.status] ||
                      "bg-slate-200 text-slate-700"
                    }`}
                  >
                    {transaction.status}
                  </span>
                </td>
                <td className="px-3 py-3 text-slate-600">{transaction.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
