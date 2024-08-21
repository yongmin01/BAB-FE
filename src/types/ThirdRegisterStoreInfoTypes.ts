type MenuUrl = string | { menuImageUrl: string }

export interface Menu {
  id?: number
  name: string
  price: number
  menuUrl: MenuUrl
  isSignature: boolean
}
