import { motion } from 'framer-motion'
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  LineChart, 
  Line, 
  Area, 
  AreaChart 
} from 'recharts'
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  DollarSign, 
  Target, 
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

const salesData = [
  { month: 'Янв', sales: 4000, profit: 2400 },
  { month: 'Фев', sales: 3000, profit: 1398 },
  { month: 'Мар', sales: 2000, profit: 9800 },
  { month: 'Апр', sales: 2780, profit: 3908 },
  { month: 'Май', sales: 1890, profit: 4800 },
  { month: 'Июн', sales: 2390, profit: 3800 },
]

// Расширенные данные для длинного графика
const trendData = [
  { date: '01.01', value: 65, volume: 120, engagement: 85 },
  { date: '02.01', value: 78, volume: 132, engagement: 88 },
  { date: '03.01', value: 52, volume: 98, engagement: 72 },
  { date: '04.01', value: 81, volume: 145, engagement: 92 },
  { date: '05.01', value: 69, volume: 118, engagement: 78 },
  { date: '06.01', value: 95, volume: 168, engagement: 96 },
  { date: '07.01', value: 87, volume: 155, engagement: 89 },
  { date: '08.01', value: 73, volume: 125, engagement: 82 },
  { date: '09.01', value: 91, volume: 162, engagement: 94 },
  { date: '10.01', value: 104, volume: 178, engagement: 98 },
  { date: '11.01', value: 89, volume: 149, engagement: 87 },
  { date: '12.01', value: 116, volume: 195, engagement: 105 },
]

const categoryData = [
  { name: 'Электроника', value: 400, color: '#5f1581' },
  { name: 'Одежда', value: 300, color: '#7c3aed' },
  { name: 'Дом', value: 200, color: '#a855f7' },
  { name: 'Спорт', value: 100, color: '#c084fc' },
]

const metrics = [
  { title: 'Общий доход', value: '₽2,847,500', change: '+12.5%', isPositive: true, icon: DollarSign },
  { title: 'Активные клиенты', value: '15,243', change: '+8.2%', isPositive: true, icon: Users },
  { title: 'Конверсия', value: '3.24%', change: '-2.1%', isPositive: false, icon: Target },
]

// Данные о компаниях
const companyData = [
  {
    name: 'ООО "ТехноДинамика"',
    industry: 'IT и технологии',
    revenue: '₽125.3М',
    employees: '250+',
    founded: '2018',
    status: 'Активный клиент'
  },
  {
    name: 'АО "Энергосбыт Регион"',
    industry: 'Энергетика',
    revenue: '₽89.7М',
    employees: '150+',
    founded: '2015',
    status: 'Потенциальный клиент'
  },
  {
    name: 'ГК "Строительные решения"',
    industry: 'Строительство',
    revenue: '₽234.1М',
    employees: '500+',
    founded: '2012',
    status: 'В переговорах'
  }
]

// Новости
const newsData = [
  {
    title: 'Новый тренд в B2B продажах: персонализация на основе ИИ',
    category: 'Технологии',
    date: '15 декабря 2024',
    source: 'Tech Today',
    summary: 'Исследование показывает рост конверсии на 40% при использовании ИИ для персонализации предложений'
  },
  {
    title: 'Рынок корпоративного ПО вырос на 23% в III квартале',
    category: 'Аналитика',
    date: '14 декабря 2024',
    source: 'Market Research',
    summary: 'Основной драйвер роста - переход компаний на облачные решения и автоматизацию процессов'
  },
  {
    title: 'Изменения в налоговом законодательстве для IT-компаний',
    category: 'Законодательство',
    date: '13 декабря 2024',
    source: 'Business Law',
    summary: 'Новые льготы для IT-отрасли вступят в силу с января 2025 года'
  }
]

interface AnalysisScreenProps {
  onBack: () => void
  onExportPDF: () => void
  query: string
}

