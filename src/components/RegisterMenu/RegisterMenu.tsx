import React from 'react'
import useImageUpload from '@hooks/useImageUpload'
import Camera from '@assets/RegisterStoreInfo/camera.svg'
import {
  StyledCheckBox,
  StyledCheckboxContainer,
  StyledMenuInput,
  StyledMenuInputContainer,
  StyledMenuLabel,
  StyledMenuRow,
  StyledPriceDiv,
  StyledUploadBox,
  StyledUploadImg,
} from './RegisterMenu.style'
import { RegisterMenuProps } from 'src/types/RegisterMenuTypes'
import { postUploadMenuImage } from '@apis/postUploadMenuImage'
import { LoginStore } from '@stores/loginStore'

export function RegisterMenu({ index, menu, onChange }: RegisterMenuProps) {
  const { kakao_token } = LoginStore((state) => state)

  const { selectedImage, handleImgUpload, openCamera, fileInputRef } =
    useImageUpload()

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    handleImgUpload(event)

    if (event.target.files && event.target.files[0]) {
      try {
        const imageUrl = await postUploadMenuImage(
          event.target.files[0],
          kakao_token,
        )

        const customEvent = {
          target: {
            name: 'menuUrl',
            value: imageUrl,
          },
        } as React.ChangeEvent<HTMLInputElement>
        console.log(imageUrl)
        onChange(customEvent, index)
      } catch (error) {
        console.error('이미지 업로드 실패:', error)
      }
    }
  }

  const handleSignatureChange = () => {
    const customEvent = {
      target: {
        name: 'isSignature',
        value: !menu.isSignature,
      },
    } as unknown as React.ChangeEvent<HTMLInputElement>
    onChange(customEvent, index)
  }

  return (
    <>
      <StyledMenuRow>
        <StyledUploadBox onClick={openCamera}>
          <StyledUploadImg
            src={
              selectedImage
                ? URL.createObjectURL(selectedImage)
                : typeof menu.menuUrl === 'string'
                  ? menu.menuUrl
                  : Camera
            }
            alt={selectedImage ? '미리보기' : '업로드 아이콘'}
            $isthumbnail={selectedImage ? 1 : menu.menuUrl ? 1 : 0}
          />
        </StyledUploadBox>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handleUpload}
        />
        <StyledMenuInputContainer>
          <StyledMenuInput
            type="text"
            name="name"
            placeholder="메뉴 이름을 입력하세요."
            value={menu.name}
            onChange={(e) => onChange(e, index)}
          />
          <StyledPriceDiv>
            <StyledMenuInput
              type="text"
              name="price"
              placeholder="가격을 입력하세요."
              value={menu.price.toString()}
              onChange={(e) => onChange(e, index)}
            />
            <span>₩</span>
          </StyledPriceDiv>
        </StyledMenuInputContainer>
      </StyledMenuRow>
      <StyledCheckboxContainer>
        <StyledMenuLabel>
          <StyledCheckBox
            checked={menu.isSignature}
            onChange={handleSignatureChange}
          />
          대표 메뉴로 등록하기
        </StyledMenuLabel>
      </StyledCheckboxContainer>
    </>
  )
}
