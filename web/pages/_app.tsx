import { LoginWrapper } from '../shared/login-wrapper';
import { useRouter } from 'next/router';
import '../styles/globals.css';

const publicPages = ['/', '/rsvp', '/404', '/info']

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const path = router.pathname;
  const isPublic = publicPages.includes(path);
  console.log({isPublic, path});
  if (isPublic) {
    return <Component {...pageProps} />
  }
  return <LoginWrapper>
    <Component  {...pageProps} />
  </LoginWrapper>;
}

export default MyApp
