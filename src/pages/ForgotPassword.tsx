import { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { FiMail } from "react-icons/fi";
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
import logo from "../assets/avatar.png";

const schema = Yup.object({
  email: Yup.string().email("Enter a valid email").required("Required"),
});

export function ForgotPassword() {
  const [sent, setSent] = useState(false);

  return (
    <PageContainer>
      <Card>
        <Avatar $image={logo} />
        <Title $size={30}>Password Reset</Title>
        <Subtitle>We'll email you a link to reset your password.</Subtitle>

        {sent ? (
          <Banner $variant="success">
            If an account exists for that email, a reset link is on its way.
          </Banner>
        ) : (
          <Formik
            initialValues={{ email: "" }}
            validationSchema={schema}
            onSubmit={(_, { setSubmitting }) => {
              // Mock: pretend to dispatch a reset email.
              setSent(true);
              setSubmitting(false);
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <TextInput name="email" type="email" label="Email Address" placeholder="me@example.com" icon={<FiMail />} />
                <ButtonRow>
                  <PrimaryButton type="submit" disabled={isSubmitting}>
                    Send Reset Link
                  </PrimaryButton>
                </ButtonRow>
              </Form>
            )}
          </Formik>
        )}

        <ExtraText>
          Remembered it? <TextLink to="/login">Back to login</TextLink>
        </ExtraText>
      </Card>
    </PageContainer>
  );
}