export function AnalysisScreen({ onBack, onExportPDF, query }: AnalysisScreenProps) {
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

      {/* Длинный график тенденций */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="p-6 rounded-2xl glass-effect bg-card border border-border mb-8"
      >
        <h3 className="text-xl font-semibold mb-4 text-foreground">Динамика показателей за период</h3>
        <ResponsiveContainer width="100%" height={400}>
          <AreaChart data={trendData}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#5f1581" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#5f1581" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorVolume" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.2}/>
                <stop offset="95%" stopColor="#7c3aed" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="date" 
              stroke="hsl(var(--muted-foreground))" 
              fontSize={12}
              tick={{ fill: 'hsl(var(--muted-foreground))' }}
            />
            <YAxis 
              stroke="hsl(var(--muted-foreground))" 
              fontSize={12}
              tick={{ fill: 'hsl(var(--muted-foreground))' }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
                color: 'hsl(var(--foreground))'
              }}
            />
            <Area 
              type="monotone" 
              dataKey="volume" 
              stroke="#7c3aed" 
              fillOpacity={1} 
              fill="url(#colorVolume)" 
            />
            <Area 
              type="monotone" 
              dataKey="value" 
              stroke="#5f1581" 
              fillOpacity={1} 
              fill="url(#colorValue)" 
            />
            <Line 
              type="monotone" 
              dataKey="engagement" 
              stroke="#c084fc" 
              strokeWidth={2}
              dot={{ fill: '#c084fc', strokeWidth: 2, r: 4 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Графики продаж */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="p-6 rounded-2xl glass-effect bg-card border border-border"
        >
          <h3 className="text-xl font-semibold mb-4 text-foreground">Продажи и прибыль</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="month" 
                stroke="hsl(var(--muted-foreground))" 
                fontSize={12}
                tick={{ fill: 'hsl(var(--muted-foreground))' }}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))" 
                fontSize={12}
                tick={{ fill: 'hsl(var(--muted-foreground))' }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                  color: 'hsl(var(--foreground))'
                }}
              />
              <Bar dataKey="sales" fill="#5f1581" radius={[4, 4, 0, 0]} />
              <Bar dataKey="profit" fill="#a855f7" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="p-6 rounded-2xl glass-effect bg-card border border-border"
        >
          <h3 className="text-xl font-semibold mb-4 text-foreground">Продажи по категориям</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={120}
                paddingAngle={5}
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {categoryData.map((item) => (
              <div key={item.name} className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-sm text-muted-foreground">{item.name}</span>
              </div>
            ))}
          </div>
        </motion.div>
              </div>

      {/* Тепловая карта России */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="p-6 rounded-2xl glass-effect bg-card border border-border mb-8"
      >
        <h3 className="text-xl font-semibold mb-6 flex items-center text-foreground">
          <Map className="w-6 h-6 mr-3 text-primary" />
          Географическое распределение
        </h3>
                      <RussiaHeatmap />
      </motion.div>

      {/* Информация о компаниях */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="p-6 rounded-2xl glass-effect bg-card border border-border mb-8"
      >
        <h3 className="text-xl font-semibold mb-6 flex items-center text-foreground">
          <Building className="w-6 h-6 mr-3 text-primary" />
          Анализируемые компании
        </h3>
        
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
           {companyData.map((company, index) => (
             <motion.div
               key={company.name}
               initial={{ opacity: 0, scale: 0.9 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ delay: 0.8 + index * 0.1 }}
               className="p-4 rounded-xl border border-border bg-muted/20 hover:bg-muted/30 transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <h4 className="font-semibold text-foreground text-sm">{company.name}</h4>
                <span className={`px-2 py-1 rounded-md text-xs font-medium ${
                  company.status === 'Активный клиент' ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' :
                  company.status === 'В переговорах' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400' :
                  'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
                }`}>
                  {company.status}
                </span>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Отрасль:</span>
                  <span className="text-foreground">{company.industry}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Выручка:</span>
                  <span className="text-foreground font-medium">{company.revenue}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Сотрудники:</span>
                  <span className="text-foreground">{company.employees}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Основана:</span>
                  <span className="text-foreground">{company.founded}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
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
          Актуальные новости рынка
        </h3>
        
                 <div className="space-y-4">
           {newsData.map((news, index) => (
             <motion.div
               key={news.title}
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
                  <span className={`px-2 py-1 rounded-md font-medium ${
                    news.category === 'Технологии' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400' :
                    news.category === 'Аналитика' ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' :
                    'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400'
                  }`}>
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
        </div>
      </motion.div>

      {/* Выводы и рекомендации */}
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
          Выводы и рекомендации ИИ
        </h3>
        
        <div className="space-y-4 text-muted-foreground">
          <p className="text-foreground">На основе анализа данных выявлены следующие ключевые инсайты:</p>
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" />
              <span className="text-foreground"><strong className="text-primary">Рост показателей:</strong> Положительная динамика с ростом на 12.5% за месяц указывает на эффективность текущей стратегии</span>
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" />
              <span className="text-foreground"><strong className="text-primary">Лидирующая категория:</strong> Электроника составляет 40% от общих продаж, стоит усилить фокус на этом направлении</span>
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" />
              <span className="text-foreground"><strong className="text-primary">Зона внимания:</strong> Конверсия снизилась на 2.1%, рекомендуется провести A/B тестирование воронки продаж</span>
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" />
              <span className="text-foreground"><strong className="text-primary">Возможности роста:</strong> Потенциальные клиенты в энергетической сфере показывают высокий интерес к продукту</span>
            </li>
          </ul>
        </div>
      </motion.div>
    </div>
  )
} 