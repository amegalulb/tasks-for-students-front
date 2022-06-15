import {
  Card, Container, styled, Typography,
} from '@mui/material';
import { LoginForm } from '../features/Auth/components/LoginForm';
import { Page } from '../shared/components/Page';
import useResponsive from '../shared/lib/useResponsive';

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const HeaderStyle = styled('header')(({ theme }) => ({
  zIndex: 9,
  lineHeight: 0,
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  position: 'absolute',
  padding: theme.spacing(3),
  justifyContent: 'space-between',
  [theme.breakpoints.up('md')]: {
    alignItems: 'flex-start',
    padding: theme.spacing(7, 5, 0, 7),
  },
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 464,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(2, 0, 2, 2),
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

// eslint-disable-next-line react/function-component-definition
export default function AuthPage() {
  const mdUp = useResponsive('up', 'md');

  return (
    <Page title="Авторизоваться">
      <RootStyle>
        <HeaderStyle>
          <Typography variant="h3" sx={{ mt: { md: -2 } }}>
            TasksForStudent
          </Typography>

          {mdUp && (
            <Typography variant="body2" sx={{ mt: { md: -2 } }}>
              Если у вас нету аккаунта, то обратитесь к
              {' '}
              <a href="mailto:mak.ageew2016@yandex.ru">администратору</a>
            </Typography>
          )}
        </HeaderStyle>

        {mdUp && (
          <SectionStyle>
            <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
              Добро пожаловать
            </Typography>
            <img src="/static/images/illustration_login.png" alt="login" />
          </SectionStyle>
        )}
        <Container maxWidth="sm">
          <ContentStyle>
            <Typography variant="h4" gutterBottom>
              Войти
            </Typography>
            <LoginForm />
          </ContentStyle>
        </Container>
      </RootStyle>
    </Page>
  );
}
