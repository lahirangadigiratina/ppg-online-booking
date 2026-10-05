import {
  Ban,
  Banknote,
  Bomb,
  FlaskConical,
  Package,
  PawPrint,
  Pill,
  Snowflake,
  type LucideIcon,
} from 'lucide-react'

export type DangerousGoodsItem = {
  id: string
  title: string
  description: string
  icon: LucideIcon
}

export const DANGEROUS_GOODS_ITEMS: DangerousGoodsItem[] = [
  {
    id: 'illegal',
    title: 'Illegal Goods',
    description: 'Illegal or stolen goods.',
    icon: Ban,
  },
  {
    id: 'weapons',
    title: 'Weapons & Explosives',
    description:
      'Firearms, weapons, ammunition, explosives and fireworks',
    icon: Bomb,
  },
  {
    id: 'hazardous',
    title: 'Hazardous Materials',
    description:
      'Radioactive, corrosive, toxic, flammable, oxidising or otherwise hazardous substances',
    icon: FlaskConical,
  },
  {
    id: 'cash',
    title: 'Cash & Valuables',
    description:
      'Cash, bullion, negotiable instruments, securities or similar valuables',
    icon: Banknote,
  },
  {
    id: 'animals',
    title: 'Live Animals & Biological Materials',
    description:
      'Live animals, human or animal remains and biological materials.',
    icon: PawPrint,
  },
  {
    id: 'medicines',
    title: 'Medicines',
    description:
      'Prescription medicines, controlled drugs or pharmaceuticals unless accepted under the selected service.',
    icon: Pill,
  },
  {
    id: 'perishables',
    title: 'Perishables',
    description:
      'Perishable goods or goods requiring refrigeration or temperature control',
    icon: Snowflake,
  },
  {
    id: 'specialist',
    title: 'Specialist Handling',
    description:
      'Any goods requiring specialist handling that are not expressly accepted through PARCELPOINT Go',
    icon: Package,
  },
]
