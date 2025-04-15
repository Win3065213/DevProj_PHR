export interface VitalSignRanges {
  minNormal: number
  maxNormal: number
  minMild: number
  maxMild: number
  minPossible: number
  maxPossible: number
  unit: string
  title: string
  description: string
  height?: number
}

export function getVitalSignRanges(type: string): VitalSignRanges {
  switch (type) {
    case "temperature":
      return {
        minNormal: 36.5,
        maxNormal: 37.5,
        minMild: 35.0,
        maxMild: 38.5,
        minPossible: 34.0,
        maxPossible: 42.0,
        unit: "°C",
        title: "Body Temperature",
        description: "Core body temperature measurement",
        height: 45
      }
    case "heart_rate":
      return {
        minNormal: 60,
        maxNormal: 100,
        minMild: 50,
        maxMild: 120,
        minPossible: 30,
        maxPossible: 220,
        unit: "bpm",
        title: "Heart Rate",
        description: "Beats per minute",
      }
    case "systolic_bp":
      return {
        minNormal: 90,
        maxNormal: 120,
        minMild: 80,
        maxMild: 140,
        minPossible: 60,
        maxPossible: 220,
        unit: "mmHg",
        title: "Blood Pressure (Systolic)",
        description: "Systolic blood pressure",
      }
      case "diastolic_bp":
        return {
          minNormal: 60,
          maxNormal: 80,
          minMild: 50,
          maxMild: 90,
          minPossible: 40,
          maxPossible: 120,
          unit: "mmHg",
          title: "Blood Pressure (Diastolic)",
          description: "Diastolic blood pressure",
        }
    default:
      throw new Error(`Unknown vital sign type: ${type}`)
  }
}
