// Formik-connected form controls styled for the light portal surfaces.
import { useField } from "formik";
import styled from "styled-components";

const FieldWrap = styled.div`
  margin-bottom: 14px;
  text-align: left;
`;

const Label = styled.label`
  display: block;
  font-size: 13px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textMuted};
  margin-bottom: 4px;
`;

const Input = styled.input<{ $invalid: boolean }>`
  width: 100%;
  padding: 10px 12px;
  font-size: 15px;
  color: ${({ theme }) => theme.colors.text};
  background-color: ${({ theme }) => theme.colors.surfaceAlt};
  border: 1px solid
    ${({ theme, $invalid }) => ($invalid ? theme.colors.danger : theme.colors.border)};
  border-radius: ${({ theme }) => theme.radius.sm};
  outline: 0;
  transition: border-color 0.15s ease-in-out;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
  }

  &:read-only {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const ErrorText = styled.p`
  min-height: 15px;
  margin: 4px 0 0;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.danger};
`;

type TextFieldProps = {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  readOnly?: boolean;
};

export function TextField({ label, type = "text", ...props }: TextFieldProps) {
  const [field, meta] = useField(props.name);
  const invalid = Boolean(meta.touched && meta.error);
  return (
    <FieldWrap>
      <Label htmlFor={props.name}>{label}</Label>
      <Input id={props.name} type={type} $invalid={invalid} {...field} {...props} />
      <ErrorText>{invalid ? meta.error : ""}</ErrorText>
    </FieldWrap>
  );
}
