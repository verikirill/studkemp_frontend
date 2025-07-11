import React, { useState, useEffect } from 'react';

interface RegionData {
  id: string;
  name: string;
  value: number;
  color: string;
}

interface RussiaHeatmapProps {
  highlightedRegion?: string | null;
}

const RussiaHeatmap: React.FC<RussiaHeatmapProps> = ({ highlightedRegion }) => {
  const [svgContent, setSvgContent] = useState<string>('');
  const [hoveredRegion, setHoveredRegion] = useState<RegionData | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Данные по регионам (используем коды из SVG файла)
  const regionsData: Record<string, RegionData> = {
    'RU-AD': { id: 'RU-AD', name: 'Республика Адыгея', value: 75, color: '#3b82f6' },
    'RU-AL': { id: 'RU-AL', name: 'Республика Алтай', value: 45, color: '#60a5fa' },
    'RU-ALT': { id: 'RU-ALT', name: 'Алтайский край', value: 65, color: '#2563eb' },
    'RU-AMU': { id: 'RU-AMU', name: 'Амурская область', value: 55, color: '#60a5fa' },
    'RU-ARK': { id: 'RU-ARK', name: 'Архангельская область', value: 70, color: '#3b82f6' },
    'RU-AST': { id: 'RU-AST', name: 'Астраханская область', value: 80, color: '#1d4ed8' },
    'RU-BA': { id: 'RU-BA', name: 'Республика Башкортостан', value: 85, color: '#1e40af' },
    'RU-BEL': { id: 'RU-BEL', name: 'Белгородская область', value: 90, color: '#1e3a8a' },
    'RU-BRY': { id: 'RU-BRY', name: 'Брянская область', value: 60, color: '#60a5fa' },
    'RU-BU': { id: 'RU-BU', name: 'Республика Бурятия', value: 50, color: '#93c5fd' },
    'RU-CE': { id: 'RU-CE', name: 'Чеченская Республика', value: 40, color: '#93c5fd' },
    'RU-CHE': { id: 'RU-CHE', name: 'Челябинская область', value: 85, color: '#1e40af' },
    'RU-CHU': { id: 'RU-CHU', name: 'Чукотский автономный округ', value: 25, color: '#dbeafe' },
    'RU-CU': { id: 'RU-CU', name: 'Чувашская Республика', value: 75, color: '#3b82f6' },
    'RU-DA': { id: 'RU-DA', name: 'Республика Дагестан', value: 65, color: '#2563eb' },
    'RU-IN': { id: 'RU-IN', name: 'Республика Ингушетия', value: 45, color: '#60a5fa' },
    'RU-IRK': { id: 'RU-IRK', name: 'Иркутская область', value: 70, color: '#3b82f6' },
    'RU-IVA': { id: 'RU-IVA', name: 'Ивановская область', value: 55, color: '#60a5fa' },
    'RU-KAM': { id: 'RU-KAM', name: 'Камчатский край', value: 35, color: '#93c5fd' },
    'RU-KB': { id: 'RU-KB', name: 'Кабардино-Балкарская Республика', value: 50, color: '#93c5fd' },
    'RU-KC': { id: 'RU-KC', name: 'Карачаево-Черкесская Республика', value: 55, color: '#60a5fa' },
    'RU-KDA': { id: 'RU-KDA', name: 'Краснодарский край', value: 90, color: '#1e3a8a' },
    'RU-KEM': { id: 'RU-KEM', name: 'Кемеровская область', value: 80, color: '#1d4ed8' },
    'RU-KGD': { id: 'RU-KGD', name: 'Калининградская область', value: 85, color: '#1e40af' },
    'RU-KGN': { id: 'RU-KGN', name: 'Курганская область', value: 45, color: '#60a5fa' },
    'RU-KHA': { id: 'RU-KHA', name: 'Хабаровский край', value: 60, color: '#60a5fa' },
    'RU-KHM': { id: 'RU-KHM', name: 'Ханты-Мансийский автономный округ', value: 95, color: '#1e3a8a' },
    'RU-KIR': { id: 'RU-KIR', name: 'Кировская область', value: 65, color: '#2563eb' },
    'RU-KK': { id: 'RU-KK', name: 'Республика Хакасия', value: 55, color: '#60a5fa' },
    'RU-KL': { id: 'RU-KL', name: 'Республика Калмыкия', value: 40, color: '#93c5fd' },
    'RU-KLU': { id: 'RU-KLU', name: 'Калужская область', value: 80, color: '#1d4ed8' },
    'RU-KO': { id: 'RU-KO', name: 'Республика Коми', value: 60, color: '#60a5fa' },
    'RU-KOS': { id: 'RU-KOS', name: 'Костромская область', value: 50, color: '#93c5fd' },
    'RU-KR': { id: 'RU-KR', name: 'Республика Карелия', value: 65, color: '#2563eb' },
    'RU-KRS': { id: 'RU-KRS', name: 'Курская область', value: 70, color: '#3b82f6' },
    'RU-KYA': { id: 'RU-KYA', name: 'Красноярский край', value: 75, color: '#3b82f6' },
    'RU-LEN': { id: 'RU-LEN', name: 'Ленинградская область', value: 85, color: '#1e40af' },
    'RU-LIP': { id: 'RU-LIP', name: 'Липецкая область', value: 75, color: '#3b82f6' },
    'RU-MAG': { id: 'RU-MAG', name: 'Магаданская область', value: 30, color: '#dbeafe' },
    'RU-ME': { id: 'RU-ME', name: 'Республика Марий Эл', value: 60, color: '#60a5fa' },
    'RU-MO': { id: 'RU-MO', name: 'Республика Мордовия', value: 65, color: '#2563eb' },
    'RU-MOS': { id: 'RU-MOS', name: 'Московская область', value: 95, color: '#1e3a8a' },
    'RU-MOW': { id: 'RU-MOW', name: 'Москва', value: 100, color: '#172554' },
    'RU-MUR': { id: 'RU-MUR', name: 'Мурманская область', value: 70, color: '#3b82f6' },
    'RU-NEN': { id: 'RU-NEN', name: 'Ненецкий автономный округ', value: 35, color: '#93c5fd' },
    'RU-NGR': { id: 'RU-NGR', name: 'Новгородская область', value: 55, color: '#60a5fa' },
    'RU-NIZ': { id: 'RU-NIZ', name: 'Нижегородская область', value: 85, color: '#1e40af' },
    'RU-NVS': { id: 'RU-NVS', name: 'Новосибирская область', value: 80, color: '#1d4ed8' },
    'RU-OMS': { id: 'RU-OMS', name: 'Омская область', value: 70, color: '#3b82f6' },
    'RU-ORE': { id: 'RU-ORE', name: 'Оренбургская область', value: 75, color: '#3b82f6' },
    'RU-ORL': { id: 'RU-ORL', name: 'Орловская область', value: 60, color: '#60a5fa' },
    'RU-PER': { id: 'RU-PER', name: 'Пермский край', value: 80, color: '#1d4ed8' },
    'RU-PNZ': { id: 'RU-PNZ', name: 'Пензенская область', value: 65, color: '#2563eb' },
    'RU-PRI': { id: 'RU-PRI', name: 'Приморский край', value: 70, color: '#3b82f6' },
    'RU-PSK': { id: 'RU-PSK', name: 'Псковская область', value: 50, color: '#93c5fd' },
    'RU-ROS': { id: 'RU-ROS', name: 'Ростовская область', value: 85, color: '#1e40af' },
    'RU-RYA': { id: 'RU-RYA', name: 'Рязанская область', value: 70, color: '#3b82f6' },
    'RU-SA': { id: 'RU-SA', name: 'Республика Саха (Якутия)', value: 45, color: '#60a5fa' },
    'RU-SAK': { id: 'RU-SAK', name: 'Сахалинская область', value: 65, color: '#2563eb' },
    'RU-SAM': { id: 'RU-SAM', name: 'Самарская область', value: 85, color: '#1e40af' },
    'RU-SAR': { id: 'RU-SAR', name: 'Саратовская область', value: 75, color: '#3b82f6' },
    'RU-SE': { id: 'RU-SE', name: 'Республика Северная Осетия — Алания', value: 55, color: '#60a5fa' },
    'RU-SMO': { id: 'RU-SMO', name: 'Смоленская область', value: 60, color: '#60a5fa' },
    'RU-SPE': { id: 'RU-SPE', name: 'Санкт-Петербург', value: 95, color: '#1e3a8a' },
    'RU-STA': { id: 'RU-STA', name: 'Ставропольский край', value: 75, color: '#3b82f6' },
    'RU-SVE': { id: 'RU-SVE', name: 'Свердловская область', value: 85, color: '#1e40af' },
    'RU-TAM': { id: 'RU-TAM', name: 'Тамбовская область', value: 65, color: '#2563eb' },
    'RU-TA': { id: 'RU-TA', name: 'Республика Татарстан', value: 90, color: '#1e3a8a' },
    'RU-TOM': { id: 'RU-TOM', name: 'Томская область', value: 70, color: '#3b82f6' },
    'RU-TUL': { id: 'RU-TUL', name: 'Тульская область', value: 80, color: '#1d4ed8' },
    'RU-TVE': { id: 'RU-TVE', name: 'Тверская область', value: 65, color: '#2563eb' },
    'RU-TY': { id: 'RU-TY', name: 'Республика Тыва', value: 35, color: '#93c5fd' },
    'RU-TYU': { id: 'RU-TYU', name: 'Тюменская область', value: 85, color: '#1e40af' },
    'RU-UD': { id: 'RU-UD', name: 'Удмуртская Республика', value: 70, color: '#3b82f6' },
    'RU-ULY': { id: 'RU-ULY', name: 'Ульяновская область', value: 65, color: '#2563eb' },
    'RU-VGG': { id: 'RU-VGG', name: 'Волгоградская область', value: 75, color: '#3b82f6' },
    'RU-VLA': { id: 'RU-VLA', name: 'Владимирская область', value: 70, color: '#3b82f6' },
    'RU-VLG': { id: 'RU-VLG', name: 'Вологодская область', value: 60, color: '#60a5fa' },
    'RU-VOR': { id: 'RU-VOR', name: 'Воронежская область', value: 80, color: '#1d4ed8' },
    'RU-YAN': { id: 'RU-YAN', name: 'Ямало-Ненецкий автономный округ', value: 90, color: '#1e3a8a' },
    'RU-YAR': { id: 'RU-YAR', name: 'Ярославская область', value: 75, color: '#3b82f6' },
    'RU-YEV': { id: 'RU-YEV', name: 'Еврейская автономная область', value: 40, color: '#93c5fd' },
    'RU-ZAB': { id: 'RU-ZAB', name: 'Забайкальский край', value: 50, color: '#93c5fd' },
  };

  // Загрузка SVG файла
  useEffect(() => {
    const loadSvg = async () => {
      try {
        const response = await fetch('/russia-map.svg');
        const svgText = await response.text();
        setSvgContent(svgText);
      } catch (error) {
        console.error('Ошибка загрузки SVG:', error);
      }
    };

    loadSvg();
  }, []);

  // Обработка наведения мыши
  const handleMouseMove = (event: React.MouseEvent) => {
    setMousePosition({ x: event.clientX, y: event.clientY });
  };

  // Глобальный обработчик движения мыши
  useEffect(() => {
    const handleGlobalMouseMove = (event: MouseEvent) => {
      if (hoveredRegion) {
        setMousePosition({ x: event.clientX, y: event.clientY });
      }
    };

    if (hoveredRegion) {
      document.addEventListener('mousemove', handleGlobalMouseMove);
    }

    return () => {
      document.removeEventListener('mousemove', handleGlobalMouseMove);
    };
  }, [hoveredRegion]);

  // Обработка SVG после загрузки и при изменении выделенного региона
  useEffect(() => {
    if (!svgContent) return;

    const parser = new DOMParser();
    const svgDoc = parser.parseFromString(svgContent, 'image/svg+xml');
    const paths = svgDoc.querySelectorAll('path[id^="RU-"]');

    paths.forEach((path) => {
      const regionId = path.getAttribute('id');
      const regionData = regionsData[regionId || ''];
      
      // Проверяем, является ли этот регион выделенным
      const isHighlighted = highlightedRegion && regionId === highlightedRegion;
      
      if (regionData) {
        // Устанавливаем цвет региона
        if (isHighlighted) {
          // Подсвечиваем выделенный регион ярким цветом
          path.setAttribute('fill', '#ef4444'); // красный цвет для выделения
          path.setAttribute('stroke', '#dc2626');
          path.setAttribute('stroke-width', '2');
          path.setAttribute('style', 'cursor: pointer; transition: all 0.2s ease; filter: brightness(1.2);');
        } else {
          // Обычный цвет для остальных регионов
          path.setAttribute('fill', regionData.color);
          path.setAttribute('stroke', '#374151');
          path.setAttribute('stroke-width', '0.5');
          path.setAttribute('style', 'cursor: pointer; transition: all 0.2s ease;');
        }
      } else {
        // Для регионов без данных
        if (isHighlighted) {
          // Подсвечиваем даже регионы без данных, если они выделены
          path.setAttribute('fill', '#ef4444');
          path.setAttribute('stroke', '#dc2626');
          path.setAttribute('stroke-width', '2');
          path.setAttribute('style', 'cursor: pointer; transition: all 0.2s ease; filter: brightness(1.2);');
        } else {
          path.setAttribute('fill', '#4b5563');
          path.setAttribute('stroke', '#374151');
          path.setAttribute('stroke-width', '0.5');
        }
      }
    });

    // Устанавливаем размеры SVG
    const svgElement = svgDoc.documentElement;
    
    // Получаем оригинальные размеры из viewBox
    let viewBox = svgElement.getAttribute('viewBox');
    if (!viewBox) {
      // Если нет viewBox, создаем его из mapsvg:geoViewBox или width/height
      const geoViewBox = svgElement.getAttribute('mapsvg:geoViewBox');
      const width = svgElement.getAttribute('width');
      const height = svgElement.getAttribute('height');
      
      if (geoViewBox) {
        viewBox = `0 0 ${width || '1224'} ${height || '760'}`;
      } else if (width && height) {
        viewBox = `0 0 ${width} ${height}`;
      } else {
        viewBox = '0 0 1224 760'; // Значения по умолчанию
      }
      svgElement.setAttribute('viewBox', viewBox);
    }
    
    svgElement.setAttribute('width', '100%');
    svgElement.removeAttribute('height');
    svgElement.setAttribute('preserveAspectRatio', 'xMidYMid meet');
    svgElement.setAttribute('style', 'max-width: 100%; height: auto; display: block; margin: 0 auto;');

    // Вставляем обработанный SVG в DOM
    const svgContainer = document.getElementById('russia-svg-container');
    if (svgContainer) {
      svgContainer.innerHTML = svgElement.outerHTML;
      
      // После вставки заново находим элементы и добавляем обработчики
      const insertedSvg = svgContainer.querySelector('svg');
      if (insertedSvg) {
        const paths = insertedSvg.querySelectorAll('path[id^="RU-"]');
        
        paths.forEach((path) => {
          const regionId = path.getAttribute('id');
          const regionData = regionsData[regionId || ''];
          
          if (regionData) {
            // Обработчики событий для tooltip
            path.addEventListener('mouseenter', (e) => {
              const mouseEvent = e as MouseEvent;
              setHoveredRegion(regionData);
              setMousePosition({ x: mouseEvent.clientX, y: mouseEvent.clientY });
              
              // Проверяем, является ли регион выделенным
              const isHighlighted = highlightedRegion && regionId === highlightedRegion;
              if (!isHighlighted) {
                path.setAttribute('fill', '#fbbf24');
                path.setAttribute('stroke-width', '1');
              }
            });
            
            path.addEventListener('mouseleave', () => {
              setHoveredRegion(null);
              
              // Восстанавливаем цвет в зависимости от того, выделен ли регион
              const isHighlighted = highlightedRegion && regionId === highlightedRegion;
              if (isHighlighted) {
                path.setAttribute('fill', '#ef4444');
                path.setAttribute('stroke-width', '2');
              } else {
                path.setAttribute('fill', regionData.color);
                path.setAttribute('stroke-width', '0.5');
              }
            });
          }
        });
      }
    }
  }, [svgContent, highlightedRegion]);

  return (
    <div className="bg-gray-900 rounded-lg p-6">
      <h3 className="text-xl font-semibold text-white mb-4">
        Тепловая карта России
      </h3>
      
      <div className="relative">
        {/* Контейнер для SVG */}
        <div 
          id="russia-svg-container"
          className="w-full bg-gray-800 rounded-lg overflow-hidden p-4"
          style={{ minHeight: '400px' }}
          onMouseMove={handleMouseMove}
        >
          {!svgContent && (
            <div className="flex items-center justify-center h-64 text-gray-400">
              <div className="animate-pulse">Загрузка карты...</div>
            </div>
          )}
        </div>

        {/* Tooltip */}
        {hoveredRegion && (
          <div
            className="fixed z-50 bg-gray-900/95 backdrop-blur-sm text-white px-3 py-2 rounded-lg shadow-xl border border-gray-600 pointer-events-none flex flex-col justify-center"
            style={{
              left: mousePosition.x,
              top: mousePosition.y + 10,
              transform: 'translate(-10%, 0)',
              width: '200px',
              height: '60px',
            }}
          >
            <div className="font-semibold text-sm whitespace-nowrap overflow-hidden text-ellipsis text-center">
              {hoveredRegion.name}
            </div>
            <div className="text-xs text-gray-300 whitespace-nowrap text-center">
              Активность: <span className="text-blue-300 font-medium">{hoveredRegion.value}%</span>
            </div>
          </div>
        )}
      </div>

      {/* Легенда */}
      <div className="mt-4 flex items-center justify-center space-x-6 text-sm text-gray-300">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-blue-200 rounded"></div>
          <span>0-30%</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-blue-400 rounded"></div>
          <span>30-60%</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-blue-600 rounded"></div>
          <span>60-80%</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-blue-800 rounded"></div>
          <span>80-95%</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-blue-950 rounded"></div>
          <span>95-100%</span>
        </div>
      </div>

      {/* Статистика */}
      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
        <div className="bg-gray-800 rounded-lg p-3">
          <div className="text-2xl font-bold text-blue-400">85</div>
          <div className="text-sm text-gray-400">Регионов</div>
        </div>
        <div className="bg-gray-800 rounded-lg p-3">
          <div className="text-2xl font-bold text-green-400">67%</div>
          <div className="text-sm text-gray-400">Средняя активность</div>
        </div>
        <div className="bg-gray-800 rounded-lg p-3">
          <div className="text-2xl font-bold text-yellow-400">15</div>
          <div className="text-sm text-gray-400">Высокая активность</div>
        </div>
        <div className="bg-gray-800 rounded-lg p-3">
          <div className="text-2xl font-bold text-red-400">3</div>
          <div className="text-sm text-gray-400">Низкая активность</div>
        </div>
      </div>
    </div>
  );
};

export default RussiaHeatmap; 