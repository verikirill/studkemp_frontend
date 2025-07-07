import { useEffect, useState } from 'react'

const loadingTexts = [
  'Анализируем данные...',
  'Обрабатываем информацию...',
  'Генерируем отчет...',
  'Применяем машинное обучение...',
  'Строим графики...',
  'Выполняем расчеты...',
  'Создаем визуализацию...',
  'Подготавливаем результаты...',
  'Обучаем нейронную сеть...',
  'Извлекаем инсайты...',
  'Формируем выводы...',
  'Проверяем точность...',
  'Оптимизируем алгоритмы...',
  'Сопоставляем данные...',
  'Выявляем закономерности...',
]

export function useLoading(isLoading: boolean, interval: number = 2000) {
  const [currentText, setCurrentText] = useState(loadingTexts[0])
  const [textIndex, setTextIndex] = useState(0)

  useEffect(() => {
    if (!isLoading) return

    const updateText = () => {
      setTextIndex(prev => {
        const newIndex = (prev + 1) % loadingTexts.length
        setCurrentText(loadingTexts[newIndex])
        return newIndex
      })
    }

    // Сразу показываем первый текст
    setCurrentText(loadingTexts[0])
    setTextIndex(0)

    // Запускаем интервал смены текста
    const intervalId = setInterval(updateText, interval)

    return () => clearInterval(intervalId)
  }, [isLoading, interval])

  const getRandomText = () => {
    const randomIndex = Math.floor(Math.random() * loadingTexts.length)
    return loadingTexts[randomIndex]
  }

  return {
    currentText,
    textIndex,
    getRandomText,
    totalTexts: loadingTexts.length,
  }
} 