export interface RegisterMenuProps {
  index: number
  menu: {
    name: string
    price: number
    menuUrl: string | { menuImageUrl: string }
    isSignature: boolean
  }
  onChange: (e: React.ChangeEvent<HTMLInputElement>, index: number) => void
}
