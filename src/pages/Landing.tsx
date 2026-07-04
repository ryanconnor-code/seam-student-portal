import { Avatar, ButtonRow, Card, LinkButton, PageContainer, Subtitle, Title } from "../components/ui";
import logo from "../assets/logo.png";

export function Landing() {
  return (
    <PageContainer>
      <Card>
        <Avatar $image={logo} />
        <Title $size={44}>Welcome to SEAM</Title>
        <Subtitle>Your student portal for profile, payments, and polls.</Subtitle>
        <ButtonRow>
          <LinkButton to="/login">Login</LinkButton>
          <LinkButton to="/signup">Sign Up</LinkButton>
        </ButtonRow>
      </Card>
    </PageContainer>
  );
}
