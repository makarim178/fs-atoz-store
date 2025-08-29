import type { ReactNode } from "react"
import type { ProductSearchCriteria } from "./product"

type OnlyChildrenPropsType = {
    children: ReactNode
}

type RangeInputComponentPropsType = {
  id: string 
  value: number
  maxValue: number
  title: string
  getMaxValue?: boolean = false
  getValue: (changedValue: number) => void
}


type ProductSearchPropsType = {
  mutateQuery: (query: QueryParamsType) => void
}

type DoubleSliderPropsType = {
  mutateQuery: ( query: QueryParamsType) => void
}

type QueryParamsType = {
  search?: string
  minPrice?: number
  maxPrice?: number
}