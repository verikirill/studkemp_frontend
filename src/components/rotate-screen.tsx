import { motion } from 'framer-motion'
import { RotateCcw, Smartphone } from 'lucide-react'

export function RotateScreen() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-background/95 backdrop-blur-sm md:hidden portrait:flex landscape:hidden"
    >
      <div className="text-center space-y-6 px-6">
        {/* Анимированная иконка */}
        <motion.div
          animate={{
            rotate: [0, -90, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="mx-auto w-20 h-20 flex items-center justify-center"
        >
          <Smartphone className="w-16 h-16 text-primary-purple" />
        </motion.div>

        {/* Иконка поворота */}
        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
          }}
          className="mx-auto w-12 h-12 flex items-center justify-center"
        >
          <RotateCcw className="w-10 h-10 text-primary-purple/70" />
        </motion.div>

        {/* Текст */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">
            Поверните устройство
          </h2>
          
          <p className="text-muted-foreground max-w-sm mx-auto leading-relaxed">
            Для удобного просмотра анализа рекомендуем использовать 
            горизонтальную ориентацию экрана
          </p>
        </div>

        {/* Анимированные точки */}
        <div className="flex justify-center space-x-2">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-primary-purple/60 rounded-full"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.6, 1, 0.6],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.3,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  )
} 