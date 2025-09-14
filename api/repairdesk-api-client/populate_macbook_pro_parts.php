<?php
/**
 * Populate Supabase with MacBook Pro Genuine OEM Parts
 *
 * This script inserts MacBook Pro parts data into the Supabase 'parts' table
 */

require_once 'config.php';

// MacBook Pro Parts Data
$macbookProParts = [
    [
        'name' => 'Complete LCD Display Assembly Compatible For MacBook Pro 14" (A2442 / A2779 / A2918 / A2992 / A3112 / A3401 / A3185) (Compatible With All Years) (Aftermarket Plus)',
        'description' => 'Complete LCD Display Assembly Compatible For MacBook Pro 14" (A2442 / A2779 / A2918 / A2992 / A3112 / A3401 / A3185) (Compatible With All Years) (Aftermarket Plus)',
        'price' => 154.71,
        'category' => 'MacBook Pro 14" Parts',
        'stock_quantity' => 10
    ],
    [
        'name' => 'Complete LCD Display Assembly Compatible For MacBook Pro 13" (A1989 / Late 2018 / Early 2019) (A2159 / Mid 2019) (A2289 / A2251 / Mid 2020) (Aftermarket Plus) (Space Gray)',
        'description' => 'Complete LCD Display Assembly Compatible For MacBook Pro 13" (A1989 / Late 2018 / Early 2019) (A2159 / Mid 2019) (A2289 / A2251 / Mid 2020) (Aftermarket Plus) (Space Gray)',
        'price' => 205.03,
        'category' => 'MacBook Pro 13" Parts',
        'stock_quantity' => 8
    ],
    [
        'name' => 'Complete LCD Display Assembly Compatible For MacBook Pro 13" W/ Touch Bar / Pro 13" (A1706 / A1708 / Late 2016 / Mid 2017) (Aftermarket Plus) (Silver)',
        'description' => 'Complete LCD Display Assembly Compatible For MacBook Pro 13" W/ Touch Bar / Pro 13" (A1706 / A1708 / Late 2016 / Mid 2017) (Aftermarket Plus) (Silver)',
        'price' => 213.03,
        'category' => 'MacBook Pro 13" Parts',
        'stock_quantity' => 8
    ],
    [
        'name' => 'Complete LCD Display Assembly Compatible For MacBook Pro 13" W/ Touch Bar / Pro 13" (A1706 / A1708 / Late 2016 / Mid 2017) (Aftermarket Plus) (Space Gray)',
        'description' => 'Complete LCD Display Assembly Compatible For MacBook Pro 13" W/ Touch Bar / Pro 13" (A1706 / A1708 / Late 2016 / Mid 2017) (Aftermarket Plus) (Space Gray)',
        'price' => 231.00,
        'category' => 'MacBook Pro 13" Parts',
        'stock_quantity' => 8
    ],
    [
        'name' => 'Complete LCD Display Assembly Compatible For MacBook Pro 13" (A1989 / Late 2018 / Early 2019) (A2159 / Mid 2019) (A2289 / A2251 / Mid 2020) (Aftermarket Plus) (Silver)',
        'description' => 'Complete LCD Display Assembly Compatible For MacBook Pro 13" (A1989 / Late 2018 / Early 2019) (A2159 / Mid 2019) (A2289 / A2251 / Mid 2020) (Aftermarket Plus) (Silver)',
        'price' => 237.71,
        'category' => 'MacBook Pro 13" Parts',
        'stock_quantity' => 8
    ],
    [
        'name' => 'Complete LCD Display Assembly Compatible For MacBook Pro 13" (A2338 / Late 2020, A2338 / Late 2023) (M1 / M2) (Aftermarket Plus) (Silver)',
        'description' => 'Complete LCD Display Assembly Compatible For MacBook Pro 13" (A2338 / Late 2020, A2338 / Late 2023) (M1 / M2) (Aftermarket Plus) (Silver)',
        'price' => 289.04,
        'category' => 'MacBook Pro 13" Parts',
        'stock_quantity' => 8
    ],
    [
        'name' => 'Complete LCD Display Assembly Compatible For MacBook Pro 13" (A2338 / Late 2020, A2338 / Late 2023) (M1 / M2) (Aftermarket Plus) (Space Gray)',
        'description' => 'Complete LCD Display Assembly Compatible For MacBook Pro 13" (A2338 / Late 2020, A2338 / Late 2023) (M1 / M2) (Aftermarket Plus) (Space Gray)',
        'price' => 296.21,
        'category' => 'MacBook Pro 13" Parts',
        'stock_quantity' => 8
    ],
    [
        'name' => 'Complete LCD Display Assembly Compatible For MacBook Pro 16" (A2141 / Mid 2019) (Aftermarket Plus) (Space Gray)',
        'description' => 'Complete LCD Display Assembly Compatible For MacBook Pro 16" (A2141 / Mid 2019) (Aftermarket Plus) (Space Gray)',
        'price' => 671.42,
        'category' => 'MacBook Pro 16" Parts',
        'stock_quantity' => 5
    ],
    [
        'name' => 'Complete LCD Display Assembly Compatible For MacBook Pro 16" (A2141 / Mid 2019) (Aftermarket Plus) (Silver)',
        'description' => 'Complete LCD Display Assembly Compatible For MacBook Pro 16" (A2141 / Mid 2019) (Aftermarket Plus) (Silver)',
        'price' => 736.46,
        'category' => 'MacBook Pro 16" Parts',
        'stock_quantity' => 5
    ],
    [
        'name' => 'Complete LCD Display Assembly Compatible For MacBook Pro 13" W/ Touch Bar / Pro 13" (A1706 / A1708 / Late 2016 / Mid 2017) (Used OEM Pull: Grade C) (Space Gray)',
        'description' => 'Complete LCD Display Assembly Compatible For MacBook Pro 13" W/ Touch Bar / Pro 13" (A1706 / A1708 / Late 2016 / Mid 2017) (Used OEM Pull: Grade C) (Space Gray)',
        'price' => 230.45,
        'category' => 'MacBook Pro 13" Parts',
        'stock_quantity' => 6
    ],
    [
        'name' => 'Complete LCD Display Assembly Compatible For MacBook Pro 16" (A2141 / Mid 2019) (Used OEM Pull: Grade C) (Space Gray)',
        'description' => 'Complete LCD Display Assembly Compatible For MacBook Pro 16" (A2141 / Mid 2019) (Used OEM Pull: Grade C) (Space Gray)',
        'price' => 425.03,
        'category' => 'MacBook Pro 16" Parts',
        'stock_quantity' => 4
    ],
    [
        'name' => 'Complete LCD Display Assembly Compatible For MacBook Pro 16" (A2141 / Mid 2019) (Used OEM Pull: Grade C) (Silver)',
        'description' => 'Complete LCD Display Assembly Compatible For MacBook Pro 16" (A2141 / Mid 2019) (Used OEM Pull: Grade C) (Silver)',
        'price' => 425.03,
        'category' => 'MacBook Pro 16" Parts',
        'stock_quantity' => 4
    ],
    [
        'name' => 'Complete LCD Display Assembly Compatible For MacBook Pro Unibody 15" (A1286 / Early 2011 / Late 2011 / Mid 2012) (Used OEM Pull: Grade B) (Glossy)',
        'description' => 'Complete LCD Display Assembly Compatible For MacBook Pro Unibody 15" (A1286 / Early 2011 / Late 2011 / Mid 2012) (Used OEM Pull: Grade B) (Glossy)',
        'price' => 49.82,
        'category' => 'MacBook Pro 15" Parts',
        'stock_quantity' => 3
    ],
    [
        'name' => 'Complete LCD Display Assembly Compatible For MacBook Pro Retina 13" (A1502 / Early 2015) (Used OEM Pull: Grade B)',
        'description' => 'Complete LCD Display Assembly Compatible For MacBook Pro Retina 13" (A1502 / Early 2015) (Used OEM Pull: Grade B)',
        'price' => 172.16,
        'category' => 'MacBook Pro 13" Parts',
        'stock_quantity' => 5
    ],
    [
        'name' => 'Complete LCD Display Assembly Compatible For MacBook Pro Retina 15" (A1398 / Mid 2015) (Used OEM Pull: Grade B)',
        'description' => 'Complete LCD Display Assembly Compatible For MacBook Pro Retina 15" (A1398 / Mid 2015) (Used OEM Pull: Grade B)',
        'price' => 255.03,
        'category' => 'MacBook Pro 15" Parts',
        'stock_quantity' => 4
    ],
    [
        'name' => 'Complete LCD Display Assembly Compatible For MacBook Pro 13" W/ Touch Bar / Pro 13" (A1706 / A1708 / Late 2016 / Mid 2017) (Used OEM Pull: Grade B) (Silver)',
        'description' => 'Complete LCD Display Assembly Compatible For MacBook Pro 13" W/ Touch Bar / Pro 13" (A1706 / A1708 / Late 2016 / Mid 2017) (Used OEM Pull: Grade B) (Silver)',
        'price' => 266.03,
        'category' => 'MacBook Pro 13" Parts',
        'stock_quantity' => 6
    ],
    [
        'name' => 'Complete LCD Display Assembly Compatible For MacBook Pro 13" W/ Touch Bar / Pro 13" (A1706 / A1708 / Late 2016 / Mid 2017) (Used OEM Pull: Grade B) (Space Gray)',
        'description' => 'Complete LCD Display Assembly Compatible For MacBook Pro 13" W/ Touch Bar / Pro 13" (A1706 / A1708 / Late 2016 / Mid 2017) (Used OEM Pull: Grade B) (Space Gray)',
        'price' => 266.03,
        'category' => 'MacBook Pro 13" Parts',
        'stock_quantity' => 6
    ],
    [
        'name' => 'Complete LCD Display Assembly Compatible For MacBook Pro 13" (A1989 / Late 2018 / Early 2019) (A2159 / Mid 2019) (A2289 / A2251 / Mid 2020) (Used OEM Pull: Grade B) (Space Gray)',
        'description' => 'Complete LCD Display Assembly Compatible For MacBook Pro 13" (A1989 / Late 2018 / Early 2019) (A2159 / Mid 2019) (A2289 / A2251 / Mid 2020) (Used OEM Pull: Grade B) (Space Gray)',
        'price' => 269.03,
        'category' => 'MacBook Pro 13" Parts',
        'stock_quantity' => 6
    ],
    [
        'name' => 'Complete LCD Display Assembly Compatible For MacBook Pro 13" (A1989 / Late 2018 / Early 2019) (A2159 / Mid 2019) (A2289 / A2251 / Mid 2020) (Used OEM Pull: Grade B) (Silver)',
        'description' => 'Complete LCD Display Assembly Compatible For MacBook Pro 13" (A1989 / Late 2018 / Early 2019) (A2159 / Mid 2019) (A2289 / A2251 / Mid 2020) (Used OEM Pull: Grade B) (Silver)',
        'price' => 269.03,
        'category' => 'MacBook Pro 13" Parts',
        'stock_quantity' => 6
    ],
    [
        'name' => 'Complete LCD Display Assembly Compatible For MacBook Pro 14" (A2992 / Late 2023) (Used OEM Pull: Grade B) (Space Black)',
        'description' => 'Complete LCD Display Assembly Compatible For MacBook Pro 14" (A2992 / Late 2023) (Used OEM Pull: Grade B) (Space Black)',
        'price' => 351.88,
        'category' => 'MacBook Pro 14" Parts',
        'stock_quantity' => 4
    ],
    [
        'name' => 'Complete LCD Display Assembly Compatible For MacBook Pro 14" (A2442 / Late 2021) / (A2779 / Late 2023 ) / (A2992 / Late 2023) / (A2918 / Late 2023) (Used OEM Pull: Grade B) (Space Gray)',
        'description' => 'Complete LCD Display Assembly Compatible For MacBook Pro 14" (A2442 / Late 2021) / (A2779 / Late 2023 ) / (A2992 / Late 2023) / (A2918 / Late 2023) (Used OEM Pull: Grade B) (Space Gray)',
        'price' => 389.49,
        'category' => 'MacBook Pro 14" Parts',
        'stock_quantity' => 4
    ],
    [
        'name' => 'Complete LCD Display Assembly Compatible For MacBook Pro 14" (M4) (A3112 / A3401 / Late 2024) (Used OEM Pull: Grade B) (Space Black)',
        'description' => 'Complete LCD Display Assembly Compatible For MacBook Pro 14" (M4) (A3112 / A3401 / A3185) (Late 2024) (Used OEM Pull: Grade B) (Space Black)',
        'price' => 436.89,
        'category' => 'MacBook Pro 14" Parts',
        'stock_quantity' => 3
    ],
    [
        'name' => 'Complete LCD Display Assembly Compatible For MacBook Pro 16" (A2141 / Mid 2019) (Used OEM Pull: Grade B) (Space Gray)',
        'description' => 'Complete LCD Display Assembly Compatible For MacBook Pro 16" (A2141 / Mid 2019) (Used OEM Pull: Grade B) (Space Gray)',
        'price' => 475.03,
        'category' => 'MacBook Pro 16" Parts',
        'stock_quantity' => 4
    ],
    [
        'name' => 'Complete LCD Display Assembly Compatible For MacBook Pro 16" (A2141 / Mid 2019) (Used OEM Pull: Grade B) (Silver)',
        'description' => 'Complete LCD Display Assembly Compatible For MacBook Pro 16" (A2141 / Mid 2019) (Used OEM Pull: Grade B) (Silver)',
        'price' => 475.03,
        'category' => 'MacBook Pro 16" Parts',
        'stock_quantity' => 4
    ],
    [
        'name' => 'Complete LCD Display Assembly Compatible For MacBook Pro 15" Touch Bar (A1990 / Late 2018 / Early 2019) (Used OEM Pull: Grade B) (Space Gray)',
        'description' => 'Complete LCD Display Assembly Compatible For MacBook Pro 15" Touch Bar (A1990 / Late 2018 / Early 2019) (Used OEM Pull: Grade B) (Space Gray)',
        'price' => 490.03,
        'category' => 'MacBook Pro 15" Parts',
        'stock_quantity' => 4
    ],
    [
        'name' => 'Complete LCD Display Assembly Compatible For MacBook Pro 15" Touch Bar (A1990 / Late 2018 / Early 2019) (Used OEM Pull: Grade B) (Silver)',
        'description' => 'Complete LCD Display Assembly Compatible For MacBook Pro 15" Touch Bar (A1990 / Late 2018 / Early 2019) (Used OEM Pull: Grade B) (Silver)',
        'price' => 490.03,
        'category' => 'MacBook Pro 15" Parts',
        'stock_quantity' => 4
    ],
    [
        'name' => 'Complete LCD Display Assembly Compatible For MacBook Pro 15" W/ Touch Bar (A1707 / Late 2016) (Used OEM Pull: Grade B) (Space Gray)',
        'description' => 'Complete LCD Display Assembly Compatible For MacBook Pro 15" W/ Touch Bar (A1707 / Late 2016) (Used OEM Pull: Grade B) (Space Gray)',
        'price' => 505.03,
        'category' => 'MacBook Pro 15" Parts',
        'stock_quantity' => 4
    ],
    [
        'name' => 'Complete LCD Display Assembly Compatible For MacBook Pro 15" W/ Touch Bar (A1707 / Late 2016) (Used OEM Pull: Grade B) (Silver)',
        'description' => 'Complete LCD Display Assembly Compatible For MacBook Pro 15" W/ Touch Bar (A1707 / Late 2016) (Used OEM Pull: Grade B) (Silver)',
        'price' => 505.03,
        'category' => 'MacBook Pro 15" Parts',
        'stock_quantity' => 4
    ],
    [
        'name' => 'Complete LCD Display Assembly Compatible For MacBook Pro 16" (M4) (A3403 /A3186 Late 2024) (Used OEM Pull: Grade B) (Space Black)',
        'description' => 'Complete LCD Display Assembly Compatible For MacBook Pro 16" (M4) (A3403 /A3186 Late 2024) (Used OEM Pull: Grade B) (Space Black)',
        'price' => 597.33,
        'category' => 'MacBook Pro 16" Parts',
        'stock_quantity' => 3
    ],
    [
        'name' => 'Complete LCD Display Assembly Compatible For MacBook Pro 16" (M4) (A3403 /A3186 Late 2024) (Used OEM Pull: Grade B) ( Silver)',
        'description' => 'Complete LCD Display Assembly Compatible For MacBook Pro 16" (M4) (A3403 /A3186 Late 2024) (Used OEM Pull: Grade B) ( Silver)',
        'price' => 616.91,
        'category' => 'MacBook Pro 16" Parts',
        'stock_quantity' => 3
    ],
    [
        'name' => 'Complete LCD Display Assembly Compatible For MacBook Pro 16" (A2485 / Late 2021) / (A2780 / Late 2023 / (A2991 / Late 2023)  (Used OEM Pull: Grade B) (Space Gray)',
        'description' => 'Complete LCD Display Assembly Compatible For MacBook Pro 16" (A2485 / Late 2021) (A2780 / Late 2023) (A2991 / Late 2023) (Used OEM Pull: Grade B) (Space Gray)',
        'price' => 622.03,
        'category' => 'MacBook Pro 16" Parts',
        'stock_quantity' => 4
    ],
    [
        'name' => 'Complete LCD Display Assembly Compatible For MacBook Pro 16" (A2485 / Late 2021) / (A2780 / Late 2023 / (A2991 / Late 2023)  (Used OEM Pull: Grade B) (Silver)',
        'description' => 'Complete LCD Display Assembly Compatible For MacBook Pro 16" (A2485 / Late 2021) (A2780 / Late 2023) (A2991 / Late 2023) (Used OEM Pull: Grade B) (Silver)',
        'price' => 622.03,
        'category' => 'MacBook Pro 16" Parts',
        'stock_quantity' => 4
    ],
    [
        'name' => 'Complete LCD Display Assembly Compatible For MacBook Pro 16" (A2991 / Late 2023) (Used OEM Pull: Grade B) (Space Black)',
        'description' => 'Complete LCD Display Assembly Compatible For MacBook Pro 16" (A2991 / Late 2023) (Used OEM Pull: Grade B) (Space Black)',
        'price' => 623.59,
        'category' => 'MacBook Pro 16" Parts',
        'stock_quantity' => 3
    ],
    [
        'name' => 'Complete LCD Display Assembly Compatible For MacBook Pro Retina 13" (A1502 / Early 2015) (Used OEM Pull: Grade A)',
        'description' => 'Complete LCD Display Assembly Compatible For MacBook Pro Retina 13" (A1502 / Early 2015) (Used OEM Pull: Grade A)',
        'price' => 191.30,
        'category' => 'MacBook Pro 13" Parts',
        'stock_quantity' => 5
    ],
    [
        'name' => 'Complete LCD Display Assembly Compatible For MacBook Pro 13" (A1989 / Late 2018 / Early 2019) (A2159 / Mid 2019) (A2289 / A2251 / Mid 2020) (Used OEM Pull: Grade A) (Space Gray)',
        'description' => 'Complete LCD Display Assembly Compatible For MacBook Pro 13" (A1989 / Late 2018 / Early 2019) (A2159 / Mid 2019) (A2289 / A2251 / Mid 2020) (Used OEM Pull: Grade A) (Space Gray)',
        'price' => 290.03,
        'category' => 'MacBook Pro 13" Parts',
        'stock_quantity' => 6
    ],
    [
        'name' => 'Complete LCD Display Assembly Compatible For MacBook Pro 13" (A1989 / Late 2018 / Early 2019) (A2159 / Mid 2019) (A2289 / A2251 / Mid 2020) (Used OEM Pull: Grade A) (Silver)',
        'description' => 'Complete LCD Display Assembly Compatible For MacBook Pro 13" (A1989 / Late 2018 / Early 2019) (A2159 / Mid 2019) (A2289 / A2251 / Mid 2020) (Used OEM Pull: Grade A) (Silver)',
        'price' => 290.03,
        'category' => 'MacBook Pro 13" Parts',
        'stock_quantity' => 6
    ],
    [
        'name' => 'Complete LCD Display Assembly Compatible For MacBook Pro 13" W/ Touch Bar / Pro 13" (A1706 / A1708 / Late 2016 / Mid 2017) (Used OEM Pull: Grade A) (Space Gray)',
        'description' => 'Complete LCD Display Assembly Compatible For MacBook Pro 13" W/ Touch Bar / Pro 13" (A1706 / A1708 / Late 2016 / Mid 2017) (Used OEM Pull: Grade A) (Space Gray)',
        'price' => 302.03,
        'category' => 'MacBook Pro 13" Parts',
        'stock_quantity' => 6
    ],
    [
        'name' => 'Complete LCD Display Assembly Compatible For MacBook Pro 13" W/ Touch Bar / Pro 13" (A1706 / A1708 / Late 2016 / Mid 2017) (Used OEM Pull: Grade A) (Silver)',
        'description' => 'Complete LCD Display Assembly Compatible For MacBook Pro 13" W/ Touch Bar / Pro 13" (A1706 / A1708 / Late 2016 / Mid 2017) (Used OEM Pull: Grade A) (Silver)',
        'price' => 302.03,
        'category' => 'MacBook Pro 13" Parts',
        'stock_quantity' => 6
    ],
    [
        'name' => 'Complete LCD Display Assembly Compatible For MacBook Pro 14" (A2442 / Late 2021) / (A2779 / Late 2023 ) / (A2992 / Late 2023) / (A2918 / Late 2023) (Used OEM Pull: Grade A)  (Space Gray)',
        'description' => 'Complete LCD Display Assembly Compatible For MacBook Pro 14" (A2442 / Late 2021) / (A2779 / Late 2023 ) / (A2992 / Late 2023) / (A2918 / Late 2023) (Used OEM Pull: Grade A) (Space Gray)',
        'price' => 396.25,
        'category' => 'MacBook Pro 14" Parts',
        'stock_quantity' => 4
    ],
    [
        'name' => 'Complete LCD Display Assembly Compatible For MacBook Pro 14" (A2992 / Late 2023) (Used OEM Pull: Grade A) (Space Black)',
        'description' => 'Complete LCD Display Assembly Compatible For MacBook Pro 14" (A2992 / Late 2023) (Used OEM Pull: Grade A) (Space Black)',
        'price' => 400.67,
        'category' => 'MacBook Pro 14" Parts',
        'stock_quantity' => 4
    ],
    [
        'name' => 'Complete LCD Display Assembly Compatible For MacBook Pro 14" (A2442 / Late 2021) / (A2779 / Late 2023 ) / (A2992 / Late 2023) / (A2918 / Late 2023) (Used OEM Pull: Grade A) (Silver)',
        'description' => 'Complete LCD Display Assembly Compatible For MacBook Pro 14" (A2442 / Late 2021) / (A2779 / Late 2023 ) / (A2992 / Late 2023) / (A2918 / Late 2023) (Used OEM Pull: Grade A) (Silver)',
        'price' => 403.11,
        'category' => 'MacBook Pro 14" Parts',
        'stock_quantity' => 4
    ],
    [
        'name' => 'Complete LCD Display Assembly Compatible For MacBook Pro 14" (M4) (A3112 / A3401 / Late 2024) (Used OEM Pull: Grade A) (Silver)',
        'description' => 'Complete LCD Display Assembly Compatible For MacBook Pro 14" (M4) (A3112 / A3401 / A3185) (Late 2024) (Used OEM Pull: Grade A) (Silver)',
        'price' => 456.85,
        'category' => 'MacBook Pro 14" Parts',
        'stock_quantity' => 3
    ],
    [
        'name' => 'Complete LCD Display Assembly Compatible For MacBook Pro 14" (M4) (A3112 / A3401 / Late 2024) (Used OEM Pull: Grade A) (Space Black)',
        'description' => 'Complete LCD Display Assembly Compatible For MacBook Pro 14" (M4) (A3112 / A3401 / A3185) (Late 2024) (Used OEM Pull: Grade A) (Space Black)',
        'price' => 483.65,
        'category' => 'MacBook Pro 14" Parts',
        'stock_quantity' => 3
    ],
    [
        'name' => 'Complete LCD Display Assembly Compatible For MacBook Pro 16" (A2141 / Mid 2019) (Used OEM Pull: Grade A) (Space Gray)',
        'description' => 'Complete LCD Display Assembly Compatible For MacBook Pro 16" (A2141 / Mid 2019) (Used OEM Pull: Grade A) (Space Gray)',
        'price' => 510.03,
        'category' => 'MacBook Pro 16" Parts',
        'stock_quantity' => 4
    ],
    [
        'name' => 'Complete LCD Display Assembly Compatible For MacBook Pro 16" (A2141 / Mid 2019) (Used OEM Pull: Grade A) (Silver)',
        'description' => 'Complete LCD Display Assembly Compatible For MacBook Pro 16" (A2141 / Mid 2019) (Used OEM Pull: Grade A) (Silver)',
        'price' => 510.03,
        'category' => 'MacBook Pro 16" Parts',
        'stock_quantity' => 4
    ],
    [
        'name' => 'Complete LCD Display Assembly Compatible For MacBook Pro 15" Touch Bar (A1990 / Late 2018 / Early 2019) (Used OEM Pull: Grade A) (Space Gray)',
        'description' => 'Complete LCD Display Assembly Compatible For MacBook Pro 15" Touch Bar (A1990 / Late 2018 / Early 2019) (Used OEM Pull: Grade A) (Space Gray)',
        'price' => 530.03,
        'category' => 'MacBook Pro 15" Parts',
        'stock_quantity' => 4
    ],
    [
        'name' => 'Complete LCD Display Assembly Compatible For MacBook Pro 15" Touch Bar (A1990 / Late 2018 / Early 2019) (Used OEM Pull: Grade A) (Silver)',
        'description' => 'Complete LCD Display Assembly Compatible For MacBook Pro 15" Touch Bar (A1990 / Late 2018 / Early 2019) (Used OEM Pull: Grade A) (Silver)',
        'price' => 530.03,
        'category' => 'MacBook Pro 15" Parts',
        'stock_quantity' => 4
    ],
    [
        'name' => 'Complete LCD Display Assembly Compatible For MacBook Pro 15" W/ Touch Bar (A1707 / Late 2016 / Mid 2017) (Used OEM Pull: Grade A) (Space Gray)',
        'description' => 'Complete LCD Display Assembly Compatible For MacBook Pro 15" W/ Touch Bar (A1707 / Late 2016 / Mid 2017) (Used OEM Pull: Grade A) (Space Gray)',
        'price' => 550.03,
        'category' => 'MacBook Pro 15" Parts',
        'stock_quantity' => 4
    ],
    [
        'name' => 'Complete LCD Display Assembly Compatible For MacBook Pro 16" (M4) (A3403 /A3186 Late 2024) (Used OEM Pull: Grade A) (Space Black)',
        'description' => 'Complete LCD Display Assembly Compatible For MacBook Pro 16" (M4) (A3403 /A3186 Late 2024) (Used OEM Pull: Grade A) (Space Black)',
        'price' => 593.05,
        'category' => 'MacBook Pro 16" Parts',
        'stock_quantity' => 3
    ],
    [
        'name' => 'Complete LCD Display Assembly Compatible For MacBook Pro 16" (A2485 / Late 2021) / (A2780 / Late 2023 / (A2991 / Late 2023) (Used OEM Pull: Grade A) (Space Gray)',
        'description' => 'Complete LCD Display Assembly Compatible For MacBook Pro 16" (A2485 / Late 2021) / (A2780 / Late 2023 / (A2991 / Late 2023) (Used OEM Pull: Grade A) (Space Gray)',
        'price' => 643.03,
        'category' => 'MacBook Pro 16" Parts',
        'stock_quantity' => 4
    ],
    [
        'name' => 'Complete LCD Display Assembly Compatible For MacBook Pro 16" (A2485 / Late 2021) / (A2780 / Late 2023 / (A2991 / Late 2023) (Used OEM Pull: Grade A) (Silver)',
        'description' => 'Complete LCD Display Assembly Compatible For MacBook Pro 16" (A2485 / Late 2021) / (A2780 / Late 2023 / (A2991 / Late 2023) (Used OEM Pull: Grade A) (Silver)',
        'price' => 643.03,
        'category' => 'MacBook Pro 16" Parts',
        'stock_quantity' => 4
    ],
    [
        'name' => 'Complete LCD Display Assembly Compatible For MacBook Pro 16" (A2991 / Late 2023) (Used OEM Pull: Grade A) (Space Black)',
        'description' => 'Complete LCD Display Assembly Compatible For MacBook Pro 16" (A2991 / Late 2023) (Used OEM Pull: Grade A) (Space Black)',
        'price' => 647.40,
        'category' => 'MacBook Pro 16" Parts',
        'stock_quantity' => 3
    ],
    [
        'name' => 'Complete LCD Display Assembly Compatible For MacBook Pro 16" (M4) (A3403 /A3186 Late 2024) (Used OEM Pull: Grade A) ( Silver)',
        'description' => 'Complete LCD Display Assembly Compatible For MacBook Pro 16" (M4) (A3403 /A3186 Late 2024) (Used OEM Pull: Grade A) ( Silver)',
        'price' => 691.01,
        'category' => 'MacBook Pro 16" Parts',
        'stock_quantity' => 3
    ],
    [
        'name' => 'LCD Panel Only Compatible For MacBook Pro 14" (A2442 / A2779 / A2918 / A2992 / A3112 / A3401 / A3185) (Compatible With All Years) (Premium)',
        'description' => 'LCD Panel Only Compatible For MacBook Pro 14" (A2442 / A2779 / A2918 / A2992 / A3112 / A3401 / A3185) (Compatible With All Years) (Premium)',
        'price' => 233.60,
        'category' => 'MacBook Pro 14" Parts',
        'stock_quantity' => 10
    ],
    [
        'name' => 'LCD Panel Only (M1) Compatible For MacBook Pro 13" (A2338 / Late 2020) (Compatible For All Years) (Panel Only)',
        'description' => 'LCD Panel Only (M1) Compatible For MacBook Pro 13" (A2338 / Late 2020) (Compatible For All Years) (Panel Only)',
        'price' => 150.58,
        'category' => 'MacBook Pro 13" Parts',
        'stock_quantity' => 8
    ],
    [
        'name' => 'LCD Panel Only Compatible For MacBook Pro 16" (A2485 / A2780 / A2991 / A3403 / A3186) (Compatible With All Years)',
        'description' => 'LCD Panel Only Compatible For MacBook Pro 16" (A2485 / A2780 / A2991 / A3403 / A3186) (Compatible With All Years)',
        'price' => 327.01,
        'category' => 'MacBook Pro 16" Parts',
        'stock_quantity' => 5
    ],
    [
        'name' => 'LCD Panel Only Compatible For MacBook Pro 16" (A2141) (Compatible With All Years)',
        'description' => 'LCD Panel Only Compatible For MacBook Pro 16" (A2141) (Compatible With All Years)',
        'price' => 410.65,
        'category' => 'MacBook Pro 16" Parts',
        'stock_quantity' => 5
    ],
    [
        'name' => 'Battery (A1819) Compatible For MacBook Pro 13" W/ Touch Bar (A1706 / Late 2016 / Mid 2017) (Aftermarket)',
        'description' => 'Battery (A1819) Compatible For MacBook Pro 13" W/ Touch Bar (A1706 / Late 2016 / Mid 2017) (Aftermarket)',
        'price' => 38.03,
        'category' => 'MacBook Pro 13" Parts',
        'stock_quantity' => 20
    ],
    [
        'name' => 'Replacement Battery (A1175) Compatible For MacBook Pro 15" (A1260 / Early 2008)',
        'description' => 'Replacement Battery (A1175) Compatible For MacBook Pro 15" (A1260 / Early 2008)',
        'price' => 32.71,
        'category' => 'MacBook Pro 15" Parts',
        'stock_quantity' => 15
    ],
    [
        'name' => 'Battery (A1281) Compatible For MacBook Pro Unibody 15" (A1286 / Early 2009 / Late 2008)',
        'description' => 'Battery (A1281) Compatible For MacBook Pro Unibody 15" (A1286 / Early 2009 / Late 2008)',
        'price' => 34.01,
        'category' => 'MacBook Pro 15" Parts',
        'stock_quantity' => 15
    ],
    [
        'name' => 'Battery (A1280) Compatible For MacBook Unibody 13" (A1278 / Late 2008)',
        'description' => 'Battery (A1280) Compatible For MacBook Unibody 13" (A1278 / Late 2008)',
        'price' => 34.35,
        'category' => 'MacBook Pro 13" Parts',
        'stock_quantity' => 15
    ],
    [
        'name' => 'Battery (A1322) Compatible For MacBook Pro Unibody 13" (A1278 / Early 2011 / Mid 2009 / Mid 2010 / Mid 2012 / Late 2011)',
        'description' => 'Battery (A1322) Compatible For MacBook Pro Unibody 13" (A1278 / Early 2011 / Mid 2009 / Mid 2010 / Mid 2012 / Late 2011)',
        'price' => 36.67,
        'category' => 'MacBook Pro 13" Parts',
        'stock_quantity' => 15
    ],
    [
        'name' => 'Battery (A1713) Compatible For MacBook Pro 13" Retina (A1708 Late 2016 / Mid 2017)',
        'description' => 'Battery (A1713) Compatible For MacBook Pro 13" Retina (A1708 Late 2016 / Mid 2017)',
        'price' => 42.08,
        'category' => 'MacBook Pro 13" Parts',
        'stock_quantity' => 15
    ],
    [
        'name' => 'Battery Compatible For MacBook Pro 13" (A2159 /EMC 3301) (A2171)',
        'description' => 'Battery (A2171) Compatible For MacBook Pro 13" (A2159 / EMC 3301) (A2338 / EMC 8162) (A2289 / EMC 3434)',
        'price' => 42.97,
        'category' => 'MacBook Pro 13" Parts',
        'stock_quantity' => 15
    ],
    [
        'name' => 'Battery (A1321) Compatible For MacBook Pro Unibody 15" (A1286 / Mid 2009 / Mid 2010)',
        'description' => 'Battery (A1321) Compatible For MacBook Pro Unibody 15" (A1286 / Mid 2009 / Mid 2010)',
        'price' => 43.96,
        'category' => 'MacBook Pro 15" Parts',
        'stock_quantity' => 15
    ],
    [
        'name' => 'Battery (A1382) Compatible For MacBook Pro Unibody 15" (A1286 / Early 2011 / Late 2011 / Mid 2012)',
        'description' => 'Battery (A1382) Compatible For MacBook Pro Unibody 15" (A1286 / Early 2011 / Late 2011 / Mid 2012)',
        'price' => 45.42,
        'category' => 'MacBook Pro 15" Parts',
        'stock_quantity' => 15
    ],
    [
        'name' => 'Battery (A1819) Compatible For MacBook Pro 13" W/ Touch Bar (A1706 / Late 2016 / Mid 2017)',
        'description' => 'Battery (A1819) Compatible For MacBook Pro 13" W/ Touch Bar (A1706 / Late 2016 / Mid 2017)',
        'price' => 46.97,
        'category' => 'MacBook Pro 13" Parts',
        'stock_quantity' => 15
    ],
    [
        'name' => 'Battery (A1582) Compatible For MacBook Pro 13" Retina (A1502 / Early 2015)',
        'description' => 'Battery (A1582) Compatible For MacBook Pro 13" Retina (A1502 / Early 2015)',
        'price' => 50.33,
        'category' => 'MacBook Pro 13" Parts',
        'stock_quantity' => 15
    ],
    [
        'name' => 'Battery (A1309) Compatible For MacBook Pro Unibody 17" (A1297 / Early 2009)',
        'description' => 'Battery (A1309) Compatible For MacBook Pro Unibody 17" (A1297 / Early 2009)',
        'price' => 50.49,
        'category' => 'MacBook Pro 17" Parts',
        'stock_quantity' => 10
    ],
    [
        'name' => 'Battery (A1493) Compatible For MacBook Pro 13" Retina (A1502 / Late 2013 / Mid 2014)',
        'description' => 'Battery (A1493) Compatible For MacBook Pro 13" Retina (A1502 / Late 2013 / Mid 2014)',
        'price' => 51.15,
        'category' => 'MacBook Pro 13" Parts',
        'stock_quantity' => 15
    ],
    [
        'name' => 'Battery (A1820) Compatible For MacBook Pro 15" Retina (A1707 Late 2016 / Mid 2017)',
        'description' => 'Battery (A1820) Compatible For MacBook Pro 15" Retina (A1707 Late 2016 / Mid 2017)',
        'price' => 51.83,
        'category' => 'MacBook Pro 15" Parts',
        'stock_quantity' => 15
    ],
    [
        'name' => 'Replacement Battery (A1383) Compatible For MacBook Pro Unibody 17" (A1297 Early 2011)',
        'description' => 'Replacement Battery (A1383) Compatible For MacBook Pro Unibody 17" (A1297 Early 2011)',
        'price' => 53.49,
        'category' => 'MacBook Pro 17" Parts',
        'stock_quantity' => 10
    ],
    [
        'name' => 'Battery (A1494) Compatible For MacBook Pro 15" Retina (A1398 / Late 2013 / Mid 2014)',
        'description' => 'Battery (A1494) Compatible For MacBook Pro 15" Retina (A1398 / Late 2013 / Mid 2014)',
        'price' => 56.00,
        'category' => 'MacBook Pro 15" Parts',
        'stock_quantity' => 15
    ],
    [
        'name' => 'Battery (A1618) Compatible For MacBook Pro 15" Retina (A1398 / Mid 2015)',
        'description' => 'Battery (A1618) Compatible For MacBook Pro 15" Retina (A1398 / Mid 2015)',
        'price' => 58.36,
        'category' => 'MacBook Pro 15" Parts',
        'stock_quantity' => 15
    ],
    [
        'name' => 'Battery (A1953) Compatible For MacBook Pro 15" Touch Bar (A1990 Late 2018 / Early 2019)',
        'description' => 'Battery (A1953) Compatible For MacBook Pro 15" Touch Bar (A1990 Late 2018 / Early 2019)',
        'price' => 59.57,
        'category' => 'MacBook Pro 15" Parts',
        'stock_quantity' => 15
    ],
    [
        'name' => 'Battery (A1417) Compatible For MacBook Pro 15" Retina (A1398 / Mid 2012 / Early 2013)',
        'description' => 'Battery (A1417) Compatible For MacBook Pro 15" Retina (A1398 / Mid 2012 / Early 2013)',
        'price' => 60.64,
        'category' => 'MacBook Pro 15" Parts',
        'stock_quantity' => 15
    ],
    [
        'name' => 'Replacement Battery (A2519) Compatible For MacBook Pro 14" (A2442 / Late 2021) / (A2779 / Eary 2023)',
        'description' => 'Replacement Battery (A2519) Compatible For MacBook Pro 14" (A2442 / Late 2021) / (A2779 / Eary 2023)',
        'price' => 65.22,
        'category' => 'MacBook Pro 14" Parts',
        'stock_quantity' => 12
    ],
    [
        'name' => 'Battery (A1189) Compatible For MacBook Pro Unibody 17" (A1261 & A1151 2006 To Early 2008)',
        'description' => 'Battery (A1189) Compatible For MacBook Pro Unibody 17" (A1261 & A1151 2006 To Early 2008)',
        'price' => 45.59,
        'category' => 'MacBook Pro 17" Parts',
        'stock_quantity' => 10
    ],
    [
        'name' => 'Battery (A1437) Compatible For MacBook Pro 13" Retina (A1425 / Late 2012)',
        'description' => 'Battery (A1437) Compatible For MacBook Pro 13" Retina (A1425 / Late 2012)',
        'price' => 46.51,
        'category' => 'MacBook Pro 13" Parts',
        'stock_quantity' => 15
    ],
    [
        'name' => 'Battery (A1964) Compatible For MacBook Pro 13" (A1989 Late 2018 / Early 2019) (A2251: Mid 2020)',
        'description' => 'Battery (A1964) Compatible For MacBook Pro 13" (A1989 Late 2018 / Early 2019) (A2251: Mid 2020)',
        'price' => 47.50,
        'category' => 'MacBook Pro 13" Parts',
        'stock_quantity' => 15
    ],
    [
        'name' => 'Battery (A2977) Compatible For MacBook Pro 14" (A2992 / Late 2023)',
        'description' => 'Battery (A2977) Compatible For MacBook Pro 14" (A2992 / Late 2023)',
        'price' => 63.42,
        'category' => 'MacBook Pro 14" Parts',
        'stock_quantity' => 12
    ],
    [
        'name' => 'Battery (A2113) Compatible For MacBook Pro 16" (A2141 / 2019)',
        'description' => 'Battery (A2113) Compatible For MacBook Pro 16" (A2141 / 2019)',
        'price' => 67.68,
        'category' => 'MacBook Pro 16" Parts',
        'stock_quantity' => 10
    ],
    [
        'name' => 'Battery (A2976) Compatible For MacBook Pro 16" (A2991 / Late 2023)',
        'description' => 'Battery (A2976) Compatible For MacBook Pro 16" (A2991 / Late 2023)',
        'price' => 68.71,
        'category' => 'MacBook Pro 16" Parts',
        'stock_quantity' => 10
    ],
    [
        'name' => 'Replacement Battery (A2527) Compatible For MacBook Pro 16" (A2485 / Late 2021)',
        'description' => 'Replacement Battery (A2527) Compatible For MacBook Pro 16" (A2485 / Late 2021) / (A2780 / Early 2023)',
        'price' => 73.01,
        'category' => 'MacBook Pro 16" Parts',
        'stock_quantity' => 10
    ]
];

