import React from 'react';
import styled, {ThemeProvider} from "styled-components";
import { darkTheme, lightTheme } from './theme';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Main from './routes/Main';
import Detail from './routes/Detail';
import { useRecoilValue } from 'recoil';
import { isDarkAtom } from './atoms';


function App() {
  const isDark=useRecoilValue(isDarkAtom);
  return (
    <ThemeProvider theme={isDark?darkTheme:lightTheme}>
      <Router>
        <Routes>
          <Route path="/" element={<Main />}>
            <Route path="/:coinId" element={<Main />}></Route>
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
