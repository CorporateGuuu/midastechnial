import Link from 'next/link'

interface Category {
  name: string
  href: string
  description: string
  itemCount: number
  hasNewBadge?: boolean
  subcategories?: Category[]
}

interface CategoryCardProps {
  category: Category
  level?: number
}

const categories = [
  {
    name: 'Apple',
    href: '/products?category=apple',
    description: 'iPhone, iPad, MacBook Parts',
    itemCount: 245
  },
  {
    name: 'Samsung',
    href: '/products?category=samsung',
    description: 'Galaxy Series & Book Parts',
    itemCount: 3877
  },
  {
    name: 'Motorola',
    href: '/products?category=motorola',
    description: 'Moto G & Edge Parts',
    itemCount: 67
  },
  {
    name: 'Google',
    href: '/products?category=google',
    description: 'Pixel Series Parts',
    itemCount: 43
  },
  {
    name: 'Other Parts',
    href: '/products?category=other-parts',
    description: 'Various Device Parts',
    itemCount: 156
  },
  {
    name: 'Game Console',
    href: '/products?category=game-console',
    description: 'Gaming Consoles & Parts',
    itemCount: 78,
    subcategories: [
      {
        name: 'Nintendo',
        href: '/products?category=game-console&subcategory=nintendo',
        description: 'Nintendo Consoles',
        itemCount: 12,
        subcategories: [
          { name: 'Switch Lite', href: '/products?category=game-console&subcategory=switch-lite', description: 'Compact Nintendo Switch', itemCount: 5 },
          { name: 'Switch', href: '/products?category=game-console&subcategory=switch', description: 'Standard Nintendo Switch', itemCount: 8 },
          { name: 'Switch OLED', href: '/products?category=game-console&subcategory=switch-oled', description: 'OLED Nintendo Switch', itemCount: 6 },
          { name: 'Switch Pro', href: '/products?category=game-console&subcategory=switch-pro', description: 'Pro Nintendo Switch', itemCount: 3 },
          { name: 'Wii U', href: '/products?category=game-console&subcategory=wii-u', description: 'Wii U Console', itemCount: 4 },
          { name: 'Wii U Gamepad', href: '/products?category=game-console&subcategory=wii-u-gamepad', description: 'Wii U Gamepad', itemCount: 2 },
          { name: '3DS XL', href: '/products?category=game-console&subcategory=3ds-xl', description: '3DS XL Console', itemCount: 3 },
          { name: '3DS', href: '/products?category=game-console&subcategory=3ds', description: '3DS Console', itemCount: 4 },
          { name: '2DS XL', href: '/products?category=game-console&subcategory=2ds-xl', description: '2DS XL Console', itemCount: 2 },
          { name: '2DS', href: '/products?category=game-console&subcategory=2ds', description: '2DS Console', itemCount: 3 },
          { name: 'DS Lite', href: '/products?category=game-console&subcategory=ds-lite', description: 'DS Lite Console', itemCount: 2 },
          { name: 'Switch 2', href: '/products?category=game-console&subcategory=switch-2', description: 'Next-Gen Switch', itemCount: 1 }
        ]
      },
      {
        name: 'Sony',
        href: '/products?category=game-console&subcategory=sony',
        description: 'PlayStation Consoles',
        itemCount: 18,
        subcategories: [
          { name: 'PlayStation 5 Pro', href: '/products?category=game-console&subcategory=ps5-pro', description: 'PS5 Pro Console', itemCount: 2 },
          { name: 'PlayStation 5 Slim', href: '/products?category=game-console&subcategory=ps5-slim', description: 'PS5 Slim Console', itemCount: 4 },
          { name: 'PlayStation 5', href: '/products?category=game-console&subcategory=ps5', description: 'PS5 Console', itemCount: 6 },
          { name: 'PlayStation 4 Pro', href: '/products?category=game-console&subcategory=ps4-pro', description: 'PS4 Pro Console', itemCount: 3 },
          { name: 'PlayStation 4 Slim', href: '/products?category=game-console&subcategory=ps4-slim', description: 'PS4 Slim Console', itemCount: 2 },
          { name: 'PlayStation 4', href: '/products?category=game-console&subcategory=ps4', description: 'PS4 Console', itemCount: 5 },
          { name: 'PlayStation 3', href: '/products?category=game-console&subcategory=ps3', description: 'PS3 Console', itemCount: 3 }
        ]
      },
      {
        name: 'Microsoft',
        href: '/products?category=game-console&subcategory=microsoft',
        description: 'Xbox Consoles',
        itemCount: 15,
        subcategories: [
          { name: 'Xbox Series X', href: '/products?category=game-console&subcategory=xbox-series-x', description: 'Xbox Series X Console', itemCount: 4 },
          { name: 'Xbox Series S', href: '/products?category=game-console&subcategory=xbox-series-s', description: 'Xbox Series S Console', itemCount: 3 },
          { name: 'Xbox One X', href: '/products?category=game-console&subcategory=xbox-one-x', description: 'Xbox One X Console', itemCount: 2 },
          { name: 'Xbox One S', href: '/products?category=game-console&subcategory=xbox-one-s', description: 'Xbox One S Console', itemCount: 3 },
          { name: 'Xbox One', href: '/products?category=game-console&subcategory=xbox-one', description: 'Xbox One Console', itemCount: 4 },
          { name: 'Xbox 360 E', href: '/products?category=game-console&subcategory=xbox-360-e', description: 'Xbox 360 E Console', itemCount: 2 },
          { name: 'Xbox 360 S', href: '/products?category=game-console&subcategory=xbox-360-s', description: 'Xbox 360 S Console', itemCount: 2 },
          { name: 'Xbox 360', href: '/products?category=game-console&subcategory=xbox-360', description: 'Xbox 360 Console', itemCount: 3 }
        ]
      },
      {
        name: 'Oculus',
        href: '/products?category=game-console&subcategory=oculus',
        description: 'VR Headsets',
        itemCount: 3,
        subcategories: [
          { name: 'Meta Quest 3S (2024)', href: '/products?category=game-console&subcategory=meta-quest-3s', description: 'Latest Meta Quest VR', itemCount: 1 },
          { name: 'Meta Quest 3 (2023)', href: '/products?category=game-console&subcategory=meta-quest-3', description: 'Meta Quest 3 VR', itemCount: 1 },
          { name: 'Meta Quest 2 (2020)', href: '/products?category=game-console&subcategory=meta-quest-2', description: 'Meta Quest 2 VR', itemCount: 2 }
        ]
      },
      {
        name: 'Valve',
        href: '/products?category=game-console&subcategory=valve',
        description: 'Steam Gaming',
        itemCount: 2,
        subcategories: [
          { name: 'Steam Deck 7.4" (2023)', href: '/products?category=game-console&subcategory=steam-deck-7-4', description: 'Large Steam Deck', itemCount: 1 },
          { name: 'Steam Deck 7" (2022)', href: '/products?category=game-console&subcategory=steam-deck-7', description: 'Standard Steam Deck', itemCount: 1 }
        ]
      },
      {
        name: 'AsUs',
        href: '/products?category=game-console&subcategory=asus',
        description: 'ROG Gaming',
        itemCount: 1,
        subcategories: [
          { name: 'ROG Ally 7" (2023)', href: '/products?category=game-console&subcategory=rog-ally', description: 'Asus ROG Ally Handheld', itemCount: 1 }
        ]
      }
    ]
  },
  {
    name: 'Accessories',
    href: '/products?category=accessories',
    description: 'Device Accessories',
    itemCount: 92,
    hasNewBadge: true
  },
  {
    name: 'Tools & Supplies',
    href: '/products?category=tools-supplies',
    description: 'Repair Tools & Supplies',
    itemCount: 134
  },
  {
    name: 'Refurbishing',
    href: '/products?category=refurbishing',
    description: 'Refurbished Devices',
    itemCount: 28,
    subcategories: [
      {
        name: 'Other',
        href: '/products?category=refurbishing&subcategory=other',
        description: 'Miscellaneous Devices',
        itemCount: 8,
        subcategories: [
          { name: 'Z Fold 3 5G', href: '/products?category=refurbishing&subcategory=z-fold-3-5g', description: 'Samsung Z Fold 3', itemCount: 1 },
          { name: 'Z Fold 2 5G', href: '/products?category=refurbishing&subcategory=z-fold-2-5g', description: 'Samsung Z Fold 2', itemCount: 1 },
          { name: 'Fold 4G', href: '/products?category=refurbishing&subcategory=fold-4g', description: 'Samsung Fold 4G', itemCount: 1 },
          { name: 'Z Flip 3 5G', href: '/products?category=refurbishing&subcategory=z-flip-3-5g', description: 'Samsung Z Flip 3', itemCount: 1 },
          { name: 'Z Flip 4G', href: '/products?category=refurbishing&subcategory=z-flip-4g', description: 'Samsung Z Flip 4G', itemCount: 1 },
          { name: 'Mega 2 (2014)', href: '/products?category=refurbishing&subcategory=mega-2-2014', description: 'Samsung Mega 2', itemCount: 1 },
          { name: 'Mega 6.3 (2013)', href: '/products?category=refurbishing&subcategory=mega-6-3-2013', description: 'Samsung Mega 6.3', itemCount: 1 },
          { name: 'Lenovo 300E', href: '/products?category=refurbishing&subcategory=lenovo-300e', description: 'Lenovo 300E', itemCount: 1 }
        ]
      },
      {
        name: 'G Series',
        href: '/products?category=refurbishing&subcategory=g-series',
        description: 'Motorola G Series',
        itemCount: 13,
        subcategories: [
          { name: 'Moto G71 5G', href: '/products?category=refurbishing&subcategory=moto-g71-5g', description: 'Moto G71 5G (2022)', itemCount: 1 },
          { name: 'Moto G41', href: '/products?category=refurbishing&subcategory=moto-g41', description: 'Moto G41 (2022)', itemCount: 1 },
          { name: 'Moto G22', href: '/products?category=refurbishing&subcategory=moto-g22', description: 'Moto G22 (2022)', itemCount: 1 },
          { name: 'Moto G200 5G', href: '/products?category=refurbishing&subcategory=moto-g200-5g', description: 'Moto G200 5G (2022)', itemCount: 1 },
          { name: 'Moto G Power', href: '/products?category=refurbishing&subcategory=moto-g-power', description: 'Moto G Power (2022)', itemCount: 1 },
          { name: 'Moto G Stylus 5G', href: '/products?category=refurbishing&subcategory=moto-g-stylus-5g-2022', description: 'Moto G Stylus 5G (2022)', itemCount: 1 },
          { name: 'Moto G Stylus 4G', href: '/products?category=refurbishing&subcategory=moto-g-stylus-4g', description: 'Moto G Stylus 4G (2022)', itemCount: 1 },
          { name: 'Moto G Pure', href: '/products?category=refurbishing&subcategory=moto-g-pure', description: 'Moto G Pure (2021)', itemCount: 1 },
          { name: 'Moto G Stylus 5G', href: '/products?category=refurbishing&subcategory=moto-g-stylus-5g-2021', description: 'Moto G Stylus 5G (2021)', itemCount: 1 },
          { name: 'Moto G60', href: '/products?category=refurbishing&subcategory=moto-g60', description: 'Moto G60 (2021)', itemCount: 1 },
          { name: 'Moto G60S', href: '/products?category=refurbishing&subcategory=moto-g60s', description: 'Moto G60S (2021)', itemCount: 1 },
          { name: 'Moto G51 5G', href: '/products?category=refurbishing&subcategory=moto-g51-5g', description: 'Moto G51 5G (2021)', itemCount: 1 }
        ]
      },
      {
        name: 'Google',
        href: '/products?category=refurbishing&subcategory=google',
        description: 'Pixel Phones',
        itemCount: 18,
        subcategories: [
          { name: 'Pixel 7', href: '/products?category=refurbishing&subcategory=pixel-7', description: 'Google Pixel 7', itemCount: 1 },
          { name: 'Pixel 6a', href: '/products?category=refurbishing&subcategory=pixel-6a', description: 'Google Pixel 6a', itemCount: 1 },
          { name: 'Pixel 6 Pro', href: '/products?category=refurbishing&subcategory=pixel-6-pro', description: 'Google Pixel 6 Pro', itemCount: 1 },
          { name: 'Pixel 6', href: '/products?category=refurbishing&subcategory=pixel-6', description: 'Google Pixel 6', itemCount: 1 },
          { name: 'Pixel 5a 5G', href: '/products?category=refurbishing&subcategory=pixel-5a-5g', description: 'Google Pixel 5a 5G', itemCount: 1 },
          { name: 'Pixel 5', href: '/products?category=refurbishing&subcategory=pixel-5', description: 'Google Pixel 5', itemCount: 1 },
          { name: 'Pixel 4a 5G', href: '/products?category=refurbishing&subcategory=pixel-4a-5g', description: 'Google Pixel 4a 5G', itemCount: 1 },
          { name: 'Pixel 4a', href: '/products?category=refurbishing&subcategory=pixel-4a', description: 'Google Pixel 4a', itemCount: 1 },
          { name: 'Pixel 4 XL', href: '/products?category=refurbishing&subcategory=pixel-4-xl', description: 'Google Pixel 4 XL', itemCount: 1 },
          { name: 'Pixel 4', href: '/products?category=refurbishing&subcategory=pixel-4', description: 'Google Pixel 4', itemCount: 1 },
          { name: 'Pixel 3a XL', href: '/products?category=refurbishing&subcategory=pixel-3a-xl', description: 'Google Pixel 3a XL', itemCount: 1 },
          { name: 'Pixel 3a', href: '/products?category=refurbishing&subcategory=pixel-3a', description: 'Google Pixel 3a', itemCount: 1 },
          { name: 'Pixel 3 XL', href: '/products?category=refurbishing&subcategory=pixel-3-xl', description: 'Google Pixel 3 XL', itemCount: 1 },
          { name: 'Pixel 3', href: '/products?category=refurbishing&subcategory=pixel-3', description: 'Google Pixel 3', itemCount: 1 },
          { name: 'Pixel 2 XL', href: '/products?category=refurbishing&subcategory=pixel-2-xl', description: 'Google Pixel 2 XL', itemCount: 1 },
          { name: 'Pixel 2', href: '/products?category=refurbishing&subcategory=pixel-2', description: 'Google Pixel 2', itemCount: 1 }
        ]
      },
      {
        name: 'Galaxy Tab Series',
        href: '/products?category=refurbishing&subcategory=galaxy-tab',
        description: 'Samsung Tablets',
        itemCount: 10,
        subcategories: [
          { name: 'Tab A 10.1" (2019)', href: '/products?category=refurbishing&subcategory=tab-a-10-1-2019', description: 'Galaxy Tab A 10.1"', itemCount: 1 },
          { name: 'Tab A 10.5" (2018)', href: '/products?category=refurbishing&subcategory=tab-a-10-5-2018', description: 'Galaxy Tab A 10.5"', itemCount: 1 },
          { name: 'Tab A 8.0" (2018)', href: '/products?category=refurbishing&subcategory=tab-a-8-0-2018', description: 'Galaxy Tab A 8.0"', itemCount: 1 },
          { name: 'Tab A 8.0" (2017)', href: '/products?category=refurbishing&subcategory=tab-a-8-0-2017', description: 'Galaxy Tab A 8.0"', itemCount: 1 },
          { name: 'Tab A 10.1" (2016)', href: '/products?category=refurbishing&subcategory=tab-a-10-1-2016', description: 'Galaxy Tab A 10.1"', itemCount: 1 },
          { name: 'Tab E 8.0" (2016)', href: '/products?category=refurbishing&subcategory=tab-e-8-0-2016', description: 'Galaxy Tab E 8.0"', itemCount: 1 },
          { name: 'Tab E 9.6" (2015)', href: '/products?category=refurbishing&subcategory=tab-e-9-6-2015', description: 'Galaxy Tab E 9.6"', itemCount: 1 },
          { name: 'Tab 4 10.1" (2014)', href: '/products?category=refurbishing&subcategory=tab-4-10-1-2014', description: 'Galaxy Tab 4 10.1"', itemCount: 1 },
          { name: 'Tab 3 8.0" (2013)', href: '/products?category=refurbishing&subcategory=tab-3-8-0-2013', description: 'Galaxy Tab 3 8.0"', itemCount: 1 },
          { name: 'Tab 3 7.0" (2013)', href: '/products?category=refurbishing&subcategory=tab-3-7-0-2013', description: 'Galaxy Tab 3 7.0"', itemCount: 1 }
        ]
      },
      {
        name: 'Galaxy A Series',
        href: '/products?category=refurbishing&subcategory=galaxy-a',
        description: 'Samsung A Series',
        itemCount: 35,
        subcategories: [
          { name: 'A9 Pro', href: '/products?category=refurbishing&subcategory=a9-pro', description: 'Galaxy A9 Pro (2016)', itemCount: 1 },
          { name: 'A90 5G', href: '/products?category=refurbishing&subcategory=a90-5g', description: 'Galaxy A90 5G (2019)', itemCount: 1 },
          { name: 'A80', href: '/products?category=refurbishing&subcategory=a80', description: 'Galaxy A80 (2019)', itemCount: 1 },
          { name: 'A8 Plus', href: '/products?category=refurbishing&subcategory=a8-plus', description: 'Galaxy A8 Plus (2018)', itemCount: 1 },
          { name: 'A8', href: '/products?category=refurbishing&subcategory=a8', description: 'Galaxy A8 (2018)', itemCount: 1 },
          { name: 'A73', href: '/products?category=refurbishing&subcategory=a73', description: 'Galaxy A73 (2022)', itemCount: 1 },
          { name: 'A72', href: '/products?category=refurbishing&subcategory=a72', description: 'Galaxy A72 (2021)', itemCount: 1 },
          { name: 'A71 5G', href: '/products?category=refurbishing&subcategory=a71-5g', description: 'Galaxy A71 5G (2020)', itemCount: 1 },
          { name: 'A71', href: '/products?category=refurbishing&subcategory=a71', description: 'Galaxy A71 (2020)', itemCount: 1 },
          { name: 'A70', href: '/products?category=refurbishing&subcategory=a70', description: 'Galaxy A70 (2019)', itemCount: 1 },
          { name: 'A7 (2018)', href: '/products?category=refurbishing&subcategory=a7-2018', description: 'Galaxy A7 (2018)', itemCount: 1 },
          { name: 'A7 (2017)', href: '/products?category=refurbishing&subcategory=a7-2017', description: 'Galaxy A7 (2017)', itemCount: 1 },
          { name: 'A7 (2016)', href: '/products?category=refurbishing&subcategory=a7-2016', description: 'Galaxy A7 (2016)', itemCount: 1 },
          { name: 'A52 4G', href: '/products?category=refurbishing&subcategory=a52-4g', description: 'Galaxy A52 4G (2021)', itemCount: 1 },
          { name: 'A51 5G', href: '/products?category=refurbishing&subcategory=a51-5g', description: 'Galaxy A51 5G (2020)', itemCount: 1 },
          { name: 'A51 4G', href: '/products?category=refurbishing&subcategory=a51-4g', description: 'Galaxy A51 4G (2019)', itemCount: 1 },
          { name: 'A50s', href: '/products?category=refurbishing&subcategory=a50s', description: 'Galaxy A50s (2019)', itemCount: 1 },
          { name: 'A50', href: '/products?category=refurbishing&subcategory=a50', description: 'Galaxy A50 (2019)', itemCount: 1 },
          { name: 'A5', href: '/products?category=refurbishing&subcategory=a5', description: 'Galaxy A5 (2017)', itemCount: 1 },
          { name: 'A42 5G', href: '/products?category=refurbishing&subcategory=a42-5g', description: 'Galaxy A42 5G (2020)', itemCount: 1 },
          { name: 'A41', href: '/products?category=refurbishing&subcategory=a41', description: 'Galaxy A41 (2020)', itemCount: 1 },
          { name: 'A40', href: '/products?category=refurbishing&subcategory=a40', description: 'Galaxy A40 (2019)', itemCount: 1 },
          { name: 'A33 5G', href: '/products?category=refurbishing&subcategory=a33-5g', description: 'Galaxy A33 5G (2022)', itemCount: 1 },
          { name: 'A32 5G', href: '/products?category=refurbishing&subcategory=a32-5g', description: 'Galaxy A32 5G (2021)', itemCount: 1 },
          { name: 'A32', href: '/products?category=refurbishing&subcategory=a32', description: 'Galaxy A32 (2021)', itemCount: 1 },
          { name: 'A31', href: '/products?category=refurbishing&subcategory=a31', description: 'Galaxy A31 (2020)', itemCount: 1 },
          { name: 'A30s', href: '/products?category=refurbishing&subcategory=a30s', description: 'Galaxy A30s (2019)', itemCount: 1 },
          { name: 'A30', href: '/products?category=refurbishing&subcategory=a30', description: 'Galaxy A30 (2019)', itemCount: 1 },
          { name: 'A3', href: '/products?category=refurbishing&subcategory=a3', description: 'Galaxy A3 (2017)', itemCount: 1 },
          { name: 'A22 5G', href: '/products?category=refurbishing&subcategory=a22-5g', description: 'Galaxy A22 5G (2021)', itemCount: 1 },
          { name: 'A21s', href: '/products?category=refurbishing&subcategory=a21s', description: 'Galaxy A21s (2020)', itemCount: 1 },
          { name: 'A21', href: '/products?category=refurbishing&subcategory=a21', description: 'Galaxy A21 (2020)', itemCount: 1 },
          { name: 'A20s', href: '/products?category=refurbishing&subcategory=a20s', description: 'Galaxy A20s (2019)', itemCount: 1 },
          { name: 'A20e', href: '/products?category=refurbishing&subcategory=a20e', description: 'Galaxy A20e (2019)', itemCount: 1 },
          { name: 'A20', href: '/products?category=refurbishing&subcategory=a20', description: 'Galaxy A20 (2019)', itemCount: 1 },
          { name: 'A12', href: '/products?category=refurbishing&subcategory=a12', description: 'Galaxy A12 (2020)', itemCount: 1 },
          { name: 'A11', href: '/products?category=refurbishing&subcategory=a11', description: 'Galaxy A11 (2020)', itemCount: 1 },
          { name: 'A10s', href: '/products?category=refurbishing&subcategory=a10s', description: 'Galaxy A10s (2019)', itemCount: 1 },
          { name: 'A10e', href: '/products?category=refurbishing&subcategory=a10e', description: 'Galaxy A10e (2019)', itemCount: 1 },
          { name: 'A10', href: '/products?category=refurbishing&subcategory=a10', description: 'Galaxy A10 (2019)', itemCount: 1 },
          { name: 'A02s', href: '/products?category=refurbishing&subcategory=a02s', description: 'Galaxy A02s (2020)', itemCount: 1 },
          { name: 'A02', href: '/products?category=refurbishing&subcategory=a02', description: 'Galaxy A02 (2020)', itemCount: 1 },
          { name: 'A01', href: '/products?category=refurbishing&subcategory=a01', description: 'Galaxy A01 (2020)', itemCount: 1 }
        ]
      },
      {
        name: 'Galaxy J Series',
        href: '/products?category=refurbishing&subcategory=galaxy-j',
        description: 'Samsung J Series',
        itemCount: 12,
        subcategories: [
          { name: 'J7 Refine', href: '/products?category=refurbishing&subcategory=j7-refine', description: 'Galaxy J7 Refine (2018)', itemCount: 1 },
          { name: 'J7 Prime', href: '/products?category=refurbishing&subcategory=j7-prime', description: 'Galaxy J7 Prime (2016)', itemCount: 1 },
          { name: 'J7 (2017)', href: '/products?category=refurbishing&subcategory=j7-2017', description: 'Galaxy J7 (2017)', itemCount: 1 },
          { name: 'J7 (2016)', href: '/products?category=refurbishing&subcategory=j7-2016', description: 'Galaxy J7 (2016)', itemCount: 1 },
          { name: 'J7 (2015)', href: '/products?category=refurbishing&subcategory=j7-2015', description: 'Galaxy J7 (2015)', itemCount: 1 },
          { name: 'J5 (2016)', href: '/products?category=refurbishing&subcategory=j5-2016', description: 'Galaxy J5 (2016)', itemCount: 1 },
          { name: 'J5 (2015)', href: '/products?category=refurbishing&subcategory=j5-2015', description: 'Galaxy J5 (2015)', itemCount: 1 },
          { name: 'J4', href: '/products?category=refurbishing&subcategory=j4', description: 'Galaxy J4 (2018)', itemCount: 1 },
          { name: 'J3 (2018)', href: '/products?category=refurbishing&subcategory=j3-2018', description: 'Galaxy J3 (2018)', itemCount: 1 },
          { name: 'J3 (2017)', href: '/products?category=refurbishing&subcategory=j3-2017', description: 'Galaxy J3 (2017)', itemCount: 1 },
          { name: 'J3 (2016)', href: '/products?category=refurbishing&subcategory=j3-2016', description: 'Galaxy J3 (2016)', itemCount: 1 }
        ]
      },
      {
        name: 'Galaxy Note Series',
        href: '/products?category=refurbishing&subcategory=galaxy-note',
        description: 'Samsung Note Series',
        itemCount: 12,
        subcategories: [
          { name: 'Note 20 Ultra 5G', href: '/products?category=refurbishing&subcategory=note-20-ultra-5g', description: 'Galaxy Note 20 Ultra', itemCount: 1 },
          { name: 'Note 20 5G', href: '/products?category=refurbishing&subcategory=note-20-5g', description: 'Galaxy Note 20', itemCount: 1 },
          { name: 'Note 10 Plus 5G', href: '/products?category=refurbishing&subcategory=note-10-plus-5g', description: 'Galaxy Note 10 Plus', itemCount: 1 },
          { name: 'Note 10 Lite', href: '/products?category=refurbishing&subcategory=note-10-lite', description: 'Galaxy Note 10 Lite', itemCount: 1 },
          { name: 'Note 10', href: '/products?category=refurbishing&subcategory=note-10', description: 'Galaxy Note 10', itemCount: 1 },
          { name: 'Note 9', href: '/products?category=refurbishing&subcategory=note-9', description: 'Galaxy Note 9', itemCount: 1 },
          { name: 'Note 8', href: '/products?category=refurbishing&subcategory=note-8', description: 'Galaxy Note 8', itemCount: 1 },
          { name: 'Note 7', href: '/products?category=refurbishing&subcategory=note-7', description: 'Galaxy Note 7', itemCount: 1 },
          { name: 'Note 5', href: '/products?category=refurbishing&subcategory=note-5', description: 'Galaxy Note 5', itemCount: 1 },
          { name: 'Note 4', href: '/products?category=refurbishing&subcategory=note-4', description: 'Galaxy Note 4', itemCount: 1 },
          { name: 'Note 3', href: '/products?category=refurbishing&subcategory=note-3', description: 'Galaxy Note 3', itemCount: 1 },
          { name: 'Note 2', href: '/products?category=refurbishing&subcategory=note-2', description: 'Galaxy Note 2', itemCount: 1 }
        ]
      },
      {
        name: 'Galaxy S Series',
        href: '/products?category=refurbishing&subcategory=galaxy-s',
        description: 'Samsung S Series',
        itemCount: 29,
        subcategories: [
          { name: 'S24 Ultra 5G', href: '/products?category=refurbishing&subcategory=s24-ultra-5g', description: 'Galaxy S24 Ultra', itemCount: 1 },
          { name: 'S24 Plus 5G', href: '/products?category=refurbishing&subcategory=s24-plus-5g', description: 'Galaxy S24 Plus', itemCount: 1 },
          { name: 'S24 5G', href: '/products?category=refurbishing&subcategory=s24-5g', description: 'Galaxy S24', itemCount: 1 },
          { name: 'S23 Ultra 5G', href: '/products?category=refurbishing&subcategory=s23-ultra-5g', description: 'Galaxy S23 Ultra', itemCount: 1 },
          { name: 'S23 Plus 5G', href: '/products?category=refurbishing&subcategory=s23-plus-5g', description: 'Galaxy S23 Plus', itemCount: 1 },
          { name: 'S23 5G', href: '/products?category=refurbishing&subcategory=s23-5g', description: 'Galaxy S23', itemCount: 1 },
          { name: 'S22 Ultra 5G', href: '/products?category=refurbishing&subcategory=s22-ultra-5g', description: 'Galaxy S22 Ultra', itemCount: 1 },
          { name: 'S22 Plus 5G', href: '/products?category=refurbishing&subcategory=s22-plus-5g', description: 'Galaxy S22 Plus', itemCount: 1 },
          { name: 'S22 5G', href: '/products?category=refurbishing&subcategory=s22-5g', description: 'Galaxy S22', itemCount: 1 },
          { name: 'S21 FE', href: '/products?category=refurbishing&subcategory=s21-fe', description: 'Galaxy S21 FE', itemCount: 1 },
          { name: 'S21 Ultra', href: '/products?category=refurbishing&subcategory=s21-ultra', description: 'Galaxy S21 Ultra', itemCount: 1 },
          { name: 'S21 Plus', href: '/products?category=refurbishing&subcategory=s21-plus', description: 'Galaxy S21 Plus', itemCount: 1 },
          { name: 'S21', href: '/products?category=refurbishing&subcategory=s21', description: 'Galaxy S21', itemCount: 1 },
          { name: 'S20 FE 5G', href: '/products?category=refurbishing&subcategory=s20-fe-5g', description: 'Galaxy S20 FE', itemCount: 1 },
          { name: 'S20 Ultra 5G', href: '/products?category=refurbishing&subcategory=s20-ultra-5g', description: 'Galaxy S20 Ultra', itemCount: 1 },
          { name: 'S20 Plus 5G', href: '/products?category=refurbishing&subcategory=s20-plus-5g', description: 'Galaxy S20 Plus', itemCount: 1 },
          { name: 'S20 5G', href: '/products?category=refurbishing&subcategory=s20-5g', description: 'Galaxy S20', itemCount: 1 },
          { name: 'S10 Lite', href: '/products?category=refurbishing&subcategory=s10-lite', description: 'Galaxy S10 Lite', itemCount: 1 },
          { name: 'S10 5G', href: '/products?category=refurbishing&subcategory=s10-5g', description: 'Galaxy S10 5G', itemCount: 1 },
          { name: 'S10 Plus', href: '/products?category=refurbishing&subcategory=s10-plus', description: 'Galaxy S10 Plus', itemCount: 1 },
          { name: 'S10', href: '/products?category=refurbishing&subcategory=s10', description: 'Galaxy S10', itemCount: 1 },
          { name: 'S10e', href: '/products?category=refurbishing&subcategory=s10e', description: 'Galaxy S10e', itemCount: 1 },
          { name: 'S9 Plus', href: '/products?category=refurbishing&subcategory=s9-plus', description: 'Galaxy S9 Plus', itemCount: 1 },
          { name: 'S9', href: '/products?category=refurbishing&subcategory=s9', description: 'Galaxy S9', itemCount: 1 },
          { name: 'S8 Plus', href: '/products?category=refurbishing&subcategory=s8-plus', description: 'Galaxy S8 Plus', itemCount: 1 },
          { name: 'S8 Active', href: '/products?category=refurbishing&subcategory=s8-active', description: 'Galaxy S8 Active', itemCount: 1 },
          { name: 'S8', href: '/products?category=refurbishing&subcategory=s8', description: 'Galaxy S8', itemCount: 1 },
          { name: 'S7 Edge', href: '/products?category=refurbishing&subcategory=s7-edge', description: 'Galaxy S7 Edge', itemCount: 1 },
          { name: 'S7 Active', href: '/products?category=refurbishing&subcategory=s7-active', description: 'Galaxy S7 Active', itemCount: 1 },
          { name: 'S7', href: '/products?category=refurbishing&subcategory=s7', description: 'Galaxy S7', itemCount: 1 },
          { name: 'S6 Edge Plus', href: '/products?category=refurbishing&subcategory=s6-edge-plus', description: 'Galaxy S6 Edge Plus', itemCount: 1 },
          { name: 'S6 Edge', href: '/products?category=refurbishing&subcategory=s6-edge', description: 'Galaxy S6 Edge', itemCount: 1 },
          { name: 'S6 Active', href: '/products?category=refurbishing&subcategory=s6-active', description: 'Galaxy S6 Active', itemCount: 1 },
          { name: 'S6', href: '/products?category=refurbishing&subcategory=s6', description: 'Galaxy S6', itemCount: 1 },
          { name: 'S5 Active', href: '/products?category=refurbishing&subcategory=s5-active', description: 'Galaxy S5 Active', itemCount: 1 },
          { name: 'S5', href: '/products?category=refurbishing&subcategory=s5', description: 'Galaxy S5', itemCount: 1 },
          { name: 'S4', href: '/products?category=refurbishing&subcategory=s4', description: 'Galaxy S4', itemCount: 1 },
          { name: 'S3', href: '/products?category=refurbishing&subcategory=s3', description: 'Galaxy S3', itemCount: 1 }
        ]
      },
      {
        name: 'Watch',
        href: '/products?category=refurbishing&subcategory=watch',
        description: 'Samsung Galaxy Watches',
        itemCount: 20,
        subcategories: [
          { name: 'Series Ultra (1st Gen)', href: '/products?category=refurbishing&subcategory=watch-ultra-49mm', description: 'Galaxy Watch Ultra 49MM', itemCount: 1 },
          { name: 'Series 8 (45MM)', href: '/products?category=refurbishing&subcategory=watch-8-45mm', description: 'Galaxy Watch 8 45MM', itemCount: 1 },
          { name: 'Series 8 (41MM)', href: '/products?category=refurbishing&subcategory=watch-8-41mm', description: 'Galaxy Watch 8 41MM', itemCount: 1 },
          { name: 'Series SE (2nd Gen)', href: '/products?category=refurbishing&subcategory=watch-se-2-44mm', description: 'Galaxy Watch SE 44MM', itemCount: 1 },
          { name: 'Series SE (2nd Gen)', href: '/products?category=refurbishing&subcategory=watch-se-2-40mm', description: 'Galaxy Watch SE 40MM', itemCount: 1 },
          { name: 'Series 7 (45MM)', href: '/products?category=refurbishing&subcategory=watch-7-45mm', description: 'Galaxy Watch 7 45MM', itemCount: 1 },
          { name: 'Series 7 (41MM)', href: '/products?category=refurbishing&subcategory=watch-7-41mm', description: 'Galaxy Watch 7 41MM', itemCount: 1 },
          { name: 'Series 6 (44MM)', href: '/products?category=refurbishing&subcategory=watch-6-44mm', description: 'Galaxy Watch 6 44MM', itemCount: 1 },
          { name: 'Series 6 (40MM)', href: '/products?category=refurbishing&subcategory=watch-6-40mm', description: 'Galaxy Watch 6 40MM', itemCount: 1 },
          { name: 'Series SE (44MM)', href: '/products?category=refurbishing&subcategory=watch-se-44mm', description: 'Galaxy Watch SE 44MM', itemCount: 1 },
          { name: 'Series SE (40MM)', href: '/products?category=refurbishing&subcategory=watch-se-40mm', description: 'Galaxy Watch SE 40MM', itemCount: 1 },
          { name: 'Series 5 (44MM)', href: '/products?category=refurbishing&subcategory=watch-5-44mm', description: 'Galaxy Watch 5 44MM', itemCount: 1 },
          { name: 'Series 5 (40MM)', href: '/products?category=refurbishing&subcategory=watch-5-40mm', description: 'Galaxy Watch 5 40MM', itemCount: 1 },
          { name: 'Series 4 (44MM)', href: '/products?category=refurbishing&subcategory=watch-4-44mm', description: 'Galaxy Watch 4 44MM', itemCount: 1 },
          { name: 'Series 4 (40MM)', href: '/products?category=refurbishing&subcategory=watch-4-40mm', description: 'Galaxy Watch 4 40MM', itemCount: 1 },
          { name: 'Series 3 (42MM)', href: '/products?category=refurbishing&subcategory=watch-3-42mm', description: 'Galaxy Watch 3 42MM', itemCount: 1 },
          { name: 'Series 3 (38MM)', href: '/products?category=refurbishing&subcategory=watch-3-38mm', description: 'Galaxy Watch 3 38MM', itemCount: 1 },
          { name: 'Series 2 (42MM)', href: '/products?category=refurbishing&subcategory=watch-2-42mm', description: 'Galaxy Watch 2 42MM', itemCount: 1 },
          { name: 'Series 2 (38MM)', href: '/products?category=refurbishing&subcategory=watch-2-38mm', description: 'Galaxy Watch 2 38MM', itemCount: 1 },
          { name: 'Series 1 (42MM)', href: '/products?category=refurbishing&subcategory=watch-1-42mm', description: 'Galaxy Watch 1 42MM', itemCount: 1 },
          { name: 'Series 1 (38MM)', href: '/products?category=refurbishing&subcategory=watch-1-38mm', description: 'Galaxy Watch 1 38MM', itemCount: 1 }
        ]
      },
      {
        name: 'iPad',
        href: '/products?category=refurbishing&subcategory=ipad',
        description: 'Apple iPads',
        itemCount: 21,
        subcategories: [
          { name: 'iPad Pro 12.9" 6th Gen', href: '/products?category=refurbishing&subcategory=ipad-pro-12-9-6th', description: 'iPad Pro 12.9" (2022)', itemCount: 1 },
          { name: 'iPad Pro 12.9" 5th Gen', href: '/products?category=refurbishing&subcategory=ipad-pro-12-9-5th', description: 'iPad Pro 12.9" (2021)', itemCount: 1 },
          { name: 'iPad Pro 12.9" 4th Gen', href: '/products?category=refurbishing&subcategory=ipad-pro-12-9-4th', description: 'iPad Pro 12.9" (2020)', itemCount: 1 },
          { name: 'iPad Pro 12.9" 3rd Gen', href: '/products?category=refurbishing&subcategory=ipad-pro-12-9-3rd', description: 'iPad Pro 12.9" (2018)', itemCount: 1 },
          { name: 'iPad Pro 12.9" 2nd Gen', href: '/products?category=refurbishing&subcategory=ipad-pro-12-9-2nd', description: 'iPad Pro 12.9" (2017)', itemCount: 1 },
          { name: 'iPad Pro 12.9" 1st Gen', href: '/products?category=refurbishing&subcategory=ipad-pro-12-9-1st', description: 'iPad Pro 12.9" (2015)', itemCount: 1 },
          { name: 'iPad Pro 11" 4th Gen', href: '/products?category=refurbishing&subcategory=ipad-pro-11-4th', description: 'iPad Pro 11" (2022)', itemCount: 1 },
          { name: 'iPad Pro 11" 3rd Gen', href: '/products?category=refurbishing&subcategory=ipad-pro-11-3rd', description: 'iPad Pro 11" (2021)', itemCount: 1 },
          { name: 'iPad Pro 11" 2nd Gen', href: '/products?category=refurbishing&subcategory=ipad-pro-11-2nd', description: 'iPad Pro 11" (2020)', itemCount: 1 },
          { name: 'iPad Pro 11" 1st Gen', href: '/products?category=refurbishing&subcategory=ipad-pro-11-1st', description: 'iPad Pro 11" (2018)', itemCount: 1 },
          { name: 'iPad Pro 10.5"', href: '/products?category=refurbishing&subcategory=ipad-pro-10-5', description: 'iPad Pro 10.5"', itemCount: 1 },
          { name: 'iPad Pro 9.7"', href: '/products?category=refurbishing&subcategory=ipad-pro-9-7', description: 'iPad Pro 9.7"', itemCount: 1 },
          { name: 'iPad 10', href: '/products?category=refurbishing&subcategory=ipad-10', description: 'iPad 10th Gen (2022)', itemCount: 1 },
          { name: 'iPad 9', href: '/products?category=refurbishing&subcategory=ipad-9', description: 'iPad 9th Gen (2021)', itemCount: 1 },
          { name: 'iPad 8', href: '/products?category=refurbishing&subcategory=ipad-8', description: 'iPad 8th Gen (2020)', itemCount: 1 },
          { name: 'iPad 7', href: '/products?category=refurbishing&subcategory=ipad-7', description: 'iPad 7th Gen (2019)', itemCount: 1 },
          { name: 'iPad 6', href: '/products?category=refurbishing&subcategory=ipad-6', description: 'iPad 6th Gen (2018)', itemCount: 1 },
          { name: 'iPad Air 11"', href: '/products?category=refurbishing&subcategory=ipad-air-11', description: 'iPad Air 11" (2024)', itemCount: 1 },
          { name: 'iPad Air 5', href: '/products?category=refurbishing&subcategory=ipad-air-5', description: 'iPad Air 5th Gen (2022)', itemCount: 1 },
          { name: 'iPad Air 4', href: '/products?category=refurbishing&subcategory=ipad-air-4', description: 'iPad Air 4th Gen (2020)', itemCount: 1 },
          { name: 'iPad Air 3', href: '/products?category=refurbishing&subcategory=ipad-air-3', description: 'iPad Air 3rd Gen (2019)', itemCount: 1 },
          { name: 'iPad Air 2', href: '/products?category=refurbishing&subcategory=ipad-air-2', description: 'iPad Air 2nd Gen', itemCount: 1 },
          { name: 'iPad Air 1', href: '/products?category=refurbishing&subcategory=ipad-air-1', description: 'iPad Air 1st Gen', itemCount: 1 },
          { name: 'iPad Mini 6', href: '/products?category=refurbishing&subcategory=ipad-mini-6', description: 'iPad Mini 6th Gen (2021)', itemCount: 1 },
          { name: 'iPad Mini 5', href: '/products?category=refurbishing&subcategory=ipad-mini-5', description: 'iPad Mini 5th Gen (2019)', itemCount: 1 },
          { name: 'iPad Mini 4', href: '/products?category=refurbishing&subcategory=ipad-mini-4', description: 'iPad Mini 4th Gen', itemCount: 1 },
          { name: 'iPad Mini 3', href: '/products?category=refurbishing&subcategory=ipad-mini-3', description: 'iPad Mini 3rd Gen', itemCount: 1 },
          { name: 'iPad Mini 2', href: '/products?category=refurbishing&subcategory=ipad-mini-2', description: 'iPad Mini 2nd Gen', itemCount: 1 },
          { name: 'iPad Mini 1', href: '/products?category=refurbishing&subcategory=ipad-mini-1', description: 'iPad Mini 1st Gen', itemCount: 1 },
          { name: 'iPad 5', href: '/products?category=refurbishing&subcategory=ipad-5', description: 'iPad 5th Gen (2017)', itemCount: 1 },
          { name: 'iPad 4', href: '/products?category=refurbishing&subcategory=ipad-4', description: 'iPad 4th Gen', itemCount: 1 },
          { name: 'iPad 3', href: '/products?category=refurbishing&subcategory=ipad-3', description: 'iPad 3rd Gen', itemCount: 1 },
          { name: 'iPad 2', href: '/products?category=refurbishing&subcategory=ipad-2', description: 'iPad 2nd Gen', itemCount: 1 },
          { name: 'iPad 1', href: '/products?category=refurbishing&subcategory=ipad-1', description: 'iPad 1st Gen', itemCount: 1 }
        ]
      },
      {
        name: 'iPhone',
        href: '/products?category=refurbishing&subcategory=iphone',
        description: 'Apple iPhones',
        itemCount: 32,
        subcategories: [
          { name: 'iPhone 16e', href: '/products?category=refurbishing&subcategory=iphone-16e', description: 'iPhone 16e', itemCount: 1 },
          { name: 'iPhone 16 Pro Max', href: '/products?category=refurbishing&subcategory=iphone-16-pro-max', description: 'iPhone 16 Pro Max', itemCount: 1 },
          { name: 'iPhone 16 Pro', href: '/products?category=refurbishing&subcategory=iphone-16-pro', description: 'iPhone 16 Pro', itemCount: 1 },
          { name: 'iPhone 16 Plus', href: '/products?category=refurbishing&subcategory=iphone-16-plus', description: 'iPhone 16 Plus', itemCount: 1 },
          { name: 'iPhone 16', href: '/products?category=refurbishing&subcategory=iphone-16', description: 'iPhone 16', itemCount: 1 },
          { name: 'iPhone 15 Pro Max', href: '/products?category=refurbishing&subcategory=iphone-15-pro-max', description: 'iPhone 15 Pro Max', itemCount: 1 },
          { name: 'iPhone 15 Pro', href: '/products?category=refurbishing&subcategory=iphone-15-pro', description: 'iPhone 15 Pro', itemCount: 1 },
          { name: 'iPhone 15 Plus', href: '/products?category=refurbishing&subcategory=iphone-15-plus', description: 'iPhone 15 Plus', itemCount: 1 },
          { name: 'iPhone 15', href: '/products?category=refurbishing&subcategory=iphone-15', description: 'iPhone 15', itemCount: 1 },
          { name: 'iPhone 14 Pro Max', href: '/products?category=refurbishing&subcategory=iphone-14-pro-max', description: 'iPhone 14 Pro Max', itemCount: 1 },
          { name: 'iPhone 14 Pro', href: '/products?category=refurbishing&subcategory=iphone-14-pro', description: 'iPhone 14 Pro', itemCount: 1 },
          { name: 'iPhone 14 Plus', href: '/products?category=refurbishing&subcategory=iphone-14-plus', description: 'iPhone 14 Plus', itemCount: 1 },
          { name: 'iPhone 14', href: '/products?category=refurbishing&subcategory=iphone-14', description: 'iPhone 14', itemCount: 1 },
          { name: 'iPhone 13 Pro Max', href: '/products?category=refurbishing&subcategory=iphone-13-pro-max', description: 'iPhone 13 Pro Max', itemCount: 1 },
          { name: 'iPhone 13 Pro', href: '/products?category=refurbishing&subcategory=iphone-13-pro', description: 'iPhone 13 Pro', itemCount: 1 },
          { name: 'iPhone 13', href: '/products?category=refurbishing&subcategory=iphone-13', description: 'iPhone 13', itemCount: 1 },
          { name: 'iPhone 13 Mini', href: '/products?category=refurbishing&subcategory=iphone-13-mini', description: 'iPhone 13 Mini', itemCount: 1 },
          { name: 'iPhone 12 Pro Max', href: '/products?category=refurbishing&subcategory=iphone-12-pro-max', description: 'iPhone 12 Pro Max', itemCount: 1 },
          { name: 'iPhone 12 Pro', href: '/products?category=refurbishing&subcategory=iphone-12-pro', description: 'iPhone 12 Pro', itemCount: 1 },
          { name: 'iPhone 12', href: '/products?category=refurbishing&subcategory=iphone-12', description: 'iPhone 12', itemCount: 1 },
          { name: 'iPhone 12 Mini', href: '/products?category=refurbishing&subcategory=iphone-12-mini', description: 'iPhone 12 Mini', itemCount: 1 },
          { name: 'iPhone 11 Pro Max', href: '/products?category=refurbishing&subcategory=iphone-11-pro-max', description: 'iPhone 11 Pro Max', itemCount: 1 },
          { name: 'iPhone 11 Pro', href: '/products?category=refurbishing&subcategory=iphone-11-pro', description: 'iPhone 11 Pro', itemCount: 1 },
          { name: 'iPhone 11', href: '/products?category=refurbishing&subcategory=iphone-11', description: 'iPhone 11', itemCount: 1 },
          { name: 'iPhone XS Max', href: '/products?category=refurbishing&subcategory=iphone-xs-max', description: 'iPhone XS Max', itemCount: 1 },
          { name: 'iPhone XS', href: '/products?category=refurbishing&subcategory=iphone-xs', description: 'iPhone XS', itemCount: 1 },
          { name: 'iPhone XR', href: '/products?category=refurbishing&subcategory=iphone-xr', description: 'iPhone XR', itemCount: 1 },
          { name: 'iPhone X', href: '/products?category=refurbishing&subcategory=iphone-x', description: 'iPhone X', itemCount: 1 },
          { name: 'iPhone 8 Plus', href: '/products?category=refurbishing&subcategory=iphone-8-plus', description: 'iPhone 8 Plus', itemCount: 1 },
          { name: 'iPhone 8', href: '/products?category=refurbishing&subcategory=iphone-8', description: 'iPhone 8', itemCount: 1 },
          { name: 'iPhone 7 Plus', href: '/products?category=refurbishing&subcategory=iphone-7-plus', description: 'iPhone 7 Plus', itemCount: 1 },
          { name: 'iPhone 7', href: '/products?category=refurbishing&subcategory=iphone-7', description: 'iPhone 7', itemCount: 1 },
          { name: 'iPhone 6S Plus', href: '/products?category=refurbishing&subcategory=iphone-6s-plus', description: 'iPhone 6S Plus', itemCount: 1 },
          { name: 'iPhone 6S', href: '/products?category=refurbishing&subcategory=iphone-6s', description: 'iPhone 6S', itemCount: 1 },
          { name: 'iPhone 6 Plus', href: '/products?category=refurbishing&subcategory=iphone-6-plus', description: 'iPhone 6 Plus', itemCount: 1 },
          { name: 'iPhone 6', href: '/products?category=refurbishing&subcategory=iphone-6', description: 'iPhone 6', itemCount: 1 },
          { name: 'iPhone 5S', href: '/products?category=refurbishing&subcategory=iphone-5s', description: 'iPhone 5S', itemCount: 1 },
          { name: 'iPhone 5C', href: '/products?category=refurbishing&subcategory=iphone-5c', description: 'iPhone 5C', itemCount: 1 },
          { name: 'iPhone 5', href: '/products?category=refurbishing&subcategory=iphone-5', description: 'iPhone 5', itemCount: 1 }
        ]
      }
    ]
  },
  {
    name: 'Board Components',
    href: '/products?category=board-components',
    description: 'Circuit Board Parts',
    itemCount: 203
  },
  {
    name: 'Pre-Owned Devices',
    href: '/products?category=pre-owned',
    description: 'Refurbished & Used Devices',
    itemCount: 45
  }
]

