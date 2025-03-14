import React from 'react'
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router'

import Navbar from './Navbar'
import Home from './Home'
import Create from './Create'
import AddNewQuestion from './AddNewQuestion'
import AddNewTopic from './AddNewTopic'
import AddNewMechanic from './AddNewMechanic'
import BrowseQuestions from './BrowseQuestions'
import BrowseTopics from './BrowseTopics'
import BrowseMechanics from './BrowseMechanics'
import PageNotFound from './PageNotFound'

function Add() {
  return <Outlet />
}

function Browse() {
  return <Outlet />
}

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<PageNotFound />} />
        <Route path="/create" element={<Create />} />
        <Route path="/add" element={<Add />}>
          <Route index element={<Navigate to="/add/new_question" />} />
          <Route path="new_question" element={<AddNewQuestion />} />
          <Route path="new_topic" element={<AddNewTopic />} />
          <Route path="new_mechanic" element={<AddNewMechanic />} />
        </Route>
        <Route path="/browse" element={<Browse />}>
          <Route index element={<Navigate to="/browse/questions" />} />
          <Route path="questions" element={<BrowseQuestions />} />
          <Route path="topics" element={<BrowseTopics />} />
          <Route path="mechanics" element={<BrowseMechanics />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
