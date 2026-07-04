import { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { FiCalendar, FiLock, FiMail, FiUser } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import {
  Avatar,
  Banner,
  ButtonRow,
  Card,
  ExtraText,
  PageContainer,
  PrimaryButton,
  Subtitle,
  TextLink,
  Title,
} from "../components/ui";
import { TextInput } from "../components/TextInput";
import { useAuth } from "../auth/AuthContext";
import logo from "../assets/avatar.png";

const schema = Yup.object({
  firstName: Yup.string().required("Required"),
  lastName: Yup.string().required("Required"),
  dob: Yup.string().required("Required"),
  email: Yup.string().email("Enter a valid email").required("Required"),
  confirmEmail: Yup.string()
    .oneOf([Yup.ref("email")], "Emails must match")
    .required("Required"),
  password: Yup.string().min(8, "At least 8 characters").required("Required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Required"),
});

export function Signup() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  return (
    <PageContainer>
      <Card $wide>
        <Avatar $image={logo} />
        <Title $size={30}>Create Your Account</Title>
        <Subtitle>Join SEAM in a few quick steps.</Subtitle>

        {error && <Banner $variant="danger">{error}</Banner>}

        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            dob: "",
            email: "",
            confirmEmail: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={schema}
          onSubmit={async (values, { setSubmitting }) => {
            setError(null);
            try {
              await signup(values);
              navigate("/app", { replace: true });
            } catch (err) {
              setError(err instanceof Error ? err.message : "Sign up failed.");
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <TextInput name="firstName" label="First Name" placeholder="Dave" icon={<FiUser />} />
              <TextInput name="lastName" label="Last Name" placeholder="Rushit" icon={<FiUser />} />
              <TextInput name="dob" type="date" label="Date of Birth" icon={<FiCalendar />} />
              <TextInput name="email" type="email" label="Email Address" placeholder="me@example.com" icon={<FiMail />} />
              <TextInput name="confirmEmail" type="email" label="Confirm Email" placeholder="me@example.com" icon={<FiMail />} />
              <TextInput name="password" type="password" label="Password" placeholder="At least 8 characters" icon={<FiLock />} />
              <TextInput name="confirmPassword" type="password" label="Confirm Password" placeholder="Re-enter password" icon={<FiLock />} />
              <ButtonRow>
                <PrimaryButton type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Creating…" : "Create Account"}
                </PrimaryButton>
              </ButtonRow>
            </Form>
          )}
        </Formik>

        <ExtraText>
          Already a member? <TextLink to="/login">Log in</TextLink>
        </ExtraText>
      </Card>
    </PageContainer>
  );
}
