import React, { useState } from 'react';
import {
  BookOpen,
  Users,
  Clock,
  Award,
  CheckCircle2,
  Star,
  Calendar,
  MapPin,
  Phone,
  Mail,
  ArrowRight
} from 'lucide-react';
import './Clases.css';

const ClasesPage = () => {
  const [selectedLevel, setSelectedLevel] = useState('basico');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    level: 'basico',
    schedule: '',
    experience: '',
    goals: '',
    message: ''
  });

  const levels = [
    {
      id: 'basico',
      title: 'Nivel Básico',
      duration: '2 meses',
      price: '40€/mes',
      students: '8-10 alumnos',
      hours: '4h/semana',
      description: 'Ideal para quienes empiezan desde cero y desean aprender los fundamentos de la costura.',
      color: 'from-green-600 to-emerald-600',
      bgColor: 'from-green-50 to-emerald-50',
      features: [
        'Uso inicial de la máquina de coser',
        'Costura a mano básica',
        'Lectura de patrones simples',
        'Proyecto: Falda sencilla',
        'Proyecto: Blusa básica',
        'Acabados esenciales',
        'Materiales incluidos'
      ],
      projects: [
        'Neceser',
        'Delantal',
        'Falda recta',
        'Blusa básica'
      ]
    },
    {
      id: 'intermedio',
      title: 'Nivel Intermedio',
      duration: '3 meses',
      price: '60€/mes',
      students: '6-8 alumnos',
      hours: '5h/semana',
      description: 'Para quienes ya dominan lo básico y buscan perfeccionar técnicas y acabados.',
      color: 'from-blue-600 to-indigo-600',
      bgColor: 'from-blue-50 to-indigo-50',
      features: [
        'Confección avanzada',
        'Trabajo con tejidos variados',
        'Colocación de cremalleras y botones',
        'Proyecto: Vestido con pinzas',
        'Proyecto: Pantalón básico',
        'Acabados profesionales',
        'Ajustes y modificaciones'
      ],
      projects: [
        'Vestido entallado',
        'Pantalón clásico',
        'Chaqueta básica',
        'Vestido de fiesta'
      ]
    },
    {
      id: 'avanzado',
      title: 'Nivel Avanzado',
      duration: '4 meses',
      price: '80€/mes',
      students: '4-6 alumnos',
      hours: '6h/semana',
      description: 'Para costureras/os experimentados que buscan técnicas profesionales y proyectos complejos.',
      color: 'from-purple-600 to-pink-600',
      bgColor: 'from-purple-50 to-pink-50',
      features: [
        'Patronaje personalizado',
        'Alta costura',
        'Tejidos complejos',
        'Proyecto: Traje completo',
        'Proyecto: Vestido de novia',
        'Forros y entretelas',
        'Transformaciones avanzadas'
      ],
      projects: [
        'Blazer',
        'Vestido de ceremonia',
        'Abrigo forrado',
        'Proyecto libre'
      ]
    },
    {
      id: 'patronaje',
      title: 'Patronaje Especializado',
      duration: '3 meses',
      price: '90€/mes',
      students: '4-5 alumnos',
      hours: '4h/semana',
      description: 'Curso enfocado en la creación y transformación de patrones para prendas a medida.',
      color: 'from-amber-600 to-orange-600',
      bgColor: 'from-amber-50 to-orange-50',
      features: [
        'Toma de medidas profesional',
        'Creación de patrones base',
        'Transformaciones y escalado',
        'Patrones complejos',
        'Software de patronaje',
        'Técnicas industriales'
      ],
      projects: [
        'Patrón base',
        'Transformaciones',
        'Vestido complejo',
        'Portfolio de patrones'
      ]
    }
  ];

  const schedules = [
    { value: 'manana', label: 'Mañanas (10:00-12:00)', days: 'Lunes y Miércoles' },
    { value: 'tarde', label: 'Tardes (16:00-18:00)', days: 'Martes y Jueves' },
    { value: 'noche', label: 'Noches (19:00-21:00)', days: 'Lunes y Miércoles' },
    { value: 'sabado', label: 'Sábados (10:00-14:00)', days: 'Solo sábados' }
  ];

  const studentProjects = [
    {
      name: 'María Carmen',
      level: 'Avanzado',
      project: 'Vestido de madrina',
      image: '/images/student-project-1.jpg',
      testimony: 'Nunca pensé que podría crear algo tan hermoso. Las clases me dieron toda la confianza que necesitaba.'
    },
    {
      name: 'Ana Belén',
      level: 'Intermedio',
      project: 'Chaqueta estructurada',
      image: '/images/student-project-2.jpg',
      testimony: 'El ambiente en las clases es fantástico. Aprendes técnicas profesionales de manera muy amena.'
    },
    {
      name: 'Lucía Torres',
      level: 'Básico',
      project: 'Primera falda',
      image: '/images/student-project-3.jpg',
      testimony: 'Empecé sin saber ni enhebrar una aguja. Ahora confecciono mi propia ropa. ¡Increíble!'
    }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('¡Gracias por tu interés! Te contactaremos pronto para confirmar tu inscripción.');
    console.log('Datos del formulario:', formData);
  };

  const currentLevel = levels.find(level => level.id === selectedLevel);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-900 to-pink-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Clases de Costura</h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              Aprende a crear tus propias prendas con nuestros cursos especializados. Desde principiante hasta nivel profesional.
            </p>
          </div>
        </div>
      </div>

      {/* Información General */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <Users className="h-12 w-12 text-purple-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Grupos Reducidos</h3>
            <p className="text-gray-600">Máximo 10 alumnos por clase para atención personalizada</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <Award className="h-12 w-12 text-emerald-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Certificado</h3>
            <p className="text-gray-600">Diploma acreditativo al finalizar cada nivel</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <Clock className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Horarios Flexibles</h3>
            <p className="text-gray-600">Mañanas, tardes y fines de semana disponibles</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <BookOpen className="h-12 w-12 text-orange-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Material Incluido</h3>
            <p className="text-gray-600">Todos los materiales básicos están incluidos</p>
          </div>
        </div>

        {/* Selector de Niveles */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Elige tu Nivel</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            {levels.map((level) => (
              <button
                key={level.id}
                onClick={() => setSelectedLevel(level.id)}
                className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                  selectedLevel === level.id
                    ? `bg-gradient-to-br ${level.bgColor} border-purple-500`
                    : 'bg-white border-gray-200 hover:border-gray-300'
                }`}
              >
                <h3 className={`font-semibold mb-2 ${selectedLevel === level.id ? 'text-purple-900' : 'text-gray-900'}`}>
                  {level.title}
                </h3>
                <p className={`text-sm ${selectedLevel === level.id ? 'text-purple-700' : 'text-gray-600'}`}>
                  {level.price}
                </p>
              </button>
            ))}
          </div>

          {/* Detalles del Nivel Seleccionado */}
          {currentLevel && (
            <div className={`bg-gradient-to-br ${currentLevel.bgColor} rounded-xl p-8 border border-gray-200`}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{currentLevel.title}</h3>
                  <p className="text-gray-700 mb-6">{currentLevel.description}</p>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-white/80 rounded-lg p-4">
                      <div className="flex items-center mb-2">
                        <Clock className="h-5 w-5 text-purple-600 mr-2" />
                        <span className="font-medium text-gray-900">Duración</span>
                      </div>
                      <p className="text-gray-700">{currentLevel.duration}</p>
                    </div>
                    <div className="bg-white/80 rounded-lg p-4">
                      <div className="flex items-center mb-2">
                        <Users className="h-5 w-5 text-purple-600 mr-2" />
                        <span className="font-medium text-gray-900">Grupo</span>
                      </div>
                      <p className="text-gray-700">{currentLevel.students}</p>
                    </div>
                  </div>
                  <div className="bg-white/80 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-3">Lo que aprenderás:</h4>
                    <ul className="space-y-2">
                      {currentLevel.features.map((feature, index) => (
                        <li key={index} className="flex items-center text-gray-700">
                          <CheckCircle2 className="h-4 w-4 text-emerald-500 mr-2 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-4">Proyectos del Curso</h4>
                  <div className="grid grid-cols-1 gap-4">
                    {currentLevel.projects.map((project, index) => (
                      <div key={index} className="bg-white/80 rounded-lg p-4 flex items-center">
                        <div className={`w-12 h-12 bg-gradient-to-br ${currentLevel.color} rounded-lg flex items-center justify-center mr-4`}>
                          <span className="text-white font-bold">{index + 1}</span>
                        </div>
                        <div>
                          <h5 className="font-medium text-gray-900">{project}</h5>
                          <p className="text-sm text-gray-600">Proyecto {index + 1}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 bg-white/80 rounded-lg p-4">
                    <div className="text-center">
                      <div className={`text-3xl font-bold bg-gradient-to-r ${currentLevel.color} bg-clip-text text-transparent mb-2`}>
                        {currentLevel.price}
                      </div>
                      <p className="text-gray-600 mb-4">{currentLevel.hours} • {currentLevel.duration}</p>
                      <button
                        onClick={() => document.getElementById('inscription-form').scrollIntoView({ behavior: 'smooth' })}
                        className={`w-full bg-gradient-to-r ${currentLevel.color} text-white py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-200`}
                      >
                        Inscribirme Ahora
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Galería de Proyectos de Alumnos */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Proyectos de Nuestros Alumnos
            </h2>
            <p className="text-xl text-gray-600">
              Mira lo que han logrado crear nuestros estudiantes
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {studentProjects.map((project, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="h-64 bg-gradient-to-br from-purple-200 to-pink-200 flex items-center justify-center">
                  <div className="text-center">
                    <Award className="h-16 w-16 text-purple-600 mx-auto mb-4" />
                    <p className="text-purple-800 font-medium">{project.project}</p>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold mr-3">
                      {project.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{project.name}</h3>
                      <p className="text-sm text-gray-500">{project.level}</p>
                    </div>
                  </div>
                  <div className="flex mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 italic">"{project.testimony}"</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Formulario de Inscripción */}
        <div id="inscription-form" className="bg-white rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Formulario de Inscripción</h2>
            <p className="text-gray-600">Completa tus datos y nos pondremos en contacto contigo</p>
          </div>
          <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre completo *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Tu nombre completo"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="tu@email.com"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Teléfono *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="123 456 789"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nivel deseado *
                </label>
                <select
                  name="level"
                  value={formData.level}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  {levels.map((level) => (
                    <option key={level.id} value={level.id}>{level.title}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Horario preferido *
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {schedules.map((schedule) => (
                  <label key={schedule.value} className="flex items-center p-3 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer">
                    <input
                      type="radio"
                      name="schedule"
                      value={schedule.value}
                      checked={formData.schedule === schedule.value}
                      onChange={handleInputChange}
                      className="mr-3 text-purple-600 focus:ring-purple-500"
                    />
                    <div>
                      <div className="font-medium text-gray-900">{schedule.label}</div>
                      <div className="text-sm text-gray-500">{schedule.days}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Experiencia previa en costura
              </label>
              <select
                name="experience"
                value={formData.experience}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="">Selecciona tu nivel</option>
                <option value="ninguna">Sin experiencia</option>
                <option value="basica">Experiencia básica</option>
                <option value="intermedia">Experiencia intermedia</option>
                <option value="avanzada">Experiencia avanzada</option>
              </select>
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ¿Qué te gustaría aprender específicamente?
              </label>
              <textarea
                name="goals"
                value={formData.goals}
                onChange={handleInputChange}
                rows={3}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Cuéntanos tus objetivos y qué tipo de prendas te interesa crear..."
              />
            </div>
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mensaje adicional
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows={3}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Cualquier pregunta o información adicional que quieras compartir..."
              />
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center mx-auto"
              >
                Enviar Inscripción
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
              <p className="text-sm text-gray-500 mt-4">
                * Te contactaremos en un plazo máximo de 24 horas para confirmar tu inscripción
              </p>
            </div>
          </form>
        </div>

        {/* Información de Contacto */}
        <div className="mt-12 bg-gradient-to-r from-purple-900 to-pink-900 text-white rounded-xl p-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-4">¿Tienes dudas sobre nuestras clases?</h3>
            <p className="text-gray-200">Contáctanos directamente y resolveremos todas tus preguntas</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="flex flex-col items-center">
              <Phone className="h-8 w-8 text-yellow-400 mb-3" />
              <h4 className="font-semibold mb-2">Llámanos</h4>
              <p className="text-gray-200">+34 91 234 56 78</p>
            </div>
            <div className="flex flex-col items-center">
              <Mail className="h-8 w-8 text-yellow-400 mb-3" />
              <h4 className="font-semibold mb-2">Escríbenos</h4>
              <p className="text-gray-200">clases@elcosturero.es</p>
            </div>
            <div className="flex flex-col items-center">
              <MapPin className="h-8 w-8 text-yellow-400 mb-3" />
              <h4 className="font-semibold mb-2">Visítanos</h4>
              <p className="text-gray-200">Calle de la Costura, 123<br />Madrid</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClasesPage; 