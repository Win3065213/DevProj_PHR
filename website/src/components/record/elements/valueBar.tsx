"use client"

import { getVitalSignRanges } from "@/utils/vitalSignRanges"

interface LinerGaugeProps {
  minNormal: number
  maxNormal: number
  minMild: number
  maxMild: number
  currentValue: number
  unit: string
  minPossible: number
  maxPossible: number
  title?: string
  description?: string
  height?: number
  barThickness?: number
}

export function ValueBar({
  minNormal,
  maxNormal,
  minMild,
  maxMild,
  currentValue,
  unit,
  minPossible,
  maxPossible,
  title,
  description,
  height = 60,
  barThickness = 4,
}: LinerGaugeProps) {

  // Calculate the total range
  const totalRange = maxPossible - minPossible

  // Calculate positions as percentages
  const minMildPos = ((minMild - minPossible) / totalRange) * 100
  const minNormalPos = ((minNormal - minPossible) / totalRange) * 100
  const maxNormalPos = ((maxNormal - minPossible) / totalRange) * 100
  const maxMildPos = ((maxMild - minPossible) / totalRange) * 100
  const currentValuePos = ((currentValue - minPossible) / totalRange) * 100

  // Ensure the current value position is within bounds (0-100%)
  const boundedCurrentValuePos = Math.max(0, Math.min(100, currentValuePos))

  // Determine the severity level
  const isNormal = currentValue >= minNormal && currentValue <= maxNormal
  const isMild =
    (currentValue >= minMild && currentValue < minNormal) || (currentValue > maxNormal && currentValue <= maxMild)
  const isSevere = currentValue < minMild || currentValue > maxMild

  // Get color based on severity
  const getSeverityTextColor = () => {
    if (isNormal) return "text-green-600"
    if (isMild) return "text-amber-500"
    return "text-destructive"
  }

  const getSeverityBgColor = () => {
    if (isNormal) return "bg-green-600 border-green-600"
    if (isMild) return "bg-amber-500 border-amber-500"
    return "bg-destructive border-destructive"
  }

  // Format numbers to be more readable
  const formatNumber = (num: number) => {
    return num.toLocaleString(undefined, {
      maximumFractionDigits: 2,
      minimumFractionDigits: Number.isInteger(num) ? 0 : 1,
    })
  }

  return (
    <div className="w-full px-2 md:px-4 py-4 border-2 border-slate-200 rounded-lg shadow-sm">
      {title && (
        <div className="mb-2 flex justify-between items-center">
          <h3 className="font-semibold">{title}</h3>
          <span className={`font-mono text-sm font-bold text-end ${getSeverityTextColor()}`}>
            {formatNumber(currentValue)}
            {unit} - {isNormal ? "Normal" : isMild ? "Slighly Elevated" : "Abnormal"}
          </span>
        </div>
      )}

      {description && <p className="text-xs text-muted-foreground mb-3">{description} ({unit})</p>}
      <div className="px-2">
      <div className="relative w-full sm-height" style={{ height: `${height}px` }}>
        {/* Color zones track - no white space between zones */}
        <div
          className="absolute w-full rounded-full top-7 -translate-y-1/2"
          style={{
            height: `${barThickness}px`,
            background: `linear-gradient(to right, 
              #ef4444 0%, 
              #ef4444 ${minMildPos}%, 
              #f59e0b ${minMildPos}%, 
              #f59e0b ${minNormalPos}%, 
              #16a34a ${minNormalPos}%, 
              #16a34a ${maxNormalPos}%, 
              #f59e0b ${maxNormalPos}%, 
              #f59e0b ${maxMildPos}%, 
              #ef4444 ${maxMildPos}%, 
              #ef4444 100%)`,
          }}
        ></div>

        {/* Current value indicator */}
        <div
            className={`absolute w-4 h-4 rounded-full top-7 -translate-x-1/2 -translate-y-1/2 transition-all duration-500 shadow-md ${getSeverityBgColor()}`}
            style={{ left: `${boundedCurrentValuePos}%` }}
        ></div>

        {/* Value labels */}
        <div className="absolute w-full flex -bottom-2 text-xs">
          <div className="text-red-500 font-medium text-center -translate-x-1/2">
            {formatNumber(minPossible)}
            {unit.length < 3 ? "" : <br/>}
            <span className="unit">{unit}</span>
          </div>
          <div className="absolute text-amber-500 font-medium text-center -translate-x-1/2" style={{ left: `calc(${minMildPos}%)` }}>
            {formatNumber(minMild)}
            {unit.length < 3 ? "" : <br/>}
            <span className="unit">{unit}</span>
          </div>
          <div className="absolute text-green-600 font-medium text-center -translate-x-1/2" style={{ left: `calc(${minNormalPos}%)` }}>
            {formatNumber(minNormal)}
            {unit.length < 3 ? "" : <br/>}
            <span className="unit">{unit}</span>
          </div>
          <div className="absolute text-green-600 font-medium text-center -translate-x-1/2" style={{ left: `calc(${maxNormalPos}%)` }}>
            {formatNumber(maxNormal)}
            {unit.length < 3 ? "" : <br/>}
            <span className="unit">{unit}</span>
          </div>
          <div className="absolute text-amber-500 font-medium text-center -translate-x-1/2" style={{ left: `calc(${maxMildPos}%)` }}>
            {formatNumber(maxMild)}
            {unit.length < 3 ? "" : <br/>}
            <span className="unit">{unit}</span>
          </div>
          <div className="text-red-500 ml-auto font-medium text-center translate-x-1/2">
            {formatNumber(maxPossible)}
            {unit.length < 3 ? "" : <br/>}
            <span className="unit">{unit}</span>
          </div>
        </div>

        {/* Current value display */}
        <div
          className={`absolute text-sm font-bold transform -translate-x-1/2 transition-all duration-500 top-0 ${getSeverityTextColor()}`}
          style={{ left: `${boundedCurrentValuePos}%` }}
        >
          {formatNumber(currentValue)}
          {unit}
          {}
        </div>
      </div>
      </div>
    </div>
  )
}

export interface LabValueBarProps {
  type: string
  value: number
  height?: number
  barThickness?: number
}

export function LabValueBar({ type, value, height, barThickness }: LabValueBarProps) {
  const ranges = getVitalSignRanges(type)

  return (
    <ValueBar
      currentValue={value}
      minNormal={ranges.minNormal}
      maxNormal={ranges.maxNormal}
      minMild={ranges.minMild}
      maxMild={ranges.maxMild}
      minPossible={ranges.minPossible}
      maxPossible={ranges.maxPossible}
      unit={ranges.unit}
      title={ranges.title}
      description={ranges.description}
      height={ranges?.height}
      barThickness={barThickness}
    />
  )
}