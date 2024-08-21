import errorIcon from '@assets/RegisterStoreInfo/warnning.svg'
import {
  StyledScrollableContent,
  StyledButton,
  StyledContainer,
  StyledFormContainer,
  StyledFormInput,
  StyledLabel,
  StyledNavImg,
  StyledNavImgWrapper,
  StyledNavText,
  StyledSection,
  StyledUploadBox,
  StyledUploadImg,
  StyledUploadText,
  StyledErrorMessage,
  StyledInputContainer,
} from './FirstRegisterStoreInfo.style'
import UploadImg from '@assets/RegisterStoreInfo/upload.svg'
import nav from '@assets/RegisterStoreInfo/firststep.svg'
import { useNavigate } from 'react-router-dom'
import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { useErrorInput } from '@hooks/useErrorInput'
import { AddressSearch } from '@components/AddressSearch/AddressSearch'
import useImageLoad from '@hooks/useImageLoad'
import { getStoreInfo } from '@apis/getStoreInfo'
import { patchStore } from '@apis/patchStore'
import { StoreUniversitySearch } from '@components/StoreUniversitySearch/StoreUniversitySearch'
import HeaderTitle from '@components/HeaderTitle/HeaderTitle'
import { LoginStore } from '@stores/loginStore'
import storeInfoStore from '@stores/storeInfoStore'

export default function EditFirstRegisterStoreInfo() {
  const navigate = useNavigate()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const { selectedImage, handleUpload, setSelectedImage } = useImageLoad()

  const storeLink = useErrorInput('')
  const school = useErrorInput('')
  const [storeName, setStoreName] = useState('')
  const [address, setAddress] = useState('')
  const [roadAddress, setRoadAddress] = useState('')
  const [latitude, setLatitude] = useState(0)
  const [longitude, setLongitude] = useState(0)
  const { kakao_token } = LoginStore((state) => state)

  const storeInfo = storeInfoStore(
    (state) => state.storeInfos[state.storeInfos.length - 1],
  )
  const storeId = storeInfo?.id

  useEffect(() => {
    const fetchStoreInfo = async () => {
      try {
        if (storeId) {
          const storeInfo = await getStoreInfo(Number(storeId))
          setStoreName(storeInfo.storeName)
          setAddress(storeInfo.storeAddress)
          school.setValue(storeInfo.storeUniversity)
          storeLink.setValue(storeInfo.storeLink)

          if (storeInfo.bannerImageUrl) {
            setSelectedImage({
              file: null,
              thumbnail: storeInfo.bannerImageUrl,
              type: 'image',
            })
          }
        }
      } catch (error) {
        console.error('가게 정보 불러오기 실패', error)
      }
    }

    fetchStoreInfo()
  }, [storeId])

  const handleNext = async () => {
    const isStoreLinkValid = storeLink.validate('링크를 입력해 주세요.')
    const isSchoolValid = school.validate('학교를 선택해 주세요.')
    if (isStoreLinkValid && isSchoolValid) {
      const storeData = {
        name: storeName,
        longitude,
        latitude,
        address,
        streetAddress: roadAddress,
        storeLink: storeLink.value,
        registration: '등록번호',
        university: school.value,
      }
      console.log(storeData)

      try {
        if (storeId) {
          await patchStore(Number(storeId), storeData, kakao_token)
          console.log('patch 성공')
          navigate('/editsuccess')
        }
      } catch (error) {
        alert('가게 수정 중 오류가 발생했습니다. 다시 시도해 주세요.')
      }
    }
  }

  const handleBack = () => {
    navigate(-1)
  }

  return (
    <StyledContainer>
      <HeaderTitle title="가게 정보 수정" $icon="back" onClick={handleBack} />
      <StyledNavImgWrapper>
        <StyledNavImg src={nav} />
        <StyledNavText>
          <div>기본 정보</div>
          <div>영업 시간</div>
          <div>메뉴 등록</div>
        </StyledNavText>
      </StyledNavImgWrapper>
      <StyledScrollableContent ref={containerRef}>
        <StyledFormContainer>
          <StyledLabel>가게 이름</StyledLabel>
          <StyledFormInput
            type="text"
            placeholder="밥이득 김치찌개"
            value={storeName}
            onChange={(e) => setStoreName(e.target.value)}
          />
          <StyledLabel>주소 입력</StyledLabel>
          <AddressSearch
            address={address}
            setAddress={setAddress}
            setRoadAddress={setRoadAddress}
            setLatitude={setLatitude}
            setLongitude={setLongitude}
          />
          <StyledInputContainer>
            <StyledLabel>가게 링크</StyledLabel>
            {storeLink.error && (
              <StyledErrorMessage>
                <img src={errorIcon} alt="Error icon" />
                {storeLink.error}
              </StyledErrorMessage>
            )}
          </StyledInputContainer>
          <StyledFormInput
            type="text"
            placeholder="링크를 입력해 주세요."
            value={storeLink.value}
            onChange={storeLink.onChange}
            className={storeLink.error ? 'invalid' : ''}
          />
          <StyledSection>
            <StyledLabel>가게 배너 사진 등록</StyledLabel>
            <StyledUploadBox onClick={() => fileInputRef.current?.click()}>
              {selectedImage ? (
                <img
                  src={selectedImage.thumbnail}
                  alt="Preview"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              ) : (
                <>
                  <StyledUploadImg src={UploadImg} alt="업로드 아이콘" />
                  <StyledUploadText>
                    갤러리에서 이미지 등록하기
                  </StyledUploadText>
                </>
              )}
            </StyledUploadBox>
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={
                handleUpload as (e: ChangeEvent<HTMLInputElement>) => void
              }
            />
          </StyledSection>
          <StoreUniversitySearch school={school} containerRef={containerRef} />
          <StyledButton onClick={handleNext}>수정하기</StyledButton>
        </StyledFormContainer>
      </StyledScrollableContent>
    </StyledContainer>
  )
}
