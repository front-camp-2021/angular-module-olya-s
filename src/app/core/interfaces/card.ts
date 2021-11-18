export interface Card {
  id: string,
  images: string[],
  title: string,
  rating: number,
  price: number,
  category: string,
  brand: string,
  inWishlist: boolean,
  quantity: number
}
