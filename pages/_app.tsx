import Layout from '../layouts/Landing';
import { LanguageProvider } from '../lib/client/contexts/LanguageContext';
import { ThemeProvider } from '../lib/client/contexts/ThemeContext';
import '../styles/globals.css';

const App = ({ Component, pageProps }: any) => (
  <ThemeProvider>
    <LanguageProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </LanguageProvider>
  </ThemeProvider>
);

export default App;
