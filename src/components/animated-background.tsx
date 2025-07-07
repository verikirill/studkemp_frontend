import { motion } from 'framer-motion'
import { useTheme } from '@/hooks/use-theme'

export function AnimatedBackground() {
  const { isDark } = useTheme()

  const shapes = [
    {
      id: 1,
      size: 120,
      x: '10%',
      y: '20%',
      duration: 8,
      delay: 0,
    },
    {
      id: 2,
      size: 80,
      x: '70%',
      y: '10%',
      duration: 12,
      delay: 2,
    },
    {
      id: 3,
      size: 100,
      x: '80%',
      y: '70%',
      duration: 10,
      delay: 4,
    },
    {
      id: 4,
      size: 60,
      x: '20%',
      y: '80%',
      duration: 15,
      delay: 1,
    },
    {
      id: 5,
      size: 90,
      x: '50%',
      y: '50%',
      duration: 20,
      delay: 3,
    },
  ]

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Градиентный фон */}
      <div className="absolute inset-0 gradient-bg" />
      
      {/* Анимированные фигуры */}
      {shapes.map((shape) => (
        <motion.div
          key={shape.id}
          className="absolute"
          style={{
            left: shape.x,
            top: shape.y,
            width: shape.size,
            height: shape.size,
          }}
          animate={{
            y: [-20, 20, -20],
            x: [-10, 10, -10],
            rotate: [0, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: shape.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: shape.delay,
          }}
        >
          <div
            className={`w-full h-full animate-morph ${
              isDark
                ? 'bg-gradient-to-br from-primary-purple/20 to-primary-purple/5'
                : 'bg-gradient-to-br from-primary-purple/10 to-primary-purple/5'
            }`}
            style={{
              filter: 'blur(1px)',
            }}
          />
        </motion.div>
      ))}

      {/* Дополнительные плавающие элементы */}
      <motion.div
        className="absolute top-1/4 left-1/3 w-4 h-4 rounded-full bg-primary-purple/30"
        animate={{
          y: [-30, 30],
          opacity: [0.3, 0.8, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <motion.div
        className="absolute top-3/4 right-1/4 w-6 h-6 rounded-full bg-primary-purple/20"
        animate={{
          y: [-20, 40],
          x: [-20, 20],
          opacity: [0.2, 0.6, 0.2],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      <motion.div
        className="absolute top-1/2 right-1/3 w-3 h-3 rounded-full bg-primary-purple/40"
        animate={{
          y: [-25, 25],
          opacity: [0.4, 0.9, 0.4],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      {/* Мерцающие точки */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={`dot-${i}`}
          className="absolute w-1 h-1 rounded-full bg-primary-purple/30"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  )
} 