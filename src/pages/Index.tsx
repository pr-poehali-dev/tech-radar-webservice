import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import Icon from '@/components/ui/icon'

interface Technology {
  id: string
  name: string
  category: string
  maturityLevel: 'emerging' | 'growing' | 'mature' | 'declining'
  description: string
  company: string
  functionalBlock: string
  x: number
  y: number
}

const technologies: Technology[] = [
  {
    id: '1',
    name: 'Искусственный интеллект',
    category: 'AI/ML',
    maturityLevel: 'growing',
    description: 'Машинное обучение и продвинутая аналитика больших данных для автоматизации процессов',
    company: 'РМК Диджитал',
    functionalBlock: 'Аналитика',
    x: 120,
    y: 80
  },
  {
    id: '2',
    name: 'Интернет вещей (IoT)',
    category: 'IoT',
    maturityLevel: 'mature',
    description: 'Сети нового поколения и системы геопозиционирования',
    company: 'РМК Диджитал',
    functionalBlock: 'Инфраструктура',
    x: 200,
    y: 150
  },
  {
    id: '3',
    name: 'Цифровые двойники',
    category: 'Digital Twin',
    maturityLevel: 'growing',
    description: 'Виртуальные модели физических объектов и процессов',
    company: 'РМК Диджитал',
    functionalBlock: 'Моделирование',
    x: 80,
    y: 200
  },
  {
    id: '4',
    name: 'Робототехника',
    category: 'Robotics',
    maturityLevel: 'mature',
    description: 'Робототехника и автоматизация производственных процессов',
    company: 'РМК Диджитал',
    functionalBlock: 'Производство',
    x: 250,
    y: 100
  },
  {
    id: '5',
    name: 'Кибербезопасность',
    category: 'Security',
    maturityLevel: 'mature',
    description: 'Решения по кибербезопасности для защиты корпоративных данных',
    company: 'РМК Диджитал',
    functionalBlock: 'Безопасность',
    x: 150,
    y: 250
  },
  {
    id: '6',
    name: 'Сети 5G',
    category: 'Network',
    maturityLevel: 'growing',
    description: 'Высокоскоростные сети пятого поколения',
    company: 'РМК Диджитал',
    functionalBlock: 'Инфраструктура',
    x: 300,
    y: 180
  },
  {
    id: '7',
    name: 'Edge Computing',
    category: 'Computing',
    maturityLevel: 'growing',
    description: 'Граничные вычисления для обработки данных на периферии',
    company: 'РМК Диджитал',
    functionalBlock: 'Инфраструктура',
    x: 90,
    y: 120
  },
  {
    id: '8',
    name: 'AR и VR',
    category: 'XR',
    maturityLevel: 'emerging',
    description: 'Дополненная и виртуальная реальность',
    company: 'РМК Диджитал',
    functionalBlock: 'Интерфейсы',
    x: 180,
    y: 80
  },
  {
    id: '9',
    name: 'Видеоаналитика',
    category: 'Analytics',
    maturityLevel: 'mature',
    description: 'Системы анализа видеопотоков в реальном времени',
    company: 'РМК Диджитал',
    functionalBlock: 'Аналитика',
    x: 220,
    y: 220
  },
  {
    id: '10',
    name: 'RPA',
    category: 'Automation',
    maturityLevel: 'mature',
    description: 'Роботизация бизнес-процессов',
    company: 'РМК Диджитал',
    functionalBlock: 'Автоматизация',
    x: 130,
    y: 180
  },
  {
    id: '11',
    name: 'RFID-метки',
    category: 'IoT',
    maturityLevel: 'mature',
    description: 'Радиочастотная идентификация для отслеживания активов',
    company: 'РМК Диджитал',
    functionalBlock: 'Логистика',
    x: 280,
    y: 140
  },
  {
    id: '12',
    name: 'Облачные технологии',
    category: 'Cloud',
    maturityLevel: 'mature',
    description: 'Облачная инфраструктура и сервисы',
    company: 'РМК Диджитал',
    functionalBlock: 'Инфраструктура',
    x: 160,
    y: 130
  }
]

const maturityColors = {
  emerging: '#FF6B6B',
  growing: '#4ECDC4',
  mature: '#45B7D1',
  declining: '#96CEB4'
}

