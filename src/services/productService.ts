import myData from '../items.json'
import type { Item } from '@/types/types'

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function fetchProducts(): Promise<Item[]> {
  await delay(1500)
  return myData as Item[]
}
