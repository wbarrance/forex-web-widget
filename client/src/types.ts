export type Rates = {
  GBP?: number
  EUR?: number
  JPY?: number
  CHF?: number
  CAD?: number
  AUD?: number
  CNY?: number
  ZAR?: number
  RUB?: number
  BRL?: number
  HKD?: number
  MXN?: number
}

export type Currency = {
  success: boolean
  timestamp: number
  base: string
  date: string
  rates: Rates
}