function CategoryCard({ category, level = 0 }: CategoryCardProps) {
  const hasSubcategories = category.subcategories && category.subcategories.length > 0

  return (
    <div className={`${level > 0 ? 'mt-4' : ''}`}>
      <div className={`group bg-white p-6 rounded-lg border border-gray-200 hover:border-[#D4AF37] hover:shadow-md transition-all duration-200 ${level > 0 ? 'ml-4 border-l-4 border-l-[#D4AF37]' : ''}`}>
        <Link href={category.href} className="block">
          <div className="flex flex-col items-center text-center">
            <h3 className={`font-semibold text-gray-900 group-hover:text-[#D4AF37] transition-colors mb-2 ${level > 0 ? 'text-sm' : ''}`}>
              {category.name}
              {category.hasNewBadge && (
                <span className="ml-2 bg-[#D4AF37] text-black text-xs px-2 py-1 rounded font-medium">
                  NEW
                </span>
              )}
            </h3>
            <p className={`text-gray-600 group-hover:text-gray-800 transition-colors mb-3 ${level > 0 ? 'text-xs' : 'text-sm'}`}>
              {category.description}
            </p>
            <div className={`text-gray-500 font-medium ${level > 0 ? 'text-xs' : 'text-xs'}`}>
              {category.itemCount} items
            </div>
          </div>
        </Link>
      </div>
      {hasSubcategories && category.subcategories && (
        <div className="mt-4">
          {category.subcategories.map((subcategory) => (
            <CategoryCard key={subcategory.name} category={subcategory} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  )
}

export default function Categories() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Browse Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories.map((category) => (
            <CategoryCard key={category.name} category={category} />
          ))}
        </div>
      </div>
    </section>
  )
}
