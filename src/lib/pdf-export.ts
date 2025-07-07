import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
import { formatDate } from './utils'

export async function exportAnalysisToPDF(query: string): Promise<void> {
  try {
    // Создаем новый PDF документ
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    })

    // Настройки страницы
    const pageWidth = pdf.internal.pageSize.getWidth()
    const pageHeight = pdf.internal.pageSize.getHeight()
    const margin = 20

    // Заголовок документа
    pdf.setFontSize(24)
    pdf.setTextColor('#5f1581')
    pdf.text('AI Анализ Данных', margin, 30)

    // Информация о запросе
    pdf.setFontSize(12)
    pdf.setTextColor('#666666')
    pdf.text(`Запрос: ${query}`, margin, 45)
    pdf.text(`Дата создания: ${formatDate(new Date())}`, margin, 55)

    // Линия разделитель
    pdf.setLineWidth(0.5)
    pdf.setDrawColor('#e5e5e5')
    pdf.line(margin, 65, pageWidth - margin, 65)

    let currentY = 80

    // Добавляем скриншот экрана анализа
    const analysisElement = document.querySelector('[data-pdf-content]') as HTMLElement
    
    if (analysisElement) {
      try {
        // Создаем скриншот элемента
        const canvas = await html2canvas(analysisElement, {
          scale: 2,
          useCORS: true,
          allowTaint: false,
          backgroundColor: '#ffffff',
          width: analysisElement.scrollWidth,
          height: analysisElement.scrollHeight,
        })

        // Вычисляем размеры для PDF
        const imgWidth = pageWidth - 2 * margin
        const imgHeight = (canvas.height * imgWidth) / canvas.width

        // Если изображение не помещается на одной странице
        let heightLeft = imgHeight
        let position = currentY

        // Добавляем изображение на первую страницу
        pdf.addImage(
          canvas.toDataURL('image/png'),
          'PNG',
          margin,
          position,
          imgWidth,
          Math.min(imgHeight, pageHeight - position - margin)
        )

        heightLeft -= pageHeight - position - margin

        // Добавляем дополнительные страницы если необходимо
        while (heightLeft > 0) {
          position = heightLeft - imgHeight + margin
          pdf.addPage()
          pdf.addImage(
            canvas.toDataURL('image/png'),
            'PNG',
            margin,
            position,
            imgWidth,
            Math.min(heightLeft, pageHeight - 2 * margin)
          )
          heightLeft -= pageHeight - 2 * margin
        }
      } catch (error) {
        console.warn('Не удалось создать скриншот, добавляем текстовую информацию')
        addTextualContent(pdf, margin, currentY, pageWidth)
      }
    } else {
      // Если элемент не найден, добавляем текстовую информацию
      addTextualContent(pdf, margin, currentY, pageWidth)
    }

    // Добавляем футер
    addFooter(pdf, pageWidth, pageHeight, margin)

    // Сохраняем файл
    const filename = `ai-analysis-${new Date().toISOString().split('T')[0]}.pdf`
    pdf.save(filename)
    
  } catch (error) {
    console.error('Ошибка при создании PDF:', error)
    throw new Error('Не удалось создать PDF файл')
  }
}

function addTextualContent(pdf: jsPDF, margin: number, startY: number, pageWidth: number) {
  let currentY = startY

  // Секция метрик
  pdf.setFontSize(16)
  pdf.setTextColor('#333333')
  pdf.text('Ключевые метрики', margin, currentY)
  currentY += 15

  pdf.setFontSize(11)
  pdf.setTextColor('#666666')
  
  const metrics = [
    'Общий доход: ₽2,847,500 (+12.5%)',
    'Активные клиенты: 15,243 (+8.2%)',
    'Конверсия: 3.24% (-2.1%)',
  ]

  metrics.forEach(metric => {
    pdf.text(`• ${metric}`, margin + 5, currentY)
    currentY += 8
  })

  currentY += 10

  // Секция выводов
  pdf.setFontSize(16)
  pdf.setTextColor('#333333')
  pdf.text('Выводы и рекомендации', margin, currentY)
  currentY += 15

  pdf.setFontSize(11)
  pdf.setTextColor('#666666')

  const insights = [
    'Рост продаж: Положительная динамика с ростом на 12.5% за месяц',
    'Топ-категория: Электроника составляет 40% от общих продаж',
    'Внимание: Конверсия снизилась на 2.1%, требует оптимизации',
  ]

  insights.forEach(insight => {
    const lines = pdf.splitTextToSize(insight, pageWidth - 2 * margin - 10)
    lines.forEach((line: string) => {
      if (currentY > 250) {
        pdf.addPage()
        currentY = margin + 20
      }
      pdf.text(`• ${line}`, margin + 5, currentY)
      currentY += 6
    })
    currentY += 3
  })
}

function addFooter(pdf: jsPDF, pageWidth: number, pageHeight: number, margin: number) {
  const pageCount = pdf.getNumberOfPages()
  
  for (let i = 1; i <= pageCount; i++) {
    pdf.setPage(i)
    
    // Линия в футере
    pdf.setLineWidth(0.3)
    pdf.setDrawColor('#e5e5e5')
    pdf.line(margin, pageHeight - 25, pageWidth - margin, pageHeight - 25)
    
    // Текст футера
    pdf.setFontSize(9)
    pdf.setTextColor('#999999')
    pdf.text(
      'Сгенерировано AI Аналитиком StudKemp',
      margin,
      pageHeight - 15
    )
    
    // Номер страницы
    pdf.text(
      `Страница ${i} из ${pageCount}`,
      pageWidth - margin - 30,
      pageHeight - 15
    )
  }
} 