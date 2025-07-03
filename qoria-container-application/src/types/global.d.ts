declare module 'chartComponents/ChartComponents' {
  import { ComponentType } from 'react'
  
  export interface PieChartData {
    name: string
    value: number
    color?: string
  }
  
  export interface ColumnChartData {
    name: string
    value: number
    category: string
  }
  
  export interface ChartComponentsProps {
    pieData?: PieChartData[]
    columnData?: ColumnChartData[]
    showColumnChart?: boolean
    loading?: boolean
    error?: string | null
  }
  
  const ChartComponents: ComponentType<ChartComponentsProps>
  export default ChartComponents
}