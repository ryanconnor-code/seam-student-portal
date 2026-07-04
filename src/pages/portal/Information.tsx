import { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import styled from "styled-components";
import { FiEdit2 } from "react-icons/fi";
import { PageHeader, Panel, PanelTitle } from "../../components/portal";
import { TextField } from "../../components/PortalForm";
import { PrimaryButton } from "../../components/ui";
import { useAuth } from "../../auth/AuthContext";
import type { Profile } from "../../data/types";

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

const Toolbar = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-bottom: 16px;
`;

const SecondaryButton = styled.button`
  padding: 10px 18px;
  min-width: 110px;
  font-size: 14px;
  font-weight: 600;
  border-radius: ${({ theme }) => theme.radius.pill};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background-color: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.surfaceAlt};
  }
`;

const Note = styled.p`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.success};
  margin: 0 0 12px;
`;

const ErrorNote = styled(Note)`
  color: ${({ theme }) => theme.colors.danger};
`;

function maskCard(cardNumber: string): string {
  const digits = cardNumber.replace(/\D/g, "");
  if (digits.length < 4) return "—";
  return `•••• •••• •••• ${digits.slice(-4)}`;
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <>
      <dt>{label}</dt>
      <dd>{value || "—"}</dd>
    </>
  );
}

const profileSchema = Yup.object({
  firstName: Yup.string().required("Required"),
  lastName: Yup.string().required("Required"),
  phone: Yup.string(),
  zip: Yup.string().matches(/^\d{0,5}$/, "Up to 5 digits"),
});

const passwordSchema = Yup.object({
  current: Yup.string().required("Required"),
  next: Yup.string().min(8, "At least 8 characters").required("Required"),
  confirm: Yup.string()
    .oneOf([Yup.ref("next")], "Passwords must match")
    .required("Required"),
});

export function Information() {
  const { user, updateProfile, changePassword } = useAuth();
  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState(false);
  const [pwMessage, setPwMessage] = useState<{ ok: boolean; text: string } | null>(null);

  if (!user) return null;
  const { personal, contact, academic, financial } = user.profile;

  return (
    <div>
      <PageHeader
        title="Student Information"
        subtitle="Your personal, contact, academic, and financial details."
      />

      {editing ? (
        <Formik
          initialValues={{
            firstName: personal.firstName,
            lastName: personal.lastName,
            dob: personal.dob,
            address: contact.address,
            zip: contact.zip,
            state: contact.state,
            phone: contact.phone,
            major: academic.major,
            role: academic.role,
            studentId: academic.studentId,
            bankName: financial.bankName,
            cardType: financial.cardType,
            cardNumber: financial.cardNumber,
          }}
          validationSchema={profileSchema}
          onSubmit={(values) => {
            const next: Profile = {
              personal: {
                firstName: values.firstName,
                lastName: values.lastName,
                dob: values.dob,
                email: personal.email,
              },
              contact: {
                address: values.address,
                zip: values.zip,
                state: values.state,
                phone: values.phone,
              },
              academic: {
                major: values.major,
                role: values.role,
                studentId: values.studentId,
              },
              financial: {
                bankName: values.bankName,
                cardType: values.cardType,
                cardNumber: values.cardNumber,
              },
            };
            updateProfile(next);
            setEditing(false);
            setSaved(true);
          }}
        >
          {() => (
            <Form>
              <Toolbar>
                <SecondaryButton type="button" onClick={() => setEditing(false)}>
                  Cancel
                </SecondaryButton>
                <PrimaryButton type="submit">Save Changes</PrimaryButton>
              </Toolbar>
              <Columns>
                <Panel>
                  <PanelTitle>Personal</PanelTitle>
                  <TextField name="firstName" label="First Name" />
                  <TextField name="lastName" label="Last Name" />
                  <TextField name="dob" type="date" label="Date of Birth" />
                  <TextField name="email" label="Email (login)" readOnly />
                </Panel>
                <Panel>
                  <PanelTitle>Contact</PanelTitle>
                  <TextField name="address" label="Address" />
                  <TextField name="zip" label="Zip" />
                  <TextField name="state" label="State" />
                  <TextField name="phone" label="Phone" />
                </Panel>
                <Panel>
                  <PanelTitle>Academic</PanelTitle>
                  <TextField name="major" label="Major" />
                  <TextField name="role" label="Role" />
                  <TextField name="studentId" label="Student ID" />
                </Panel>
                <Panel>
                  <PanelTitle>Financial</PanelTitle>
                  <TextField name="bankName" label="Bank" />
                  <TextField name="cardType" label="Card Type" />
                  <TextField name="cardNumber" label="Card Number" />
                </Panel>
              </Columns>
            </Form>
          )}
        </Formik>
      ) : (
        <>
          <Toolbar>
            <PrimaryButton
              type="button"
              onClick={() => {
                setEditing(true);
                setSaved(false);
              }}
              style={{ display: "flex", alignItems: "center", gap: 8 }}
            >
              <FiEdit2 /> Edit Profile
            </PrimaryButton>
          </Toolbar>
          {saved && <Note>Profile updated.</Note>}
          <Columns>
            <Panel>
              <PanelTitle>Personal</PanelTitle>
              <DefList>
                <Row label="First Name" value={personal.firstName} />
                <Row label="Last Name" value={personal.lastName} />
                <Row label="Date of Birth" value={personal.dob} />
                <Row label="Email" value={personal.email} />
              </DefList>
            </Panel>
            <Panel>
              <PanelTitle>Contact</PanelTitle>
              <DefList>
                <Row label="Address" value={contact.address} />
                <Row label="Zip" value={contact.zip} />
                <Row label="State" value={contact.state} />
                <Row label="Phone" value={contact.phone} />
              </DefList>
            </Panel>
            <Panel>
              <PanelTitle>Academic</PanelTitle>
              <DefList>
                <Row label="Major" value={academic.major} />
                <Row label="Role" value={academic.role} />
                <Row label="Student ID" value={academic.studentId} />
              </DefList>
            </Panel>
            <Panel>
              <PanelTitle>Financial</PanelTitle>
              <DefList>
                <Row label="Bank" value={financial.bankName} />
                <Row label="Card Type" value={financial.cardType} />
                <Row label="Card Number" value={maskCard(financial.cardNumber)} />
              </DefList>
            </Panel>
          </Columns>
        </>
      )}

      <Panel style={{ marginTop: 18, maxWidth: 460 }}>
        <PanelTitle>Change Password</PanelTitle>
        {pwMessage &&
          (pwMessage.ok ? (
            <Note>{pwMessage.text}</Note>
          ) : (
            <ErrorNote>{pwMessage.text}</ErrorNote>
          ))}
        <Formik
          initialValues={{ current: "", next: "", confirm: "" }}
          validationSchema={passwordSchema}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            setPwMessage(null);
            try {
              await changePassword(values.current, values.next);
              resetForm();
              setPwMessage({ ok: true, text: "Password changed successfully." });
            } catch (err) {
              setPwMessage({
                ok: false,
                text: err instanceof Error ? err.message : "Could not change password.",
              });
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <TextField name="current" type="password" label="Current Password" />
              <TextField name="next" type="password" label="New Password" />
              <TextField name="confirm" type="password" label="Confirm New Password" />
              <PrimaryButton type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Saving…" : "Update Password"}
              </PrimaryButton>
            </Form>
          )}
        </Formik>
      </Panel>
    </div>
  );
}
