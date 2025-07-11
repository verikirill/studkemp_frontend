import { motion } from 'framer-motion'
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Download, 
  ArrowLeft, 
  Building,
  Calendar,
  Globe,
  MessageSquare,
  ExternalLink,
  Map
} from 'lucide-react'
import RussiaHeatmap from '@/components/russia-heatmap'
import { type AnalysisData, formatCurrency, formatPercentage, getRegionCode } from '@/lib/api'



interface AnalysisScreenProps {
  onBack: () => void
  onExportPDF: () => void
  query: string
  analysisData: AnalysisData | null
}

export function AnalysisScreen({ onBack, onExportPDF, query, analysisData }: AnalysisScreenProps) {
  // Если нет данных анализа, показываем сообщение
  if (!analysisData) {
    return (
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div className="flex items-center space-x-4">
            <motion.button
              onClick={onBack}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-xl bg-muted hover:bg-muted/80 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </motion.button>
            
            <div>
              <h1 className="text-3xl font-bold text-gradient">Данные не найдены</h1>
              <p className="text-muted-foreground mt-1">Отсутствуют данные для анализа</p>
            </div>
          </div>
        </motion.div>
        
        <div className="text-center py-12">
          <p className="text-muted-foreground">Нет данных для отображения. Вернитесь назад и попробуйте новый поиск.</p>
        </div>
      </div>
    )
  }

  // Подготавливаем метрики на основе реальных данных
  const metrics = [
    { 
      title: 'Прогнозируемая выручка', 
      value: formatCurrency(analysisData.profitability.predicted_revenue), 
      change: formatPercentage(analysisData.profitability.predicted_pct_change), 
      isPositive: analysisData.profitability.predicted_pct_change >= 0, 
      icon: DollarSign 
    },
    { 
      title: 'Последняя выручка', 
      value: formatCurrency(analysisData.profitability.last_revenue), 
      change: `Кластер: ${analysisData.profitability.cluster}`, 
      isPositive: true, 
      icon: Building 
    },
    { 
      title: 'Отраслевые новости', 
      value: analysisData.industry_news.count.toString(), 
      change: `Всего доступно: ${analysisData.industry_news.total_available}`, 
      isPositive: analysisData.industry_news.count > 0, 
      icon: MessageSquare 
    },
  ]

  // Получаем код региона для подсветки на карте
  const regionCode = getRegionCode(analysisData.company_info.region)
  return (
    <div className="relative z-10 w-full max-w-7xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-8"
      >
        <div className="flex items-center space-x-4">
          <motion.button
            onClick={onBack}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 rounded-xl bg-muted hover:bg-muted/80 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </motion.button>
          
          <div>
            <h1 className="text-3xl font-bold text-gradient">Результаты анализа</h1>
            <p className="text-muted-foreground mt-1">Запрос: "{query}"</p>
          </div>
        </div>
        
        <motion.button
          onClick={onExportPDF}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="btn-primary px-6 py-3 rounded-xl flex items-center space-x-2"
        >
          <Download className="w-4 h-4" />
          <span>Экспорт PDF</span>
        </motion.button>
      </motion.div>

      {/* Метрики */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
      >
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.title}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 + index * 0.1 }}
            className="p-6 rounded-2xl glass-effect bg-card border border-border"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">{metric.title}</p>
                <p className="text-2xl font-bold text-foreground">{metric.value}</p>
              </div>
              <div className="p-3 rounded-xl bg-primary/10">
                <metric.icon className="w-6 h-6 text-primary" />
              </div>
            </div>
            <div className="flex items-center mt-4">
              {metric.isPositive ? (
                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              ) : (
                <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
              )}
              <span className={`text-sm font-medium ${metric.isPositive ? 'text-green-500' : 'text-red-500'}`}>
                {metric.change}
              </span>
              <span className="text-sm text-muted-foreground ml-1">за месяц</span>
            </div>
          </motion.div>
        ))}
      </motion.div>



      {/* Тепловая карта России */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="p-6 rounded-2xl glass-effect bg-card border border-border mb-8"
      >
        <h3 className="text-xl font-semibold mb-6 flex items-center text-foreground">
          <Map className="w-6 h-6 mr-3 text-primary" />
          Географическое распределение - {analysisData.company_info.region}
        </h3>
        <RussiaHeatmap highlightedRegion={regionCode} />
      </motion.div>

      {/* Информация о компании */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="p-6 rounded-2xl glass-effect bg-card border border-border mb-8"
      >
        <h3 className="text-xl font-semibold mb-6 flex items-center text-foreground">
          <Building className="w-6 h-6 mr-3 text-primary" />
          Информация о компании
        </h3>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8 }}
          className="p-6 rounded-xl border border-border bg-muted/20"
        >
          <div className="flex items-start justify-between mb-4">
            <h4 className="font-bold text-foreground text-lg">{analysisData.company_info.name}</h4>
            <span className="px-3 py-1 rounded-md text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">
              Анализируемая компания
            </span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">ИНН:</span>
                <span className="text-foreground font-medium">{analysisData.company_info.tin}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Регион:</span>
                <span className="text-foreground">{analysisData.company_info.region}</span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Код ОКВЭД:</span>
                <span className="text-foreground">{analysisData.company_info.activity_code}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">ID:</span>
                <span className="text-foreground">{analysisData.company_info.full_info.id}</span>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Блок новостей */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1 }}
        className="p-6 rounded-2xl glass-effect bg-card border border-border mb-8"
      >
        <h3 className="text-xl font-semibold mb-6 flex items-center text-foreground">
          <Globe className="w-6 h-6 mr-3 text-primary" />
          Отраслевые новости ({analysisData.industry_news.count})
        </h3>
        
        {analysisData.industry_news.count > 0 ? (
          <div className="space-y-4">
            {analysisData.industry_news.news.slice(0, 5).map((news, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2 + index * 0.1 }}
                className="p-4 rounded-xl border border-border bg-muted/10 hover:bg-muted/20 transition-colors"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h4 className="font-semibold text-foreground mb-1">{news.title}</h4>
                    <p className="text-sm text-muted-foreground mb-2">{news.summary}</p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-muted-foreground ml-2 flex-shrink-0 cursor-pointer hover:text-primary transition-colors" />
                </div>
                
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-4">
                    <span className="px-2 py-1 rounded-md font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">
                      {news.category}
                    </span>
                    <span className="text-muted-foreground">{news.source}</span>
                  </div>
                  <span className="text-muted-foreground flex items-center">
                    <Calendar className="w-3 h-3 mr-1" />
                    {news.date}
                  </span>
                </div>
              </motion.div>
            ))}
            
            {analysisData.industry_news.total_available > 5 && (
              <div className="text-center pt-4">
                <p className="text-sm text-muted-foreground">
                  Показано 5 из {analysisData.industry_news.total_available} доступных новостей
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-8">
            <Globe className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
            <p className="text-muted-foreground">Новости по данной отрасли не найдены</p>
          </div>
        )}
      </motion.div>

      {/* Выводы и рекомендации ИИ */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
        className="p-6 rounded-2xl glass-effect bg-card border border-border"
      >
        <h3 className="text-xl font-semibold mb-4 flex items-center text-foreground">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center mr-3">
            <MessageSquare className="w-4 h-4 text-primary-foreground" />
          </div>
          Анализ ИИ
        </h3>
        
        <div className="space-y-4">
          <div className="text-sm text-muted-foreground mb-4">
            <p><strong>Дата анализа:</strong> {analysisData.metadata.analysis_date}</p>
            <p><strong>Время обработки:</strong> {analysisData.metadata.processing_time_seconds.toFixed(2)} сек.</p>
          </div>
          
          <div className="prose prose-sm max-w-none text-foreground leading-relaxed">
            {analysisData.ai_analysis.split('\n\n').map((paragraph, index) => (
              <p key={index} className="mb-4 last:mb-0">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  )
} 