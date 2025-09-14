<?php
/**
 * Populate Supabase with MacBook Air Genuine OEM Parts
 *
 * This script inserts MacBook Air parts data into the Supabase 'parts' table
 */

require_once __DIR__ . '/vendor/autoload.php';
require_once 'config.php';

use Supabase\CreateClient;

$supabase = new CreateClient(SUPABASE_KEY, SUPABASE_URL);

// MacBook Air Parts Data
$macbookAirParts = [
    // MacBook Air 15" (A2941 / Mid 2023) Parts
    [
        'name' => 'Replacement Battery (A2797) Compatible For MacBook Air 15" (A2941 / Mid 2023) / (A3113 / Mid 2024)',
        'description' => 'Replacement Battery (A2797) Compatible For MacBook Air 15" (A2941 / Mid 2023) / (A3113 / Mid 2024)',
        'price' => 72.43,
        'category' => 'MacBook Air 15" Parts',
        'stock_quantity' => 15
    ],
    [
        'name' => 'Complete LCD Display Assembly Compatible For MacBook Air 15" (A2941 / Mid 2023) / Air 15" (A3114 / Mid 2024) (Used OEM Pull: Grade B) (Space Gray)',
        'description' => 'Complete LCD Display Assembly Compatible For MacBook Air 15" (A2941 / Mid 2023) / Air 15" (A3114 / Mid 2024) (Used OEM Pull: Grade B) (Space Gray)',
        'price' => 376.47,
        'category' => 'MacBook Air 15" Parts',
        'stock_quantity' => 8
    ],
    [
        'name' => 'Complete LCD Display Assembly Compatible For MacBook Air 15" (A2941 / Mid 2023) / Air 15" (A3114 / Mid 2024) (Used OEM Pull: Grade B) (Midnight)',
        'description' => 'Complete LCD Display Assembly Compatible For MacBook Air 15" (A2941 / Mid 2023) / Air 15" (A3114 / Mid 2024) (Used OEM Pull: Grade B) (Midnight)',
        'price' => 470.54,
        'category' => 'MacBook Air 15" Parts',
        'stock_quantity' => 6
    ],
    [
        'name' => 'Complete LCD Display Assembly Compatible For MacBook Air 15" (A2941 / Mid 2023) / Air 15" (A3114 / Mid 2024) (Used OEM Pull: Grade A) (Space Gray)',
        'description' => 'Complete LCD Display Assembly Compatible For MacBook Air 15" (A2941 / Mid 2023) / Air 15" (A3114 / Mid 2024) (Used OEM Pull: Grade A) (Space Gray)',
        'price' => 477.03,
        'category' => 'MacBook Air 15" Parts',
        'stock_quantity' => 8
    ],
    [
        'name' => 'Complete LCD Display Assembly Compatible For MacBook Air 15" (A2941 / Mid 2023) / Air 15" (A3114 / Mid 2024) (Used OEM Pull: Grade A) (Starlight)',
        'description' => 'Complete LCD Display Assembly Compatible For MacBook Air 15" (A2941 / Mid 2023) / Air 15" (A3114 / Mid 2024) (Used OEM Pull: Grade A) (Starlight)',
        'price' => 477.03,
        'category' => 'MacBook Air 15" Parts',
        'stock_quantity' => 8
    ],
    [
        'name' => 'Complete LCD Display Assembly Compatible For MacBook Air 15" (A2941 / Mid 2023) / Air 15" (A3114 / Mid 2024) (Used OEM Pull: Grade A) (Silver)',
        'description' => 'Complete LCD Display Assembly Compatible For MacBook Air 15" (A2941 / Mid 2023) / Air 15" (A3114 / Mid 2024) (Used OEM Pull: Grade A) (Silver)',
        'price' => 477.03,
        'category' => 'MacBook Air 15" Parts',
        'stock_quantity' => 8
    ],
    [
        'name' => 'Complete LCD Display Assembly Compatible For MacBook Air 15" (A2941 / Mid 2023) / Air 15" (A3114 / Mid 2024) (Used OEM Pull: Grade A) (Midnight)',
        'description' => 'Complete LCD Display Assembly Compatible For MacBook Air 15" (A2941 / Mid 2023) / Air 15" (A3114 / Mid 2024) (Used OEM Pull: Grade A) (Midnight)',
        'price' => 586.84,
        'category' => 'MacBook Air 15" Parts',
        'stock_quantity' => 6
    ],
    [
        'name' => 'LCD Panel Only Compatible For MacBook Air 15" (A2941 / A3114) (Compatible With All Years)',
        'description' => 'LCD Panel Only Compatible For MacBook Air 15" (A2941 / A3114 / A3241 ) (Compatible With All Years)',
        'price' => 278.39,
        'category' => 'MacBook Air 15" Parts',
        'stock_quantity' => 10
    ],
    [
        'name' => 'Top Case Assembly With Battery And Keyboard Compatible For MacBook Air 15" (A2941 / Mid 2023) (UK Keyboard) (Space Gray)',
        'description' => 'Top Case Assembly With Battery And Keyboard Compatible For MacBook Air 15" (A2941 / Mid 2023) (UK Keyboard) (Space Gray)',
        'price' => 278.32,
        'category' => 'MacBook Air 15" Parts',
        'stock_quantity' => 8
    ],
    [
        'name' => 'Top Case Assembly With Battery And Keyboard Compatible For MacBook Air 15" (A2941 / Mid 2023) (US Keyboard) (Starlight)',
        'description' => 'Top Case Assembly With Battery And Keyboard Compatible For MacBook Air 15" (A2941 / Mid 2023) (US Keyboard) (Starlight)',
        'price' => 279.19,
        'category' => 'MacBook Air 15" Parts',
        'stock_quantity' => 8
    ],
    [
        'name' => 'Top Case Assembly With Battery And Keyboard Compatible For MacBook Air 15" (A2941 / Mid 2023) (UK Keyboard) (Silver)',
        'description' => 'Top Case Assembly With Battery And Keyboard Compatible For MacBook Air 15" (A2941 / Mid 2023) (UK Keyboard) (Silver)',
        'price' => 301.67,
        'category' => 'MacBook Air 15" Parts',
        'stock_quantity' => 8
    ],
    [
        'name' => 'Top Case Assembly With Battery And Keyboard Compatible For MacBook Air 15" (A2941 / Mid 2023) (US Keyboard) (Space Gray)',
        'description' => 'Top Case Assembly With Battery And Keyboard Compatible For MacBook Air 15" (A2941 / Mid 2023) (US Keyboard) (Space Gray)',
        'price' => 306.98,
        'category' => 'MacBook Air 15" Parts',
        'stock_quantity' => 8
    ],
    [
        'name' => 'Top Case Assembly With Battery And Keyboard Compatible For MacBook Air 15" (A2941 / Mid 2023) (UK Keyboard) (Midnight)',
        'description' => 'Top Case Assembly With Battery And Keyboard Compatible For MacBook Air 15" (A2941 / Mid 2023) (UK Keyboard) (Midnight)',
        'price' => 314.51,
        'category' => 'MacBook Air 15" Parts',
        'stock_quantity' => 8
    ],
    [
        'name' => 'Top Case Assembly With Battery And Keyboard Compatible For MacBook Air 15" (A2941 / Mid 2023) (US Keyboard) (Midnight)',
        'description' => 'Top Case Assembly With Battery And Keyboard Compatible For MacBook Air 15" (A2941 / Mid 2023) (US Keyboard) (Midnight)',
        'price' => 329.91,
        'category' => 'MacBook Air 15" Parts',
        'stock_quantity' => 8
    ],
    [
        'name' => 'Trackpad Flex Cable Compatible For MacBook Air 15" (A2941 / Mid 2023)',
        'description' => 'Trackpad Flex Cable Compatible For MacBook Air 15" (A2941 / Mid 2023)',
        'price' => 4.43,
        'category' => 'MacBook Air 15" Parts',
        'stock_quantity' => 15
    ],
    [
        'name' => 'Trackpad Compatible For MacBook Air 15" (A2941 / Mid 2023) (Midnight)',
        'description' => 'Trackpad Compatible For MacBook Air 15" (A2941 / Mid 2023) (Midnight)',
        'price' => 60.41,
        'category' => 'MacBook Air 15" Parts',
        'stock_quantity' => 10
    ],
    [
        'name' => 'Trackpad Compatible For MacBook Air 15" (A2941 / Mid 2023) (Silver)',
        'description' => 'Trackpad Compatible For MacBook Air 15" (A2941 / Mid 2023) (Silver)',
        'price' => 61.52,
        'category' => 'MacBook Air 15" Parts',
        'stock_quantity' => 10
    ],
    [
        'name' => 'Trackpad Compatible For MacBook Air 15" (A2941 / Mid 2023) (Starlight)',
        'description' => 'Trackpad Compatible For MacBook Air 15" (A2941 / Mid 2023) (Starlight)',
        'price' => 61.79,
        'category' => 'MacBook Air 15" Parts',
        'stock_quantity' => 10
    ],
    [
        'name' => 'Trackpad Compatible For MacBook Air 15 (A2941 / Mid 2023) (Space Gray)',
        'description' => 'Trackpad Compatible For MacBook Air 15" (A2941 / Mid 2023) (Space Gray)',
        'price' => 83.60,
        'category' => 'MacBook Air 15" Parts',
        'stock_quantity' => 10
    ],
    [
        'name' => 'LCD Cable Compatible For MacBook Air 15" (A2941/ Mid 2023) (Soldering Required)',
        'description' => 'LCD Cable Compatible For MacBook Air 15" (A2941 / Mid 2023 / A3114 / Mid 2024 / A3241 / Early 2025) (Soldering Required)',
        'price' => 5.09,
        'category' => 'MacBook Air 15" Parts',
        'stock_quantity' => 12
    ],
    [
        'name' => 'Audio Jack Compatible For MacBook Air 15"(A2941 / Mid 2023) /(A3114 / Mid 2024) (Space Gray)',
        'description' => 'Audio Jack Compatible For MacBook Air 15" (A2941 / Mid 2023) (Space Gray)',
        'price' => 6.67,
        'category' => 'MacBook Air 15" Parts',
        'stock_quantity' => 15
    ],
    [
        'name' => 'Lid Angle Sensor (Dormancy Cable) Extension Flex Compatible For MacBook Air 15" (A2941 / Mid 2023)',
        'description' => 'Lid Angle Sensor (Dormancy Cable) Extension Flex Compatible For MacBook Air 15" (A2941 / Mid 2023)',
        'price' => 10.84,
        'category' => 'MacBook Air 15" Parts',
        'stock_quantity' => 12
    ],
    [
        'name' => 'Screen Extension Test Flex Cable Compatible For MacBook Air 15" (A2941 / Mid 2023)',
        'description' => 'Screen Extension Test Flex Cable Compatible For MacBook Air 15" (A2941 / Mid 2023 / A3114 / Mid 2024 / A3241 / Early 2025)',
        'price' => 19.44,
        'category' => 'MacBook Air 15" Parts',
        'stock_quantity' => 10
    ],
    [
        'name' => 'Bottom Case Plastic Feet Compatible For MacBook Pro / Air (Late 2021 To Late 2024) (4 Piece Set)',
        'description' => 'Bottom Case Plastic Feet Compatible For MacBook Pro / Air (Late 2021 To Late 2024) (4 Piece Set)',
        'price' => 2.03,
        'category' => 'MacBook Air 15" Parts',
        'stock_quantity' => 20
    ],
    [
        'name' => 'Display Bottom Plastic Bezel Strip (Without Logo) Compatible For MacBook Air 15" (A2941/ Mid 2023) / (A3114 / Mid 2024) (5 Pack)',
        'description' => 'Display Bottom Plastic Bezel Strip (Without Logo) Compatible For MacBook Air 15" (A2941 / Mid 2023 / A3114 / Mid 2024) (5 Pack)',
        'price' => 18.88,
        'category' => 'MacBook Air 15" Parts',
        'stock_quantity' => 8
    ],
    [
        'name' => 'USB-C Port Compatible For MacBook Air 15" (A2941 / Mid 2023) (Silver)',
        'description' => 'USB-C Board Compatible For MacBook Air 15" (A2941 / Mid 2023) (Silver)',
        'price' => 5.21,
        'category' => 'MacBook Air 15" Parts',
        'stock_quantity' => 15
    ],
    [
        'name' => 'USB-C Port Compatible For MacBook Air 15" (A2941 / Mid 2023)',
        'description' => 'USB-C Board Compatible For MacBook Air 15" (A2941 / Mid 2023) (Space Gray)',
        'price' => 7.21,
        'category' => 'MacBook Air 15" Parts',
        'stock_quantity' => 15
    ],
    [
        'name' => 'Left & Right Loudspeaker Compatible For MacBook Air 15" (A2941 / Mid 2023)',
        'description' => 'Left & Right Loudspeaker Compatible For MacBook Air 15" (A2941 / Mid 2023 / A3114 / Mid 2024 / A3241 / Early 2025)',
        'price' => 18.23,
        'category' => 'MacBook Air 15" Parts',
        'stock_quantity' => 12
    ],
    [
        'name' => 'Left & Right Loudspeaker Compatible For MacBook Air 15"(A2941 / Mid 2023 /A3114 / Mid 2024)',
        'description' => 'Left & Right Loudspeaker Compatible For MacBook Air 15" (A2941 / Mid 2023 / A3114 / Mid 2024 / A3241 / Early 2025)',
        'price' => 30.00,
        'category' => 'MacBook Air 15" Parts',
        'stock_quantity' => 12
    ],
    [
        'name' => 'Display Gasket Compatible For MacBook Air 15" (A2941/ Mid 2023) / (A3114 / Mid 2024)',
        'description' => 'Display Gasket Compatible For MacBook Air 15" (A2941 / Mid 2023 / A3114 / Mid 2024 / A3241 / Early 2025)',
        'price' => 2.52,
        'category' => 'MacBook Air 15" Parts',
        'stock_quantity' => 20
    ],
    [
        'name' => 'Antenna Bracket Compatible For MacBook Air 15" (A2941 / Mid 2023)',
        'description' => 'Antenna Bracket Compatible For MacBook Air 15" (A2941 / Mid 2023 / A3114 / Mid 2024 / A3241 / Early 2025)',
        'price' => 6.03,
        'category' => 'MacBook Air 15" Parts',
        'stock_quantity' => 15
    ],
    [
        'name' => 'Full Set Small Metal Bracket And Screw Set Compatible For MacBook Air 15" (A3114 / Mid 2024)',
        'description' => 'Full Set Small Metal Bracket And Screw Set Compatible For MacBook Air 15" (A2941 / Mid 2023 / A3114 / Mid 2024 / A3241 / Early 2025)',
        'price' => 45.61,
        'category' => 'MacBook Air 15" Parts',
        'stock_quantity' => 10
    ],
    [
        'name' => 'Audio Jack Compatible For MacBook Air 15"(A2941 / Mid 2023) /(A3114 / Mid 2024) (Silver)',
        'description' => 'Audio Jack Compatible For MacBook Air 15" (A2941 / Mid 2023) (Silver)',
        'price' => 11.43,
        'category' => 'MacBook Air 15" Parts',
        'stock_quantity' => 15
    ],
    [
        'name' => 'Dormancy Cable (Sleep / Wake Sensor) Flex Compatible For MacBook Air 15" (A2941/ Mid 2023)',
        'description' => 'Dormancy Cable (Sleep / Wake Sensor) Flex Compatible For MacBook Air 15" (A2941/ Mid 2023)',
        'price' => 16.67,
        'category' => 'MacBook Air 15" Parts',
        'stock_quantity' => 12
    ],
    [
        'name' => 'Lid Angle Sensor (LAS) Cable For MacBook Air 15" (A2941) (nerd.tool.1)',
        'description' => 'Lid Angle Sensor (LAS) Cable For MacBook Air 15" (A2941 / A3114) (nerd.tool.1)',
        'price' => 12.19,
        'category' => 'MacBook Air 15" Parts',
        'stock_quantity' => 10
    ],
    [
        'name' => 'Lid Angle Sensor (LAS) Extension Cable For MacBook Air 15" (A2941) (nerd.tool.1)',
        'description' => 'Lid Angle Sensor (LAS) Extension Cable For MacBook Air 15" (A2941 / A3114 / A3241) (nerd.tool.1)',
        'price' => 13.72,
        'category' => 'MacBook Air 15" Parts',
        'stock_quantity' => 10
    ],
    [
        'name' => 'Lid Angle Sensor Compatible For MacBook Air 15" (A2941 / Mid 2023)',
        'description' => 'MagSafe 3 Charging Connector Compatible With Macbook Air 15" (A2941 / Mid 2023 / A3114 / Mid 2024 / A3241 / Early 2025)',
        'price' => 8.37,
        'category' => 'MacBook Air 15" Parts',
        'stock_quantity' => 12
    ],
    [
        'name' => 'Audio Daughterboard Compatible For MacBook Air 15" (A2941 / Mid 2023)',
        'description' => 'Audio Daughterboard Compatible For MacBook Air 15" (A2941 / Mid 2023)',
        'price' => 19.32,
        'category' => 'MacBook Air 15" Parts',
        'stock_quantity' => 10
    ],
    [
        'name' => 'Daughter Board Cable Compatible For MacBook Air 15" (A2941/ Mid 2023)',
        'description' => 'Daughter Board Cable Compatible For MacBook Air 15" (A2941 / Mid 2023)',
        'price' => 47.92,
        'category' => 'MacBook Air 15" Parts',
        'stock_quantity' => 8
    ],
    [
        'name' => 'Power IC Chip Compatible For MacBook Air 13" ( A3113 / Mid 2024)/ Air 15" (A3114 / Mid 2024) (343S00668)',
        'description' => 'Power IC Chip Compatible For MacBook Air 13" ( A3113 / Mid 2024)/ Air 15" (A3114 / Mid 2024) (343S00668)',
        'price' => 26.11,
        'category' => 'MacBook Air 15" Parts',
        'stock_quantity' => 15
    ],
    [
        'name' => 'Power IC Chip Compatible For MacBook Air 13" ( A3113 / Mid 2024)/ Air 15" (A3114 / Mid 2024) (343S00669)',
        'description' => 'Power IC Chip Compatible For MacBook Air 13" ( A3113 / Mid 2024)/ Air 15" (A3114 / Mid 2024) (343S00669)',
        'price' => 26.11,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 15
    ],

    // MacBook Air 13" (A2179, Early 2020) Parts
    [
        'name' => 'LCD Panel Only Compatible For MacBook Air 13" Retina (A1932 / Mid 2019) / (A2179 / Early 2020) (Panel Only)',
        'description' => 'LCD Panel Only Compatible For MacBook Air 13" Retina (A1932 / Mid 2019) / (A2179 / Early 2020) (Panel Only)',
        'price' => 118.03,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 10
    ],
    [
        'name' => 'Complete LCD Display Assembly Compatible For MacBook Air 13" Retina (A1932 / Mid 2019) (A2179 / Early 2020) (Aftermarket Plus) (Rose Gold)',
        'description' => 'Complete LCD Display Assembly Compatible For MacBook Air 13" Retina (A1932 / Mid 2019) (A2179 / Early 2020) (Aftermarket Plus) (Rose Gold)',
        'price' => 207.98,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 8
    ],
    [
        'name' => 'Complete LCD Display Assembly Compatible For MacBook Air 13" Retina (A1932 / Mid 2019) (A2179 / Early 2020) (Aftermarket Plus) (Space Gray)',
        'description' => 'Complete LCD Display Assembly Compatible For MacBook Air 13" Retina (A1932 / Mid 2019) (A2179 / Early 2020) (Aftermarket Plus) (Space Gray)',
        'price' => 210.20,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 8
    ],
    [
        'name' => 'Complete LCD Display Assembly Compatible For MacBook Air 13" Retina (A1932 / Mid 2019) (A2179 / Early 2020) (Aftermarket Plus) (Silver)',
        'description' => 'Complete LCD Display Assembly Compatible For MacBook Air 13" Retina (A1932 / Mid 2019) (A2179 / Early 2020) (Aftermarket Plus) (Silver)',
        'price' => 269.36,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 8
    ],
    [
        'name' => 'Complete LCD Display Assembly Compatible For MacBook Air 13" Retina (A1932 / Mid 2019) (A2179 / Early 2020) (Used OEM Pull: Grade C) (Space Gray)',
        'description' => 'Complete LCD Display Assembly Compatible For MacBook Air 13" Retina (A1932 / Mid 2019) (A2179 / Early 2020) (Used OEM Pull: Grade C) (Space Gray)',
        'price' => 243.75,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 6
    ],
    [
        'name' => 'Complete LCD Display Assembly Compatible For MacBook Air 13" Retina (A1932 / Mid 2019) / (A2179 / Early 2020) (Used OEM Pull: Grade C) (Silver)',
        'description' => 'Complete LCD Display Assembly Compatible For MacBook Air 13" Retina (A1932 / Mid 2019) / (A2179 / Early 2020) (Used OEM Pull: Grade C) (Silver)',
        'price' => 243.75,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 6
    ],
    [
        'name' => 'Complete LCD Display Assembly Compatible For MacBook Air 13" Retina (A1932 / Mid 2019) (A2179 / Early 2020) (Used OEM Pull: Grade B) (Space Gray)',
        'description' => 'Complete LCD Display Assembly Compatible For MacBook Air 13" Retina (A1932 / Mid 2019) (A2179 / Early 2020) (Used OEM Pull: Grade B) (Space Gray)',
        'price' => 265.03,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 6
    ],
    [
        'name' => 'Complete LCD Display Assembly Compatible For MacBook Air 13" Retina (A1932 / Mid 2019) (A2179 / Early 2020) (Used OEM Pull: Grade A) (Space Gray)',
        'description' => 'Complete LCD Display Assembly Compatible For MacBook Air 13" Retina (A1932 / Mid 2019) (A2179 / Early 2020) (Used OEM Pull: Grade A) (Space Gray)',
        'price' => 279.03,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 8
    ],
    [
        'name' => 'Complete LCD Display Assembly Compatible For MacBook Air 13" Retina (A1932 / Mid 2019) / (A2179 / Early 2020) (Used OEM Pull: Grade A) (Silver)',
        'description' => 'Complete LCD Display Assembly Compatible For MacBook Air 13" Retina (A1932 / Mid 2019) / (A2179 / Early 2020) (Used OEM Pull: Grade A) (Silver)',
        'price' => 279.03,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 8
    ],
    [
        'name' => 'Battery (A1965) Compatible For MacBook Air 13" Retina (A1932 / Late 2018 To 2019 / A2179 / Early 2020)',
        'description' => 'Battery (A1965) Compatible For MacBook Air 13" Retina (A1932 / Late 2018 To 2019 / A2179 / Early 2020)',
        'price' => 48.14,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 15
    ],
    [
        'name' => 'Top Case Assembly With Battery And Keyboard Compatible For MacBook Air 13" Retina (A2179 / Early 2020) (US Keyboard) (Used OEM Pull: Grade B/C) (Space Gray)',
        'description' => 'Top Case Assembly With Battery And Keyboard Compatible For MacBook Air 13" Retina (A2179 / Early 2020) (US Keyboard) (Used OEM Pull: Grade B/C) (Space Gray)',
        'price' => 135.03,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 8
    ],
    [
        'name' => 'Top Case Assembly With Battery And Keyboard Compatible For MacBook Air 13" Retina (A2179 / Early 2020) (US Keyboard)(Used OEM Pull: Grade B/C) (Silver)',
        'description' => 'Top Case Assembly With Battery And Keyboard Compatible For MacBook Air 13" Retina (A2179 / Early 2020) (US Keyboard)(Used OEM Pull: Grade B/C) (Silver)',
        'price' => 135.03,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 8
    ],
    [
        'name' => 'Top Case Assembly With Battery And Keyboard Compatible For MacBook Air 13" Retina (A2179 / Early 2020) (US Keyboard) (Used OEM Pull: Grade A) (Space Gray)',
        'description' => 'Top Case Assembly With Battery And Keyboard Compatible For MacBook Air 13" Retina (A2179 / Early 2020) (US Keyboard) (Used OEM Pull: Grade A) (Space Gray)',
        'price' => 175.03,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 8
    ],
    [
        'name' => 'Top Case Assembly With Battery And Keyboard Compatible For MacBook Air 13" Retina (A2179 / Early 2020) (US Keyboard) (Used OEM Pull: Grade A) (Silver)',
        'description' => 'Top Case Assembly With Battery And Keyboard Compatible For MacBook Air 13" Retina (A2179 / Early 2020) (US Keyboard) (Used OEM Pull: Grade A) (Silver)',
        'price' => 175.03,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 8
    ],
    [
        'name' => 'Top Case With Keyboard Compatible For MacBook Air 13" Retina (A2179 / Early 2020) (US English) (Silver)',
        'description' => 'Top Case With Keyboard Compatible For MacBook Air 13" Retina (A2179 / Early 2020) (US English) (Silver)',
        'price' => 149.28,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 8
    ],
    [
        'name' => 'Top Case Assembly With Battery And Keyboard Compatible For MacBook Air 13" Retina (A2179 / Early 2020) (US Keyboard) (Space Gray)',
        'description' => 'Top Case Assembly With Battery And Keyboard Compatible For MacBook Air 13" Retina (A2179 / Early 2020) (US Keyboard) (Space Gray)',
        'price' => 284.03,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 8
    ],
    [
        'name' => 'Top Case Assembly With Battery And Keyboard Compatible For MacBook Air 13" Retina (A2179 / Early 2020) (US Keyboard) (Silver)',
        'description' => 'Top Case Assembly With Battery And Keyboard Compatible For MacBook Air 13" Retina (A2179 / Early 2020) (US Keyboard) (Silver)',
        'price' => 284.03,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 8
    ],
    [
        'name' => 'Display Bottom Glass Bezel Strip (Without Logo) Compatible For MacBook Air 13" (A1932 / A2179 / A2337) (9 Pack)',
        'description' => 'Display Bottom Glass Bezel Strip (Without Logo) Compatible For MacBook Air 13" (A1932 / A2179 / A2337) (9 Pack)',
        'price' => 23.19,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 8
    ],
    [
        'name' => 'Display Bottom Glass Bezel Strip (Without Logo) Compatible For MacBook Air 13" (A1932 / A2179 / A2337) (10 Pack)',
        'description' => 'Display Bottom Glass Bezel Strip (Without Logo) Compatible For MacBook Air 13" (A1932 / A2179 / A2337) (10 Pack)',
        'price' => 25.79,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 8
    ],
    [
        'name' => 'Bottom Case Plastic Feet Compatible For MacBook Pro / Air (Late 2016 To Early 2020) (4 Piece Set)',
        'description' => 'Bottom Case Plastic Feet Compatible For MacBook Pro / Air (Late 2016 To Early 2020) (4 Piece Set)',
        'price' => 1.60,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 20
    ],
    [
        'name' => 'LCD Backlight And Front Camera Extension Flex Cable Compatible For MacBook Air 13" Retina (A1932 / A2179 / A2337 Mid 2019 To Late 2020) (2 Piece Set)',
        'description' => 'LCD Backlight And Front Camera Extension Flex Cable Compatible For MacBook Air 13" Retina (A1932 / A2179 / A2337 Mid 2019 To Late 2020) (2 Piece Set)',
        'price' => 3.71,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 15
    ],
    [
        'name' => 'Trackpad Flex Cable Compatible For MacBook Air 13" Retina (A2179 / Early 2020) / (A2337 / Late 2020)',
        'description' => 'Trackpad Flex Cable Compatible For MacBook Air 13" Retina (A2179 / Early 2020) / (A2337 / Late 2020)',
        'price' => 3.82,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 15
    ],
    [
        'name' => 'LCD Flex Cable Compatible For MacBook Air 13" Retina (A1932 / A2179 / A2337 Mid 2019 To Late 2020) (2 Piece Set)',
        'description' => 'LCD Flex Cable Compatible For MacBook Air 13" Retina (A1932 / A2179 / A2337 Mid 2019 To Late 2020) (2 Piece Set)',
        'price' => 4.17,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 15
    ],
    [
        'name' => 'Trackpad Compatible For MacBook Air 13" Retina (A2179 / Early 2020) (Rose Gold)',
        'description' => 'Trackpad Compatible For MacBook Air 13" Retina (A2179 / Early 2020) (Rose Gold)',
        'price' => 34.13,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 10
    ],
    [
        'name' => 'Trackpad Compatible For MacBook Air 13" Retina (A2179 / Early 2020) (Space Gray)',
        'description' => 'Trackpad Compatible For MacBook Air 13" Retina (A2179 / Early 2020) (Space Gray)',
        'price' => 35.40,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 10
    ],
    [
        'name' => 'Trackpad Compatible For MacBook Air 13" Retina (A2179 / Early 2020) (Silver)',
        'description' => 'Trackpad Compatible For MacBook Air 13" Retina (A2179 / Early 2020) (Silver)',
        'price' => 35.60,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 10
    ],
    [
        'name' => 'Trackpad Connector Board Compatible For MacBook Air 13" Retina (A2179 / Early 2020)',
        'description' => 'Trackpad Connector Board Compatible For MacBook Air 13" Retina (A2179 / Early 2020)',
        'price' => 41.69,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 10
    ],
    [
        'name' => 'Keyboard Backlight Only Compatible For MacBook Air 13" Retina (A2179 / Early 2020) (A2337 / Late 2020) (US English)',
        'description' => 'Keyboard Backlight Only Compatible For MacBook Air 13" Retina (A2179 / Early 2020) (A2337 / Late 2020) (US English)',
        'price' => 8.79,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 15
    ],
    [
        'name' => 'Keyboard Only Compatible For MacBook Air 13" Retina (A2179 / Early 2020) (UK English)',
        'description' => 'Keyboard W/ Backlight & Screws Compatible For MacBook Air 13" Retina (A2179 / Early 2020) (UK English)',
        'price' => 21.44,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 12
    ],
    [
        'name' => 'Keyboard W/ Backlight & Screws Compatible For MacBook Air 13" Retina (A2179 / Early 2020) (US English)',
        'description' => 'Keyboard W/ Backlight & Screws Compatible For MacBook Air 13" Retina (A2179 / Early 2020) (US English)',
        'price' => 28.43,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 12
    ],
    [
        'name' => 'ISL9240HI U7000 Compatible For MacBook Pro 13" / Pro 15" / Air 13" (A2159 / A1989 / A1990 / A2179) (BGA ,40 Pin)',
        'description' => 'ISL9240HI U7000 Compatible For MacBook Pro 13" / Pro 15" / Air 13" (A2159 / A1989 / A1990 / A2179) (BGA ,40 Pin)',
        'price' => 3.68,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 15
    ],
    [
        'name' => 'USB-C Board Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019 / A2179 / Early 2020 / A2337 / Late 2020)',
        'description' => 'USB-C Board Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019 / A2179 / Early 2020 / A2337 / Late 2020)',
        'price' => 4.67,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 15
    ],
    [
        'name' => 'Audio Board Flex Cable Compatible For MacBook Air 13" Retina (A2179 / Early 2020)',
        'description' => 'Audio Board Flex Cable Compatible For MacBook Air 13" Retina (A2179 / Early 2020)',
        'price' => 4.71,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 12
    ],
    [
        'name' => 'Audio Board Compatible For MacBook Air 13" Retina (A2179 / Early 2020) (Space Gray)',
        'description' => 'Audio Board Compatible For MacBook Air 13" Retina (A2179 / Early 2020) (Space Gray)',
        'price' => 40.96,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 10
    ],
    [
        'name' => 'Audio Board Compatible For MacBook Air 13" Retina (A2179 / Early 2020) (Silver)',
        'description' => 'Audio Board Compatible For MacBook Air 13" Retina (A2179 / Early 2020) (Silver)',
        'price' => 60.46,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 10
    ],
    [
        'name' => 'LCD Backlight And Front Camera Extension Flex Cable Compatible For MacBook Pro 13" / 15" W/ Touch Bar (A1706 / A1707 / A1708 / A1989 / A2159 / A2289 / A2251 / A1990 / A1932 / A2179 / Late 2016 To Mid 2020) (2 Piece Set)',
        'description' => 'LCD Backlight And Front Camera Extension Flex Cable Compatible For MacBook Pro 13" / 15" W/ Touch Bar (A1706 / A1707 / A1708 / A1989 / A2159 / A2289 / A2251 / A1990 / A1932 / A2179 / Late 2016 To Mid 2020) (2 Piece Set)',
        'price' => 4.95,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 15
    ],
    [
        'name' => 'LCD TCON Board Flex Cable Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / A2179 / Mid 2019 / Early 2020)',
        'description' => 'LCD TCON Board Flex Cable Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / A2179 / Mid 2019 / Early 2020)',
        'price' => 6.67,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 12
    ],
    [
        'name' => 'Microphone Flex Cable Compatible For MacBook Air 13" Retina (A2179 / Early 2020)',
        'description' => 'Microphone Flex Cable Compatible For MacBook Air 13" Retina (A2179 / Early 2020)',
        'price' => 5.33,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 12
    ],
    [
        'name' => 'Right Loudspeaker Compatible For MacBook Air 13" Retina (A2179 / Early 2020)',
        'description' => 'Right Loudspeaker Compatible For MacBook Air 13" Retina (A2179 / Early 2020)',
        'price' => 8.77,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 12
    ],
    [
        'name' => 'Left Loudspeaker Compatible For MacBook Air 13" Retina (A2179 / Early 2020)',
        'description' => 'Left Loudspeaker Compatible For MacBook Air 13" Retina (A2179 / Early 2020)',
        'price' => 16.21,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 12
    ],
    [
        'name' => 'Left Loudspeaker & Right Loudspeaker Compatible For MacBook Air 13" Retina (A2179 / Early 2020)',
        'description' => 'Left Loudspeaker & Right Loudspeaker Compatible For MacBook Air 13" Retina (A2179 / Early 2020)',
        'price' => 23.77,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 12
    ],
    [
        'name' => 'Antenna Bar Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019)',
        'description' => 'Antenna Bar Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019) / (A2179 / Early 2020)',
        'price' => 4.43,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 15
    ],
    [
        'name' => 'Keyboard Screws Only Compatible For MacBook Pro / Air (2016-2022) (100 Pack)',
        'description' => 'Keyboard Screws Only Compatible For MacBook Pro / Air (2016-2022) (100 Pack)',
        'price' => 5.53,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 5
    ],
    [
        'name' => 'Vent / Antenna Screws (Pentalobe P2) Compatible For MacBook Pro / Air (Late 2016 / Late 2020) (100 Pack)',
        'description' => 'Vent / Antenna Screws (Pentalobe P2) Compatible For MacBook Pro / Air (Late 2016 / Late 2020) (100 Pack)',
        'price' => 6.01,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 5
    ],
    [
        'name' => 'Bottom Case Screws Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019 / A2179 / Early 2020 / A2337 / Late 2020) (Space Gray)',
        'description' => 'Bottom Case Screws Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019 / A2179 / Early 2020 / A2337 / Late 2020) (Space Gray)',
        'price' => 1.57,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 20
    ],
    [
        'name' => 'Bottom Case Screws Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019 / A2179 / Early 2020 / A2337 / Late 2020) (Rose Gold)',
        'description' => 'Bottom Case Screws Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019 / A2179 / Early 2020 / A2337 / Late 2020) (Rose Gold)',
        'price' => 1.59,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 20
    ],
    [
        'name' => 'Bottom Case Screws Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019 / A2179 / Early 2020 / A2337 / Late 2020) (Silver)',
        'description' => 'Bottom Case Screws Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019 / A2179 / Early 2020 / A2337 / Late 2020) (Silver)',
        'price' => 1.63,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 20
    ],
    [
        'name' => 'Antenna Bar Screw Compatible For MacBook Pro / Air (Late 2016 / Late 2020)',
        'description' => 'Antenna Bar Screw Compatible For MacBook Pro / Air (Late 2016 / Late 2020)',
        'price' => 4.37,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 15
    ],
    [
        'name' => 'Full Set Small Metal Bracket And Screw Set Compatible For MacBook Air 13" Retina (A2337 / Late 2020)',
        'description' => 'Full Set Small Metal Bracket And Screw Set Compatible For MacBook Air 13" Retina (A2179 / Early 2020 / A2337 / Late 2020)',
        'price' => 11.60,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 10
    ],
    [
        'name' => 'Power Button Cable Compatible For MacBook Air 13" Retina (A2179 / Early 2020)',
        'description' => 'Power Button Cable Compatible For MacBook Air 13" Retina (A2179 / Early 2020)',
        'price' => 15.73,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 12
    ],
    [
        'name' => 'CPU Fan Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019 / A2179 / Early 2020 / A2337 / Late 2020)',
        'description' => 'CPU Fan Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019 / A2179 / Early 2020 / A2337 / Late 2020)',
        'price' => 6.74,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 12
    ],
    [
        'name' => 'Display Gasket Compatible For MacBook Pro 13" W/ Touch Bar (A1706 / A1708 / A1989 / A2159 / A2289 / A2251 / A1932 / A2179 / Late 2016 To Early 2020)',
        'description' => 'Display Gasket Compatible For MacBook Pro 13" W/ Touch Bar (A1706 / A1708 / A1989 / A2159 / A2289 / A2251 / A1932 / A2179 / Late 2016 To Early 2020)',
        'price' => 1.80,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 20
    ],
    [
        'name' => 'Tester Cable (Screen) Compatible For MacBook Pro And Air 2016-2020',
        'description' => 'Tester Cable (Screen) Compatible For MacBook Pro And Air 2016-2020',
        'price' => 19.53,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 10
    ],

    // MacBook Air 13" (A1932, Early 2019) Parts
    [
        'name' => 'LCD Panel Only Compatible For MacBook Air 13" Retina (A1932 / Mid 2019) / (A2179 / Early 2020) (Panel Only)',
        'description' => 'LCD Panel Only Compatible For MacBook Air 13" Retina (A1932 / Mid 2019) / (A2179 / Early 2020) (Panel Only)',
        'price' => 118.03,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 10
    ],
    [
        'name' => 'Complete LCD Display Assembly Compatible For MacBook Air 13" Retina (A1932 / Mid 2019) (A2179 / Early 2020) (Aftermarket Plus) (Rose Gold)',
        'description' => 'Complete LCD Display Assembly Compatible For MacBook Air 13" Retina (A1932 / Mid 2019) (A2179 / Early 2020) (Aftermarket Plus) (Rose Gold)',
        'price' => 207.98,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 8
    ],
    [
        'name' => 'Complete LCD Display Assembly Compatible For MacBook Air 13" Retina (A1932 / Mid 2019) (A2179 / Early 2020) (Aftermarket Plus) (Space Gray)',
        'description' => 'Complete LCD Display Assembly Compatible For MacBook Air 13" Retina (A1932 / Mid 2019) (A2179 / Early 2020) (Aftermarket Plus) (Space Gray)',
        'price' => 210.20,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 8
    ],
    [
        'name' => 'Complete LCD Display Assembly Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019) (Aftermarket Plus) (Space Gray)',
        'description' => 'Complete LCD Display Assembly Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019) (Aftermarket Plus) (Space Gray)',
        'price' => 213.03,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 8
    ],
    [
        'name' => 'Complete LCD Display Assembly Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019) (Aftermarket Plus) (Rose Gold)',
        'description' => 'Complete LCD Display Assembly Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019) (Aftermarket Plus) (Rose Gold)',
        'price' => 213.03,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 8
    ],
    [
        'name' => 'Complete LCD Display Assembly Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019) (Aftermarket Plus) (Silver)',
        'description' => 'Complete LCD Display Assembly Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019) (Aftermarket Plus) (Silver)',
        'price' => 213.03,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 8
    ],
    [
        'name' => 'Complete LCD Display Assembly Compatible For MacBook Air 13" Retina (A1932 / Mid 2019) (A2179 / Early 2020) (Aftermarket Plus) (Silver)',
        'description' => 'Complete LCD Display Assembly Compatible For MacBook Air 13" Retina (A1932 / Mid 2019) (A2179 / Early 2020) (Aftermarket Plus) (Silver)',
        'price' => 269.36,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 8
    ],
    [
        'name' => 'Complete LCD Display Assembly Compatible For MacBook Air 13" Retina (A1932 / Mid 2019) (A2179 / Early 2020) (Used OEM Pull: Grade C) (Space Gray)',
        'description' => 'Complete LCD Display Assembly Compatible For MacBook Air 13" Retina (A1932 / Mid 2019) (A2179 / Early 2020) (Used OEM Pull: Grade C) (Space Gray)',
        'price' => 243.75,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 6
    ],
    [
        'name' => 'Complete LCD Display Assembly Compatible For MacBook Air 13" Retina (A1932 / Mid 2019) / (A2179 / Early 2020) (Used OEM Pull: Grade C) (Silver)',
        'description' => 'Complete LCD Display Assembly Compatible For MacBook Air 13" Retina (A1932 / Mid 2019) / (A2179 / Early 2020) (Used OEM Pull: Grade C) (Silver)',
        'price' => 243.75,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 6
    ],
    [
        'name' => 'Complete LCD Display Assembly Compatible For MacBook Air 13" Retina (A1932 / Mid 2019) (A2179 / Early 2020) (Used OEM Pull: Grade B) (Space Gray)',
        'description' => 'Complete LCD Display Assembly Compatible For MacBook Air 13" Retina (A1932 / Mid 2019) (A2179 / Early 2020) (Used OEM Pull: Grade B) (Space Gray)',
        'price' => 265.03,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 6
    ],
    [
        'name' => 'Complete LCD Display Assembly Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019) (Used OEM Pull: Grade B) (Space Gray)',
        'description' => 'Complete LCD Display Assembly Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019) (Used OEM Pull: Grade B) (Space Gray)',
        'price' => 279.03,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 6
    ],
    [
        'name' => 'Complete LCD Display Assembly Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019) (Used OEM Pull: Grade B) (Rose Gold)',
        'description' => 'Complete LCD Display Assembly Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019) (Used OEM Pull: Grade B) (Rose Gold)',
        'price' => 294.89,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 6
    ],
    [
        'name' => 'Complete LCD Display Assembly Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019) (Used OEM Pull: Grade B) (Silver)',
        'description' => 'Complete LCD Display Assembly Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019) (Used OEM Pull: Grade B) (Silver)',
        'price' => 296.16,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 6
    ],
    [
        'name' => 'Complete LCD Display Assembly Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019) (Used OEM Pull: Grade A) (Space Gray)',
        'description' => 'Complete LCD Display Assembly Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019) (Used OEM Pull: Grade A) (Space Gray)',
        'price' => 279.03,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 8
    ],
    [
        'name' => 'Complete LCD Display Assembly Compatible For MacBook Air 13" Retina (A1932 / Mid 2019) (A2179 / Early 2020) (Used OEM Pull: Grade A) (Space Gray)',
        'description' => 'Complete LCD Display Assembly Compatible For MacBook Air 13" Retina (A1932 / Mid 2019) (A2179 / Early 2020) (Used OEM Pull: Grade A) (Space Gray)',
        'price' => 279.03,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 8
    ],
    [
        'name' => 'Complete LCD Display Assembly Compatible For MacBook Air 13" Retina (A1932 / Mid 2019) / (A2179 / Early 2020) (Used OEM Pull: Grade A) (Silver)',
        'description' => 'Complete LCD Display Assembly Compatible For MacBook Air 13" Retina (A1932 / Mid 2019) / (A2179 / Early 2020) (Used OEM Pull: Grade A) (Silver)',
        'price' => 279.03,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 8
    ],
    [
        'name' => 'Complete LCD Display Assembly Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019) (Used OEM Pull: Grade A) (Silver)',
        'description' => 'Complete LCD Display Assembly Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019) (Used OEM Pull: Grade A) (Silver)',
        'price' => 294.86,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 8
    ],
    [
        'name' => 'Complete LCD Display Assembly Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019) (Used OEM Pull: Grade A) (Rose Gold)',
        'description' => 'Complete LCD Display Assembly Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019) (Used OEM Pull: Grade A) (Rose Gold)',
        'price' => 326.97,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 8
    ],
    [
        'name' => 'Battery (A1965) Compatible For MacBook Air 13" Retina (A1932 / Late 2018 To 2019 / A2179 / Early 2020)',
        'description' => 'Battery (A1965) Compatible For MacBook Air 13" Retina (A1932 / Late 2018 To 2019 / A2179 / Early 2020)',
        'price' => 48.14,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 15
    ],
    [
        'name' => 'Top Case Assembly With Battery And Keyboard Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019) (US English) (Used OEM Pull: Grade B) (Space Gray)',
        'description' => 'Top Case Assembly With Battery And Keyboard Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019) (US English) (Used OEM Pull: Grade B) (Space Gray)',
        'price' => 266.34,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 8
    ],
    [
        'name' => 'Top Case Assembly With Battery And Keyboard Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019) (US English) (Used OEM Pull: Grade B) (Silver)',
        'description' => 'Top Case Assembly With Battery And Keyboard Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019) (US English) (Used OEM Pull: Grade B) (Silver)',
        'price' => 268.14,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 8
    ],
    [
        'name' => 'Top Case With Keyboard Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019) (US English) (Used OEM Pull: Grade New) (Space Gray)',
        'description' => 'Top Case With Keyboard Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019) (US English) (Used OEM Pull: Grade New) (Space Gray)',
        'price' => 115.17,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 8
    ],
    [
        'name' => 'Top Case Assembly With Battery And Keyboard Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019) (US English) (Used OEM Pull: Grade New) (Silver)',
        'description' => 'Top Case Assembly With Battery And Keyboard Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019) (US English) (Used OEM Pull: Grade New) (Silver)',
        'price' => 298.66,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 8
    ],
    [
        'name' => 'Top Case Assembly With Battery And Keyboard Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019) (US English) (Used OEM Pull: Grade New) (Space Gray)',
        'description' => 'Top Case Assembly With Battery And Keyboard Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019) (US English) (Used OEM Pull: Grade New) (Space Gray)',
        'price' => 301.98,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 8
    ],
    [
        'name' => 'Top Case Assembly With Battery And Keyboard Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019) (Gold) (US English)',
        'description' => 'Top Case Assembly With Battery And Keyboard Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019) (Gold) (US English)',
        'price' => 326.49,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 8
    ],
    [
        'name' => 'Bottom Case Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019 / A2179 / Early 2020) (Silver)',
        'description' => 'Bottom Case Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019 / A2179 / Early 2020) (Silver)',
        'price' => 10.65,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 15
    ],
    [
        'name' => 'Bottom Case Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019 / A2179 / Early 2020) (Gold)',
        'description' => 'Bottom Case Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019 / A2179 / Early 2020) (Gold)',
        'price' => 10.65,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 15
    ],
    [
        'name' => 'Bottom Case Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019 / A2179 / Early 2020) (Rose Gold)',
        'description' => 'Bottom Case Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019 / A2179 / Early 2020) (Rose Gold)',
        'price' => 10.65,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 15
    ],
    [
        'name' => 'Bottom Case Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019 / A2179 / Early 2020) (Space Gray)',
        'description' => 'Bottom Case Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019 / A2179 / Early 2020) (Space Gray)',
        'price' => 30.63,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 15
    ],
    [
        'name' => 'LCD Backlight And Front Camera Extension Flex Cable Compatible For MacBook Air 13" Retina (A1932 / A2179 / A2337 Mid 2019 To Late 2020) (2 Piece Set)',
        'description' => 'LCD Backlight And Front Camera Extension Flex Cable Compatible For MacBook Air 13" Retina (A1932 / A2179 / A2337 Mid 2019 To Late 2020) (2 Piece Set)',
        'price' => 3.71,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 15
    ],
    [
        'name' => 'LCD Flex Cable Compatible For MacBook Air 13" Retina (A1932 / A2179 / A2337 Mid 2019 To Late 2020) (2 Piece Set)',
        'description' => 'LCD Flex Cable Compatible For MacBook Air 13" Retina (A1932 / A2179 / A2337 Mid 2019 To Late 2020) (2 Piece Set)',
        'price' => 4.17,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 15
    ],
    [
        'name' => 'Trackpad Flex Cable Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019)',
        'description' => 'Trackpad Flex Cable Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019)',
        'price' => 4.94,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 15
    ],
    [
        'name' => 'Trackpad Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019) (Silver)',
        'description' => 'Trackpad Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019) (Silver)',
        'price' => 25.33,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 10
    ],
    [
        'name' => 'Trackpad Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019) (Space Gray)',
        'description' => 'Trackpad Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019) (Space Gray)',
        'price' => 26.91,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 10
    ],
    [
        'name' => 'Trackpad Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019) (Gold)',
        'description' => 'Trackpad Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019) (Gold)',
        'price' => 30.56,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 10
    ],
    [
        'name' => 'Keyboard W/ Backlight Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019) (UK English)',
        'description' => 'Keyboard W/ Backlight Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019) (UK English)',
        'price' => 101.39,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 12
    ],
    [
        'name' => 'Keyboard W/ Backlight Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019) (US English)',
        'description' => 'Keyboard W/ Backlight Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019) (US English)',
        'price' => 106.84,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 12
    ],
    [
        'name' => 'USB-C Board Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019 / A2179 / Early 2020 / A2337 / Late 2020)',
        'description' => 'USB-C Board Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019 / A2179 / Early 2020 / A2337 / Late 2020)',
        'price' => 4.67,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 15
    ],
    [
        'name' => 'Audio Board Flex Cable Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019)',
        'description' => 'Audio Board Flex Cable Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019)',
        'price' => 6.29,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 12
    ],
    [
        'name' => 'Audio Board Compatible For MacBook Air 13" Retina (A1932 Late 2018 / Early 2019 / Mid 2019) (Space Gray)',
        'description' => 'Audio Board Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019) (Space Gray)',
        'price' => 43.14,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 10
    ],
    [
        'name' => 'Audio Board Compatible For MacBook Air 13" Retina (A1932 Late 2018 / Early 2019 / Mid 2019) (Silver)',
        'description' => 'Audio Board Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019) (Silver)',
        'price' => 54.72,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 10
    ],
    [
        'name' => 'LCD Backlight And Front Camera Extension Flex Cable Compatible For MacBook Pro 13" / 15" W/ Touch Bar (A1706 / A1707 / A1708 / A1989 / A2159 / A2289 / A2251 / A1990 / A1932 / A2179 / Late 2016 To Mid 2020) (2 Piece Set)',
        'description' => 'LCD Backlight And Front Camera Extension Flex Cable Compatible For MacBook Pro 13" / 15" W/ Touch Bar (A1706 / A1707 / A1708 / A1989 / A2159 / A2289 / A2251 / A1990 / A1932 / A2179 / Late 2016 To Mid 2020) (2 Piece Set)',
        'price' => 4.95,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 15
    ],
    [
        'name' => 'LCD TCON Board Flex Cable Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / A2179 / Mid 2019 / Early 2020)',
        'description' => 'LCD TCON Board Flex Cable Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / A2179 / Mid 2019 / Early 2020)',
        'price' => 6.67,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 12
    ],
    [
        'name' => 'Loudspeaker Adhesive Compatible For MacBook Air 13" Retina (A1932) (Compatible With All Years) (2 Piece set)',
        'description' => 'Loudspeaker Adhesive Compatible For MacBook Air 13" Retina (A1932) (Compatible With All Years) (2 Piece set)',
        'price' => 1.61,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 20
    ],
    [
        'name' => 'Left Loudspeaker Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019)',
        'description' => 'Left Loudspeaker Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019)',
        'price' => 11.59,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 12
    ],
    [
        'name' => 'Left Loudspeaker & Right Loudspeaker Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019)',
        'description' => 'Left Loudspeaker & Right Loudspeaker Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019)',
        'price' => 20.96,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 12
    ],
    [
        'name' => 'Antenna Bar Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019)',
        'description' => 'Antenna Bar Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019) / (A2179 / Early 2020)',
        'price' => 4.43,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 15
    ],
    [
        'name' => 'Keyboard Screws Only Compatible For MacBook Pro / Air (2016-2022) (100 Pack)',
        'description' => 'Keyboard Screws Only Compatible For MacBook Pro / Air (2016-2022) (100 Pack)',
        'price' => 5.53,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 5
    ],
    [
        'name' => 'Vent / Antenna Screws (Pentalobe P2) Compatible For MacBook Pro / Air (Late 2016 / Late 2020) (100 Pack)',
        'description' => 'Vent / Antenna Screws (Pentalobe P2) Compatible For MacBook Pro / Air (Late 2016 / Late 2020) (100 Pack)',
        'price' => 6.01,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 5
    ],
    [
        'name' => 'Bottom Case Screws Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019 / A2179 / Early 2020 / A2337 / Late 2020) (Space Gray)',
        'description' => 'Bottom Case Screws Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019 / A2179 / Early 2020 / A2337 / Late 2020) (Space Gray)',
        'price' => 1.57,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 20
    ],
    [
        'name' => 'Bottom Case Screws Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019 / A2179 / Early 2020 / A2337 / Late 2020) (Rose Gold)',
        'description' => 'Bottom Case Screws Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019 / A2179 / Early 2020 / A2337 / Late 2020) (Rose Gold)',
        'price' => 1.59,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 20
    ],
    [
        'name' => 'Bottom Case Screws Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019 / A2179 / Early 2020 / A2337 / Late 2020) (Silver)',
        'description' => 'Bottom Case Screws Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019 / A2179 / Early 2020 / A2337 / Late 2020) (Silver)',
        'price' => 1.63,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 20
    ],
    [
        'name' => 'Antenna Bar Screw Compatible For MacBook Pro / Air (Late 2016 / Late 2020)',
        'description' => 'Antenna Bar Screw Compatible For MacBook Pro / Air (Late 2016 / Late 2020)',
        'price' => 4.37,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 15
    ],
    [
        'name' => 'Full Set Small Metal Bracket And Screw Set Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019)',
        'description' => 'Full Set Small Metal Bracket And Screw Set Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019)',
        'price' => 10.20,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 10
    ],
    [
        'name' => 'Power Button Cable Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019)',
        'description' => 'Power Button Cable Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019)',
        'price' => 15.80,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 12
    ],
    [
        'name' => 'CPU Fan Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019 / A2179 / Early 2020 / A2337 / Late 2020)',
        'description' => 'CPU Fan Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019 / A2179 / Early 2020 / A2337 / Late 2020)',
        'price' => 6.74,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 12
    ],
    [
        'name' => 'Display Gasket Compatible For MacBook Pro 13" W/ Touch Bar (A1706 / A1708 / A1989 / A2159 / A2289 / A2251 / A1932 / A2179 / Late 2016 To Early 2020)',
        'description' => 'Display Gasket Compatible For MacBook Pro 13" W/ Touch Bar (A1706 / A1708 / A1989 / A2159 / A2289 / A2251 / A1932 / A2179 / Late 2016 To Early 2020)',
        'price' => 1.80,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 20
    ],
    [
        'name' => 'WiFi Stencil Compatible For MacBook (A1989 / A1990 / A2159 / A1706 / A1534, 2015-2016 / A1932) (MAC 8)',
        'description' => 'WiFi Stencil Compatible For MacBook (A1989 / A1990 / A2159 / A1706 / A1534, 2015-2016 / A1932) (MAC 8)',
        'price' => 6.49,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 10
    ],

    // MacBook Air 13" (A1932, Early 2019) Parts
    [
        'name' => 'LCD Panel Only Compatible For MacBook Air 13" Retina (A1932 / Mid 2019) / (A2179 / Early 2020) (Panel Only)',
        'description' => 'LCD Panel Only Compatible For MacBook Air 13" Retina (A1932 / Mid 2019) / (A2179 / Early 2020) (Panel Only)',
        'price' => 118.03,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 10
    ],
    [
        'name' => 'Complete LCD Display Assembly Compatible For MacBook Air 13" Retina (A1932 / Mid 2019) (A2179 / Early 2020) (Aftermarket Plus) (Rose Gold)',
        'description' => 'Complete LCD Display Assembly Compatible For MacBook Air 13" Retina (A1932 / Mid 2019) (A2179 / Early 2020) (Aftermarket Plus) (Rose Gold)',
        'price' => 207.98,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 8
    ],
    [
        'name' => 'Complete LCD Display Assembly Compatible For MacBook Air 13" Retina (A1932 / Mid 2019) (A2179 / Early 2020) (Aftermarket Plus) (Space Gray)',
        'description' => 'Complete LCD Display Assembly Compatible For MacBook Air 13" Retina (A1932 / Mid 2019) (A2179 / Early 2020) (Aftermarket Plus) (Space Gray)',
        'price' => 210.20,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 8
    ],
    [
        'name' => 'Complete LCD Display Assembly Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019) (Aftermarket Plus) (Space Gray)',
        'description' => 'Complete LCD Display Assembly Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019) (Aftermarket Plus) (Space Gray)',
        'price' => 213.03,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 8
    ],
    [
        'name' => 'Complete LCD Display Assembly Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019) (Aftermarket Plus) (Rose Gold)',
        'description' => 'Complete LCD Display Assembly Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019) (Aftermarket Plus) (Rose Gold)',
        'price' => 213.03,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 8
    ],
    [
        'name' => 'Complete LCD Display Assembly Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019) (Aftermarket Plus) (Silver)',
        'description' => 'Complete LCD Display Assembly Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019) (Aftermarket Plus) (Silver)',
        'price' => 213.03,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 8
    ],
    [
        'name' => 'Complete LCD Display Assembly Compatible For MacBook Air 13" Retina (A1932 / Mid 2019) (A2179 / Early 2020) (Aftermarket Plus) (Silver)',
        'description' => 'Complete LCD Display Assembly Compatible For MacBook Air 13" Retina (A1932 / Mid 2019) (A2179 / Early 2020) (Aftermarket Plus) (Silver)',
        'price' => 269.36,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 8
    ],
    [
        'name' => 'Complete LCD Display Assembly Compatible For MacBook Air 13" Retina (A1932 / Mid 2019) (A2179 / Early 2020) (Used OEM Pull: Grade C) (Space Gray)',
        'description' => 'Complete LCD Display Assembly Compatible For MacBook Air 13" Retina (A1932 / Mid 2019) (A2179 / Early 2020) (Used OEM Pull: Grade C) (Space Gray)',
        'price' => 243.75,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 6
    ],
    [
        'name' => 'Complete LCD Display Assembly Compatible For MacBook Air 13" Retina (A1932 / Mid 2019) / (A2179 / Early 2020) (Used OEM Pull: Grade C) (Silver)',
        'description' => 'Complete LCD Display Assembly Compatible For MacBook Air 13" Retina (A1932 / Mid 2019) / (A2179 / Early 2020) (Used OEM Pull: Grade C) (Silver)',
        'price' => 243.75,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 6
    ],
    [
        'name' => 'Complete LCD Display Assembly Compatible For MacBook Air 13" Retina (A1932 / Mid 2019) (A2179 / Early 2020) (Used OEM Pull: Grade B) (Space Gray)',
        'description' => 'Complete LCD Display Assembly Compatible For MacBook Air 13" Retina (A1932 / Mid 2019) (A2179 / Early 2020) (Used OEM Pull: Grade B) (Space Gray)',
        'price' => 265.03,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 6
    ],
    [
        'name' => 'Complete LCD Display Assembly Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019) (Used OEM Pull: Grade B) (Space Gray)',
        'description' => 'Complete LCD Display Assembly Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019) (Used OEM Pull: Grade B) (Space Gray)',
        'price' => 279.03,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 6
    ],
    [
        'name' => 'Complete LCD Display Assembly Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019) (Used OEM Pull: Grade B) (Rose Gold)',
        'description' => 'Complete LCD Display Assembly Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019) (Used OEM Pull: Grade B) (Rose Gold)',
        'price' => 294.89,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 6
    ],
    [
        'name' => 'Complete LCD Display Assembly Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019) (Used OEM Pull: Grade B) (Silver)',
        'description' => 'Complete LCD Display Assembly Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019) (Used OEM Pull: Grade B) (Silver)',
        'price' => 296.16,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 6
    ],
    [
        'name' => 'Complete LCD Display Assembly Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019) (Used OEM Pull: Grade A) (Space Gray)',
        'description' => 'Complete LCD Display Assembly Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019) (Used OEM Pull: Grade A) (Space Gray)',
        'price' => 279.03,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 8
    ],
    [
        'name' => 'Complete LCD Display Assembly Compatible For MacBook Air 13" Retina (A1932 / Mid 2019) (A2179 / Early 2020) (Used OEM Pull: Grade A) (Space Gray)',
        'description' => 'Complete LCD Display Assembly Compatible For MacBook Air 13" Retina (A1932 / Mid 2019) (A2179 / Early 2020) (Used OEM Pull: Grade A) (Space Gray)',
        'price' => 279.03,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 8
    ],
    [
        'name' => 'Complete LCD Display Assembly Compatible For MacBook Air 13" Retina (A1932 / Mid 2019) / (A2179 / Early 2020) (Used OEM Pull: Grade A) (Silver)',
        'description' => 'Complete LCD Display Assembly Compatible For MacBook Air 13" Retina (A1932 / Mid 2019) / (A2179 / Early 2020) (Used OEM Pull: Grade A) (Silver)',
        'price' => 279.03,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 8
    ],
    [
        'name' => 'Complete LCD Display Assembly Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019) (Used OEM Pull: Grade A) (Silver)',
        'description' => 'Complete LCD Display Assembly Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019) (Used OEM Pull: Grade A) (Silver)',
        'price' => 294.86,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 8
    ],
    [
        'name' => 'Complete LCD Display Assembly Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019) (Used OEM Pull: Grade A) (Rose Gold)',
        'description' => 'Complete LCD Display Assembly Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019) (Used OEM Pull: Grade A) (Rose Gold)',
        'price' => 326.97,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 8
    ],
    [
        'name' => 'Battery (A1965) Compatible For MacBook Air 13" Retina (A1932 / Late 2018 To 2019 / A2179 / Early 2020)',
        'description' => 'Battery (A1965) Compatible For MacBook Air 13" Retina (A1932 / Late 2018 To 2019 / A2179 / Early 2020)',
        'price' => 48.14,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 15
    ],
    [
        'name' => 'Top Case Assembly With Battery And Keyboard Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019) (US English) (Used OEM Pull: Grade B) (Space Gray)',
        'description' => 'Top Case Assembly With Battery And Keyboard Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019) (US English) (Used OEM Pull: Grade B) (Space Gray)',
        'price' => 266.34,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 8
    ],
    [
        'name' => 'Top Case Assembly With Battery And Keyboard Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019) (US English) (Used OEM Pull: Grade B) (Silver)',
        'description' => 'Top Case Assembly With Battery And Keyboard Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019) (US English) (Used OEM Pull: Grade B) (Silver)',
        'price' => 268.14,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 8
    ],
    [
        'name' => 'Top Case With Keyboard Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019) (US English) (Used OEM Pull: Grade New) (Space Gray)',
        'description' => 'Top Case With Keyboard Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019) (US English) (Used OEM Pull: Grade New) (Space Gray)',
        'price' => 115.17,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 8
    ],
    [
        'name' => 'Top Case Assembly With Battery And Keyboard Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019) (US English) (Used OEM Pull: Grade New) (Silver)',
        'description' => 'Top Case Assembly With Battery And Keyboard Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019) (US English) (Used OEM Pull: Grade New) (Silver)',
        'price' => 298.66,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 8
    ],
    [
        'name' => 'Top Case Assembly With Battery And Keyboard Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019) (US English) (Used OEM Pull: Grade New) (Space Gray)',
        'description' => 'Top Case Assembly With Battery And Keyboard Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019) (US English) (Used OEM Pull: Grade New) (Space Gray)',
        'price' => 301.98,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 8
    ],
    [
        'name' => 'Top Case Assembly With Battery And Keyboard Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019) (Gold) (US English)',
        'description' => 'Top Case Assembly With Battery And Keyboard Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019) (Gold) (US English)',
        'price' => 326.49,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 8
    ],
    [
        'name' => 'Bottom Case Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019 / A2179 / Early 2020) (Silver)',
        'description' => 'Bottom Case Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019 / A2179 / Early 2020) (Silver)',
        'price' => 10.65,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 15
    ],
    [
        'name' => 'Bottom Case Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019 / A2179 / Early 2020) (Gold)',
        'description' => 'Bottom Case Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019 / A2179 / Early 2020) (Gold)',
        'price' => 10.65,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 15
    ],
    [
        'name' => 'Bottom Case Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019 / A2179 / Early 2020) (Rose Gold)',
        'description' => 'Bottom Case Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019 / A2179 / Early 2020) (Rose Gold)',
        'price' => 10.65,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 15
    ],
    [
        'name' => 'Bottom Case Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019 / A2179 / Early 2020) (Space Gray)',
        'description' => 'Bottom Case Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019 / A2179 / Early 2020) (Space Gray)',
        'price' => 30.63,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 15
    ],
    [
        'name' => 'LCD Backlight And Front Camera Extension Flex Cable Compatible For MacBook Air 13" Retina (A1932 / A2179 / A2337 Mid 2019 To Late 2020) (2 Piece Set)',
        'description' => 'LCD Backlight And Front Camera Extension Flex Cable Compatible For MacBook Air 13" Retina (A1932 / A2179 / A2337 Mid 2019 To Late 2020) (2 Piece Set)',
        'price' => 3.71,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 15
    ],
    [
        'name' => 'LCD Flex Cable Compatible For MacBook Air 13" Retina (A1932 / A2179 / A2337 Mid 2019 To Late 2020) (2 Piece Set)',
        'description' => 'LCD Flex Cable Compatible For MacBook Air 13" Retina (A1932 / A2179 / A2337 Mid 2019 To Late 2020) (2 Piece Set)',
        'price' => 4.17,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 15
    ],
    [
        'name' => 'Trackpad Flex Cable Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019)',
        'description' => 'Trackpad Flex Cable Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019)',
        'price' => 4.94,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 15
    ],
    [
        'name' => 'Trackpad Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019) (Silver)',
        'description' => 'Trackpad Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019) (Silver)',
        'price' => 25.33,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 10
    ],
    [
        'name' => 'Trackpad Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019) (Space Gray)',
        'description' => 'Trackpad Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019) (Space Gray)',
        'price' => 26.91,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 10
    ],
    [
        'name' => 'Trackpad Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019) (Gold)',
        'description' => 'Trackpad Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019) (Gold)',
        'price' => 30.56,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 10
    ],
    [
        'name' => 'Keyboard W/ Backlight Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019) (UK English)',
        'description' => 'Keyboard W/ Backlight Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019) (UK English)',
        'price' => 101.39,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 12
    ],
    [
        'name' => 'Keyboard W/ Backlight Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019) (US English)',
        'description' => 'Keyboard W/ Backlight Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019) (US English)',
        'price' => 106.84,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 12
    ],
    [
        'name' => 'USB-C Board Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019 / A2179 / Early 2020 / A2337 / Late 2020)',
        'description' => 'USB-C Board Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019 / A2179 / Early 2020 / A2337 / Late 2020)',
        'price' => 4.67,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 15
    ],
    [
        'name' => 'Audio Board Flex Cable Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019)',
        'description' => 'Audio Board Flex Cable Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019)',
        'price' => 6.29,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 12
    ],
    [
        'name' => 'Audio Board Compatible For MacBook Air 13" Retina (A1932 Late 2018 / Early 2019 / Mid 2019) (Space Gray)',
        'description' => 'Audio Board Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019) (Space Gray)',
        'price' => 43.14,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 10
    ],
    [
        'name' => 'Audio Board Compatible For MacBook Air 13" Retina (A1932 Late 2018 / Early 2019 / Mid 2019) (Silver)',
        'description' => 'Audio Board Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019) (Silver)',
        'price' => 54.72,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 10
    ],
    [
        'name' => 'LCD Backlight And Front Camera Extension Flex Cable Compatible For MacBook Pro 13" / 15" W/ Touch Bar (A1706 / A1707 / A1708 / A1989 / A2159 / A2289 / A2251 / A1990 / A1932 / A2179 / Late 2016 To Mid 2020) (2 Piece Set)',
        'description' => 'LCD Backlight And Front Camera Extension Flex Cable Compatible For MacBook Pro 13" / 15" W/ Touch Bar (A1706 / A1707 / A1708 / A1989 / A2159 / A2289 / A2251 / A1990 / A1932 / A2179 / Late 2016 To Mid 2020) (2 Piece Set)',
        'price' => 4.95,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 15
    ],
    [
        'name' => 'LCD TCON Board Flex Cable Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / A2179 / Mid 2019 / Early 2020)',
        'description' => 'LCD TCON Board Flex Cable Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / A2179 / Mid 2019 / Early 2020)',
        'price' => 6.67,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 12
    ],
    [
        'name' => 'Loudspeaker Adhesive Compatible For MacBook Air 13" Retina (A1932) (Compatible With All Years) (2 Piece set)',
        'description' => 'Loudspeaker Adhesive Compatible For MacBook Air 13" Retina (A1932) (Compatible With All Years) (2 Piece set)',
        'price' => 1.61,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 20
    ],
    [
        'name' => 'Left Loudspeaker Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019)',
        'description' => 'Left Loudspeaker Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019)',
        'price' => 11.59,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 12
    ],
    [
        'name' => 'Left Loudspeaker & Right Loudspeaker Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019)',
        'description' => 'Left Loudspeaker & Right Loudspeaker Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019)',
        'price' => 20.96,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 12
    ],
    [
        'name' => 'Antenna Bar Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019)',
        'description' => 'Antenna Bar Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019) / (A2179 / Early 2020)',
        'price' => 4.43,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 15
    ],
    [
        'name' => 'Keyboard Screws Only Compatible For MacBook Pro / Air (2016-2022) (100 Pack)',
        'description' => 'Keyboard Screws Only Compatible For MacBook Pro / Air (2016-2022) (100 Pack)',
        'price' => 5.53,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 5
    ],
    [
        'name' => 'Vent / Antenna Screws (Pentalobe P2) Compatible For MacBook Pro / Air (Late 2016 / Late 2020) (100 Pack)',
        'description' => 'Vent / Antenna Screws (Pentalobe P2) Compatible For MacBook Pro / Air (Late 2016 / Late 2020) (100 Pack)',
        'price' => 6.01,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 5
    ],
    [
        'name' => 'Bottom Case Screws Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019 / A2179 / Early 2020 / A2337 / Late 2020) (Space Gray)',
        'description' => 'Bottom Case Screws Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019 / A2179 / Early 2020 / A2337 / Late 2020) (Space Gray)',
        'price' => 1.57,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 20
    ],
    [
        'name' => 'Bottom Case Screws Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019 / A2179 / Early 2020 / A2337 / Late 2020) (Rose Gold)',
        'description' => 'Bottom Case Screws Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019 / A2179 / Early 2020 / A2337 / Late 2020) (Rose Gold)',
        'price' => 1.59,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 20
    ],
    [
        'name' => 'Bottom Case Screws Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019 / A2179 / Early 2020 / A2337 / Late 2020) (Silver)',
        'description' => 'Bottom Case Screws Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019 / A2179 / Early 2020 / A2337 / Late 2020) (Silver)',
        'price' => 1.63,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 20
    ],
    [
        'name' => 'Antenna Bar Screw Compatible For MacBook Pro / Air (Late 2016 / Late 2020)',
        'description' => 'Antenna Bar Screw Compatible For MacBook Pro / Air (Late 2016 / Late 2020)',
        'price' => 4.37,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 15
    ],
    [
        'name' => 'Full Set Small Metal Bracket And Screw Set Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019)',
        'description' => 'Full Set Small Metal Bracket And Screw Set Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019)',
        'price' => 10.20,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 10
    ],
    [
        'name' => 'Power Button Cable Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019)',
        'description' => 'Power Button Cable Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019)',
        'price' => 15.80,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 12
    ],
    [
        'name' => 'CPU Fan Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019 / A2179 / Early 2020 / A2337 / Late 2020)',
        'description' => 'CPU Fan Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019 / A2179 / Early 2020 / A2337 / Late 2020)',
        'price' => 6.74,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 12
    ],
    [
        'name' => 'Display Gasket Compatible For MacBook Pro 13" W/ Touch Bar (A1706 / A1708 / A1989 / A2159 / A2289 / A2251 / A1932 / A2179 / Late 2016 To Early 2020)',
        'description' => 'Display Gasket Compatible For MacBook Pro 13" W/ Touch Bar (A1706 / A1708 / A1989 / A2159 / A2289 / A2251 / A1932 / A2179 / Late 2016 To Early 2020)',
        'price' => 1.80,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 20
    ],
    [
        'name' => 'WiFi Stencil Compatible For MacBook (A1989 / A1990 / A2159 / A1706 / A1534, 2015-2016 / A1932) (MAC 8)',
        'description' => 'WiFi Stencil Compatible For MacBook (A1989 / A1990 / A2159 / A1706 / A1534, 2015-2016 / A1932) (MAC 8)',
        'price' => 6.49,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 10
    ],

    // MacBook Air 13" (A1932, Early 2019) Parts
    [
        'name' => 'LCD Panel Only Compatible For MacBook Air 13" Retina (A1932 / Mid 2019) / (A2179 / Early 2020) (Panel Only)',
        'description' => 'LCD Panel Only Compatible For MacBook Air 13" Retina (A1932 / Mid 2019) / (A2179 / Early 2020) (Panel Only)',
        'price' => 118.03,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 10
    ],
    [
        'name' => 'Complete LCD Display Assembly Compatible For MacBook Air 13" Retina (A1932 / Mid 2019) (A2179 / Early 2020) (Aftermarket Plus) (Rose Gold)',
        'description' => 'Complete LCD Display Assembly Compatible For MacBook Air 13" Retina (A1932 / Mid 2019) (A2179 / Early 2020) (Aftermarket Plus) (Rose Gold)',
        'price' => 207.98,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 8
    ],
    [
        'name' => 'Complete LCD Display Assembly Compatible For MacBook Air 13" Retina (A1932 / Mid 2019) (A2179 / Early 2020) (Aftermarket Plus) (Space Gray)',
        'description' => 'Complete LCD Display Assembly Compatible For MacBook Air 13" Retina (A1932 / Mid 2019) (A2179 / Early 2020) (Aftermarket Plus) (Space Gray)',
        'price' => 210.20,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 8
    ],
    [
        'name' => 'Complete LCD Display Assembly Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019) (Aftermarket Plus) (Space Gray)',
        'description' => 'Complete LCD Display Assembly Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019) (Aftermarket Plus) (Space Gray)',
        'price' => 213.03,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 8
    ],
    [
        'name' => 'Complete LCD Display Assembly Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019) (Aftermarket Plus) (Rose Gold)',
        'description' => 'Complete LCD Display Assembly Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019) (Aftermarket Plus) (Rose Gold)',
        'price' => 213.03,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 8
    ],
    [
        'name' => 'Complete LCD Display Assembly Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019) (Aftermarket Plus) (Silver)',
        'description' => 'Complete LCD Display Assembly Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019) (Aftermarket Plus) (Silver)',
        'price' => 213.03,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 8
    ],
    [
        'name' => 'Complete LCD Display Assembly Compatible For MacBook Air 13" Retina (A1932 / Mid 2019) (A2179 / Early 2020) (Aftermarket Plus) (Silver)',
        'description' => 'Complete LCD Display Assembly Compatible For MacBook Air 13" Retina (A1932 / Mid 2019) (A2179 / Early 2020) (Aftermarket Plus) (Silver)',
        'price' => 269.36,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 8
    ],
    [
        'name' => 'Complete LCD Display Assembly Compatible For MacBook Air 13" Retina (A1932 / Mid 2019) (A2179 / Early 2020) (Used OEM Pull: Grade C) (Space Gray)',
        'description' => 'Complete LCD Display Assembly Compatible For MacBook Air 13" Retina (A1932 / Mid 2019) (A2179 / Early 2020) (Used OEM Pull: Grade C) (Space Gray)',
        'price' => 243.75,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 6
    ],
    [
        'name' => 'Complete LCD Display Assembly Compatible For MacBook Air 13" Retina (A1932 / Mid 2019) / (A2179 / Early 2020) (Used OEM Pull: Grade C) (Silver)',
        'description' => 'Complete LCD Display Assembly Compatible For MacBook Air 13" Retina (A1932 / Mid 2019) / (A2179 / Early 2020) (Used OEM Pull: Grade C) (Silver)',
        'price' => 243.75,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 6
    ],
    [
        'name' => 'Complete LCD Display Assembly Compatible For MacBook Air 13" Retina (A1932 / Mid 2019) (A2179 / Early 2020) (Used OEM Pull: Grade B) (Space Gray)',
        'description' => 'Complete LCD Display Assembly Compatible For MacBook Air 13" Retina (A1932 / Mid 2019) (A2179 / Early 2020) (Used OEM Pull: Grade B) (Space Gray)',
        'price' => 265.03,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 6
    ],
    [
        'name' => 'Complete LCD Display Assembly Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019) (Used OEM Pull: Grade B) (Space Gray)',
        'description' => 'Complete LCD Display Assembly Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019) (Used OEM Pull: Grade B) (Space Gray)',
        'price' => 279.03,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 6
    ],
    [
        'name' => 'Complete LCD Display Assembly Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019) (Used OEM Pull: Grade B) (Rose Gold)',
        'description' => 'Complete LCD Display Assembly Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019) (Used OEM Pull: Grade B) (Rose Gold)',
        'price' => 294.89,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 6
    ],
    [
        'name' => 'Complete LCD Display Assembly Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019) (Used OEM Pull: Grade B) (Silver)',
        'description' => 'Complete LCD Display Assembly Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019) (Used OEM Pull: Grade B) (Silver)',
        'price' => 296.16,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 6
    ],
    [
        'name' => 'Complete LCD Display Assembly Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019) (Used OEM Pull: Grade A) (Space Gray)',
        'description' => 'Complete LCD Display Assembly Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019) (Used OEM Pull: Grade A) (Space Gray)',
        'price' => 279.03,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 8
    ],
    [
        'name' => 'Complete LCD Display Assembly Compatible For MacBook Air 13" Retina (A1932 / Mid 2019) (A2179 / Early 2020) (Used OEM Pull: Grade A) (Space Gray)',
        'description' => 'Complete LCD Display Assembly Compatible For MacBook Air 13" Retina (A1932 / Mid 2019) (A2179 / Early 2020) (Used OEM Pull: Grade A) (Space Gray)',
        'price' => 279.03,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 8
    ],
    [
        'name' => 'Complete LCD Display Assembly Compatible For MacBook Air 13" Retina (A1932 / Mid 2019) / (A2179 / Early 2020) (Used OEM Pull: Grade A) (Silver)',
        'description' => 'Complete LCD Display Assembly Compatible For MacBook Air 13" Retina (A1932 / Mid 2019) / (A2179 / Early 2020) (Used OEM Pull: Grade A) (Silver)',
        'price' => 279.03,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 8
    ],
    [
        'name' => 'Complete LCD Display Assembly Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019) (Used OEM Pull: Grade A) (Silver)',
        'description' => 'Complete LCD Display Assembly Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019) (Used OEM Pull: Grade A) (Silver)',
        'price' => 294.86,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 8
    ],
    [
        'name' => 'Complete LCD Display Assembly Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019) (Used OEM Pull: Grade A) (Rose Gold)',
        'description' => 'Complete LCD Display Assembly Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019) (Used OEM Pull: Grade A) (Rose Gold)',
        'price' => 326.97,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 8
    ],
    [
        'name' => 'Battery (A1965) Compatible For MacBook Air 13" Retina (A1932 / Late 2018 To 2019 / A2179 / Early 2020)',
        'description' => 'Battery (A1965) Compatible For MacBook Air 13" Retina (A1932 / Late 2018 To 2019 / A2179 / Early 2020)',
        'price' => 48.14,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 15
    ],
    [
        'name' => 'Top Case Assembly With Battery And Keyboard Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019) (US English) (Used OEM Pull: Grade B) (Space Gray)',
        'description' => 'Top Case Assembly With Battery And Keyboard Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019) (US English) (Used OEM Pull: Grade B) (Space Gray)',
        'price' => 266.34,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 8
    ],
    [
        'name' => 'Top Case Assembly With Battery And Keyboard Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019) (US English) (Used OEM Pull: Grade B) (Silver)',
        'description' => 'Top Case Assembly With Battery And Keyboard Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019) (US English) (Used OEM Pull: Grade B) (Silver)',
        'price' => 268.14,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 8
    ],
    [
        'name' => 'Top Case With Keyboard Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019) (US English) (Used OEM Pull: Grade New) (Space Gray)',
        'description' => 'Top Case With Keyboard Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019) (US English) (Used OEM Pull: Grade New) (Space Gray)',
        'price' => 115.17,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 8
    ],
    [
        'name' => 'Top Case Assembly With Battery And Keyboard Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019) (US English) (Used OEM Pull: Grade New) (Silver)',
        'description' => 'Top Case Assembly With Battery And Keyboard Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019) (US English) (Used OEM Pull: Grade New) (Silver)',
        'price' => 298.66,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 8
    ],
    [
        'name' => 'Top Case Assembly With Battery And Keyboard Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019) (US English) (Used OEM Pull: Grade New) (Space Gray)',
        'description' => 'Top Case Assembly With Battery And Keyboard Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019) (US English) (Used OEM Pull: Grade New) (Space Gray)',
        'price' => 301.98,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 8
    ],
    [
        'name' => 'Top Case Assembly With Battery And Keyboard Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019) (Gold) (US English)',
        'description' => 'Top Case Assembly With Battery And Keyboard Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019) (Gold) (US English)',
        'price' => 326.49,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 8
    ],
    [
        'name' => 'Bottom Case Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019 / A2179 / Early 2020) (Silver)',
        'description' => 'Bottom Case Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019 / A2179 / Early 2020) (Silver)',
        'price' => 10.65,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 15
    ],
    [
        'name' => 'Bottom Case Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019 / A2179 / Early 2020) (Gold)',
        'description' => 'Bottom Case Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019 / A2179 / Early 2020) (Gold)',
        'price' => 10.65,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 15
    ],
    [
        'name' => 'Bottom Case Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019 / A2179 / Early 2020) (Rose Gold)',
        'description' => 'Bottom Case Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019 / A2179 / Early 2020) (Rose Gold)',
        'price' => 10.65,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 15
    ],
    [
        'name' => 'Bottom Case Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019 / A2179 / Early 2020) (Space Gray)',
        'description' => 'Bottom Case Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019 / A2179 / Early 2020) (Space Gray)',
        'price' => 30.63,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 15
    ],
    [
        'name' => 'LCD Backlight And Front Camera Extension Flex Cable Compatible For MacBook Air 13" Retina (A1932 / A2179 / A2337 Mid 2019 To Late 2020) (2 Piece Set)',
        'description' => 'LCD Backlight And Front Camera Extension Flex Cable Compatible For MacBook Air 13" Retina (A1932 / A2179 / A2337 Mid 2019 To Late 2020) (2 Piece Set)',
        'price' => 3.71,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 15
    ],
    [
        'name' => 'LCD Flex Cable Compatible For MacBook Air 13" Retina (A1932 / A2179 / A2337 Mid 2019 To Late 2020) (2 Piece Set)',
        'description' => 'LCD Flex Cable Compatible For MacBook Air 13" Retina (A1932 / A2179 / A2337 Mid 2019 To Late 2020) (2 Piece Set)',
        'price' => 4.17,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 15
    ],
    [
        'name' => 'Trackpad Flex Cable Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019)',
        'description' => 'Trackpad Flex Cable Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019)',
        'price' => 4.94,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 15
    ],
    [
        'name' => 'Trackpad Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019) (Silver)',
        'description' => 'Trackpad Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019) (Silver)',
        'price' => 25.33,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 10
    ],
    [
        'name' => 'Trackpad Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019) (Space Gray)',
        'description' => 'Trackpad Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019) (Space Gray)',
        'price' => 26.91,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 10
    ],
    [
        'name' => 'Trackpad Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019) (Gold)',
        'description' => 'Trackpad Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019) (Gold)',
        'price' => 30.56,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 10
    ],
    [
        'name' => 'Keyboard W/ Backlight Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019) (UK English)',
        'description' => 'Keyboard W/ Backlight Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019) (UK English)',
        'price' => 101.39,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 12
    ],
    [
        'name' => 'Keyboard W/ Backlight Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019) (US English)',
        'description' => 'Keyboard W/ Backlight Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019) (US English)',
        'price' => 106.84,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 12
    ],
    [
        'name' => 'USB-C Board Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019 / A2179 / Early 2020 / A2337 / Late 2020)',
        'description' => 'USB-C Board Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019 / A2179 / Early 2020 / A2337 / Late 2020)',
        'price' => 4.67,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 15
    ],
    [
        'name' => 'Audio Board Flex Cable Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019)',
        'description' => 'Audio Board Flex Cable Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019)',
        'price' => 6.29,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 12
    ],
    [
        'name' => 'Audio Board Compatible For MacBook Air 13" Retina (A1932 Late 2018 / Early 2019 / Mid 2019) (Space Gray)',
        'description' => 'Audio Board Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019) (Space Gray)',
        'price' => 43.14,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 10
    ],
    [
        'name' => 'Audio Board Compatible For MacBook Air 13" Retina (A1932 Late 2018 / Early 2019 / Mid 2019) (Silver)',
        'description' => 'Audio Board Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019) (Silver)',
        'price' => 54.72,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 10
    ],
    [
        'name' => 'LCD Backlight And Front Camera Extension Flex Cable Compatible For MacBook Pro 13" / 15" W/ Touch Bar (A1706 / A1707 / A1708 / A1989 / A2159 / A2289 / A2251 / A1990 / A1932 / A2179 / Late 2016 To Mid 2020) (2 Piece Set)',
        'description' => 'LCD Backlight And Front Camera Extension Flex Cable Compatible For MacBook Pro 13" / 15" W/ Touch Bar (A1706 / A1707 / A1708 / A1989 / A2159 / A2289 / A2251 / A1990 / A1932 / A2179 / Late 2016 To Mid 2020) (2 Piece Set)',
        'price' => 4.95,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 15
    ],
    [
        'name' => 'LCD TCON Board Flex Cable Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / A2179 / Mid 2019 / Early 2020)',
        'description' => 'LCD TCON Board Flex Cable Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / A2179 / Mid 2019 / Early 2020)',
        'price' => 6.67,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 12
    ],
    [
        'name' => 'Loudspeaker Adhesive Compatible For MacBook Air 13" Retina (A1932) (Compatible With All Years) (2 Piece set)',
        'description' => 'Loudspeaker Adhesive Compatible For MacBook Air 13" Retina (A1932) (Compatible With All Years) (2 Piece set)',
        'price' => 1.61,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 20
    ],
    [
        'name' => 'Left Loudspeaker Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019)',
        'description' => 'Left Loudspeaker Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019)',
        'price' => 11.59,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 12
    ],
    [
        'name' => 'Left Loudspeaker & Right Loudspeaker Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019)',
        'description' => 'Left Loudspeaker & Right Loudspeaker Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019)',
        'price' => 20.96,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 12
    ],
    [
        'name' => 'Antenna Bar Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019)',
        'description' => 'Antenna Bar Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019) / (A2179 / Early 2020)',
        'price' => 4.43,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 15
    ],
    [
        'name' => 'Keyboard Screws Only Compatible For MacBook Pro / Air (2016-2022) (100 Pack)',
        'description' => 'Keyboard Screws Only Compatible For MacBook Pro / Air (2016-2022) (100 Pack)',
        'price' => 5.53,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 5
    ],
    [
        'name' => 'Vent / Antenna Screws (Pentalobe P2) Compatible For MacBook Pro / Air (Late 2016 / Late 2020) (100 Pack)',
        'description' => 'Vent / Antenna Screws (Pentalobe P2) Compatible For MacBook Pro / Air (Late 2016 / Late 2020) (100 Pack)',
        'price' => 6.01,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 5
    ],
    [
        'name' => 'Bottom Case Screws Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019 / A2179 / Early 2020 / A2337 / Late 2020) (Space Gray)',
        'description' => 'Bottom Case Screws Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019 / A2179 / Early 2020 / A2337 / Late 2020) (Space Gray)',
        'price' => 1.57,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 20
    ],
    [
        'name' => 'Bottom Case Screws Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019 / A2179 / Early 2020 / A2337 / Late 2020) (Rose Gold)',
        'description' => 'Bottom Case Screws Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019 / A2179 / Early 2020 / A2337 / Late 2020) (Rose Gold)',
        'price' => 1.59,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 20
    ],
    [
        'name' => 'Bottom Case Screws Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019 / A2179 / Early 2020 / A2337 / Late 2020) (Silver)',
        'description' => 'Bottom Case Screws Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019 / A2179 / Early 2020 / A2337 / Late 2020) (Silver)',
        'price' => 1.63,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 20
    ],
    [
        'name' => 'Antenna Bar Screw Compatible For MacBook Pro / Air (Late 2016 / Late 2020)',
        'description' => 'Antenna Bar Screw Compatible For MacBook Pro / Air (Late 2016 / Late 2020)',
        'price' => 4.37,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 15
    ],
    [
        'name' => 'Full Set Small Metal Bracket And Screw Set Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019)',
        'description' => 'Full Set Small Metal Bracket And Screw Set Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019)',
        'price' => 10.20,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 10
    ],
    [
        'name' => 'Power Button Cable Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019)',
        'description' => 'Power Button Cable Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019)',
        'price' => 15.80,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 12
    ],
    [
        'name' => 'CPU Fan Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019 / A2179 / Early 2020 / A2337 / Late 2020)',
        'description' => 'CPU Fan Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019 / A2179 / Early 2020 / A2337 / Late 2020)',
        'price' => 6.74,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 12
    ],
    [
        'name' => 'Display Gasket Compatible For MacBook Pro 13" W/ Touch Bar (A1706 / A1708 / A1989 / A2159 / A2289 / A2251 / A1932 / A2179 / Late 2016 To Early 2020)',
        'description' => 'Display Gasket Compatible For MacBook Pro 13" W/ Touch Bar (A1706 / A1708 / A1989 / A2159 / A2289 / A2251 / A1932 / A2179 / Late 2016 To Early 2020)',
        'price' => 1.80,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 20
    ],
    [
        'name' => 'WiFi Stencil Compatible For MacBook (A1989 / A1990 / A2159 / A1706 / A1534, 2015-2016 / A1932) (MAC 8)',
        'description' => 'WiFi Stencil Compatible For MacBook (A1989 / A1990 / A2159 / A1706 / A1534, 2015-2016 / A1932) (MAC 8)',
        'price' => 6.49,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 10
    ],

    // MacBook Air 13" (A1932, Early 2019) Parts
    [
        'name' => 'LCD Panel Only Compatible For MacBook Air 13" Retina (A1932 / Mid 2019) / (A2179 / Early 2020) (Panel Only)',
        'description' => 'LCD Panel Only Compatible For MacBook Air 13" Retina (A1932 / Mid 2019) / (A2179 / Early 2020) (Panel Only)',
        'price' => 118.03,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 10
    ],
    [
        'name' => 'Complete LCD Display Assembly Compatible For MacBook Air 13" Retina (A1932 / Mid 2019) (A2179 / Early 2020) (Aftermarket Plus) (Rose Gold)',
        'description' => 'Complete LCD Display Assembly Compatible For MacBook Air 13" Retina (A1932 / Mid 2019) (A2179 / Early 2020) (Aftermarket Plus) (Rose Gold)',
        'price' => 207.98,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 8
    ],
    [
        'name' => 'Complete LCD Display Assembly Compatible For MacBook Air 13" Retina (A1932 / Mid 2019) (A2179 / Early 2020) (Aftermarket Plus) (Space Gray)',
        'description' => 'Complete LCD Display Assembly Compatible For MacBook Air 13" Retina (A1932 / Mid 2019) (A2179 / Early 2020) (Aftermarket Plus) (Space Gray)',
        'price' => 210.20,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 8
    ],
    [
        'name' => 'Complete LCD Display Assembly Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019) (Aftermarket Plus) (Space Gray)',
        'description' => 'Complete LCD Display Assembly Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019) (Aftermarket Plus) (Space Gray)',
        'price' => 213.03,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 8
    ],
    [
        'name' => 'Complete LCD Display Assembly Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019) (Aftermarket Plus) (Rose Gold)',
        'description' => 'Complete LCD Display Assembly Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019) (Aftermarket Plus) (Rose Gold)',
        'price' => 213.03,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 8
    ],
    [
        'name' => 'Complete LCD Display Assembly Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019) (Aftermarket Plus) (Silver)',
        'description' => 'Complete LCD Display Assembly Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019) (Aftermarket Plus) (Silver)',
        'price' => 213.03,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 8
    ],
    [
        'name' => 'Complete LCD Display Assembly Compatible For MacBook Air 13" Retina (A1932 / Mid 2019) (A2179 / Early 2020) (Aftermarket Plus) (Silver)',
        'description' => 'Complete LCD Display Assembly Compatible For MacBook Air 13" Retina (A1932 / Mid 2019) (A2179 / Early 2020) (Aftermarket Plus) (Silver)',
        'price' => 269.36,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 8
    ],
    [
        'name' => 'Complete LCD Display Assembly Compatible For MacBook Air 13" Retina (A1932 / Mid 2019) (A2179 / Early 2020) (Used OEM Pull: Grade C) (Space Gray)',
        'description' => 'Complete LCD Display Assembly Compatible For MacBook Air 13" Retina (A1932 / Mid 2019) (A2179 / Early 2020) (Used OEM Pull: Grade C) (Space Gray)',
        'price' => 243.75,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 6
    ],
    [
        'name' => 'Complete LCD Display Assembly Compatible For MacBook Air 13" Retina (A1932 / Mid 2019) / (A2179 / Early 2020) (Used OEM Pull: Grade C) (Silver)',
        'description' => 'Complete LCD Display Assembly Compatible For MacBook Air 13" Retina (A1932 / Mid 2019) / (A2179 / Early 2020) (Used OEM Pull: Grade C) (Silver)',
        'price' => 243.75,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 6
    ],
    [
        'name' => 'Complete LCD Display Assembly Compatible For MacBook Air 13" Retina (A1932 / Mid 2019) (A2179 / Early 2020) (Used OEM Pull: Grade B) (Space Gray)',
        'description' => 'Complete LCD Display Assembly Compatible For MacBook Air 13" Retina (A1932 / Mid 2019) (A2179 / Early 2020) (Used OEM Pull: Grade B) (Space Gray)',
        'price' => 265.03,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 6
    ],
    [
        'name' => 'Complete LCD Display Assembly Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019) (Used OEM Pull: Grade B) (Space Gray)',
        'description' => 'Complete LCD Display Assembly Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019) (Used OEM Pull: Grade B) (Space Gray)',
        'price' => 279.03,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 6
    ],
    [
        'name' => 'Complete LCD Display Assembly Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019) (Used OEM Pull: Grade B) (Rose Gold)',
        'description' => 'Complete LCD Display Assembly Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019) (Used OEM Pull: Grade B) (Rose Gold)',
        'price' => 294.89,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 6
    ],
    [
        'name' => 'Complete LCD Display Assembly Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019) (Used OEM Pull: Grade B) (Silver)',
        'description' => 'Complete LCD Display Assembly Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019) (Used OEM Pull: Grade B) (Silver)',
        'price' => 296.16,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 6
    ],
    [
        'name' => 'Complete LCD Display Assembly Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019) (Used OEM Pull: Grade A) (Space Gray)',
        'description' => 'Complete LCD Display Assembly Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019) (Used OEM Pull: Grade A) (Space Gray)',
        'price' => 279.03,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 8
    ],
    [
        'name' => 'Complete LCD Display Assembly Compatible For MacBook Air 13" Retina (A1932 / Mid 2019) (A2179 / Early 2020) (Used OEM Pull: Grade A) (Space Gray)',
        'description' => 'Complete LCD Display Assembly Compatible For MacBook Air 13" Retina (A1932 / Mid 2019) (A2179 / Early 2020) (Used OEM Pull: Grade A) (Space Gray)',
        'price' => 279.03,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 8
    ],
    [
        'name' => 'Complete LCD Display Assembly Compatible For MacBook Air 13" Retina (A1932 / Mid 2019) / (A2179 / Early 2020) (Used OEM Pull: Grade A) (Silver)',
        'description' => 'Complete LCD Display Assembly Compatible For MacBook Air 13" Retina (A1932 / Mid 2019) / (A2179 / Early 2020) (Used OEM Pull: Grade A) (Silver)',
        'price' => 279.03,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 8
    ],
    [
        'name' => 'Complete LCD Display Assembly Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019) (Used OEM Pull: Grade A) (Silver)',
        'description' => 'Complete LCD Display Assembly Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019) (Used OEM Pull: Grade A) (Silver)',
        'price' => 294.86,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 8
    ],
    [
        'name' => 'Complete LCD Display Assembly Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019) (Used OEM Pull: Grade A) (Rose Gold)',
        'description' => 'Complete LCD Display Assembly Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019) (Used OEM Pull: Grade A) (Rose Gold)',
        'price' => 326.97,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 8
    ],
    [
        'name' => 'Battery (A1965) Compatible For MacBook Air 13" Retina (A1932 / Late 2018 To 2019 / A2179 / Early 2020)',
        'description' => 'Battery (A1965) Compatible For MacBook Air 13" Retina (A1932 / Late 2018 To 2019 / A2179 / Early 2020)',
        'price' => 48.14,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 15
    ],
    [
        'name' => 'Top Case Assembly With Battery And Keyboard Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019) (US English) (Used OEM Pull: Grade B) (Space Gray)',
        'description' => 'Top Case Assembly With Battery And Keyboard Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019) (US English) (Used OEM Pull: Grade B) (Space Gray)',
        'price' => 266.34,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 8
    ],
    [
        'name' => 'Top Case Assembly With Battery And Keyboard Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019) (US English) (Used OEM Pull: Grade B) (Silver)',
        'description' => 'Top Case Assembly With Battery And Keyboard Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019) (US English) (Used OEM Pull: Grade B) (Silver)',
        'price' => 268.14,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 8
    ],
    [
        'name' => 'Top Case With Keyboard Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019) (US English) (Used OEM Pull: Grade New) (Space Gray)',
        'description' => 'Top Case With Keyboard Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019) (US English) (Used OEM Pull: Grade New) (Space Gray)',
        'price' => 115.17,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 8
    ],
    [
        'name' => 'Top Case Assembly With Battery And Keyboard Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019) (US English) (Used OEM Pull: Grade New) (Silver)',
        'description' => 'Top Case Assembly With Battery And Keyboard Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019) (US English) (Used OEM Pull: Grade New) (Silver)',
        'price' => 298.66,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 8
    ],
    [
        'name' => 'Top Case Assembly With Battery And Keyboard Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019) (US English) (Used OEM Pull: Grade New) (Space Gray)',
        'description' => 'Top Case Assembly With Battery And Keyboard Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019) (US English) (Used OEM Pull: Grade New) (Space Gray)',
        'price' => 301.98,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 8
    ],
    [
        'name' => 'Top Case Assembly With Battery And Keyboard Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019) (Gold) (US English)',
        'description' => 'Top Case Assembly With Battery And Keyboard Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019) (Gold) (US English)',
        'price' => 326.49,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 8
    ],
    [
        'name' => 'Bottom Case Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019 / A2179 / Early 2020) (Silver)',
        'description' => 'Bottom Case Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019 / A2179 / Early 2020) (Silver)',
        'price' => 10.65,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 15
    ],
    [
        'name' => 'Bottom Case Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019 / A2179 / Early 2020) (Gold)',
        'description' => 'Bottom Case Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019 / A2179 / Early 2020) (Gold)',
        'price' => 10.65,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 15
    ],
    [
        'name' => 'Bottom Case Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019 / A2179 / Early 2020) (Rose Gold)',
        'description' => 'Bottom Case Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019 / A2179 / Early 2020) (Rose Gold)',
        'price' => 10.65,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 15
    ],
    [
        'name' => 'Bottom Case Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019 / A2179 / Early 2020) (Space Gray)',
        'description' => 'Bottom Case Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019 / A2179 / Early 2020) (Space Gray)',
        'price' => 30.63,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 15
    ],
    [
        'name' => 'LCD Backlight And Front Camera Extension Flex Cable Compatible For MacBook Air 13" Retina (A1932 / A2179 / A2337 Mid 2019 To Late 2020) (2 Piece Set)',
        'description' => 'LCD Backlight And Front Camera Extension Flex Cable Compatible For MacBook Air 13" Retina (A1932 / A2179 / A2337 Mid 2019 To Late 2020) (2 Piece Set)',
        'price' => 3.71,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 15
    ],
    [
        'name' => 'LCD Flex Cable Compatible For MacBook Air 13" Retina (A1932 / A2179 / A2337 Mid 2019 To Late 2020) (2 Piece Set)',
        'description' => 'LCD Flex Cable Compatible For MacBook Air 13" Retina (A1932 / A2179 / A2337 Mid 2019 To Late 2020) (2 Piece Set)',
        'price' => 4.17,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 15
    ],
    [
        'name' => 'Trackpad Flex Cable Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019)',
        'description' => 'Trackpad Flex Cable Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019)',
        'price' => 4.94,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 15
    ],
    [
        'name' => 'Trackpad Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019) (Silver)',
        'description' => 'Trackpad Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019) (Silver)',
        'price' => 25.33,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 10
    ],
    [
        'name' => 'Trackpad Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019) (Space Gray)',
        'description' => 'Trackpad Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019) (Space Gray)',
        'price' => 26.91,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 10
    ],
    [
        'name' => 'Trackpad Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019) (Gold)',
        'description' => 'Trackpad Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019) (Gold)',
        'price' => 30.56,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 10
    ],
    [
        'name' => 'Keyboard W/ Backlight Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019) (UK English)',
        'description' => 'Keyboard W/ Backlight Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019) (UK English)',
        'price' => 101.39,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 12
    ],
    [
        'name' => 'Keyboard W/ Backlight Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019) (US English)',
        'description' => 'Keyboard W/ Backlight Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019) (US English)',
        'price' => 106.84,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 12
    ],
    [
        'name' => 'USB-C Board Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019 / A2179 / Early 2020 / A2337 / Late 2020)',
        'description' => 'USB-C Board Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019 / A2179 / Early 2020 / A2337 / Late 2020)',
        'price' => 4.67,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 15
    ],
    [
        'name' => 'Audio Board Flex Cable Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019)',
        'description' => 'Audio Board Flex Cable Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019)',
        'price' => 6.29,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 12
    ],
    [
        'name' => 'Audio Board Compatible For MacBook Air 13" Retina (A1932 Late 2018 / Early 2019 / Mid 2019) (Space Gray)',
        'description' => 'Audio Board Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019) (Space Gray)',
        'price' => 43.14,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 10
    ],
    [
        'name' => 'Audio Board Compatible For MacBook Air 13" Retina (A1932 Late 2018 / Early 2019 / Mid 2019) (Silver)',
        'description' => 'Audio Board Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019) (Silver)',
        'price' => 54.72,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 10
    ],
    [
        'name' => 'LCD Backlight And Front Camera Extension Flex Cable Compatible For MacBook Pro 13" / 15" W/ Touch Bar (A1706 / A1707 / A1708 / A1989 / A2159 / A2289 / A2251 / A1990 / A1932 / A2179 / Late 2016 To Mid 2020) (2 Piece Set)',
        'description' => 'LCD Backlight And Front Camera Extension Flex Cable Compatible For MacBook Pro 13" / 15" W/ Touch Bar (A1706 / A1707 / A1708 / A1989 / A2159 / A2289 / A2251 / A1990 / A1932 / A2179 / Late 2016 To Mid 2020) (2 Piece Set)',
        'price' => 4.95,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 15
    ],
    [
        'name' => 'LCD TCON Board Flex Cable Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / A2179 / Mid 2019 / Early 2020)',
        'description' => 'LCD TCON Board Flex Cable Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / A2179 / Mid 2019 / Early 2020)',
        'price' => 6.67,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 12
    ],
    [
        'name' => 'Loudspeaker Adhesive Compatible For MacBook Air 13" Retina (A1932) (Compatible With All Years) (2 Piece set)',
        'description' => 'Loudspeaker Adhesive Compatible For MacBook Air 13" Retina (A1932) (Compatible With All Years) (2 Piece set)',
        'price' => 1.61,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 20
    ],
    [
        'name' => 'Left Loudspeaker Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019)',
        'description' => 'Left Loudspeaker Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019)',
        'price' => 11.59,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 12
    ],
    [
        'name' => 'Left Loudspeaker & Right Loudspeaker Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019)',
        'description' => 'Left Loudspeaker & Right Loudspeaker Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019)',
        'price' => 20.96,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 12
    ],
    [
        'name' => 'Antenna Bar Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019)',
        'description' => 'Antenna Bar Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019) / (A2179 / Early 2020)',
        'price' => 4.43,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 15
    ],
    [
        'name' => 'Keyboard Screws Only Compatible For MacBook Pro / Air (2016-2022) (100 Pack)',
        'description' => 'Keyboard Screws Only Compatible For MacBook Pro / Air (2016-2022) (100 Pack)',
        'price' => 5.53,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 5
    ],
    [
        'name' => 'Vent / Antenna Screws (Pentalobe P2) Compatible For MacBook Pro / Air (Late 2016 / Late 2020) (100 Pack)',
        'description' => 'Vent / Antenna Screws (Pentalobe P2) Compatible For MacBook Pro / Air (Late 2016 / Late 2020) (100 Pack)',
        'price' => 6.01,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 5
    ],
    [
        'name' => 'Bottom Case Screws Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019 / A2179 / Early 2020 / A2337 / Late 2020) (Space Gray)',
        'description' => 'Bottom Case Screws Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019 / A2179 / Early 2020 / A2337 / Late 2020) (Space Gray)',
        'price' => 1.57,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 20
    ],
    [
        'name' => 'Bottom Case Screws Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019 / A2179 / Early 2020 / A2337 / Late 2020) (Rose Gold)',
        'description' => 'Bottom Case Screws Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019 / A2179 / Early 2020 / A2337 / Late 2020) (Rose Gold)',
        'price' => 1.59,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 20
    ],
    [
        'name' => 'Bottom Case Screws Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019 / A2179 / Early 2020 / A2337 / Late 2020) (Silver)',
        'description' => 'Bottom Case Screws Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019 / A2179 / Early 2020 / A2337 / Late 2020) (Silver)',
        'price' => 1.63,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 20
    ],
    [
        'name' => 'Antenna Bar Screw Compatible For MacBook Pro / Air (Late 2016 / Late 2020)',
        'description' => 'Antenna Bar Screw Compatible For MacBook Pro / Air (Late 2016 / Late 2020)',
        'price' => 4.37,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 15
    ],
    [
        'name' => 'Full Set Small Metal Bracket And Screw Set Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019)',
        'description' => 'Full Set Small Metal Bracket And Screw Set Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019)',
        'price' => 10.20,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 10
    ],
    [
        'name' => 'Power Button Cable Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019)',
        'description' => 'Power Button Cable Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019)',
        'price' => 15.80,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 12
    ],
    [
        'name' => 'CPU Fan Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019 / A2179 / Early 2020 / A2337 / Late 2020)',
        'description' => 'CPU Fan Compatible For MacBook Air 13" Retina (A1932 / Late 2018 / Early 2019 / Mid 2019 / A2179 / Early 2020 / A2337 / Late 2020)',
        'price' => 6.74,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 12
    ],
    [
        'name' => 'Display Gasket Compatible For MacBook Pro 13" W/ Touch Bar (A1706 / A1708 / A1989 / A2159 / A2289 / A2251 / A1932 / A2179 / Late 2016 To Early 2020)',
        'description' => 'Display Gasket Compatible For MacBook Pro 13" W/ Touch Bar (A1706 / A1708 / A1989 / A2159 / A2289 / A2251 / A1932 / A2179 / Late 2016 To Early 2020)',
        'price' => 1.80,
        'category' => 'MacBook Air 13" Parts',
        'stock_quantity' => 20
    ],
    [
        'name' => 'WiFi Stencil Compatible For MacBook (A1989 / A1990 / A2159 / A1706 / A1534, 2015-2016 / A1932) (MAC 8)',
        'description' => 'WiFi Stencil Compatible For MacBook (A1989 / A1990 / A2159 / A1706 / A1534, 2015-2016 / A1932) (MAC 8)',
        'price' => 6.49,
        'category' => 'MacBook Air 13" Parts',
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

    echo "Populating Supabase with MacBook Air Genuine OEM Parts...\n";
    echo "==================================================\n\n";

    // Insert each part
    $inserted = 0;
    foreach ($macbookAirParts as $part) {
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
    echo "Summary: $inserted out of " . count($macbookAirParts) . " parts inserted successfully!\n";

    if ($inserted === count($macbookAirParts)) {
        echo "🎉 All MacBook Air parts have been added to your Supabase database!\n";
    }

} catch (Exception $e) {
    echo "❌ Error: " . $e->getMessage() . "\n";
    echo "\nPlease make sure:\n";
    echo "1. Your Supabase credentials are configured in config.php\n";
    echo "2. The 'parts' table exists in your Supabase database\n";
    echo "3. You have the necessary permissions to insert data\n";
}
