import { SimpleSelect } from '@/types/form/SimpleSelect'

export const generateYears = (startYear: number, endYear: number): SimpleSelect[] => {
  const years = []
  for (let year = startYear; year <= endYear; year++) {
    years.push({ id: year, name: `${year}年` })
  }
  return years
}

export const generateMonths = (): SimpleSelect[] => {
  return Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    name: `${i + 1}月`,
  }))
}

export const generateDays = (): SimpleSelect[] => {
  return Array.from({ length: 31 }, (_, i) => ({
    id: i + 1,
    name: `${i + 1}日`,
  }))
}
