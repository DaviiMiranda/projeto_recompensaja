import { Project } from '../models/interfaces';

export const MOCK_PROJECTS: Project[] = [
  {
    id: '1',
    title: 'SmartGarden - Horta Inteligente Automática',
    creator: 'Maria Santos',
    image: 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=800&h=600&fit=crop',
    description: 'Sistema automatizado para cultivo de hortas domésticas com controle de irrigação e monitoramento via app.',
    goalAmount: 50000,
    raisedAmount: 38500,
    deadline: new Date('2025-12-15'),
    publishedDate: new Date('2024-10-01')
  },
  {
    id: '2',
    title: 'EcoBottle - Garrafa Sustentável com Filtro',
    creator: 'João Oliveira',
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&h=600&fit=crop',
    description: 'Garrafa reutilizável com sistema de filtragem integrado para água potável em qualquer lugar.',
    goalAmount: 30000,
    raisedAmount: 30000,
    deadline: new Date('2025-11-30'),
    publishedDate: new Date('2024-09-15')
  },
  {
    id: '3',
    title: 'CodeKids - Plataforma de Programação para Crianças',
    creator: 'Ana Costa',
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=600&fit=crop',
    description: 'Ensine programação de forma lúdica e divertida para crianças de 6 a 12 anos.',
    goalAmount: 80000,
    raisedAmount: 45600,
    deadline: new Date('2026-02-28'),
    publishedDate: new Date('2024-10-10')
  },
  {
    id: '4',
    title: 'PetTracker - Coleira GPS para Pets',
    creator: 'Carlos Mendes',
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&h=600&fit=crop',
    description: 'Nunca mais perca seu pet! Coleira inteligente com GPS, monitor de saúde e zona segura.',
    goalAmount: 60000,
    raisedAmount: 12000,
    deadline: new Date('2025-12-31'),
    publishedDate: new Date('2024-10-20')
  },
  {
    id: '5',
    title: 'SolarPack - Mochila com Carregador Solar',
    creator: 'Fernanda Lima',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&h=600&fit=crop',
    description: 'Mochila moderna com painéis solares integrados para carregar dispositivos em movimento.',
    goalAmount: 40000,
    raisedAmount: 35200,
    deadline: new Date('2025-11-15'),
    publishedDate: new Date('2024-09-01')
  },
  {
    id: '6',
    title: 'FreshBox - Geladeira Portátil Inteligente',
    creator: 'Roberto Alves',
    image: 'https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?w=800&h=600&fit=crop',
    description: 'Mini geladeira portátil com controle de temperatura via app, perfeita para viagens.',
    goalAmount: 70000,
    raisedAmount: 28000,
    deadline: new Date('2026-01-30'),
    publishedDate: new Date('2024-10-05')
  },
  {
    id: '7',
    title: 'ArtLocal - Marketplace de Arte Local',
    creator: 'Beatriz Rocha',
    image: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800&h=600&fit=crop',
    description: 'Plataforma para conectar artistas locais com compradores e valorizar a arte regional.',
    goalAmount: 55000,
    raisedAmount: 51000,
    deadline: new Date('2025-12-20'),
    publishedDate: new Date('2024-09-20')
  },
  {
    id: '8',
    title: 'BikeShare - Sistema de Compartilhamento Comunitário',
    creator: 'Lucas Ferreira',
    image: 'https://images.unsplash.com/photo-1571333250630-f0230c320b6d?w=800&h=600&fit=crop',
    description: 'Implemente um sistema de bicicletas compartilhadas em sua comunidade.',
    goalAmount: 100000,
    raisedAmount: 67500,
    deadline: new Date('2026-03-31'),
    publishedDate: new Date('2024-10-15')
  }
];
