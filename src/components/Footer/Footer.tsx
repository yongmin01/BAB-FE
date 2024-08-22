import { FooterContainer } from './Footer.style'
import { FooterIcon } from './Footer.style'
import { FooterLink } from './Footer.style'
import { FooterText } from './Footer.style'
import homeIcon from '@icons/아이콘_홈_활성화.svg'
import listIcon from '@icons/아이콘_할인가게_활성화.svg'
import mypageIcon from '@icons/아이콘_마이페이지_활성화.svg'
import noneHomeIcon from '@icons/아이콘_홈.svg'
import noneListIcon from '@icons/아이콘_할인가게.svg'
import noneMypageIcon from '@icons/아이콘_마이페이지.svg'
import { useLocation } from 'react-router-dom'
import { LoginStore } from '@stores/loginStore'

export default function Footer() {
  const membertype = LoginStore((state) => state.membertype)
  const location = useLocation()

  const icons = {
    home: location.pathname === '/mapPage' ? homeIcon : noneHomeIcon,
    list: location.pathname === '/list' ? listIcon : noneListIcon,
    mypage: ['/manager', '/studentPage'].includes(location.pathname)
      ? mypageIcon
      : noneMypageIcon,
  }

  const mypageLink = membertype === 'manager' ? '/manager' : '/studentPage'

  return (
    <FooterContainer>
      <FooterLink
        to="/list"
        className={location.pathname === '/list' ? 'active' : ''}
      >
        <FooterIcon src={icons.list} alt="할인 가게 목록" />
        <FooterText>할인 가게 목록</FooterText>
      </FooterLink>
      <FooterLink
        to="/mapPage"
        className={location.pathname === '/mapPage' ? 'active' : ''}
      >
        <FooterIcon src={icons.home} alt="홈화면" />
        <FooterText>홈화면</FooterText>
      </FooterLink>
      <FooterLink
        to={mypageLink}
        className={
          ['/manager', '/studentPage'].includes(location.pathname)
            ? 'active'
            : ''
        }
      >
        <FooterIcon src={icons.mypage} alt="마이페이지" />
        <FooterText>마이페이지</FooterText>
      </FooterLink>
    </FooterContainer>
  )
}