export default function Index() {
  const [selectedTechnology, setSelectedTechnology] = useState<Technology | null>(null)
  const [isManagementPanelOpen, setIsManagementPanelOpen] = useState(false)
  const [filterCompany, setFilterCompany] = useState('all')
  const [filterBlock, setFilterBlock] = useState('all')
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userRole, setUserRole] = useState<'user' | 'admin'>('user')
  const [filteredTechnologies, setFilteredTechnologies] = useState(technologies)

  useEffect(() => {
    let filtered = technologies
    
    if (filterCompany !== 'all') {
      filtered = filtered.filter(tech => tech.company === filterCompany)
    }
    
    if (filterBlock !== 'all') {
      filtered = filtered.filter(tech => tech.functionalBlock === filterBlock)
    }
    
    setFilteredTechnologies(filtered)
  }, [filterCompany, filterBlock])

  const handleLogin = (role: 'user' | 'admin') => {
    setIsAuthenticated(true)
    setUserRole(role)
    setIsLoginOpen(false)
  }

  const getMaturityLevelText = (level: string) => {
    const levels = {
      emerging: 'Зарождающиеся',
      growing: 'Развивающиеся',
      mature: 'Зрелые',
      declining: 'Устаревающие'
    }
    return levels[level as keyof typeof levels]
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="Radar" className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Радар технологий</h1>
                <p className="text-sm text-gray-600">РМК Диджитал</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              {!isAuthenticated ? (
                <Dialog open={isLoginOpen} onOpenChange={setIsLoginOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline">
                      <Icon name="LogIn" className="w-4 h-4 mr-2" />
                      Войти
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Авторизация</DialogTitle>
                      <DialogDescription>
                        Выберите роль для входа в систему
                      </DialogDescription>
                    </DialogHeader>
                    <div className="flex flex-col gap-3 mt-4">
                      <Button onClick={() => handleLogin('user')} className="w-full">
                        <Icon name="User" className="w-4 h-4 mr-2" />
                        Войти как пользователь
                      </Button>
                      <Button onClick={() => handleLogin('admin')} variant="outline" className="w-full">
                        <Icon name="Shield" className="w-4 h-4 mr-2" />
                        Войти как администратор
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              ) : (
                <div className="flex items-center gap-3">
                  <Badge variant={userRole === 'admin' ? 'default' : 'secondary'}>
                    {userRole === 'admin' ? 'Администратор' : 'Пользователь'}
                  </Badge>
                  <Button variant="ghost" size="sm" onClick={() => setIsAuthenticated(false)}>
                    <Icon name="LogOut" className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        {/* Filters */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="Filter" className="w-5 h-5" />
              Фильтры
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Компания</label>
                <Select value={filterCompany} onValueChange={setFilterCompany}>
                  <SelectTrigger>
                    <SelectValue placeholder="Все компании" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Все компании</SelectItem>
                    <SelectItem value="РМК Диджитал">РМК Диджитал</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Функциональный блок</label>
                <Select value={filterBlock} onValueChange={setFilterBlock}>
                  <SelectTrigger>
                    <SelectValue placeholder="Все блоки" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Все блоки</SelectItem>
                    <SelectItem value="Аналитика">Аналитика</SelectItem>
                    <SelectItem value="Инфраструктура">Инфраструктура</SelectItem>
                    <SelectItem value="Производство">Производство</SelectItem>
                    <SelectItem value="Безопасность">Безопасность</SelectItem>
                    <SelectItem value="Автоматизация">Автоматизация</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-end">
                <Button variant="outline" className="w-full">
                  <Icon name="RotateCcw" className="w-4 h-4 mr-2" />
                  Сбросить
                </Button>
              </div>

              {isAuthenticated && (
                <div className="flex items-end">
                  <Sheet open={isManagementPanelOpen} onOpenChange={setIsManagementPanelOpen}>
                    <SheetTrigger asChild>
                      <Button className="w-full">
                        <Icon name="Settings" className="w-4 h-4 mr-2" />
                        Управление
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="bottom" className="h-[60vh]">
                      <SheetHeader>
                        <SheetTitle>Управление технологиями</SheetTitle>
                        <SheetDescription>
                          Добавление, редактирование и удаление технологий
                        </SheetDescription>
                      </SheetHeader>
                      <div className="mt-6 space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm font-medium mb-2 block">Название технологии</label>
                            <Input placeholder="Введите название..." />
                          </div>
                          <div>
                            <label className="text-sm font-medium mb-2 block">Категория</label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Выберите категорию..." />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="AI/ML">AI/ML</SelectItem>
                                <SelectItem value="IoT">IoT</SelectItem>
                                <SelectItem value="Security">Security</SelectItem>
                                <SelectItem value="Cloud">Cloud</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div>
                          <label className="text-sm font-medium mb-2 block">Описание</label>
                          <Textarea placeholder="Описание технологии..." rows={3} />
                        </div>
                        <div className="flex gap-3">
                          <Button className="flex-1">
                            <Icon name="Plus" className="w-4 h-4 mr-2" />
                            Добавить
                          </Button>
                          <Button variant="outline" className="flex-1">
                            <Icon name="Edit" className="w-4 h-4 mr-2" />
                            Редактировать
                          </Button>
                          <Button variant="destructive" className="flex-1">
                            <Icon name="Trash2" className="w-4 h-4 mr-2" />
                            Удалить
                          </Button>
                        </div>
                      </div>
                    </SheetContent>
                  </Sheet>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Technology Radar */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="Target" className="w-5 h-5" />
              Радар технологий предприятий
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative w-full h-96 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg overflow-hidden">
              {/* Radar circles */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 300">
                <defs>
                  <radialGradient id="radarGradient" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="rgba(59, 130, 246, 0.1)" />
                    <stop offset="100%" stopColor="rgba(59, 130, 246, 0.05)" />
                  </radialGradient>
                </defs>
                
                {/* Concentric circles */}
                <circle cx="200" cy="150" r="60" fill="none" stroke="rgba(59, 130, 246, 0.2)" strokeWidth="1" />
                <circle cx="200" cy="150" r="100" fill="none" stroke="rgba(59, 130, 246, 0.2)" strokeWidth="1" />
                <circle cx="200" cy="150" r="140" fill="none" stroke="rgba(59, 130, 246, 0.2)" strokeWidth="1" />
                
                {/* Grid lines */}
                <line x1="200" y1="10" x2="200" y2="290" stroke="rgba(59, 130, 246, 0.1)" strokeWidth="1" />
                <line x1="60" y1="150" x2="340" y2="150" stroke="rgba(59, 130, 246, 0.1)" strokeWidth="1" />
                
                {/* Technology dots */}
                {filteredTechnologies.map((tech) => (
                  <g key={tech.id}>
                    <circle
                      cx={tech.x}
                      cy={tech.y}
                      r="8"
                      fill={maturityColors[tech.maturityLevel]}
                      className="cursor-pointer hover:r-10 transition-all duration-200 animate-pulse-soft"
                      onClick={() => setSelectedTechnology(tech)}
                    />
                    <text
                      x={tech.x}
                      y={tech.y - 15}
                      textAnchor="middle"
                      className="text-xs font-medium fill-gray-700 cursor-pointer"
                      onClick={() => setSelectedTechnology(tech)}
                    >
                      {tech.name.split(' ')[0]}
                    </text>
                  </g>
                ))}
              </svg>
              
              {/* Legend */}
              <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-sm">
                <h4 className="text-sm font-semibold mb-2">Уровень зрелости</h4>
                <div className="space-y-1">
                  {Object.entries(maturityColors).map(([level, color]) => (
                    <div key={level} className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: color }}
                      />
                      <span className="text-xs">{getMaturityLevelText(level)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Technology Details */}
        {selectedTechnology && (
          <Card className="animate-scale-in">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{selectedTechnology.name}</span>
                <Badge style={{ backgroundColor: maturityColors[selectedTechnology.maturityLevel] }}>
                  {getMaturityLevelText(selectedTechnology.maturityLevel)}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-2">Описание</h4>
                  <p className="text-gray-600 mb-4">{selectedTechnology.description}</p>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Icon name="Building" className="w-4 h-4 text-gray-500" />
                      <span className="text-sm"><strong>Компания:</strong> {selectedTechnology.company}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon name="Layers" className="w-4 h-4 text-gray-500" />
                      <span className="text-sm"><strong>Функциональный блок:</strong> {selectedTechnology.functionalBlock}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon name="Tag" className="w-4 h-4 text-gray-500" />
                      <span className="text-sm"><strong>Категория:</strong> {selectedTechnology.category}</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <Button className="w-full" variant="outline">
                    <Icon name="FileText" className="w-4 h-4 mr-2" />
                    Подробная информация
                  </Button>
                  <Button className="w-full" variant="outline">
                    <Icon name="TrendingUp" className="w-4 h-4 mr-2" />
                    Аналитика внедрения
                  </Button>
                  <Button className="w-full" variant="outline">
                    <Icon name="Users" className="w-4 h-4 mr-2" />
                    Команда проекта
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Всего технологий</p>
                  <p className="text-2xl font-bold text-primary">{filteredTechnologies.length}</p>
                </div>
                <Icon name="Database" className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Зрелые</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {filteredTechnologies.filter(t => t.maturityLevel === 'mature').length}
                  </p>
                </div>
                <Icon name="CheckCircle" className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Развивающиеся</p>
                  <p className="text-2xl font-bold text-teal-600">
                    {filteredTechnologies.filter(t => t.maturityLevel === 'growing').length}
                  </p>
                </div>
                <Icon name="TrendingUp" className="w-8 h-8 text-teal-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Зарождающиеся</p>
                  <p className="text-2xl font-bold text-red-500">
                    {filteredTechnologies.filter(t => t.maturityLevel === 'emerging').length}
                  </p>
                </div>
                <Icon name="Lightbulb" className="w-8 h-8 text-red-500" />
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}