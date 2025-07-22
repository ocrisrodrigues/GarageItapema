import React, { createContext, useContext, useState, ReactNode } from 'react';
import veteranCarFestImage from 'figma:asset/c6796e7ae44a85ff7e283ae58a5afa375cd00c79.png';
import volksClubImage from 'figma:asset/cc22f162e08eef2b41d55bb7732998e02ffa2218.png';
import encontroAntigosImage from 'figma:asset/71e325e0dc899460b3173f878d084abb7dbeb403.png';
import carrosAntigosImage from 'figma:asset/7e33401adb93adf59b76b17ecbcc17451c33244d.png';

export interface Sponsor {
  name: string;
  logo: string;
  website?: string;
  description?: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  date: string;
  time: string;
  location: string;
  address: string;
  organizer: string;
  organizerEmail: string;
  organizerPhone: string;
  image: string;
  status: 'pending' | 'approved' | 'rejected';
  featured: boolean;
  createdAt: string;
  requirements: string[];
  price: number; // 0 = gratuito, > 0 = valor em reais
  isFree: boolean;
  sponsors: Sponsor[];
}

interface EventsContextType {
  events: Event[];
  addEvent: (event: Omit<Event, 'id' | 'status' | 'createdAt'>) => void;
  updateEvent: (id: string, eventData: Partial<Event>) => void;
  approveEvent: (id: string) => void;
  rejectEvent: (id: string) => void;
  deleteEvent: (id: string) => void;
  getEventById: (id: string) => Event | undefined;
  getApprovedEvents: () => Event[];
  getPendingEvents: () => Event[];
}

const EventsContext = createContext<EventsContextType | undefined>(undefined);

