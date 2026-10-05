import {
  BookOpen,
  Boxes,
  Briefcase,
  Box,
  Luggage,
  Mail,
  PackageOpen,
  ShoppingBag,
  Cuboid,
} from 'lucide-react'
import type { ParcelSizeOption } from './ParcelSizeCard'

export const PARCEL_SIZE_OPTIONS: ParcelSizeOption[] = [
  {
    id: 'pouch',
    label: 'Pouch',
    dimensions: '20×10×5cm',
    weight: 'Up to 250g',
    icon: Mail,
  },
  {
    id: 'satchel',
    label: 'Satchel',
    dimensions: '25×15×5cm',
    weight: 'Up to 500g',
    icon: BookOpen,
  },
  {
    id: 'handbag',
    label: 'Handbag',
    dimensions: '25×15×10cm',
    weight: 'Up to 1kg',
    icon: ShoppingBag,
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
    icon: Cuboid,
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
    icon: PackageOpen,
  },
]
