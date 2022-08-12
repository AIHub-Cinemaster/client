import { Route, Routes } from "react-router-dom";
import "./assets/css/App.css";
import Header from "./components/Header";
import Home from "./components/Home";
import NotFound from "./components/NotFound";
import KakaoCallBack from "./components/pages/user/KakaoCallback";
import NaverCallBack from "./components/pages/user/NaverCallback";
import Footer from "./components/Footer";
import MyPage from "./components/MyPage";
import Login from "./components/Login";



function App() {
  return (
    <div className="root-wrap">
      <Header />
      <div className="container" id="wrapper">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="oauth">
            <Route path="kakao/callback" element={<KakaoCallBack />}/>
            <Route path="naver/callback" element={<NaverCallBack />}/>
          </Route>
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
