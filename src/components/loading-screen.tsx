import { motion } from 'framer-motion'
import { Brain, Zap, BarChart3 } from 'lucide-react'
import { useLoading } from '@/hooks/use-loading'

interface LoadingScreenProps {
  isVisible: boolean
}

export function LoadingScreen({ isVisible }: LoadingScreenProps) {
  const { currentText } = useLoading(isVisible, 2000)

  if (!isVisible) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center"
    >
      <div className="text-center space-y-8">
        {/* Основная анимация загрузки */}
        <div className="relative">
          {/* Внешнее кольцо */}
          <motion.div
            className="w-24 h-24 border-4 border-white/20 rounded-full"
            animate={{ rotate: 360 }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear",
            }}
          />
          
          {/* Внутреннее кольцо */}
          <motion.div
            className="absolute inset-2 w-16 h-16 border-4 border-t-white border-r-transparent border-b-transparent border-l-transparent rounded-full"
            animate={{ rotate: -360 }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "linear",
            }}
          />
          
          {/* Центральный элемент */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Brain className="w-8 h-8 text-white" />
          </motion.div>
        </div>

        {/* Плавающие иконки */}
        <div className="relative h-16">
          <motion.div
            className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
            animate={{
              y: [-20, -40, -20],
              x: [-30, 30, -30],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
                      >
              <Zap className="w-6 h-6 text-white/70" />
            </motion.div>
            
            <motion.div
              className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
              animate={{
                y: [-10, 10, -10],
                x: [40, -40, 40],
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
            >
              <BarChart3 className="w-5 h-5 text-white/60" />
            </motion.div>
        </div>

        {/* Текст загрузки */}
        <motion.div
          key={currentText}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="space-y-2"
        >
          <h2 className="text-xl font-semibold text-white">
            {currentText}
          </h2>
          
          {/* Прогресс бар */}
          <div className="w-64 mx-auto">
            <div className="h-1 bg-white/20 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-white to-white/80"
                animate={{
                  x: ['-100%', '100%'],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </div>
          </div>
        </motion.div>

        {/* Дополнительные анимированные точки */}
        <div className="flex justify-center space-x-2">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-white rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  )
} 