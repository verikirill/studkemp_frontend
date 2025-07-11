// Типы данных для API

export interface Company {
  id: number;
  tin: string;
  org_short_name: string;
  activity_code_main: string;
  region: string;
}

export interface QueryResponse {
  type: string;
  message: string;
  data: Company[];
}

export interface CompanyInfo {
  tin: string;
  name: string;
  region: string;
  activity_code: string;
  full_info: {
    id: number;
    tin: string;
    org_short_name: string;
    activity_code_main: string;
    region: string;
  };
}

export interface Profitability {
  predicted_revenue: number;
  predicted_pct_change: number;
  cluster: string;
  last_revenue: number;
}

export interface NewsItem {
  title: string;
  category: string;
  date: string;
  source: string;
  summary: string;
}

export interface IndustryNews {
  count: number;
  news: NewsItem[];
  total_available: number;
}

export interface AnalysisData {
  company_info: CompanyInfo;
  profitability: Profitability;
  industry_news: IndustryNews;
  ai_analysis: string;
  metadata: {
    analysis_date: string;
    processing_time_seconds: number;
  };
}

// Конфигурация API - используем прокси для избежания CORS
const API_BASE_URL = '/api';
const NEWS_API_BASE_URL = '/news-api';

// Функции для работы с API

export async function searchCompanies(query: string): Promise<QueryResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/query`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Ошибка поиска компаний:', error);
    throw new Error('Не удалось выполнить поиск компаний');
  }
}

export async function analyzeCompany(tin: string): Promise<AnalysisData> {
  try {
    const response = await fetch(`${API_BASE_URL}/analyze/company`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ tin }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Ошибка анализа компании:', error);
    throw new Error('Не удалось выполнить анализ компании');
  }
}

export async function getNewsByOkved(activityCode: string): Promise<IndustryNews> {
  try {
    const response = await fetch(`${NEWS_API_BASE_URL}/news/by-okved?descriptions=${encodeURIComponent(activityCode)}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Ошибка получения новостей:', error);
    // Возвращаем пустой объект в случае ошибки
    return {
      count: 0,
      news: [],
      total_available: 0
    };
  }
}

// Вспомогательная функция для форматирования числа в рубли
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

// Вспомогательная функция для форматирования процентов
export function formatPercentage(value: number): string {
  const percentage = (value * 100).toFixed(1);
  return `${value >= 0 ? '+' : ''}${percentage}%`;
}

// Функция для сопоставления региона с кодом на карте
export function getRegionCode(regionName: string): string | null {
  const regionMap: Record<string, string> = {
    'Москва': 'RU-MOW',
    'Санкт-Петербург': 'RU-SPE',
    'Московская область': 'RU-MOS',
    'Ленинградская область': 'RU-LEN',
    'Республика Адыгея': 'RU-AD',
    'Республика Алтай': 'RU-AL',
    'Алтайский край': 'RU-ALT',
    'Амурская область': 'RU-AMU',
    'Архангельская область': 'RU-ARK',
    'Астраханская область': 'RU-AST',
    'Республика Башкортостан': 'RU-BA',
    'Белгородская область': 'RU-BEL',
    'Брянская область': 'RU-BRY',
    'Республика Бурятия': 'RU-BU',
    'Чеченская Республика': 'RU-CE',
    'Челябинская область': 'RU-CHE',
    'Чукотский автономный округ': 'RU-CHU',
    'Чувашская Республика': 'RU-CU',
    'Республика Дагестан': 'RU-DA',
    'Республика Ингушетия': 'RU-IN',
    'Иркутская область': 'RU-IRK',
    'Ивановская область': 'RU-IVA',
    'Камчатский край': 'RU-KAM',
    'Кабардино-Балкарская Республика': 'RU-KB',
    'Карачаево-Черкесская Республика': 'RU-KC',
    'Краснодарский край': 'RU-KDA',
    'Кемеровская область': 'RU-KEM',
    'Калининградская область': 'RU-KGD',
    'Курганская область': 'RU-KGN',
    'Хабаровский край': 'RU-KHA',
    'Ханты-Мансийский автономный округ': 'RU-KHM',
    'Кировская область': 'RU-KIR',
    'Республика Хакасия': 'RU-KK',
    'Республика Калмыкия': 'RU-KL',
    'Калужская область': 'RU-KLU',
    'Республика Коми': 'RU-KO',
    'Костромская область': 'RU-KOS',
    'Республика Карелия': 'RU-KR',
    'Курская область': 'RU-KRS',
    'Красноярский край': 'RU-KYA',
    'Липецкая область': 'RU-LIP',
    'Магаданская область': 'RU-MAG',
    'Республика Марий Эл': 'RU-ME',
    'Республика Мордовия': 'RU-MO',
    'Мурманская область': 'RU-MUR',
    'Ненецкий автономный округ': 'RU-NEN',
    'Новгородская область': 'RU-NGR',
    'Нижегородская область': 'RU-NIZ',
    'Новосибирская область': 'RU-NVS',
    'Омская область': 'RU-OMS',
    'Оренбургская область': 'RU-ORE',
    'Орловская область': 'RU-ORL',
    'Пермский край': 'RU-PER',
    'Пензенская область': 'RU-PNZ',
    'Приморский край': 'RU-PRI',
    'Псковская область': 'RU-PSK',
    'Ростовская область': 'RU-ROS',
    'Рязанская область': 'RU-RYA',
    'Республика Саха (Якутия)': 'RU-SA',
    'Сахалинская область': 'RU-SAK',
    'Самарская область': 'RU-SAM',
    'Саратовская область': 'RU-SAR',
    'Республика Северная Осетия — Алания': 'RU-SE',
    'Смоленская область': 'RU-SMO',
    'Ставропольский край': 'RU-STA',
    'Свердловская область': 'RU-SVE',
    'Тамбовская область': 'RU-TAM',
    'Республика Татарстан': 'RU-TA',
    'Томская область': 'RU-TOM',
    'Тульская область': 'RU-TUL',
    'Тверская область': 'RU-TVE',
    'Республика Тыва': 'RU-TY',
    'Тюменская область': 'RU-TYU',
    'Удмуртская Республика': 'RU-UD',
    'Ульяновская область': 'RU-ULY',
    'Волгоградская область': 'RU-VGG',
    'Владимирская область': 'RU-VLA',
    'Вологодская область': 'RU-VLG',
    'Воронежская область': 'RU-VOR',
    'Ямало-Ненецкий автономный округ': 'RU-YAN',
    'Ярославская область': 'RU-YAR',
    'Еврейская автономная область': 'RU-YEV',
    'Забайкальский край': 'RU-ZAB'
  };

  return regionMap[regionName] || null;
} 