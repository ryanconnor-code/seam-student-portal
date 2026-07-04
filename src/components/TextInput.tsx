import { useState, type ReactNode } from "react";
import { useField } from "formik";
import styled from "styled-components";
import { FiEye, FiEyeOff } from "react-icons/fi";

const Field = styled.div`
  position: relative;
  margin-bottom: 6px;
  text-align: left;
`;

const Label = styled.label`
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.light1};
  margin-bottom: 4px;
`;

const Input = styled.input<{ $invalid: boolean; $hasIcon: boolean }>`
  width: 100%;
  padding: 13px 14px;
  padding-left: ${({ $hasIcon }) => ($hasIcon ? "44px" : "14px")};
  font-size: 16px;
  color: ${({ theme }) => theme.colors.dark1};
  background-color: ${({ theme }) => theme.colors.light1};
  border: 2px solid
    ${({ theme, $invalid }) => ($invalid ? theme.colors.danger : "transparent")};
  border-radius: ${({ theme }) => theme.radius.sm};
  outline: 0;
  transition: border-color 0.2s ease-in-out;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const LeadingIcon = styled.span`
  position: absolute;
  left: 14px;
  top: 38px;
  font-size: 18px;
  color: ${({ theme }) => theme.colors.dark3};
  display: flex;
`;

const ToggleIcon = styled.button`
  position: absolute;
  right: 12px;
  top: 34px;
  font-size: 18px;
  color: ${({ theme }) => theme.colors.dark3};
  background: none;
  border: 0;
  padding: 4px;
  cursor: pointer;
  display: flex;
`;

const ErrorText = styled.p`
  min-height: 16px;
  margin: 4px 0 0;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.danger};
`;

type TextInputProps = {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  icon?: ReactNode;
};

/**
 * Formik-connected text input. Handles labels, leading icons, inline
 * validation errors, and a proper show/hide toggle for password fields.
 */
export function TextInput({ icon, type = "text", label, ...props }: TextInputProps) {
  const [field, meta] = useField(props.name);
  const [reveal, setReveal] = useState(false);

  const isPassword = type === "password";
  const invalid = Boolean(meta.touched && meta.error);
  const inputType = isPassword ? (reveal ? "text" : "password") : type;

  return (
    <Field>
      <Label htmlFor={props.name}>{label}</Label>
      {icon && <LeadingIcon>{icon}</LeadingIcon>}
      <Input
        id={props.name}
        $invalid={invalid}
        $hasIcon={Boolean(icon)}
        {...field}
        {...props}
        type={inputType}
      />
      {isPassword && (
        <ToggleIcon
          type="button"
          aria-label={reveal ? "Hide password" : "Show password"}
          onClick={() => setReveal((v) => !v)}
        >
          {reveal ? <FiEye /> : <FiEyeOff />}
        </ToggleIcon>
      )}
      <ErrorText>{invalid ? meta.error : ""}</ErrorText>
    </Field>
  );
}
