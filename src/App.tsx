import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Corporate from './pages/Corporate';
import Articles from './pages/Articles';
import ArticleDetail from './pages/ArticleDetail';
import About from './pages/About';
import TeacherApplication from './pages/TeacherApplication';
import ProgramFinder from './components/ProgramFinder';
import ProgramDetail from './components/ProgramDetail';
import PrivacyPolicy from './pages/PrivacyPolicy';
import RefundPolicy from './pages/RefundPolicy';
import TermsAndConditions from './pages/TermsAndConditions';
import NotFound from './pages/NotFound';
import { ConsentTimerProvider } from './components/ConsentTimerContext';
import TimerBar from './components/TimerBar';

function App() {
  return (
    <Router>
      <ConsentTimerProvider>
        <TimerBar />
        <Routes>
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/corporate" element={<Layout><Corporate /></Layout>} />
          <Route path="/articles" element={<Layout><Articles /></Layout>} />
          <Route path="/articles/:id" element={<Layout><ArticleDetail /></Layout>} />
          <Route path="/about" element={<Layout><About /></Layout>} />
          <Route path="/teacher-application" element={<Layout><TeacherApplication /></Layout>} />
          <Route path="/programs" element={<Layout><ProgramFinder /></Layout>} />
          <Route path="/programs/:id" element={<Layout><ProgramDetail /></Layout>} />
          <Route path="/privacy-policy" element={<Layout><PrivacyPolicy /></Layout>} />
          <Route path="/refund-policy" element={<Layout><RefundPolicy /></Layout>} />
          <Route path="/terms-and-conditions" element={<Layout><TermsAndConditions /></Layout>} />
          <Route path="/404" element={<Layout><NotFound /></Layout>} />
          <Route path="*" element={<Layout><NotFound /></Layout>} />
        </Routes>
      </ConsentTimerProvider>
    </Router>
  );
}

export default App;
