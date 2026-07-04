import { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { FiLock, FiMail } from "react-icons/fi";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Avatar,
  Banner,
  ButtonRow,
  Card,
  ExtraText,
  PageContainer,
  PrimaryButton,
  TextLink,
  Title,
} from "../components/ui";
import { TextInput } from "../components/TextInput";
import { useAuth } from "../auth/AuthContext";
import { DEMO_EMAIL, DEMO_PASSWORD } from "../data/seed";
import logo from "../assets/avatar.png";

const schema = Yup.object({
  email: Yup.string().email("Enter a valid email").required("Required"),
  password: Yup.string().required("Required"),
});

type LocationState = { from?: string };

export function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState<string | null>(null);

  const from = (location.state as LocationState | null)?.from ?? "/app";

  return (
    <PageContainer>
      <Card>
        <Avatar $image={logo} />
        <Title $size={30}>User Login</Title>

        <Banner $variant="info">
          Demo account — <strong>{DEMO_EMAIL}</strong> / <strong>{DEMO_PASSWORD}</strong>
        </Banner>
        {error && <Banner $variant="danger">{error}</Banner>}

        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={schema}
          onSubmit={async (values, { setSubmitting }) => {
            setError(null);
            try {
              await login(values.email, values.password);
              navigate(from, { replace: true });
            } catch (err) {
              setError(err instanceof Error ? err.message : "Login failed.");
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <TextInput name="email" type="email" label="Email Address" placeholder="me@example.com" icon={<FiMail />} />
              <TextInput name="password" type="password" label="Password" placeholder="••••••••" icon={<FiLock />} />
              <ButtonRow>
                <PrimaryButton type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Signing in…" : "Login"}
                </PrimaryButton>
              </ButtonRow>
            </Form>
          )}
        </Formik>

        <ExtraText>
          New here? <TextLink to="/signup">Create an account</TextLink>
        </ExtraText>
        <ExtraText>
          Forgot your password? <TextLink to="/forgot-password">Reset it</TextLink>
        </ExtraText>
      </Card>
    </PageContainer>
  );
}
