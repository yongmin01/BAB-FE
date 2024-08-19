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
  StyledInputContainer,
} from './FirstRegisterStoreInfo.style'
import UploadImg from '@assets/RegisterStoreInfo/upload.svg'
import nav from '@assets/RegisterStoreInfo/firststep.svg'
import { useNavigate } from 'react-router-dom'
import { ChangeEvent, useRef, useState, useEffect } from 'react'
import { AddressSearch } from '@components/AddressSearch/AddressSearch'
import useImageLoad from '@hooks/useImageLoad'
import { useStoreName } from '@stores/storeInfoStore'
import { StoreUniversitySearch } from '@components/StoreUniversitySearch/StoreUniversitySearch'
import storeInfoStore from '@stores/storeInfoStore'
import HeaderTitle from '@components/HeaderTitle/HeaderTitle'
import { patchStore } from '@apis/patchStore'
import { useErrorInput } from '@hooks/useErrorInput'

export default function EditFirstRegisterStoreInfo() {
  const navigate = useNavigate()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const { selectedImage, handleUpload } = useImageLoad()
  const storeInfo = storeInfoStore(
    (state) => state.storeInfos[state.storeInfos.length - 1],
  )
  const storeId = storeInfo?.id

  const { storeName, saveStoreName } = useStoreName()

  const [address, setAddress] = useState(storeInfo?.address || '')
  const [roadAddress, setRoadAddress] = useState(storeInfo?.streetAddress || '')
  const [latitude, setLatitude] = useState(storeInfo?.lat || 0)
  const [longitude, setLongitude] = useState(storeInfo?.lng || 0)
  const [storeLink, setStoreLink] = useState(storeInfo?.storeLink || '')
  const school = useErrorInput(storeInfo?.university || '')

  useEffect(() => {
    if (storeInfo) {
      saveStoreName(storeInfo.name)
    }
  }, [storeInfo, saveStoreName])

  const token = import.meta.env.VITE_APP_API_TOKEN
  const setStoreInfo = storeInfoStore((state) => state.setStoreInfo)

  const handleNext = async () => {
    const formData = {
      name: storeName,
      address,
      streetAddress: roadAddress,
      longitude,
      latitude,
      storeLink,
      university: school.value,
      registration: '등록 정보',
    }

    try {
      await patchStore(storeId!, formData, token)

      setStoreInfo({
        id: storeId!,
        name: storeName,
        lat: latitude,
        lng: longitude,
        storeType: storeInfo?.storeType || '',
        storeLink: storeLink,
        isStoreRegistered: true,
        image: selectedImage?.thumbnail || '',
        university: school.value,
        businessHours: storeInfo?.businessHours || [],
        breakTime: storeInfo?.breakTime || [],
        menu: storeInfo?.menu || [],
        address: address,
        streetAddress: roadAddress,
      })

      navigate('/registerstoresuccess')
    } catch (error) {
      alert('가게 정보 수정 중 오류가 발생했습니다. 다시 시도해 주세요.')
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
            placeholder="가게 이름을 입력하세요."
            value={storeName}
            onChange={(e) => saveStoreName(e.target.value)}
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
          </StyledInputContainer>
          <StyledFormInput
            type="text"
            placeholder="링크를 입력해 주세요."
            value={storeLink}
            onChange={(e) => setStoreLink(e.target.value)}
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
