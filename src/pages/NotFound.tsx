import { ButtonRow, Card, LinkButton, PageContainer, Subtitle, Title } from "../components/ui";

export function NotFound() {
  return (
    <PageContainer>
      <Card>
        <Title $size={64}>404</Title>
        <Subtitle>We couldn't find that page.</Subtitle>
        <ButtonRow>
          <LinkButton to="/">Go Home</LinkButton>
        </ButtonRow>
      </Card>
    </PageContainer>
  );
}
