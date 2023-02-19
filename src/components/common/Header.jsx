import React from "react";
import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";
import { getCookieToken, removeCookieToken } from "../../cookie/cookie";
import Swal from "sweetalert2";
import { useMutation } from "react-query";
import { cardEnrollUseMutationPostToken } from "../../apis/queries/cardEnrollQuery";

const Header = () => {
  //카드 등록 react-query
  const { mutate: cardEnroll, isLoading: cardEnrollLoading } = useMutation(
    "cardEnroll",
    () => cardEnrollUseMutationPostToken(),
    {
      onError: (err) => {
        console.log(err);
      },
    }
  );

  const location = useLocation();
  if (location.pathname === "/") return null;

  const onClickLogOut = () => {
    Swal.fire({
      title: "로그아웃 하시겠습니까?",
      confirmButtonColor: "#DCC6C6",
      cancelButtonColor: "#738598",
      showCancelButton: true,
      confirmButtonText: "로그아웃",
      cancelButtonText: "돌아가기",
      padding: "3em",
    }).then((result) => {
      if (result.isConfirmed) {
        removeCookieToken();
        window.location.replace("/login");
      } else {
        return;
      }
    });
  };

  const onClickEnroll = () => {
    Swal.fire({
      title: "등록 하시겠습니까?",
      confirmButtonColor: "#DCC6C6",
      cancelButtonColor: "#738598",
      showCancelButton: true,
      confirmButtonText: "등록하기",
      cancelButtonText: "돌아가기",
      padding: "3em",
      showClass: {
        popup: "animate__animated animate__fadeInDown",
      },
      hideClass: {
        popup: "animate__animated animate__fadeOutUp",
      },
      closeOnClickOutside: false,
    }).then((data) => {
      if (data.isConfirmed) cardEnroll();
    });
  };

  // useEffect(() => {

  // },[])
  return (
    <HeaderBox>
      <HeaderWrap>
        <Link to="/home">
          <Logo>Gradient</Logo>
        </Link>
        {getCookieToken("accessToken") === undefined ? (
          <Menu>
            {location.pathname === "/signup" ? (
              <Link style={{ color: "#B3B600" }} to="/signup">
                SignUp
              </Link>
            ) : (
              <Link to="/signup">SignUp</Link>
            )}

            {location.pathname === "/login" ? (
              <Link style={{ color: "#B3B600" }} to="/login">
                Login
              </Link>
            ) : (
              <Link to="/login">Login</Link>
            )}
          </Menu>
        ) : (
          <Menu>
            <Link onClick={onClickLogOut}>LogOut</Link>

            {location.pathname === "/enroll" ? (
              <Link style={{ color: "#B3B600" }}>Enroll</Link>
            ) : (
              <Link onClick={onClickEnroll}>Enroll</Link>
            )}

            {location.pathname === "/mypage" ? (
              <Link style={{ color: "#B3B600" }}>Mypage</Link>
            ) : (
              <Link to="/mypage">Mypage</Link>
            )}
          </Menu>
        )}
      </HeaderWrap>
    </HeaderBox>
  );
};

const HeaderBox = styled.header`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 10vh;

  padding: 20px 300px;
  background-color: ${({ theme }) => theme.colors.subBackgroundColor};
  color: ${({ theme }) => theme.colors.black};
`;
const HeaderWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 1440px;
`;
const Logo = styled.span`
  color: ${({ theme }) => theme.colors.black};
  font-size: 2.2rem;
  font-family: ${({ theme }) => theme.fontFace.font1};
`;
const Menu = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  display: flex;
  align-items: center;
  justify-content: space-between;
  a {
    color: ${({ theme }) => theme.colors.black};
    font-weight: bold;
    cursor: pointer;
    padding: 6px;
    margin-left: 30px;
    &:hover {
      font-size: ${({ theme }) => theme.fontSizes.xxl};
      color: ${({ theme }) => theme.colors.subColor2};
    }
  }
  span {
    color: ${({ theme }) => theme.colors.white};
  }
`;

export default Header;
