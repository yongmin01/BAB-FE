type MenuUrl = string | { menuImageUrl: string }

export interface Menu {
  name: string
  price: number
  menuUrl: MenuUrl
  isSignature: boolean
}
