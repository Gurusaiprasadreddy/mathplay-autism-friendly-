import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Topics from './pages/Topics';
import TopicView from './pages/TopicView'; // We will create this
import Details from './pages/Details';
import ProductDescription from './pages/ProductDescription';
import FeedbackForm from './pages/FeedbackForm';
import GameView from './components/GameView'; // We will create this

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="learn" element={<Topics mode="learn" />} />
        <Route path="play" element={<Topics mode="play" />} />
        <Route path="topics" element={<Topics mode="learn" />} /> {/* Fallback/Default */}
        <Route path="topic/:topicId" element={<TopicView />} />
        <Route path="details" element={<Details />} />
        <Route path="product" element={<ProductDescription />} />
        <Route path="feedback" element={<FeedbackForm />} />
      </Route>
    </Routes>
  );
};

export default App;