// Dados iniciais dos eventos
const initialEvents: Event[] = [
  {
    id: '11',
    title: '3º Encontro de Carros Antigos',
    description: 'Encontro especial reunindo clássicos, turbos e aspirados com presença confirmada de Anderson Dick.',
    longDescription: 'O 3º Encontro de Carros Antigos promete ser um evento inesquecível para todos os apaixonados por automóveis! Reuniremos em um só lugar carros clássicos, turbos e aspirados, criando uma atmosfera única de confraternização e admiração mútua.\n\nCom a presença confirmada de Anderson Dick, o evento contará com apresentações especiais e muito conhecimento automotivo sendo compartilhado. O encontro é uma oportunidade perfeita para conhecer outros entusiastas, trocar experiências e admirar belos exemplares automotivos.\n\nO evento conta com o apoio da Prefeitura Municipal de Sapucaia do Sul e da Secretaria de Cultura & Turismo, garantindo toda a infraestrutura necessária para um evento de qualidade. A FuelTech é o patrocinador oficial, trazendo ainda mais credibilidade ao encontro.',
    date: '15 de Junho',
    time: '10h - 17h',
    location: 'Sapucaia do Sul',
    address: 'Local a ser confirmado, Sapucaia do Sul - RS',
    organizer: 'Organizadores do Encontro',
    organizerEmail: 'contato@encontrocarrosantigos.com.br',
    organizerPhone: '(51) 99000-1111',
    image: carrosAntigosImage,
    status: 'approved',
    featured: true,
    createdAt: '2025-05-01',
    requirements: [
      'Carros clássicos, turbos ou aspirados',
      'Respeitar as regras do evento',
      'Comportamento respeitoso'
    ],
    price: 0,
    isFree: true,
    sponsors: [
      {
        name: 'FuelTech',
        logo: 'https://images.unsplash.com/photo-1486813669123-5fd13a71f9eb?w=200&h=100&fit=crop',
        description: 'Patrocinador oficial - Tecnologia automotiva'
      },
      {
        name: 'Prefeitura de Sapucaia do Sul',
        logo: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=200&h=100&fit=crop',
        description: 'Apoio institucional'
      },
      {
        name: 'Secretaria de Cultura & Turismo',
        logo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&h=100&fit=crop',
        description: 'Apoio cultural e turístico'
      }
    ]
  },
  {
    id: '10',
    title: 'Encontro dos Antigos - Sapiranga',
    description: 'Encontro noturno de carros antigos com ação solidária - entrada 1 litro de leite.',
    longDescription: 'O Rio Grande do Sul Antigos convida para mais um encontro especial em Sapiranga! Este evento noturno é dedicado aos apaixonados por carros antigos, proporcionando um ambiente de confraternização e admiração pelos clássicos automotivos.\n\nCom uma causa nobre, a entrada é solidária: 1 litro de leite por pessoa. Todo o leite arrecadado será destinado a instituições de caridade da região, unindo a paixão por carros com a solidariedade.\n\nO evento acontece no belo Parque Municipal do Imigrante, um local especialmente preparado para receber os participantes com segurança e conforto. O encontro conta com o apoio oficial da Prefeitura Municipal de Sapiranga.\n\nRegras importantes: são proibidos som automotivo, corte de giro e manobras que possam comprometer a segurança.',
    date: '12 de Junho',
    time: '19:30',
    location: 'Parque Municipal do Imigrante',
    address: 'Av. Mauá, 5864 - Oeste, Sapiranga - RS',
    organizer: 'Rio Grande do Sul Antigos',
    organizerEmail: 'antigos.sapiranga@gmail.com',
    organizerPhone: '(51) 99000-2222',
    image: encontroAntigosImage,
    status: 'approved',
    featured: true,
    createdAt: '2025-05-10',
    requirements: [
      'Entrada: 1 litro de leite',
      'Carros antigos ou clássicos',
      'Proibido som automotivo',
      'Proibido corte de giro',
      'Proibido acelerar desnecessariamente'
    ],
    price: 0,
    isFree: true,
    sponsors: [
      {
        name: 'Prefeitura Municipal de Sapiranga',
        logo: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=200&h=100&fit=crop',
        description: 'Apoio institucional oficial'
      }
    ]
  },
  {
    id: '9',
    title: 'VolksClub São Leopoldo',
    description: 'Encontro solidário do VolksClub com ação "Traga 1kg de alimento e nos ajude a ajudar".',
    longDescription: 'O VolksClub São Leopoldo realiza mais um encontro especial, desta vez com uma importante ação solidária! Com o lema "Qualquer ano, modelo ou marca, todos são bem vindos", o evento abraça todos os apaixonados por automóveis, não se limitando apenas aos Volkswagen.\n\nA grande novidade é a campanha solidária "TRAGA 1KG DE ALIMENTO E NOS AJUDE A AJUDAR", onde cada participante é convidado a contribuir com alimentos não perecíveis que serão destinados a famílias carentes da região.\n\nO evento acontece na Av. Parobe, em Scharlau, São Leopoldo, das 19:30 às 22:00h, proporcionando um ambiente noturno acolhedor para confraternização. Com o apoio de patrocinadores como Nobre Abastecedora, Style Stance e Mecânica Beluto, o evento promete ser uma noite memorável.\n\nPara garantir a segurança e o bom andamento, são proibidos som automotivo, manobras, acelero, corte de giro e cooler de bebidas.',
    date: '24 de Junho',
    time: '19:30 - 22:00',
    location: 'Av. Parobe',
    address: 'Av. Parobe, 1200 - Scharlau, São Leopoldo - RS',
    organizer: 'VolksClub São Leopoldo',
    organizerEmail: 'contato@volksclubsl.com.br',
    organizerPhone: '(51) 99000-3333',
    image: volksClubImage,
    status: 'approved',
    featured: true,
    createdAt: '2025-05-20',
    requirements: [
      'Traga 1kg de alimento não perecível',
      'Qualquer ano, modelo ou marca bem-vindo',
      'Proibido som automotivo',
      'Proibido manobras e acelero',
      'Proibido corte de giro',
      'Proibido cooler de bebidas'
    ],
    price: 0,
    isFree: true,
    sponsors: [
      {
        name: 'Nobre Abastecedora',
        logo: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=100&fit=crop',
        description: 'Abastecedora parceira do evento'
      },
      {
        name: 'Style Stance',
        logo: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=100&fit=crop',
        description: 'Acessórios e modificações automotivas'
      },
      {
        name: 'Mecânica Beluto',
        logo: 'https://images.unsplash.com/photo-1486813669123-5fd13a71f9eb?w=200&h=100&fit=crop',
        description: 'Oficina mecânica especializada'
      },
      {
        name: 'Auto e Pintura',
        logo: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=200&h=100&fit=crop',
        description: 'Serviços de pintura automotiva'
      }
    ]
  },
  {
    id: '8',
    title: '2º Passeio Lendários & Amigos',
    description: 'Segundo passeio do Car Club Lendários com destino à bela Atlântida, passando por Xangrilá.',
    longDescription: 'O Car Club Lendários convida para o seu segundo passeio oficial! Uma jornada inesquecível com concentração no pátio da Havan de Gravataí, seguindo em comboio até a Av. Central de Atlântida, com parada em Xangrilá.\n\nEste passeio é uma oportunidade única para confraternizar com outros apaixonados por carros, desfrutar de belas paisagens litorâneas e fortalecer os laços da nossa comunidade automotiva. O trajeto foi cuidadosamente planejado para proporcionar uma experiência segura e prazerosa.\n\nTodos os tipos de carros são bem-vindos! Venha fazer parte desta família que cresce a cada evento. O Car Club Lendários, fundado em 2014, continua promovendo encontros memoráveis entre lendários e amigos.',
    date: '26 de Outubro',
    time: '7h - Concentração | 7:30 - Saída',
    location: 'Havan Gravataí',
    address: 'Rua Otávio Schemes, 4105 - Barnabé, Gravataí - RS',
    organizer: 'Car Club Lendários',
    organizerEmail: 'contato@carclublendarios.com.br',
    organizerPhone: '(51) 99888-7777',
    image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&h=400&fit=crop',
    status: 'approved',
    featured: true,
    createdAt: '2025-10-01',
    requirements: [
      'Veículo em boas condições mecânicas',
      'Tanque de combustível cheio',
      'Respeitar as regras de trânsito',
      'Participar do briefing de segurança'
    ],
    price: 0,
    isFree: true,
    sponsors: [
      {
        name: 'Havan',
        logo: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=200&h=100&fit=crop',
        description: 'Local de concentração e apoio ao evento'
      },
      {
        name: 'Prefeitura de Gravataí',
        logo: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=200&h=100&fit=crop',
        description: 'Apoio institucional'
      },
      {
        name: 'Turismo Xangrilá',
        logo: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=200&h=100&fit=crop',
        description: 'Parceiro de destino turístico'
      }
    ]
  },
  {
    id: '7',
    title: 'Veteran CarFest 2025',
    description: '4º Encontro do Antigomobilismo Gaúcho no coração do Rio Grande do Sul.',
    longDescription: 'O Veteran CarFest 2025 marca o 4º Encontro do Antigomobilismo Gaúcho, um evento imperdível para todos os apaixonados por carros clássicos e antiguidades automotivas. Durante três dias, o Parque da Oktoberfest em Santa Cruz do Sul se transformará no maior centro de exposição de veículos antigos do estado. \n\nO evento conta com exposição de carros clássicos de todas as épocas, desde os pioneiros do início do século XX até os muscle cars dos anos 70 e 80. Além da exposição, teremos palestras sobre preservação automotiva, oficinas de restauração, feira de peças antigas, gastronomia típica gaúcha e apresentações culturais.\n\nCom apoio institucional da prefeitura e diversas entidades do setor automotivo, o Veteran CarFest é uma celebração da história automobilística gaúcha e brasileira.',
    date: '04 a 06 de Julho',
    time: '9h às 18h',
    location: 'Parque da Oktoberfest',
    address: 'Parque da Oktoberfest, Santa Cruz do Sul - RS',
    organizer: 'Comissão Organizadora Veteran CarFest',
    organizerEmail: 'contato@veterancarfest.com.br',
    organizerPhone: '(51) 99999-0000',
    image: veteranCarFestImage,
    status: 'approved',
    featured: true,
    createdAt: '2025-05-15',
    requirements: [
      'Veículo com mais de 20 anos',
      'Documentação em dia',
      'Inscrição prévia obrigatória'
    ],
    price: 0,
    isFree: true,
    sponsors: [
      {
        name: 'Prefeitura de Santa Cruz do Sul',
        logo: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=200&h=100&fit=crop',
        description: 'Apoio institucional'
      },
      {
        name: 'ASSEVEP',
        logo: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=100&fit=crop',
        description: 'Associação dos Servidores'
      },
      {
        name: 'Garten Sol',
        logo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&h=100&fit=crop',
        website: 'https://gartensol.com.br',
        description: 'Parceiro oficial do evento'
      },
      {
        name: 'HERLEN',
        logo: 'https://images.unsplash.com/photo-1486813669123-5fd13a71f9eb?w=200&h=100&fit=crop',
        description: 'Patrocinador oficial'
      },
      {
        name: 'Sicredi',
        logo: 'https://images.unsplash.com/photo-1556742044-3c52d6e88c62?w=200&h=100&fit=crop',
        website: 'https://sicredi.com.br',
        description: 'Patrocinador bancário'
      }
    ]
  },
  {
    id: '1',
    title: 'Encontro Mensal de Julho',
    description: 'Nosso tradicional encontro mensal com exposição de carros clássicos, bate-papo e confraternização.',
    longDescription: 'Junte-se a nós para mais um encontro mensal da Itapema Garage! Este será um evento especial com exposição de carros clássicos, troca de experiências entre proprietários e entusiastas, além de muito networking e diversão. Teremos sorteios de brindes, foodtrucks e música ambiente dos anos 70 e 80. Todos os tipos de carros clássicos são bem-vindos, desde muscle cars americanos até clássicos nacionais. Não esqueça de trazer sua cadeira e protetor solar!',
    date: '20 de Julho',
    time: '9h - 17h',
    location: 'Centro de Itapema',
    address: 'Praça Vereador Eugênio Müller, Centro, Itapema - SC',
    organizer: 'Itapema Garage',
    organizerEmail: 'eventos@itapemagarage.com.br',
    organizerPhone: '(47) 99999-9999',
    image: 'https://images.unsplash.com/photo-1566473965997-3de9c817e938?w=600&h=400&fit=crop',
    status: 'approved',
    featured: true,
    createdAt: '2025-06-01',
    requirements: ['Carro clássico (mais de 20 anos)', 'Documentação em dia'],
    price: 0,
    isFree: true,
    sponsors: [
      {
        name: 'Auto Peças Itapema',
        logo: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=100&fit=crop',
        website: 'https://autopecasitapema.com.br',
        description: 'Peças e acessórios para carros clássicos'
      },
      {
        name: 'Oficina do Clássico',
        logo: 'https://images.unsplash.com/photo-1486813669123-5fd13a71f9eb?w=200&h=100&fit=crop',
        website: 'https://oficinadoclassico.com.br',
        description: 'Especializada em restauração'
      }
    ]
  },
  {
    id: '2',
    title: 'Workshop de Restauração',
    description: 'Aprenda técnicas básicas de restauração com nossos especialistas.',
    longDescription: 'Workshop exclusivo sobre técnicas de restauração de carros clássicos. Nossos especialistas irão compartilhar conhecimentos sobre pintura, mecânica, elétrica e interior. O evento será dividido em módulos práticos com demonstrações ao vivo. Ideal para iniciantes e entusiastas que querem aprender mais sobre restauração. Inclui material didático e coffee break. Vagas limitadas para garantir qualidade do aprendizado.',
    date: '27 de Julho',
    time: '14h - 18h',
    location: 'Oficina Parceira',
    address: 'Rua dos Mecânicos, 123, Morretes, Itapema - SC',
    organizer: 'João Santos',
    organizerEmail: 'joao@oficinasantos.com.br',
    organizerPhone: '(47) 98888-8888',
    image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=600&h=400&fit=crop',
    status: 'approved',
    featured: false,
    createdAt: '2025-06-10',
    requirements: ['Interesse em restauração', 'Levar caderno para anotações'],
    price: 150,
    isFree: false,
    sponsors: [
      {
        name: 'Tintas Premium',
        logo: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=200&h=100&fit=crop',
        description: 'Tintas automotivas de alta qualidade'
      }
    ]
  },
  {
    id: '3',
    title: 'Passeio pela Serra',
    description: 'Passeio cênico pelas montanhas da região com parada para fotos e lanche.',
    longDescription: 'Um passeio inesquecível pelas belas serras da região! Roteiro de aproximadamente 120km passando por paisagens deslumbrantes, estradas sinuosas perfeitas para carros clássicos e paradas estratégicas para fotos. Inclui parada para almoço em restaurante típico da região com vista panorâmica. O passeio é adequado para todos os tipos de carros clássicos, com velocidade moderada e sempre em comboio organizado. Briefing de segurança às 8h, saída às 8h30.',
    date: '10 de Agosto',
    time: '8h - 16h',
    location: 'Ponto de Encontro: Centro',
    address: 'Posto Shell, BR-101, Km 142, Itapema - SC',
    organizer: 'Carlos Montanha',
    organizerEmail: 'carlos@aventuraserra.com.br',
    organizerPhone: '(47) 97777-7777',
    image: 'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=600&h=400&fit=crop',
    status: 'approved',
    featured: false,
    createdAt: '2025-06-15',
    requirements: ['Carro em boas condições mecânicas', 'Tanque cheio', 'Rádio comunicador (opcional)'],
    price: 80,
    isFree: false,
    sponsors: [
      {
        name: 'Pousada Serra Verde',
        logo: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=200&h=100&fit=crop',
        website: 'https://pousadaserraverde.com.br',
        description: 'Hospedagem com vista para as montanhas'
      },
      {
        name: 'Restaurante Panorâmico',
        logo: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=200&h=100&fit=crop',
        description: 'Culinária regional com vista deslumbrante'
      }
    ]
  },
  {
    id: '4',
    title: 'Encontro Fusca Clube',
    description: 'Encontro especial dedicado aos apaixonados por Fuscas de todas as gerações.',
    longDescription: 'Evento exclusivo para proprietários e admiradores de Volkswagen Fusca! Teremos exposição com os mais belos exemplares, concurso de originalidade, bate-papo sobre história e curiosidades do icônico \"Besouro\". Haverá também área kids, food trucks temáticos e sorteio de peças originais VW. Venha com seu Fusca ou simplesmente para admirar estes clássicos atemporais.',
    date: '15 de Agosto',
    time: '10h - 16h',
    location: 'Parque da Cidade',
    address: 'Av. das Flores, 500, Centro, Itapema - SC',
    organizer: 'Fusca Clube SC',
    organizerEmail: 'contato@fuscaclubes.com.br',
    organizerPhone: '(47) 96666-6666',
    image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=600&h=400&fit=crop',
    status: 'approved',
    featured: true,
    createdAt: '2025-06-20',
    requirements: ['Volkswagen Fusca ou admirador da marca'],
    price: 0,
    isFree: true,
    sponsors: [
      {
        name: 'VW Peças Originais',
        logo: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=200&h=100&fit=crop',
        description: 'Peças originais Volkswagen'
      }
    ]
  },
  {
    id: '5',
    title: 'Noite dos Muscle Cars',
    description: 'Evento noturno dedicado aos possantes americanos com muito rock and roll.',
    longDescription: 'Uma noite especial para os amantes de muscle cars! Venha com seu Camaro, Mustang, Challenger ou qualquer outro possante americano. Teremos som ambiente com rock clássico, exposição sob holofotes, concurso de som automotivo e muito networking. Evento para maiores de 18 anos com open bar e food trucks especializados em hambúrgueres gourmet. Dress code casual elegante.',
    date: '25 de Agosto',
    time: '19h - 23h',
    location: 'Marina de Itapema',
    address: 'Cais da Marina, 100, Centro, Itapema - SC',
    organizer: 'American Cars Brasil',
    organizerEmail: 'eventos@americancars.com.br',
    organizerPhone: '(47) 95555-5555',
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=600&h=400&fit=crop',
    status: 'approved',
    featured: false,
    createdAt: '2025-06-22',
    requirements: ['Muscle car americano', 'Maior de 18 anos'],
    price: 120,
    isFree: false,
    sponsors: [
      {
        name: 'Rodas Americanas',
        logo: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=100&fit=crop',
        description: 'Rodas esportivas importadas'
      }
    ]
  },
  {
    id: '6',
    title: 'Rally Vintage',
    description: 'Rally de regularidade para carros clássicos pelas estradas da Grande Florianópolis.',
    longDescription: 'Participe do Rally Vintage, uma prova de regularidade especialmente desenvolvida para carros clássicos! O percurso de 200km passa por algumas das mais belas paisagens da Grande Florianópolis, com trechos cronometrados e paradas obrigatórias. Premiação para os três primeiros colocados e troféu de participação para todos. Inclui road book, adesivos, camiseta e lanche. Necessária inscrição prévia.',
    date: '05 de Setembro',
    time: '7h - 18h',
    location: 'Autódromo de Itapema',
    address: 'Rod. SC-412, Km 5, Itapema - SC',
    organizer: 'Rally Clube SC',
    organizerEmail: 'inscricoes@rallyclubesc.com.br',
    organizerPhone: '(47) 94444-4444',
    image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=600&h=400&fit=crop',
    status: 'approved',
    featured: true,
    createdAt: '2025-06-25',
    requirements: ['Carro clássico em perfeitas condições', 'Carteira de habilitação válida', 'Seguro em dia'],
    price: 200,
    isFree: false,
    sponsors: [
      {
        name: 'Seguros Clássicos',
        logo: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=200&h=100&fit=crop',
        description: 'Seguros especializados em carros clássicos'
      },
      {
        name: 'Pneus Performance',
        logo: 'https://images.unsplash.com/photo-1558980664-3a031cf67ea8?w=200&h=100&fit=crop',
        description: 'Pneus de alta performance'
      }
    ]
  }
];

