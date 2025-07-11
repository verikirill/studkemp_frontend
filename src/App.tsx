import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles } from 'lucide-react'

import { AnimatedBackground } from '@/components/animated-background'
import { ChatInterface } from '@/components/chat-interface'
import { LoadingScreen } from '@/components/loading-screen'
import { AnalysisScreen } from '@/components/analysis-screen'
import { RotateScreen } from '@/components/rotate-screen'

import { generateId, sleep } from '@/lib/utils'
import { exportAnalysisToPDF } from '@/lib/pdf-export'
import { useTheme } from '@/hooks/use-theme'
import { searchCompanies, analyzeCompany, getNewsByOkved, type AnalysisData } from '@/lib/api'

type AppState = 'chat' | 'loading' | 'analysis'

interface Message {
  id: string
  content: string
  role: 'user' | 'assistant'
  timestamp: Date
}

export default function App() {
  const [appState, setAppState] = useState<AppState>('chat')
  const [messages, setMessages] = useState<Message[]>([])
  const [currentQuery, setCurrentQuery] = useState('')
  const [analysisData, setAnalysisData] = useState<AnalysisData | null>(null)
  const [error, setError] = useState<string>('')
  
  // Принудительно устанавливаем темную тему
  useTheme()

  const handleChatSubmit = async (message: string) => {
    const userMessage: Message = {
      id: generateId(),
      content: message,
      role: 'user',
      timestamp: new Date(),
    }
    
    setMessages(prev => [...prev, userMessage])
    setCurrentQuery(message)
    setError('')
    
    // Переходим в состояние загрузки
    setAppState('loading')
    
    try {
      // Поиск компаний
      const searchResults = await searchCompanies(message)
      
      if (searchResults.data && searchResults.data.length > 0) {
        // Берем первую компанию из результатов
        const firstCompany = searchResults.data[0]
        
        // Анализируем компанию
        const analysis = await analyzeCompany(firstCompany.tin)
        
        // Получаем дополнительные новости (если есть код активности)
        let enhancedAnalysis = analysis
        if (firstCompany.activity_code_main) {
          try {
            const additionalNews = await getNewsByOkved(firstCompany.activity_code_main)
            enhancedAnalysis = {
              ...analysis,
              industry_news: {
                ...analysis.industry_news,
                news: [...analysis.industry_news.news, ...additionalNews.news],
                count: analysis.industry_news.count + additionalNews.count,
                total_available: analysis.industry_news.total_available + additionalNews.total_available
              }
            }
          } catch (newsError) {
            console.warn('Не удалось получить дополнительные новости:', newsError)
          }
        }
        
        setAnalysisData(enhancedAnalysis)
        
        // Добавляем ответ ассистента
        const assistantMessage: Message = {
          id: generateId(),
          content: `Найдена компания "${enhancedAnalysis.company_info.name}" в регионе ${enhancedAnalysis.company_info.region}. Анализ данных завершен. Результаты готовы для просмотра.`,
          role: 'assistant',
          timestamp: new Date(),
        }
        
        setMessages(prev => [...prev, assistantMessage])
        
        // Переходим к экрану анализа
        setAppState('analysis')
      } else {
        // Если компании не найдены
        const assistantMessage: Message = {
          id: generateId(),
          content: 'К сожалению, по вашему запросу компании не найдены. Попробуйте изменить запрос или использовать более конкретные термины.',
          role: 'assistant',
          timestamp: new Date(),
        }
        
        setMessages(prev => [...prev, assistantMessage])
        setAppState('chat')
      }
    } catch (error) {
      console.error('Ошибка обработки запроса:', error)
      setError(error instanceof Error ? error.message : 'Произошла неизвестная ошибка')
      
      const assistantMessage: Message = {
        id: generateId(),
        content: 'Произошла ошибка при обработке запроса. Проверьте подключение к серверу и попробуйте еще раз.',
        role: 'assistant',
        timestamp: new Date(),
      }
      
      setMessages(prev => [...prev, assistantMessage])
      setAppState('chat')
    }
  }

  const handleBackToChat = () => {
    setMessages([])
    setCurrentQuery('')
    setAnalysisData(null)
    setError('')
    setAppState('chat')
  }



  const handleExportPDF = async () => {
    try {
      await exportAnalysisToPDF(currentQuery)
    } catch (error) {
      console.error('Ошибка экспорта PDF:', error)
      alert('Произошла ошибка при создании PDF файла')
    }
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Экран поворота устройства */}
      <RotateScreen />
      
      {/* Анимированный фон */}
      <AnimatedBackground />
      
      {/* Верхняя панель */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-20 flex items-center justify-between p-6"
      >
        <motion.div 
          className="flex items-center space-x-2"
          whileHover={{ scale: 1.02 }}
        >
          <div className="w-8 h-8 bg-primary-purple rounded-lg flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-gradient">Miquella</span>
        </motion.div>
        
        <div className="flex items-center space-x-4">
        </div>
      </motion.header>

      {/* Основной контент */}
      <main className="relative z-10 flex items-center justify-center min-h-[calc(100vh-100px)] px-4">
        <AnimatePresence mode="wait">
          {appState === 'chat' && (
            <motion.div
              key="chat"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              <ChatInterface
                onSubmit={handleChatSubmit}
                isLoading={false}
                messages={messages}
                error={error}
              />
            </motion.div>
          )}

          {appState === 'loading' && (
            <LoadingScreen isVisible={true} />
          )}

          {appState === 'analysis' && (
            <motion.div
              key="analysis"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
              className="w-full"
              data-pdf-content
            >
              <AnalysisScreen
                onBack={handleBackToChat}
                onExportPDF={handleExportPDF}
                query={currentQuery}
                analysisData={analysisData}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Футер */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="relative z-20 text-center p-6"
      >
      </motion.footer>
    </div>
  )
} 