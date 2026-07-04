import { useMemo, useState } from "react";
import { FiAlertCircle, FiCheckCircle, FiDollarSign } from "react-icons/fi";
import {
  Badge,
  Grid,
  PageHeader,
  Panel,
  PanelTitle,
  StatCard,
  Table,
} from "../../components/portal";
import { money } from "../../lib/format";
import { PrimaryButton } from "../../components/ui";
import {
  addTransaction,
  getCharges,
  getTransactions,
  payCharge,
} from "../../data/store";
import type { BillingCharge } from "../../data/types";
import { useAuth } from "../../auth/AuthContext";

const statusTone = {
  paid: "success",
  due: "warning",
  overdue: "danger",
} as const;

export function Billing() {
  const { user } = useAuth();
  const [charges, setCharges] = useState<BillingCharge[]>(() => getCharges());
  const [payments, setPayments] = useState(() => getTransactions());

  const fullName = user
    ? `${user.profile.personal.firstName} ${user.profile.personal.lastName}`
    : "Student";

  const { balance, paid } = useMemo(() => {
    return charges.reduce(
      (acc, c) => {
        if (c.status === "paid") acc.paid += c.amount;
        else acc.balance += c.amount;
        return acc;
      },
      { balance: 0, paid: 0 },
    );
  }, [charges]);

  const overdueCount = charges.filter((c) => c.status === "overdue").length;

  const handlePay = (charge: BillingCharge) => {
    const updated = payCharge(charge.id);
    setCharges(updated);
    addTransaction({
      id: `t_${Date.now()}`,
      from: fullName,
      to: "SEAM University",
      amount: charge.amount,
      date: new Date().toISOString().slice(0, 10),
      reason: charge.description,
    });
    setPayments(getTransactions());
  };

  return (
    <div>
      <PageHeader title="Billing" subtitle="Your account balance and payment activity." />

      <Grid $min="220px">
        <StatCard
          icon={<FiDollarSign />}
          value={money.format(balance)}
          label="Balance Due"
        />
        <StatCard
          icon={<FiCheckCircle />}
          value={money.format(paid)}
          label="Paid This Term"
        />
        <StatCard
          icon={<FiAlertCircle />}
          value={overdueCount}
          label="Overdue Items"
        />
      </Grid>

      <Panel style={{ marginTop: 18 }}>
        <PanelTitle>Charges</PanelTitle>
        <Table>
          <thead>
            <tr>
              <th>Description</th>
              <th>Due Date</th>
              <th className="right">Amount</th>
              <th className="right">Status</th>
              <th className="right">Action</th>
            </tr>
          </thead>
          <tbody>
            {charges.map((c) => (
              <tr key={c.id}>
                <td>{c.description}</td>
                <td>{c.dueDate}</td>
                <td className="right">{money.format(c.amount)}</td>
                <td className="right">
                  <Badge $tone={statusTone[c.status]}>{c.status}</Badge>
                </td>
                <td className="right">
                  {c.status !== "paid" && (
                    <PrimaryButton
                      type="button"
                      style={{ minWidth: 90, padding: "6px 14px", fontSize: 13 }}
                      onClick={() => handlePay(c)}
                    >
                      Pay
                    </PrimaryButton>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Panel>

      <Panel style={{ marginTop: 18 }}>
        <PanelTitle>Recent Payments</PanelTitle>
        <Table>
          <thead>
            <tr>
              <th>From</th>
              <th>To</th>
              <th>Date</th>
              <th className="right">Amount</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((p) => (
              <tr key={p.id}>
                <td>{p.from}</td>
                <td>{p.to}</td>
                <td>{p.date}</td>
                <td className="right">{money.format(p.amount)}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Panel>
    </div>
  );
}
