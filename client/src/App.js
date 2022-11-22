import { useState } from 'react';
import styled from 'styled-components';
import { ThemeProvider } from 'styled-components';
import { Menu, Navbar } from './components';
import { darkTheme, lightTheme } from './utils/Theme';

import { useSelector } from 'react-redux';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home, Search, SignIn, Video } from './pages';
import { device } from './utils/BreakPoints';

const Container = styled.div`
  display: flex;
`;
const Main = styled.div`
  flex: 7;
  background-color: #181818;
  background-color: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text};
`;
const Wrapper = styled.div`
  padding: 22px 20px 22px 0px;

  @media ${device.tablet} {
    padding: 22px 56px 22px 0px;
  }
  @media ${device.laptop} {
    padding: 22px 56px;
  }

  @media ${device.desktop} {
    padding: 22px 56px;
  }
`;

function App() {
  // theme toggled
  const [darkMode, setDarkMode] = useState(true);
  const { currentUser } = useSelector((state) => state.user);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <Container>
        <BrowserRouter>
          <Menu darkMode={darkMode} setDarkMode={setDarkMode} />
          <Main>
            <Navbar />
            <Wrapper>
              <Routes>
                <Route path="/">
                  <Route index element={<Home type="random" />} />
                  <Route path="trends" element={<Home type="trend" />} />
                  <Route path="subscriptions" element={<Home type="sub" />} />
                  <Route path="search" element={<Search />} />
                  <Route
                    path="singin"
                    element={currentUser ? <Home /> : <SignIn />}
                  />
                  <Route path="video">
                    <Route path=":id" element={<Video />} />
                  </Route>
                </Route>
              </Routes>
            </Wrapper>
          </Main>
        </BrowserRouter>
      </Container>
    </ThemeProvider>
  );
}

export default App;