export function EventsProvider({ children }: { children: ReactNode }) {
  const [events, setEvents] = useState<Event[]>(initialEvents);

  const addEvent = (eventData: Omit<Event, 'id' | 'status' | 'createdAt'>) => {
    const newEvent: Event = {
      ...eventData,
      id: Date.now().toString(),
      status: 'pending',
      createdAt: new Date().toISOString().split('T')[0]
    };
    setEvents(prev => [newEvent, ...prev]);
  };

  const updateEvent = (id: string, eventData: Partial<Event>) => {
    setEvents(prev => prev.map(event => 
      event.id === id ? { ...event, ...eventData } : event
    ));
  };

  const approveEvent = (id: string) => {
    setEvents(prev => prev.map(event => 
      event.id === id ? { ...event, status: 'approved' } : event
    ));
  };

  const rejectEvent = (id: string) => {
    setEvents(prev => prev.map(event => 
      event.id === id ? { ...event, status: 'rejected' } : event
    ));
  };

  const deleteEvent = (id: string) => {
    setEvents(prev => prev.filter(event => event.id !== id));
  };

  const getEventById = (id: string) => {
    return events.find(event => event.id === id);
  };

  const getApprovedEvents = () => {
    return events.filter(event => event.status === 'approved');
  };

  const getPendingEvents = () => {
    return events.filter(event => event.status === 'pending');
  };

  const value = {
    events,
    addEvent,
    updateEvent,
    approveEvent,
    rejectEvent,
    deleteEvent,
    getEventById,
    getApprovedEvents,
    getPendingEvents
  };

  return (
    <EventsContext.Provider value={value}>
      {children}
    </EventsContext.Provider>
  );
}

export function useEvents() {
  const context = useContext(EventsContext);
  if (context === undefined) {
    throw new Error('useEvents must be used within an EventsProvider');
  }
  return context;
}