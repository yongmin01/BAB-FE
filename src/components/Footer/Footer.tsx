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

export default function Footer() {
  const location = useLocation()

  const icons = {
    home: location.pathname === '/map' ? homeIcon : noneHomeIcon,
    list: ['/list', '/shopdetail'].includes(location.pathname)
      ? listIcon
      : noneListIcon,
    mypage: ['/manager', '/studentPage'].includes(location.pathname)
      ? mypageIcon
      : noneMypageIcon,
  }

  return (
    <FooterContainer>
      <FooterLink
        to="/map"
        className={location.pathname === '/map' ? 'active' : ''}
      >
        <FooterIcon src={icons.home} alt="홈화면" />
        <FooterText>홈화면</FooterText>
      </FooterLink>
      <FooterLink
        to="/list"
        className={
          ['/list', '/shopdetail'].includes(location.pathname) ? 'active' : ''
        }
      >
        <FooterIcon src={icons.list} alt="할인 가게 목록" />
        <FooterText>할인 가게 목록</FooterText>
      </FooterLink>
      <FooterLink
        to="/manager"
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