try {
    // Initialize Supabase client
    $supabaseUrl = SUPABASE_URL ?? 'your-supabase-url';
    $supabaseKey = SUPABASE_KEY ?? 'your-supabase-key';

    if ($supabaseUrl === 'your-supabase-url' || $supabaseKey === 'your-supabase-key') {
        throw new Exception("Please configure your Supabase credentials in config.php");
    }

    echo "Populating Supabase with MacBook Pro Genuine OEM Parts...\n";
    echo "==================================================\n\n";

    // Insert each part
    $inserted = 0;
    foreach ($macbookProParts as $part) {
        try {
            $response = $supabase->from('parts')->insert($part)->execute();

            if ($response) {
                echo "✓ Inserted: {$part['name']} - \${$part['price']}\n";
                $inserted++;
            }
        } catch (Exception $e) {
            echo "✗ Failed to insert {$part['name']}: " . $e->getMessage() . "\n";
        }
    }

    echo "\n==================================================\n";
    echo "Summary: $inserted out of " . count($macbookProParts) . " parts inserted successfully!\n";

    if ($inserted === count($macbookProParts)) {
        echo "🎉 All MacBook Pro parts have been added to your Supabase database!\n";
    }

} catch (Exception $e) {
    echo "❌ Error: " . $e->getMessage() . "\n";
    echo "\nPlease make sure:\n";
    echo "1. Your Supabase credentials are configured in config.php\n";
    echo "2. The 'parts' table exists in your Supabase database\n";
    echo "3. You have the necessary permissions to insert data\n";
}
