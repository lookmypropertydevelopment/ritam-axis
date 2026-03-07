import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App, { Home } from './App.jsx'
import About from './pages/About.jsx'
import Services from './pages/Services.jsx'
import Portfolio from './pages/Portfolio.jsx'
import Blog from './pages/Blog.jsx'
import Contact from './pages/Contact.jsx'
import ProjectDetails from './pages/ProjectDetails.jsx'
import BlogPost from './pages/BlogPost.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<App />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/project/:slug" element={<ProjectDetails />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
