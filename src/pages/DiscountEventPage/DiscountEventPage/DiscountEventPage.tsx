import React, { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { format, parseISO } from 'date-fns'
import {
  PageContainer,
  EventForm,
  Label,
  SpanLabel,
  MenuTable,
  MenuRow,
  MenuLabel,
  PriceInput,
  SubmitButton,
  DateDataWrapper,
  DateInputWrapper,
  MenuTableHeader,
  MenuTableBody,
  CheckboxWrapper,
  ErrorMessage,
  CustomDatePickerWrapper,
} from '@pages/DiscountEventPage/DiscountEventPage/DiscountEventPage.style'
import { useNavigate } from 'react-router-dom'
import storeInfoStore, { MenuItem } from '@stores/storeInfoStore'
import discountEventStore from '@stores/discountEventStore'
<<<<<<< HEAD
import { fetchMenus } from '@apis/Discount/fetchMenu'
=======
import HeaderTitle from '@components/HeaderTitle/HeaderTitle'
>>>>>>> develop

export default function DiscountEventPage() {
  const navigate = useNavigate()
  const {
    setEventPeriod,
    setDiscountChecked,
    setDiscountPrice,
    initializeDiscounts,
    currentEvent,
  } = discountEventStore()
  const { storeInfos, updateMenuDiscount } = storeInfoStore()
  const [menuList, setMenuList] = useState<MenuItem[]>([])

  const [errorMessages, setErrorMessages] = useState<{
    periodError: string
    discountError: string
  }>({
    periodError: '',
    discountError: '',
  })

  /*
  useEffect(() => {
    initializeDiscounts(storeInfos[0].menu)
  }, [storeInfos[0].menu, initializeDiscounts])
  */
  useEffect(() => {
    async function loadMenus() {
      if (storeInfos.length > 0) {
        const menus = await fetchMenus(storeInfos[0].id)
        setMenuList(menus)
        initializeDiscounts(menus)
        console.log(
          'Initialized discounts:',
          discountEventStore.getState().currentEvent.discounts,
        )
      }
    }

    loadMenus()
  }, [storeInfos, initializeDiscounts])

  const handleNextClick = () => {
    // 유효성 검사 로직
    let periodError = ''
    let discountError = ''
    let hasError = false

    if (!currentEvent.startDate || !currentEvent.endDate) {
      periodError = '행사 기간을 입력하세요.'
      hasError = true
    }

    if (
      currentEvent.startDate &&
      currentEvent.endDate &&
      currentEvent.startDate > currentEvent.endDate
    ) {
      periodError = '시작 날짜는 종료 날짜보다 이전이어야 합니다.'
      hasError = true
    }

    // 유효하지 않은 할인 항목이 있는지 검사
    // 할인 항목 검사 로직
    const hasValidDiscount = currentEvent.discounts.some(
      (discount) => discount.isChecked && discount.discountPrice > 0,
    )

    if (!hasValidDiscount) {
      discountError = '적용할 메뉴를 선택하고 가격을 입력해주세요.'
      hasError = true
    } else {
      // 잘못된 할인 항목이 있는지 확인
      const invalidDiscount = currentEvent.discounts.some(
        (discount) =>
          (discount.isChecked === true && discount.discountPrice <= 0) ||
          (discount.isChecked === false && discount.discountPrice > 0),
      )

      if (invalidDiscount) {
        discountError = '적용할 메뉴를 선택하고 가격을 입력해주세요.'
        hasError = true
      }
    }

    setErrorMessages({
      periodError,
      discountError,
    })

    if (!hasError) {
      currentEvent.discounts.forEach((discount) => {
        if (discount.isChecked && discount.discountPrice !== null) {
          updateMenuDiscount(
            storeInfos[0].id,
            discount.menuId,
            discount.discountPrice,
            discount.isChecked,
          )
        }
      })
      navigate('/discount-eventTwo')
    }
  }

  const handleStartDateChange = (date: Date | null) => {
    const formattedDate = date ? format(date, 'yyyy-MM-dd') : ''
    setEventPeriod(formattedDate, currentEvent.endDate)
    setErrorMessages((prev) => ({
      ...prev,
      periodError:
        currentEvent.endDate && formattedDate > currentEvent.endDate
          ? '시작 날짜는 종료 날짜보다 이전이어야 합니다.'
          : '',
    }))
  }

  const handleEndDateChange = (date: Date | null) => {
    const formattedDate = date ? format(date, 'yyyy-MM-dd') : ''
    setEventPeriod(currentEvent.startDate, formattedDate)
    setErrorMessages((prev) => ({
      ...prev,
      periodError:
        currentEvent.startDate && formattedDate < currentEvent.startDate
          ? '종료 날짜는 시작 날짜보다 이후이어야 합니다.'
          : '',
    }))
  }

  const handleCheckboxClick = (id: number, checked: boolean) => {
    const discount = currentEvent.discounts.find((d) => d.menuId === id)

    if (!discount) {
      console.error(`Discount not found for menuId: ${id}`)
      return
    }

    setDiscountChecked(id, checked)

    const isValidDiscount = checked && discount.discountPrice > 0

    setErrorMessages((prev) => ({
      ...prev,
      discountError: isValidDiscount
        ? ''
        : '적용할 메뉴를 선택하고 가격을 입력해주세요.',
    }))
  }

  const handlePriceChange = (id: number, price: number) => {
    setDiscountPrice(id, price)
    const discount = currentEvent.discounts.find((d) => d.menuId === id)

    if (!discount) {
      console.error(`Discount not found for menuId: ${id}`)
      return
    }

    setDiscountChecked(id, price >= 0)

    const isValidDiscount = price >= 0 && discount.isChecked

    setErrorMessages((prev) => ({
      ...prev,
      discountError: isValidDiscount
        ? ''
        : '적용할 메뉴를 선택하고 가격을 입력해주세요.',
    }))
  }

  return (
    <>
      <PageContainer>
        <HeaderTitle
          title="할인 행사 진행하기"
          icon="back"
          onClick={() => navigate('/manager')}
        />
        <EventForm>
          <DateDataWrapper>
            <Label>행사 기간 선택</Label>
            <DateInputWrapper>
              <CustomDatePickerWrapper>
                <DatePicker
                  selected={
                    currentEvent.startDate
                      ? parseISO(currentEvent.startDate)
                      : null
                  }
                  onChange={handleStartDateChange}
                  dateFormat="yyyy-MM-dd"
                  placeholderText="연도.월.일"
                />
              </CustomDatePickerWrapper>
              <SpanLabel>부터</SpanLabel>
              <CustomDatePickerWrapper>
                <DatePicker
                  selected={
                    currentEvent.endDate ? parseISO(currentEvent.endDate) : null
                  }
                  onChange={handleEndDateChange}
                  dateFormat="yyyy-MM-dd"
                  placeholderText="연도.월.일"
                />
              </CustomDatePickerWrapper>
              <SpanLabel>까지</SpanLabel>
            </DateInputWrapper>
            {errorMessages.periodError && (
              <ErrorMessage>{errorMessages.periodError}</ErrorMessage>
            )}
          </DateDataWrapper>
          <Label>행사 적용 메뉴</Label>
          <MenuTable>
            <MenuTableHeader>
              <span>메뉴</span>
              <span>할인 가격</span>
              <span>적용</span>
            </MenuTableHeader>
            <MenuTableBody>
              {menuList.map((item: MenuItem) => (
                <MenuRow key={item.menuId}>
                  <MenuLabel>{item.name}</MenuLabel>
                  <PriceInput
                    type="text"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      handlePriceChange(
                        item.menuId,
                        Number(e.target.value) || 0,
                      )
                    }}
                  />
                  <CheckboxWrapper>
                    <input
                      type="checkbox"
                      id={`menu${item.menuId}`}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        handleCheckboxClick(item.menuId, e.target.checked)
                      }}
                    />
                    <label htmlFor={`menu${item.menuId}`}></label>
                  </CheckboxWrapper>
                </MenuRow>
              ))}
            </MenuTableBody>
          </MenuTable>
          {errorMessages.discountError && (
            <ErrorMessage>{errorMessages.discountError}</ErrorMessage>
          )}
        </EventForm>
      </PageContainer>
      <SubmitButton onClick={handleNextClick}>다음</SubmitButton>
    </>
  )
}
