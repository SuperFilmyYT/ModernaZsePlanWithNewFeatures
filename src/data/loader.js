/**
 * Loader dla danych planu lekcji
 * Ładuje plan_data.json i udostępnia go aplikacji
 */

import planDataImport from './plan_data.json?raw'

let parsedData = null

export function loadPlanData() {
  if (!parsedData) {
    try {
      parsedData = JSON.parse(planDataImport)
    } catch (e) {
      console.error('Błąd wczytywania danych planu:', e)
      return null
    }
  }
  return parsedData
}

export function getClasses() {
  const data = loadPlanData()
  return data?.classes || []
}

export function getTeachers() {
  const data = loadPlanData()
  return data?.teachers || []
}

export function getRooms() {
  const data = loadPlanData()
  return data?.rooms || []
}

export function getSchedule(classId) {
  const data = loadPlanData()
  return data?.schedules?.[classId] || null
}

export function getAllSchedules() {
  const data = loadPlanData()
  return data?.schedules || {}
}
