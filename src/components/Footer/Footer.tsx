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

  const getIcon = (
    path: string,
    activeIcon: string,
    inactiveIcon: string,
  ): string => {
    return location.pathname === path ? activeIcon : inactiveIcon
  }

  return (
    <FooterContainer>
      <FooterLink to="/" className={location.pathname === '/' ? 'active' : ''}>
        <FooterIcon src={getIcon('/', homeIcon, noneHomeIcon)} alt="홈화면" />
        <FooterText>홈화면</FooterText>
      </FooterLink>
      <FooterLink
        to="/list"
        className={location.pathname === '/list' ? 'active' : ''}
      >
        <FooterIcon
          src={getIcon('/list', listIcon, noneListIcon)}
          alt="할인 가게 목록"
        />
        <FooterText>할인 가게 목록</FooterText>
      </FooterLink>
      <FooterLink
        to="/manager"
        className={location.pathname === '/manager' ? 'active' : ''}
      >
        <FooterIcon
          src={getIcon('/manager', mypageIcon, noneMypageIcon)}
          alt="마이페이지"
        />
        <FooterText>마이페이지</FooterText>
      </FooterLink>
    </FooterContainer>
  )
}
