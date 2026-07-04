import styled from "styled-components";
import { PageHeader, Panel, PanelTitle } from "../../components/portal";
import { useAuth } from "../../auth/AuthContext";

const Columns = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 18px;

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
  }
`;

const DefList = styled.dl`
  margin: 0;
  display: grid;
  grid-template-columns: 130px 1fr;
  row-gap: 10px;

  dt {
    color: ${({ theme }) => theme.colors.textMuted};
    font-size: 14px;
  }
  dd {
    margin: 0;
    color: ${({ theme }) => theme.colors.text};
    font-size: 14px;
    font-weight: 500;
  }
`;

function maskCard(cardNumber: string): string {
  const digits = cardNumber.replace(/\D/g, "");
  if (digits.length < 4) return "—";
  return `•••• •••• •••• ${digits.slice(-4)}`;
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <>
      <dt>{label}</dt>
      <dd>{value || "—"}</dd>
    </>
  );
}

export function Information() {
  const { user } = useAuth();
  if (!user) return null;
  const { personal, contact, academic, financial } = user.profile;

  return (
    <div>
      <PageHeader
        title="Student Information"
        subtitle="Your personal, contact, academic, and financial details."
      />
      <Columns>
        <Panel>
          <PanelTitle>Personal</PanelTitle>
          <DefList>
            <Field label="First Name" value={personal.firstName} />
            <Field label="Last Name" value={personal.lastName} />
            <Field label="Date of Birth" value={personal.dob} />
            <Field label="Email" value={personal.email} />
          </DefList>
        </Panel>

        <Panel>
          <PanelTitle>Contact</PanelTitle>
          <DefList>
            <Field label="Address" value={contact.address} />
            <Field label="Zip" value={contact.zip} />
            <Field label="State" value={contact.state} />
            <Field label="Phone" value={contact.phone} />
          </DefList>
        </Panel>

        <Panel>
          <PanelTitle>Academic</PanelTitle>
          <DefList>
            <Field label="Major" value={academic.major} />
            <Field label="Role" value={academic.role} />
            <Field label="Student ID" value={academic.studentId} />
          </DefList>
        </Panel>

        <Panel>
          <PanelTitle>Financial</PanelTitle>
          <DefList>
            <Field label="Bank" value={financial.bankName} />
            <Field label="Card Type" value={financial.cardType} />
            <Field label="Card Number" value={maskCard(financial.cardNumber)} />
          </DefList>
        </Panel>
      </Columns>
    </div>
  );
}
