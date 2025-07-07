import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles } from 'lucide-react'

import { AnimatedBackground } from '@/components/animated-background'
import { ChatInterface } from '@/components/chat-interface'
import { LoadingScreen } from '@/components/loading-screen'
import { AnalysisScreen } from '@/components/analysis-screen'

import { generateId, sleep } from '@/lib/utils'
import { exportAnalysisToPDF } from '@/lib/pdf-export'
import { useTheme } from '@/hooks/use-theme'

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
    
    // Переходим в состояние загрузки
    setAppState('loading')
    
    // Имитируем обработку запроса (3-5 секунд)
    const loadingTime = 3000 + Math.random() * 2000
    await sleep(loadingTime)
    
    // Добавляем ответ ассистента
    const assistantMessage: Message = {
      id: generateId(),
      content: 'Анализ данных завершен. Результаты готовы для просмотра.',
      role: 'assistant',
      timestamp: new Date(),
    }
    
    setMessages(prev => [...prev, assistantMessage])
    
    // Переходим к экрану анализа
    setAppState('analysis')
  }

  const handleBackToChat = () => {
    setAppState('chat')
  }

  const handleNewQuery = () => {
    setMessages([])
    setCurrentQuery('')
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
          <span className="text-xl font-bold text-gradient">StudKemp AI</span>
        </motion.div>
        
        <div className="flex items-center space-x-4">
          {appState === 'analysis' && (
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleNewQuery}
              className="px-4 py-2 text-sm bg-muted/50 hover:bg-muted rounded-xl transition-colors"
            >
              Новый запрос
            </motion.button>
          )}
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