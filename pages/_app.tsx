import { ThemeProvider } from '../lib/client/contexts/ThemeContext';
import '../styles/globals.css';

const App = ({ Component, pageProps }: any) => (
  <ThemeProvider>
    <Component {...pageProps} />
  </ThemeProvider>
);

export default App;
