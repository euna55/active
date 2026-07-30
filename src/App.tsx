import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import CoverPage from './pages/CoverPage';
import SelectHelperPage from './pages/SelectHelperPage';
import SpotGuidePage from './pages/SpotGuidePage';
import MemoPage from './pages/MemoPage';
import MissionPage from './pages/MissionPage';
import RewardPage from './pages/RewardPage';
import FinalPuzzlePage from './pages/FinalPuzzlePage';
import RevealPage from './pages/RevealPage';
import GoodsPage from './pages/GoodsPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CoverPage />} />
        <Route path="/select" element={<SelectHelperPage />} />
        <Route path="/spot/:id" element={<SpotGuidePage />} />
        <Route path="/spot/:id/memo" element={<MemoPage />} />
        <Route path="/mission/:id" element={<MissionPage />} />
        <Route path="/mission/:id/reward" element={<RewardPage />} />
        <Route path="/final" element={<FinalPuzzlePage />} />
        <Route path="/reveal" element={<RevealPage />} />
        <Route path="/reveal/reward" element={<GoodsPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
