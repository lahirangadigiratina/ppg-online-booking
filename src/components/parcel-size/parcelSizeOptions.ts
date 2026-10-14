import {
  BookOpen,
  Box,
  Boxes,
  Briefcase,
  Cuboid,
  Luggage,
  PackageOpen,
} from 'lucide-react'
import type { ParcelSizeOption } from './ParcelSizeCard'

export const PARCEL_SIZE_OPTIONS: ParcelSizeOption[] = [
  {
    id: 'satchel',
    label: 'Satchel',
    dimensions: '25×15×5cm',
    weight: 'Up to 500g',
    icon: BookOpen,
  },
  {
    id: 'shoebox',
    label: 'Shoebox',
    dimensions: '30×25×15cm',
    weight: 'Up to 3kg',
    icon: Box,
  },
  {
    id: 'briefcase',
    label: 'Briefcase',
    dimensions: '40×30×15cm',
    weight: 'Up to 5kg',
    icon: Briefcase,
  },
  {
    id: 'carry-on',
    label: 'Carry On',
    dimensions: '55×40×20cm',
    weight: 'Up to 12kg',
    icon: Boxes,
  },
  {
    id: 'large-box',
    label: 'Large Box',
    dimensions: '60×40×25cm',
    weight: 'Up to 15kg',
    icon: PackageOpen,
  },
  {
    id: 'suitcase',
    label: 'Suitcase',
    dimensions: '70×45×25cm',
    weight: 'Up to 20kg',
    icon: Luggage,
  },
  {
    id: 'heavy-crate',
    label: 'Heavy Crate',
    dimensions: '75×45×29cm',
    weight: 'Up to 25kg',
    icon: Cuboid,
  },
]
