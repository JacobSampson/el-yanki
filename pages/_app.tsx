import { ThemeProvider } from '../lib/client/contexts/ThemeContext';

const App = ({ Component, pageProps }: any) => (
  <ThemeProvider>
    <Component {...pageProps} />
  </ThemeProvider>
);

export default App;
