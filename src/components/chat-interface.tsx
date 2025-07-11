import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, Bot, User } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Message {
  id: string
  content: string
  role: 'user' | 'assistant'
  timestamp: Date
}

interface ChatInterfaceProps {
  onSubmit: (message: string) => void
  isLoading: boolean
  messages: Message[]
  error?: string
}

export function ChatInterface({ onSubmit, isLoading, messages, error }: ChatInterfaceProps) {
  const [input, setInput] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return
    
    onSubmit(input.trim())
    setInput('')
  }

  return (
    <div className="relative z-10 w-full max-w-4xl mx-auto px-4">
      {/* Сообщения чата */}
      {messages.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 space-y-4 max-h-96 overflow-y-auto"
        >
          {messages.map((message, index) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, x: message.role === 'user' ? 20 : -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={cn(
                "flex items-start space-x-3",
                message.role === 'user' ? 'justify-end' : 'justify-start'
              )}
            >
              {message.role === 'assistant' && (
                <div className="flex-shrink-0 w-8 h-8 bg-primary-purple rounded-full flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
              )}
              
              <div
                className={cn(
                  "max-w-xs lg:max-w-md px-4 py-2 rounded-2xl glass-effect",
                  message.role === 'user'
                    ? 'bg-primary-purple text-white'
                    : 'bg-card text-card-foreground'
                )}
              >
                <p className="text-sm">{message.content}</p>
                <p className="text-xs opacity-70 mt-1">
                  {message.timestamp.toLocaleTimeString('ru-RU', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>
              
              {message.role === 'user' && (
                <div className="flex-shrink-0 w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-muted-foreground" />
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Основная форма чата */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center space-y-8"
      >
        {messages.length === 0 && (
          <>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="space-y-4"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-purple/10 rounded-full mb-4">
                <Bot className="w-8 h-8 text-primary-purple" />
              </div>
              
              <h1 className="text-4xl font-bold text-gradient">
                Miquella
              </h1>
              
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Ваш AI-консультант по финансовому анализу компаний 
                и инвестиционным решениям
              </p>
            </motion.div>

            {/* Примеры запросов */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="flex flex-wrap justify-center gap-3"
            >
              {[
                'Какая компания будет прибыльной в короткие сроки',
                'Что ты думаешь о компании',
                'Стоит ли инвестировать в ',
              ].map((example, index) => (
                <motion.button
                  key={example}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setInput(example)}
                  className="px-4 py-2 text-sm bg-muted/50 hover:bg-muted rounded-full transition-colors"
                >
                  {example}
                </motion.button>
              ))}
            </motion.div>
          </>
        )}

        {/* Отображение ошибки */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto mb-4"
          >
            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500">
              <p className="text-sm">{error}</p>
            </div>
          </motion.div>
        )}

        {/* Поле ввода */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: messages.length === 0 ? 0.8 : 0 }}
          className="relative max-w-2xl mx-auto"
        >
          <div className="relative flex items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isLoading}
              placeholder="Задайте вопрос о компании или инвестициях..."
              className={cn(
                "w-full px-6 py-4 pr-14 rounded-2xl glass-effect",
                "bg-card text-card-foreground placeholder:text-muted-foreground",
                "border border-border focus:border-primary-purple/50",
                "focus:outline-none focus:ring-2 focus:ring-primary-purple/20",
                "transition-all duration-300",
                isLoading && "opacity-50 cursor-not-allowed"
              )}
            />
            
            <motion.button
              type="submit"
              disabled={!input.trim() || isLoading}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={cn(
                "absolute right-2 p-2 rounded-xl transition-all duration-300",
                "disabled:opacity-50 disabled:cursor-not-allowed",
                input.trim() && !isLoading
                  ? "bg-primary-purple text-white hover:bg-primary-purple/90"
                  : "bg-muted text-muted-foreground"
              )}
            >
              <Send className="w-5 h-5" />
            </motion.button>
          </div>
          
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute -bottom-8 left-1/2 transform -translate-x-1/2"
            >
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <div className="flex space-x-1">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className="w-1 h-1 bg-primary-purple rounded-full"
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.5, 1, 0.5],
                      }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        delay: i * 0.2,
                      }}
                    />
                  ))}
                </div>
                <span>ИИ думает...</span>
              </div>
            </motion.div>
          )}
        </motion.form>
      </motion.div>
    </div>
  )
} 