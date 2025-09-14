<?php
/**
 * Populate Supabase with MacBook Air A1465 Parts (11-inch models, 2012-2015)
 *
 * This script inserts MacBook Air A1465 parts data into the Supabase 'parts' table
 */

require_once __DIR__ . '/vendor/autoload.php';
require_once 'config.php';

use Supabase\CreateClient;

$supabase = new CreateClient(SUPABASE_KEY, SUPABASE_URL);

// MacBook Air A1465 Parts Data (11-inch models, 2012-2015)
$macbookAirA1465Parts = [
    [
        'name' => 'LCD Panel Only Compatible For MacBook Air 11" (A1465) (Compatible With All Years) (Panel Only)',
        'description' => 'LCD Panel Only Compatible For MacBook Air 11" (A1465) (Compatible With All Years) (Panel Only)',
        'price' => 66.36,
        'category' => 'MacBook Air 11" Parts (2012-2015)',
        'stock_quantity' => 10
    ],
    [
        'name' => 'Complete LCD Display Assembly Compatible For MacBook Air 11" (A1465 / Mid 2013 / Early 2014 / Early 2015) (Used OEM Pull: Grade B)',
        'description' => 'Complete LCD Display Assembly Compatible For MacBook Air 11" (A1465 / Mid 2013 / Early 2014 / Early 2015) (Used OEM Pull: Grade B)',
        'price' => 93.33,
        'category' => 'MacBook Air 11" Parts (2012-2015)',
        'stock_quantity' => 8
    ],
    [
        'name' => 'Battery (A1495) Compatible For MacBook Air 11" (A1465 / Mid 2013 / Early 2014 / Early 2015) (Aftermarket)',
        'description' => 'Battery (A1495) Compatible For MacBook Air 11" (A1465 / Mid 2013 / Early 2014 / Early 2015) (Aftermarket)',
        'price' => 18.82,
        'category' => 'MacBook Air 11" Parts (2012-2015)',
        'stock_quantity' => 15
    ],
    [
        'name' => 'Battery (A1406) Compatible For MacBook Air 11" (A1370 / Mid 2011 / A1465 / Mid 2012)',
        'description' => 'Battery (A1406) Compatible For MacBook Air 11" (A1370 / Mid 2011 / A1465 / Mid 2012)',
        'price' => 34.99,
        'category' => 'MacBook Air 11" Parts (2012-2015)',
        'stock_quantity' => 15
    ],
    [
        'name' => 'Battery (A1495) Compatible For MacBook Air 11" (A1465 / Mid 2013 / Early 2014 / Early 2015)',
        'description' => 'Battery (A1495) Compatible For MacBook Air 11" (A1465 / Mid 2013 / Early 2014 / Early 2015)',
        'price' => 39.25,
        'category' => 'MacBook Air 11" Parts (2012-2015)',
        'stock_quantity' => 15
    ],
    [
        'name' => 'Top Case With Keyboard With Microphone Compatible For MacBook Air 11" (A1465 / Mid 2013 / Early 2014 / Early 2015) (US English) (Used OEM Pull: Grade New)',
        'description' => 'Top Case With Keyboard With Microphone Compatible For MacBook Air 11" (A1465 / Mid 2013 / Early 2014 / Early 2015) (US English) (Used OEM Pull: Grade New)',
        'price' => 77.37,
        'category' => 'MacBook Air 11" Parts (2012-2015)',
        'stock_quantity' => 8
    ],
    [
        'name' => 'Top Case With Keyboard Compatible For MacBook Air 11" (A1465 / Mid 2012) (Used OEM Pull: Grade New)',
        'description' => 'Top Case With Keyboard Compatible For MacBook Air 11" (A1465 / Mid 2012) (Used OEM Pull: Grade New)',
        'price' => 83.83,
        'category' => 'MacBook Air 11" Parts (2012-2015)',
        'stock_quantity' => 8
    ],
    [
        'name' => 'Bottom Case Plastic Feet Compatible For MacBook Air 11" / Air 13" (A1370 / A1465 / A1369 / A1466) (4 Piece Set)',
        'description' => 'Bottom Case Plastic Feet Compatible For MacBook Air 11" / Air 13" (A1370 / A1465 / A1369 / A1466) (4 Piece Set)',
        'price' => 1.56,
        'category' => 'MacBook Air 11" Parts (2012-2015)',
        'stock_quantity' => 20
    ],
    [
        'name' => 'Bottom Case Plastic Feet Compatible For MacBook Pro / Air (Late 2016 To Early 2020) (4 Piece Set)',
        'description' => 'Bottom Case Plastic Feet Compatible For MacBook Pro / Air (Late 2016 To Early 2020) (4 Piece Set)',
        'price' => 1.60,
        'category' => 'MacBook Air 11" Parts (2012-2015)',
        'stock_quantity' => 20
    ],
    [
        'name' => 'Bottom Case Compatible For MacBook Air 11" (A1370 / Late 2010 / Mid 2011 / A1465 / Mid 2012 / Mid 2013 / Early 2014 / Early 2015)',
        'description' => 'Bottom Case Compatible For MacBook Air 11" (A1370 / Late 2010 / Mid 2011 / A1465 / Mid 2012 / Mid 2013 / Early 2014 / Early 2015)',
        'price' => 25.85,
        'category' => 'MacBook Air 11" Parts (2012-2015)',
        'stock_quantity' => 15
    ],
    [
        'name' => 'Trackpad Flex Cable Compatible For MacBook Air 11" (A1465 / Mid 2012)',
        'description' => 'Trackpad Flex Cable Compatible For MacBook Air 11" (A1465 / Mid 2012)',
        'price' => 0.61,
        'category' => 'MacBook Air 11" Parts (2012-2015)',
        'stock_quantity' => 15
    ],
    [
        'name' => 'Trackpad Flex Cable Compatible For MacBook Air 11" (A1465 / Mid 2012 / Mid 2013 / Early 2014 / Early 2015)',
        'description' => 'Trackpad Flex Cable Compatible For MacBook Air 11" (A1465 / Mid 2012 / Mid 2013 / Early 2014 / Early 2015)',
        'price' => 1.71,
        'category' => 'MacBook Air 11" Parts (2012-2015)',
        'stock_quantity' => 15
    ],
    [
        'name' => 'IPD Trackpad Flex Cable Compatible For MacBook Air 13" (A1370 / Late 2010 / Mid 2011 / A1465 / Mid 2012)',
        'description' => 'IPD Trackpad Flex Cable Compatible For MacBook Air 13" (A1370 / Late 2010 / Mid 2011 / A1465 / Mid 2012)',
        'price' => 1.79,
        'category' => 'MacBook Air 11" Parts (2012-2015)',
        'stock_quantity' => 15
    ],
    [
        'name' => 'Trackpad Flex Cable Compatible For MacBook Air 11" (A1465 / Mid 2013 / Early 2014 / Early 2015)',
        'description' => 'Trackpad Flex Cable Compatible For MacBook Air 11" (A1465 / Mid 2013 / Early 2014 / Early 2015)',
        'price' => 3.21,
        'category' => 'MacBook Air 11" Parts (2012-2015)',
        'stock_quantity' => 15
    ],
    [
        'name' => 'Trackpad Compatible For MacBook Air 11" (A1465 / Mid 2012)',
        'description' => 'Trackpad Compatible For MacBook Air 11" (A1465 / Mid 2012)',
        'price' => 11.29,
        'category' => 'MacBook Air 11" Parts (2012-2015)',
        'stock_quantity' => 10
    ],
    [
        'name' => 'Trackpad Compatible For MacBook Air 11" (A1370 / Mid 2011 / A1465 / Mid 2012)',
        'description' => 'Trackpad Compatible For MacBook Air 11" (A1370 / Mid 2011 / A1465 / Mid 2012)',
        'price' => 30.27,
        'category' => 'MacBook Air 11" Parts (2012-2015)',
        'stock_quantity' => 10
    ],
    [
        'name' => 'Trackpad Compatible For MacBook Air 11" (A1465 / Mid 2013 / Early 2014 / Early 2015)',
        'description' => 'Trackpad Compatible For MacBook Air 11" (A1465 / Mid 2013 / Early 2014 / Early 2015)',
        'price' => 35.65,
        'category' => 'MacBook Air 11" Parts (2012-2015)',
        'stock_quantity' => 10
    ],
    [
        'name' => 'Trackpad Keyboard IPD Flex Connector Compatible For MacBook Air 11" / 13" (AA1465 / A1466 / Mid 2013 To Mid 2017) (TF13BS-20S-0.4SH:518S0884: / J4800: 20 Pin)',
        'description' => 'Trackpad Keyboard IPD Flex Connector Compatible For MacBook Air 11" / 13" (AA1465 / A1466 / Mid 2013 To Mid 2017) (TF13BS-20S-0.4SH:518S0884: / J4800: 20 Pin)',
        'price' => 1.52,
        'category' => 'MacBook Air 11" Parts (2012-2015)',
        'stock_quantity' => 15
    ],
    [
        'name' => 'Keyboard W/ Backlight & Screws (US English) Compatible For MacBook Air 11" (A1465) / (A1370 / Mid 2011)',
        'description' => 'Keyboard W/ Backlight & Screws (US English) Compatible For MacBook Air 11" (A1465) / (A1370 / Mid 2011)',
        'price' => 18.16,
        'category' => 'MacBook Air 11" Parts (2012-2015)',
        'stock_quantity' => 12
    ],
    [
        'name' => 'I/O Board Flex Cable Compatible For MacBook Air 11" (A1465 / Mid 2012)',
        'description' => 'I/O Board Flex Cable Compatible For MacBook Air 11" (A1465 / Mid 2012)',
        'price' => 2.95,
        'category' => 'MacBook Air 11" Parts (2012-2015)',
        'stock_quantity' => 15
    ],
    [
        'name' => 'I/O Board Flex Cable Compatible For MacBook Air 11" (A1465 / Mid 2013 / Early 2014 / Early 2015)',
        'description' => 'I/O Board Flex Cable Compatible For MacBook Air 11" (A1465 / Mid 2013 / Early 2014 / Early 2015)',
        'price' => 4.65,
        'category' => 'MacBook Air 11" Parts (2012-2015)',
        'stock_quantity' => 15
    ],
    [
        'name' => 'I/O Board (MagSafe: 2 USB: Audio) Compatible For MacBook Air 11" (A1465 / Mid 2012)',
        'description' => 'I/O Board (MagSafe: 2 USB: Audio) Compatible For MacBook Air 11" (A1465 / Mid 2012)',
        'price' => 30.48,
        'category' => 'MacBook Air 11" Parts (2012-2015)',
        'stock_quantity' => 10
    ],
    [
        'name' => 'I/O Board (MagSafe 2: USB: Audio) Compatible For MacBook Air 11" (A1465 / Mid 2013 / Early 2014 / Early 2015)',
        'description' => 'I/O Board (MagSafe 2: USB: Audio) Compatible For MacBook Air 11" (A1465 / Mid 2013 / Early 2014 / Early 2015)',
        'price' => 32.37,
        'category' => 'MacBook Air 11" Parts (2012-2015)',
        'stock_quantity' => 10
    ],
    [
        'name' => 'Display LVDS Cable + Left Hinge Compatible For MacBook Air 11" (A1465 / Mid 2012 / Mid 2013 / Early 2014 / Early 2015)',
        'description' => 'Display LVDS Cable + Left Hinge Compatible For MacBook Air 11" (A1465 / Mid 2012 / Mid 2013 / Early 2014 / Early 2015)',
        'price' => 4.05,
        'category' => 'MacBook Air 11" Parts (2012-2015)',
        'stock_quantity' => 12
    ],
    [
        'name' => 'Apollo S3 128GB Mac SSD (NVME PCIe Gen3X4) Compatible For MacBook Air 11 & 13" A1465 A1466 (Mid 2013-2017)',
        'description' => 'Apollo S3 128GB Mac SSD (NVME PCIe Gen3X4) Compatible For MacBook Air 11 & 13" A1465 A1466 (Mid 2013-2017) / Pro Retina A1398 1502 (Late 2013-Mid 2015) / iMac A1418 A1419 (Late 2013-Mid 2017) / Mac Mini A1347 (2014) / Mac Pro A1481 (2013)',
        'price' => 19.24,
        'category' => 'MacBook Air 11" Parts (2012-2015)',
        'stock_quantity' => 10
    ],
    [
        'name' => 'Apollo S2 256GB Mac SSD (NVMe PCIe Gen3x4) Compatible For MacBook Air 11" & 13" A1465 A1466 (2012)',
        'description' => 'Apollo S2 256GB Mac SSD (NVMe PCIe Gen3x4) Compatible For MacBook Air 11" & 13" A1465 A1466 (2012) / Pro 13" & 15" Retina (2012 - 2013)',
        'price' => 25.10,
        'category' => 'MacBook Air 11" Parts (2012-2015)',
        'stock_quantity' => 8
    ],
    [
        'name' => 'Apollo S3 256GB Mac SSD (NVMe PCIe Gen3x4) Compatible For MacBook Air 11 & 13" A1465 A1466 (Mid 2013-2017)',
        'description' => 'Apollo S3 256GB Mac SSD (NVMe PCIe Gen3x4) Compatible For MacBook Air 11 & 13" A1465 A1466 (Mid 2013-2017) / Pro Retina A1398 1502 (Late 2013-Mid 2015) / iMac A1418 A1419 (Late 2013-Mid 2017) / Mac Mini A1347 (2014) / Mac Pro A1481 (2013)',
        'price' => 26.03,
        'category' => 'MacBook Air 11" Parts (2012-2015)',
        'stock_quantity' => 8
    ],
    [
        'name' => 'Apollo S3 512GB Mac SSD (NVMe PCIe Gen3x4) Compatible For MacBook Air 11 & 13" A1465 A1466 (Mid 2013-2017)',
        'description' => 'Apollo S3 512GB Mac SSD (NVMe PCIe Gen3x4) Compatible For MacBook Air 11 & 13" A1465 A1466 (Mid 2013-2017) / Pro Retina A1398 1502 (Late 2013-Mid 2015) / iMac A1418 A1419 (Late 2013-Mid 2017) / Mac Mini A1347 (2014) / Mac Pro A1481 (2013)',
        'price' => 44.72,
        'category' => 'MacBook Air 11" Parts (2012-2015)',
        'stock_quantity' => 6
    ],
    [
        'name' => 'Apollo S2 512GB Mac SSD (NVMe PCIe Gen3x4) Compatible For MacBook Air 11" & 13" A1465 A1466 (2012)',
        'description' => 'Apollo S2 512GB Mac SSD (NVMe PCIe Gen3x4) Compatible For MacBook Air 11" & 13" A1465 A1466 (2012) / Pro 13" & 15" Retina (2012 - 2013)',
        'price' => 45.44,
        'category' => 'MacBook Air 11" Parts (2012-2015)',
        'stock_quantity' => 6
    ],
    [
        'name' => 'Apollo S3 1TB Mac SSD (NVMe PCIe Gen3x4) Compatible For MacBook Air 11 & 13" A1465 A1466 (Mid 2013-2017)',
        'description' => 'Apollo S3 1TB Mac SSD (NVMe PCIe Gen3x4) Compatible For MacBook Air 11 & 13" A1465 A1466 (Mid 2013-2017) / Pro Retina A1398 1502 (Late 2013-Mid 2015) / iMac A1418 A1419 (Late 2013-Mid 2017) / Mac Mini A1347 (2014) / Mac Pro A1481 (2013)',
        'price' => 83.94,
        'category' => 'MacBook Air 11" Parts (2012-2015)',
        'stock_quantity' => 4
    ],
    [
        'name' => 'Microphone Cable Compatible For MacBook Air 11" (A1465 / Mid 2012)',
        'description' => 'Microphone Cable Compatible For MacBook Air 11" (A1465 / Mid 2012)',
        'price' => 2.17,
        'category' => 'MacBook Air 11" Parts (2012-2015)',
        'stock_quantity' => 12
    ],
    [
        'name' => 'Left LoudSpeaker Compatible For MacBook Air 11" (A1370 / Late 2010 / Mid 2011 / A1465 / Mid 2012 / Mid 2013 / Early 2014 / Early 2015)',
        'description' => 'Left LoudSpeaker Compatible For MacBook Air 11" (A1370 / Late 2010 / Mid 2011 / A1465 / Mid 2012 / Mid 2013 / Early 2014 / Early 2015)',
        'price' => 3.56,
        'category' => 'MacBook Air 11" Parts (2012-2015)',
        'stock_quantity' => 12
    ],
    [
        'name' => 'Right LoudSpeaker Compatible For MacBook Air 11" (A1370 / Late 2010 / Mid 2011 / A1465 / Mid 2012 / Mid 2013 / Early 2014 / Early 2015)',
        'description' => 'Right LoudSpeaker Compatible For MacBook Air 11" (A1370 / Late 2010 / Mid 2011 / A1465 / Mid 2012 / Mid 2013 / Early 2014 / Early 2015)',
        'price' => 3.63,
        'category' => 'MacBook Air 11" Parts (2012-2015)',
        'stock_quantity' => 12
    ],
    [
        'name' => 'AirPort Wireless Network Card Compatible For MacBook Air 11" (A1370 / Mid 2011) / Air 11" (A1465 / Mid 2012) / Air 13" (A1369 / Mid 2011) / Air 13" (A1466 / Mid 2012)',
        'description' => 'AirPort Wireless Network Card Compatible For MacBook Air 11" (A1370 / Mid 2011) / Air 11" (A1465 / Mid 2012) / Air 13" (A1369 / Mid 2011) / Air 13" (A1466 / Mid 2012)',
        'price' => 3.95,
        'category' => 'MacBook Air 11" Parts (2012-2015)',
        'stock_quantity' => 10
    ],
    [
        'name' => 'Hinge Screws (Torx T8) (6 Piece Set) Compatible For MacBook Pro 13" W/ Touch Bar (A1706 / A1708 / A1989 / A2159 / A2289 / A2251 / A1707 / A1990 / A2338 / Late 2016 To Mid 2020) (50 Pack)',
        'description' => 'Hinge Screws (Torx T8) (6 Piece Set) Compatible For MacBook Pro 13" W/ Touch Bar (A1706 / A1708 / A1989 / A2159 / A2289 / A2251 / A1707 / A1990 / A2338 / Late 2016 To Mid 2020) (50 Pack)',
        'price' => 2.00,
        'category' => 'MacBook Air 11" Parts (2012-2015)',
        'stock_quantity' => 5
    ],
    [
        'name' => 'Keyboard Screws Only Compatible For MacBook Pro / Air (2016-2022) (100 Pack)',
        'description' => 'Keyboard Screws Only Compatible For MacBook Pro / Air (2016-2022) (100 Pack)',
        'price' => 5.53,
        'category' => 'MacBook Air 11" Parts (2012-2015)',
        'stock_quantity' => 5
    ],
    [
        'name' => 'Vent / Antenna Screws (Pentalobe P2) Compatible For MacBook Pro / Air (Late 2016 / Late 2020) (100 Pack)',
        'description' => 'Vent / Antenna Screws (Pentalobe P2) Compatible For MacBook Pro / Air (Late 2016 / Late 2020) (100 Pack)',
        'price' => 6.01,
        'category' => 'MacBook Air 11" Parts (2012-2015)',
        'stock_quantity' => 5
    ],
    [
        'name' => 'Hinge Screws (Torx T8) Compatible For MacBook Air 11" (A1370 / Late 2010 / Mid 2011 / A1465 / Mid 2012 / Mid 2013 / Early 2014 / Early 2015)',
        'description' => 'Hinge Screws (Torx T8) Compatible For MacBook Air 11" (A1370 / Late 2010 / Mid 2011 / A1465 / Mid 2012 / Mid 2013 / Early 2014 / Early 2015)',
        'price' => 0.25,
        'category' => 'MacBook Air 11" Parts (2012-2015)',
        'stock_quantity' => 15
    ],
    [
        'name' => 'AirPort Card / SSD Screw (Torx T5) Compatible For MacBook Air 11" (A1370 / A1465) / Air 13" (A1369 / A1466)',
        'description' => 'AirPort Card / SSD Screw (Torx T5) Compatible For MacBook Air 11" (A1370 / A1465) / Air 13" (A1369 / A1466)',
        'price' => 1.13,
        'category' => 'MacBook Air 11" Parts (2012-2015)',
        'stock_quantity' => 15
    ],
    [
        'name' => 'Trackpad Brackets And Screws Compatible For MacBook Air 11" (A1370) / Air 11" (1465) / Air 13" (A1369) / Air 13" (A1466)',
        'description' => 'Trackpad Brackets And Screws Compatible For MacBook Air 11" (A1370) / Air 11" (1465) / Air 13" (A1369) / Air 13" (A1466)',
        'price' => 1.31,
        'category' => 'MacBook Air 11" Parts (2012-2015)',
        'stock_quantity' => 15
    ],
    [
        'name' => 'AirPort Card / SSD Screw (Torx T5) Compatible For MacBook Pro 15" Retina (A1370 / A1465 / A1369 / A1425 / A1502 / A1398 / A1466)',
        'description' => 'AirPort Card / SSD Screw (Torx T5) Compatible For MacBook Pro 15" Retina (A1370 / A1465 / A1369 / A1425 / A1502 / A1398 / A1466)',
        'price' => 1.33,
        'category' => 'MacBook Air 11" Parts (2012-2015)',
        'stock_quantity' => 15
    ],
    [
        'name' => 'Bottom Case Screws (Pentalobe P5) Compatible For MacBook Air 13" (A1369 / A1466 / 2010 To 2017 ) / Air 11" (A1370 / A1465 / 2010 To 2015)',
        'description' => 'Bottom Case Screws (Pentalobe P5) Compatible For MacBook Air 13" (A1369 / A1466 / 2010 To 2017 ) / Air 11" (A1370 / A1465 / 2010 To 2015)',
        'price' => 1.60,
        'category' => 'MacBook Air 11" Parts (2012-2015)',
        'stock_quantity' => 15
    ],
    [
        'name' => 'Antenna Bar Screw Compatible For MacBook Pro / Air (Late 2016 / Late 2020)',
        'description' => 'Antenna Bar Screw Compatible For MacBook Pro / Air (Late 2016 / Late 2020)',
        'price' => 4.37,
        'category' => 'MacBook Air 11" Parts (2012-2015)',
        'stock_quantity' => 15
    ],
    [
        'name' => 'Battery Screws (Torx T5) Compatible For MacBook Air 11" (A1370 / Late 2010 / Mid 2011 / A1465 / Mid 2012 / Mid 2013 / Early 2014 / Early 2015)',
        'description' => 'Battery Screws (Torx T5) Compatible For MacBook Air 11" / Air 13" (A1370 / A1369 / Late 2010 / Mid 2011 / A1465 / Mid 2012 / Mid 2013 / Early 2014 / Early 2015)',
        'price' => 4.61,
        'category' => 'MacBook Air 11" Parts (2012-2015)',
        'stock_quantity' => 15
    ],
    [
        'name' => 'Clutch Cover Compatible For MacBook Air 11" (A1370 / Late 2010 / Mid 2011 / A1465 / Mid 2012 / Mid 2013 / Early 2014 / Early 2015)',
        'description' => 'Clutch Cover Compatible For MacBook Air 11" (A1370 / Late 2010 / Mid 2011 / A1465 / Mid 2012 / Mid 2013 / Early 2014 / Early 2015)',
        'price' => 3.98,
        'category' => 'MacBook Air 11" Parts (2012-2015)',
        'stock_quantity' => 12
    ],
    [
        'name' => 'Heatsink Compatible For MacBook Air 11" (A1465 / Mid 2012)',
        'description' => 'Heatsink Compatible For MacBook Air 11" (A1465 / Mid 2012)',
        'price' => 1.64,
        'category' => 'MacBook Air 11" Parts (2012-2015)',
        'stock_quantity' => 15
    ],
    [
        'name' => 'Heatsink Compatible For MacBook Air 11" (A1465 / Mid 2013 / Early 2014 / Early 2015)',
        'description' => 'Heatsink Compatible For MacBook Air 11" (A1465 / Mid 2013 / Early 2014 / Early 2015)',
        'price' => 2.05,
        'category' => 'MacBook Air 11" Parts (2012-2015)',
        'stock_quantity' => 15
    ],
    [
        'name' => 'CPU Fan Compatible For Macbook Air 11" (A1370 / Mid 2011) / (A1465 / Mid 2012 / Mid 2013 / Early 2014 / Early 2015)',
        'description' => 'CPU Fan Compatible For MacBook Air 11" (A1370 / Mid 2011) / (A1465 / Mid 2012 / Mid 2013 / Early 2014 / Early 2015)',
        'price' => 2.43,
        'category' => 'MacBook Air 11" Parts (2012-2015)',
        'stock_quantity' => 12
    ],
    [
        'name' => 'Display Gasket Compatible For MacBook Air 11" (A1465) (Compatible with All Years)',
        'description' => 'Display Gasket Compatible For MacBook Air 11" (A1465) (Compatible With All Years)',
        'price' => 3.44,
        'category' => 'MacBook Air 11" Parts (2012-2015)',
        'stock_quantity' => 20
    ],
    [
        'name' => 'TPU Screen Protector Compatible For MacBook Air 11" A1465 (10 Pack)',
        'description' => 'TPU Screen Protector Compatible For MacBook Air 11" A1465 (10 Pack)',
        'price' => 0.00,
        'category' => 'MacBook Air 11" Parts (2012-2015)',
        'stock_quantity' => 10
    ],
    [
        'name' => '4in1 (Top, Bottom, Keyboard, Trackpad) Skin Compatible For Macbook Air 11"(A1465 / 2012 To Early 2015) (A1370 / Late 2010 / Mid 2011)',
        'description' => '4in1 (Top, Bottom, Keyboard, Trackpad) Skin Compatible For Macbook Air 11"(A1465 / 2012 To Early 2015) (A1370 / Late 2010 / Mid 2011)',
        'price' => 0.00,
        'category' => 'MacBook Air 11" Parts (2012-2015)',
        'stock_quantity' => 0
    ],
    [
        'name' => 'Tester Cable (Camera) Compatible For MacBook Air 11" / 13" / Pro Retina 13" / 15" (A1465 / A1466 / A1502 / A1398 / Mid 2013 To Mid 2017)',
        'description' => 'Tester Cable (Camera) Compatible For MacBook Air 11" / 13" / Pro Retina 13" / 15" (A1465 / A1466 / A1502 / A1398 / Mid 2013 To Mid 2017)',
        'price' => 4.09,
        'category' => 'MacBook Air 11" Parts (2012-2015)',
        'stock_quantity' => 10
    ],
    [
        'name' => 'Polarizer Film Compatible For MacBook Air 11" (A1465 / 45°) (10 Pack)',
        'description' => 'Polarizer Film Compatible For MacBook Air 11" (A1465 / 45°) (10 Pack)',
        'price' => 7.62,
        'category' => 'MacBook Air 11" Parts (2012-2015)',
        'stock_quantity' => 5
    ],
    [
        'name' => 'LCD Backlight Sheet Compatible For MacBook Air 11" (A1465) (Compatible With All Years) (10 Pack)',
        'description' => 'LCD Backlight Sheet Compatible For MacBook Air 11" (A1465) (Compatible With All Years) (10 Pack)',
        'price' => 13.91,
        'category' => 'MacBook Air 11" Parts (2012-2015)',
        'stock_quantity' => 5
    ]
];

// Insert parts into Supabase
$insertedCount = 0;
$errors = [];

foreach ($macbookAirA1465Parts as $part) {
    try {
        $response = $supabase->from('parts')->insert($part)->execute();
        $insertedCount++;
        echo "Inserted: " . $part['name'] . "\n";
    } catch (Exception $e) {
        $errors[] = "Failed to insert " . $part['name'] . ": " . $e->getMessage();
        echo "Error inserting " . $part['name'] . ": " . $e->getMessage() . "\n";
    }
}

echo "\n=== Summary ===\n";
echo "Total parts processed: " . count($macbookAirA1465Parts) . "\n";
echo "Successfully inserted: $insertedCount\n";
echo "Errors: " . count($errors) . "\n";

if (!empty($errors)) {
    echo "\n=== Errors ===\n";
    foreach ($errors as $error) {
        echo $error . "\n";
    }
}

echo "\nMacBook Air A1465 parts population completed!\n";
