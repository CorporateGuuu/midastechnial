<?php
/**
 * Populate Supabase with Older MacBook Air Parts (2012-2017)
 *
 * This script inserts older MacBook Air parts data into the Supabase 'parts' table
 */

require_once __DIR__ . '/vendor/autoload.php';
require_once 'config.php';

use Supabase\CreateClient;

$supabase = new CreateClient(SUPABASE_KEY, SUPABASE_URL);

// Older MacBook Air Parts Data (2012-2017)
$macbookAirOlderParts = [
    // MacBook Air 13" (A1466, Mid 2012) Parts
    [
        'name' => 'Bottom Case Screws (Pentalobe P5) Compatible For MacBook Air 13" (A1369 / A1466 / 2010 To 2017 ) / Air 11" (A1370 / A1465 / 2010 To 2015)',
        'description' => 'Bottom Case Screws (Pentalobe P5) Compatible For MacBook Air 13" (A1369 / A1466 / 2010 To 2017 ) / Air 11" (A1370 / A1465 / 2010 To 2015)',
        'price' => 1.60,
        'category' => 'MacBook Air 13" Parts (2012-2017)',
        'stock_quantity' => 15
    ],
    [
        'name' => 'Antenna Bar Screw Compatible For MacBook Pro / Air (Late 2016 / Late 2020)',
        'description' => 'Antenna Bar Screw Compatible For MacBook Pro / Air (Late 2016 / Late 2020)',
        'price' => 4.37,
        'category' => 'MacBook Air 13" Parts (2012-2017)',
        'stock_quantity' => 15
    ],
    [
        'name' => 'Battery Screws (Torx T5) Compatible For MacBook Air 11" (A1370 / Late 2010 / Mid 2011 / A1465 / Mid 2012 / Mid 2013 / Early 2014 / Early 2015)',
        'description' => 'Battery Screws (Torx T5) Compatible For MacBook Air 11" / Air 13" (A1370 / A1369 / Late 2010 / Mid 2011 / A1465 / Mid 2012 / Mid 2013 / Early 2014 / Early 2015)',
        'price' => 4.61,
        'category' => 'MacBook Air 13" Parts (2012-2017)',
        'stock_quantity' => 15
    ],
    [
        'name' => 'Screwdriver (Pentalobe P5) For MacBook Air 11" (A1370 / Late 2010 / Mid 2011 / A1369 / Late 2010 / Mid 2011) / Air 13" (A1466)',
        'description' => 'Screwdriver (Pentalobe P5) For MacBook Air 11" (A1370 / Late 2010 / Mid 2011 / A1369 / Late 2010 / Mid 2011) / Air 13" (A1466)',
        'price' => 7.91,
        'category' => 'MacBook Air 13" Parts (2012-2017)',
        'stock_quantity' => 10
    ],
    [
        'name' => 'Clutch Cover Compatible For MacBook Air 13" (A1466 / Mid 2012 / Mid 2013 / Early 2014 / Early 2015) (A1369 / Mid 2011)',
        'description' => 'Clutch Cover Compatible For MacBook Air 13" (A1466 / Mid 2012 / Mid 2013 / Early 2014 / Early 2015) (A1369 / Mid 2011)',
        'price' => 4.03,
        'category' => 'MacBook Air 13" Parts (2012-2017)',
        'stock_quantity' => 12
    ],
    [
        'name' => 'Heatsink Compatible For MacBook Air 13" (A1466 / Mid 2013 / Early 2014 / Early 2015 / Mid 2017)',
        'description' => 'Heatsink Compatible For MacBook Air 13" (A1466 / Mid 2013 / Early 2014 / Early 2015 / Mid 2017)',
        'price' => 1.42,
        'category' => 'MacBook Air 13" Parts (2012-2017)',
        'stock_quantity' => 15
    ],
    [
        'name' => 'CPU Fan Compatible For MacBook Air 13" (A1466 / Mid 2012 / Mid 2013 / Early 2014 / Early 2015 / Mid 2017) / (A1369 / Late 2010 / Mid 2011)',
        'description' => 'CPU Fan Compatible For MacBook Air 13" (A1466 / Mid 2012 / Mid 2013 / Early 2014 / Early 2015 / Mid 2017) / (A1369 / Late 2010 / Mid 2011)',
        'price' => 1.95,
        'category' => 'MacBook Air 13" Parts (2012-2017)',
        'stock_quantity' => 12
    ],
    [
        'name' => 'Heatsink Compatible For MacBook Air 13" (A1466 / Mid 2012)',
        'description' => 'Heatsink Compatible For MacBook Air 13" (A1466 / Mid 2012)',
        'price' => 3.40,
        'category' => 'MacBook Air 13" Parts (2012-2017)',
        'stock_quantity' => 12
    ],
    [
        'name' => 'Display Gasket Compatible For MacBook Air 13" (A1466) (Compatible With All Years)',
        'description' => 'Display Gasket Compatible For MacBook Air 13" (A1466) (Compatible With All Years)',
        'price' => 2.71,
        'category' => 'MacBook Air 13" Parts (2012-2017)',
        'stock_quantity' => 20
    ],
    [
        'name' => '4in1 (Top, Bottom, Keyboard, Trackpad) Skin Compatible For Macbook Air 13"(A1466 / 2012 To Mid 2017) (A1369 / Late 2010 / Mid 2011)',
        'description' => '4in1 (Top, Bottom, Keyboard, Trackpad) Skin Compatible For Macbook Air 13"(A1466 / 2012 To Mid 2017) (A1369 / Late 2010 / Mid 2011)',
        'price' => 0.00,
        'category' => 'MacBook Air 13" Parts (2012-2017)',
        'stock_quantity' => 0
    ],
    [
        'name' => '2in1 (Top and Bottom) Skin Compatible For Macbook Air 13" (A1466 / 2012 To Mid 2017)',
        'description' => '2 in 1 (Top and Bottom) Skin Compatible For Macbook Air 13" (A1466 / 2012 To Mid 2017) (A1369 / Late 2010 / Mid 2011)',
        'price' => 0.00,
        'category' => 'MacBook Air 13" Parts (2012-2017)',
        'stock_quantity' => 0
    ],
    [
        'name' => 'Quality - OEM Grade A 30W / 61W USB-C To USB-C Cable (6ft.) Compatible For MacBook / iMac / Mac (OEM Grade A) (Bulk Packaging)',
        'description' => '30W / 61W USB-C To USB-C Cable (6ft.) Compatible For MacBook / iMac / Mac (OEM Grade A) (Bulk Packaging)',
        'price' => 0.00,
        'category' => 'MacBook Air 13" Parts (2012-2017)',
        'stock_quantity' => 0
    ],
    [
        'name' => 'Quality - OEM Grade A USB-C to USB-C Cable Compatible For Macbook Power Adapters 87W / 96W (Used OEM Pull)',
        'description' => '87W / 96W USB-C To USB-C Cable (6ft.) Compatible For MacBook / iMac / Mac (OEM Grade A) (Bulk Packaging)',
        'price' => 0.00,
        'category' => 'MacBook Air 13" Parts (2012-2017)',
        'stock_quantity' => 0
    ],
    [
        'name' => 'Quality - OEM Grade A USB-C to USB-C Cable Cable Comptible For Macbook Power Adapters Thunderbolt 3 (Used OEM Pull)',
        'description' => 'Thunderbolt 3 USB-C To USB-C Cable (3ft.) Compatible For MacBook / iMac / Mac (OEM Grade A) (Bulk Packaging)',
        'price' => 0.00,
        'category' => 'MacBook Air 13" Parts (2012-2017)',
        'stock_quantity' => 0
    ],
    [
        'name' => 'Quality - OEM Grade A/B 85W MagSafe 1 Power Adapter With Cable (L-Style) For MacBook (OEM Pull Grade: A/B)',
        'description' => '85W MagSafe 1 Power Adapter With Cable (L-Style) For MacBook (OEM Grade A/B) (Bulk Packaging)',
        'price' => 0.00,
        'category' => 'MacBook Air 13" Parts (2012-2017)',
        'stock_quantity' => 0
    ],
    [
        'name' => 'Quality - OEM Grade A/B 85W MagSafe 2 Power Adapter With Cable (T-Style) For MacBook (OEM Pull Grade: A/B)',
        'description' => '85W MagSafe 2 Power Adapter With Cable (T-Style) For MacBook (OEM Grade A/B) (Bulk Packaging)',
        'price' => 0.00,
        'category' => 'MacBook Air 13" Parts (2012-2017)',
        'stock_quantity' => 0
    ],
    [
        'name' => 'Quality - OEM Grade New 60W MagSafe 2 Power Adapter With Cable (T-Style) For MacBook (OEM Pull Grade: New)',
        'description' => '60W MagSafe 2 Power Adapter With Cable (T-Style) For MacBook (OEM Grade New) (Bulk Packaging)',
        'price' => 0.00,
        'category' => 'MacBook Air 13" Parts (2012-2017)',
        'stock_quantity' => 0
    ],
    [
        'name' => 'Quality - Aftermarket 85W MagSafe 2 Power Adapter With Cable (T-Style) For MacBook (OEM Pull Grade: New)',
        'description' => '85W MagSafe 2 Power Adapter With Cable (T-Style) For MacBook (Aftermarket)',
        'price' => 0.00,
        'category' => 'MacBook Air 13" Parts (2012-2017)',
        'stock_quantity' => 0
    ],
    [
        'name' => 'MagSafe "Duckhead" 2-Prong Wall Adapter Compatible For MacBook All Models (US Version)',
        'description' => 'MagSafe "Duckhead" 2-Prong Wall Adapter Compatible For MacBook All Models (US Version)',
        'price' => 0.00,
        'category' => 'MacBook Air 13" Parts (2012-2017)',
        'stock_quantity' => 0
    ],
    [
        'name' => 'Overvoltage Protection Gate Compatible For MacBooks (Late 2009-Mid 2017) (TC7SZ08F: TC7SZ08AFEAPE: SOT23-5)',
        'description' => 'Overvoltage Protection Gate Compatible For MacBooks (Late 2009-Mid 2017) (TC7SZ08F: TC7SZ08AFEAPE: SOT23-5)',
        'price' => 1.04,
        'category' => 'MacBook Air 13" Parts (2012-2017)',
        'stock_quantity' => 20
    ],
    [
        'name' => 'Keyboard Backlight Connector Compatible For MacBook Various models (WP7A-S010VA1-R6000: 30 Pin)',
        'description' => 'Keyboard Backlight Connector Compatible For MacBook Various models (WP7A-S010VA1-R6000: 30 Pin)',
        'price' => 1.23,
        'category' => 'MacBook Air 13" Parts (2012-2017)',
        'stock_quantity' => 15
    ],
    [
        'name' => 'Trackpad Connector Compatible For Macbook Air 11"/13"(A1370/ A1465/ A1369/A1466: Late 2010 to Mid 2012:518S0794/J5700: 14 Pin)',
        'description' => 'Trackpad Connector Compatible For MacBook Air 11" / 13" (A1370 / A1465 / A1369 / A1466 / Late 2010 To Mid 2012) (518S0794/J5700: 14 Pin)',
        'price' => 1.30,
        'category' => 'MacBook Air 13" Parts (2012-2017)',
        'stock_quantity' => 15
    ],
    [
        'name' => 'Keyboard Backlight Connector Compatible For MacBook Air 13" (Compatible With All Years)',
        'description' => 'Keyboard Backlight Connector Compatible For MacBook Air 13" (Compatible With All Years)',
        'price' => 1.60,
        'category' => 'MacBook Air 13" Parts (2012-2017)',
        'stock_quantity' => 15
    ],
    [
        'name' => 'LCD Display Connector Compatible For MacBook Air 11" / Pro Unibody 13" / Pro Retina 13" / 15" (A1370 / A1369 / A1465 / A1466 / A1278 / A1425 / A1502 / A1398 / A1418 / Mid 2010 To Mid 2015) (518S0787/J900: 30 Pin)',
        'description' => 'LCD Display Connector Compatible For MacBook Air 11" / Pro Unibody 13" / Pro Retina 13" / 15" (A1370 / A1369 / A1465 / A1466 / A1278 / A1425 / A1502 / A1398 / A1418 / Mid 2010 To Mid 2015) (518S0787/J900: 30 Pin)',
        'price' => 1.63,
        'category' => 'MacBook Air 13" Parts (2012-2017)',
        'stock_quantity' => 15
    ],
    [
        'name' => 'Overvoltage Protection Relay Compatible For MacBooks (Late 2009-Mid 2017) (MAX9940AXK+: U6900: SC70-5)',
        'description' => 'Overvoltage Protection Relay Compatible For MacBooks (Late 2009-Mid 2017) (MAX9940AXK+: U6900: SC70-5)',
        'price' => 1.67,
        'category' => 'MacBook Air 13" Parts (2012-2017)',
        'stock_quantity' => 20
    ],
    [
        'name' => 'Camera Connector Compatible For MacBook Air 13" (A1466 / Mid 2013 / Early 2014 / Early 2015 / Mid 2017)',
        'description' => 'Camera Connector Compatible For MacBook Air 13" (A1466 / Mid 2013 / Early 2014 / Early 2015 / Mid 2017)',
        'price' => 1.91,
        'category' => 'MacBook Air 13" Parts (2012-2017)',
        'stock_quantity' => 15
    ],
    [
        'name' => 'Mainboard Power Connector Compatible For MacBook Air 13" (Compatible with All Years)',
        'description' => 'Mainboard Power Connector Compatible For MacBook Air 13" (Compatible With All Years)',
        'price' => 1.97,
        'category' => 'MacBook Air 13" Parts (2012-2017)',
        'stock_quantity' => 15
    ],
    [
        'name' => 'Charging Port FPC Connector (On The USB-C Board Flex Cable) Compatible For MacBook Air / Pro (2016-2020)',
        'description' => 'Charging Port FPC Connector (On The USB-C Board Flex Cable) Compatible For MacBook Air / Pro (2016-2020)',
        'price' => 2.20,
        'category' => 'MacBook Air 13" Parts (2012-2017)',
        'stock_quantity' => 15
    ],
    [
        'name' => 'LCD Backlight Driver Compatible For MacBook Air 11" / Pro Unibody 13" / 15" (A1370 / A1369 / A1465 / A1466 / A1278 / A1286 / Early 2011 To Mid 2017) (LP8550:U7701 / U9701:BGA-25 Pin)',
        'description' => 'LCD Backlight Driver Compatible For MacBook Air 11" / Pro Unibody 13" / 15" (A1370 / A1369 / A1465 / A1466 / A1278 / A1286 / Early 2011 To Mid 2017) (LP8550:U7701 / U9701:BGA-25 Pin)',
        'price' => 2.35,
        'category' => 'MacBook Air 13" Parts (2012-2017)',
        'stock_quantity' => 10
    ],
    [
        'name' => 'Charging Port FPC Connector (On The Motherboard) Compatible For MacBook Air / Pro (2016-2020)',
        'description' => 'Charging Port FPC Connector (On The Motherboard) Compatible For MacBook Air / Pro (2016-2020)',
        'price' => 2.60,
        'category' => 'MacBook Air 13" Parts (2012-2017)',
        'stock_quantity' => 15
    ],
    [
        'name' => 'Battery Connector Compatible For MacBook Air 13" (A1466)',
        'description' => 'Battery Connector Compatible For MacBook Air 13" (A1466)',
        'price' => 4.95,
        'category' => 'MacBook Air 13" Parts (2012-2017)',
        'stock_quantity' => 15
    ],
    [
        'name' => 'I/O Board Connector Compatible For MacBook Air 13" (A1466 / Mid 2012)',
        'description' => 'I/O Board Connector Compatible For MacBook Air 13" (A1466 / Mid 2013 / Early 2014 / Early 2015 / Mid 2017)',
        'price' => 6.11,
        'category' => 'MacBook Air 13" Parts (2012-2017)',
        'stock_quantity' => 10
    ],
    [
        'name' => 'Complete LCD Display Assembly Compatible For MacBook Air 13" (A1466 / Mid 2013 / Early 2014 / Early 2015 / Mid 2017) (Aftermarket Plus)',
        'description' => 'Complete LCD Display Assembly Compatible For MacBook Air 13" (A1466 / Mid 2013 / Early 2014 / Early 2015 / Mid 2017) (Aftermarket Plus)',
        'price' => 146.61,
        'category' => 'MacBook Air 13" Parts (2012-2017)',
        'stock_quantity' => 8
    ],
    [
        'name' => 'Complete LCD Display Assembly Compatible For MacBook Air 13" (A1466 / Mid 2013 / Early 2014 / Early 2015 / Mid 2017) (Used OEM Pull: Grade B)',
        'description' => 'Complete LCD Display Assembly Compatible For MacBook Air 13" (A1466 / Mid 2013 / Early 2014 / Early 2015 / Mid 2017) (Used OEM Pull: Grade B)',
        'price' => 130.57,
        'category' => 'MacBook Air 13" Parts (2012-2017)',
        'stock_quantity' => 6
    ],
    [
        'name' => 'Complete LCD Display Assembly Compatible For MacBook Air 13" (A1369 / Late 2010 / Mid 2011) / (A1466 / Mid 2012) (Used OEM Pull: Grade A)',
        'description' => 'Complete LCD Display Assembly Compatible For MacBook Air 13" (A1369 / Late 2010 / Mid 2011) / (A1466 / Mid 2012) (Used OEM Pull: Grade A)',
        'price' => 103.53,
        'category' => 'MacBook Air 13" Parts (2012-2017)',
        'stock_quantity' => 8
    ],
    [
        'name' => 'Complete LCD Display Assembly Compatible For MacBook Air 13" (A1466 / Mid 2013 / Early 2014 / Early 2015 / Mid 2017) (Used OEM Pull: Grade A)',
        'description' => 'Complete LCD Display Assembly Compatible For MacBook Air 13" (A1466 / Mid 2013 / Early 2014 / Early 2015 / Mid 2017) (Used OEM Pull: Grade A)',
        'price' => 157.55,
        'category' => 'MacBook Air 13" Parts (2012-2017)',
        'stock_quantity' => 8
    ],
    [
        'name' => 'Battery (A1496) Compatible For MacBook Air 13" (A1466 / Mid 2012 / A1405 / Mid 2013 / Early 2014 / Early 2015 / Mid 2017)',
        'description' => 'Battery (A1496) Compatible For MacBook Air 13" (A1466 / Mid 2012 / A1405 / Mid 2013 / Early 2014 / Early 2015 / Mid 2017)',
        'price' => 38.99,
        'category' => 'MacBook Air 13" Parts (2012-2017)',
        'stock_quantity' => 15
    ],
    [
        'name' => 'Top Case With Keyboard And Microphone Compatible For MacBook Air 13" (A1466 / Mid 2013 / Early 2014 / Early 2015 / Mid 2017) (US English) (Used OEM Pull: Grade B/C)',
        'description' => 'Top Case With Keyboard And Microphone Compatible For MacBook Air 13" (A1466 / Mid 2013 / Early 2014 / Early 2015 / Mid 2017) (US English) (Used OEM Pull: Grade B/C)',
        'price' => 53.58,
        'category' => 'MacBook Air 13" Parts (2012-2017)',
        'stock_quantity' => 8
    ],
    [
        'name' => 'Top Case With Keyboard And Microphone Compatible For MacBook Air 13" (A1466 / Mid 2013 / Early 2014 / Early 2015 / Mid 2017) (UK English) (Used OEM Pull: Grade B/C)',
        'description' => 'Top Case With Keyboard And Microphone Compatible For MacBook Air 13" (A1466 / Mid 2013 / Early 2014 / Early 2015 / Mid 2017) (UK English) (Used OEM Pull: Grade B/C)',
        'price' => 73.89,
        'category' => 'MacBook Air 13" Parts (2012-2017)',
        'stock_quantity' => 8
    ],
    [
        'name' => 'Top Case With Keyboard And Microphone Compatible For MacBook Air 13" (A1466 / Mid 2013 / Early 2014 / Early 2015 / Mid 2017) (US English) (Used OEM Pull: Grade A)',
        'description' => 'Top Case With Keyboard And Microphone Compatible For MacBook Air 13" (A1466 / Mid 2013 / Early 2014 / Early 2015 / Mid 2017) (US English) (Used OEM Pull: Grade A)',
        'price' => 80.95,
        'category' => 'MacBook Air 13" Parts (2012-2017)',
        'stock_quantity' => 8
    ],
    [
        'name' => 'Top Case Assembly (With Battery And Keyboard) Compatible For MacBook Air 13" (A1466 / Mid 2013 / Early 2014 / Early 2015 / Mid 2017) (US English) (Used OEM Pull: Grade A)',
        'description' => 'Top Case Assembly (With Battery And Keyboard) Compatible For MacBook Air 13" (A1466 / Mid 2013 / Early 2014 / Early 2015 / Mid 2017) (US English) (Used OEM Pull: Grade A)',
        'price' => 170.44,
        'category' => 'MacBook Air 13" Parts (2012-2017)',
        'stock_quantity' => 8
    ],
    [
        'name' => 'Top Case With Keyboard Compatible For MacBook Air 13" (A1466 / Mid 2013 / Early 2014 / Early 2015 / Mid 2017) (US English) (Used OEM Pull: Grade New)',
        'description' => 'Top Case With Keyboard Compatible For MacBook Air 13" (A1466 / Mid 2013 / Early 2014 / Early 2015 / Mid 2017) (US English) (Used OEM Pull: Grade New)',
        'price' => 82.03,
        'category' => 'MacBook Air 13" Parts (2012-2017)',
        'stock_quantity' => 8
    ],
    [
        'name' => 'Top Case With Keyboard Compatible For MacBook Air 13" (A1466 / Mid 2012) (US English) (Used OEM Pull: Grade New)',
        'description' => 'Top Case With Keyboard Compatible For MacBook Air 13" (A1466 / Mid 2012) (US English) (Used OEM Pull: Grade New)',
        'price' => 87.60,
        'category' => 'MacBook Air 13" Parts (2012-2017)',
        'stock_quantity' => 8
    ],
    [
        'name' => 'Bottom Case Plastic Feet Compatible For MacBook Air 11" / Air 13" (A1370 / A1465 / A1369 / A1466) (4 Piece Set)',
        'description' => 'Bottom Case Plastic Feet Compatible For MacBook Air 11" / Air 13" (A1370 / A1465 / A1369 / A1466) (4 Piece Set)',
        'price' => 1.56,
        'category' => 'MacBook Air 13" Parts (2012-2017)',
        'stock_quantity' => 20
    ],
    [
        'name' => 'Bottom Case Plastic Feet Compatible For MacBook Pro / Air (Late 2016 To Early 2020) (4 Piece Set)',
        'description' => 'Bottom Case Plastic Feet Compatible For MacBook Pro / Air (Late 2016 To Early 2020) (4 Piece Set)',
        'price' => 1.60,
        'category' => 'MacBook Air 13" Parts (2012-2017)',
        'stock_quantity' => 20
    ],
    [
        'name' => 'Bottom Case Compatible For MacBook Air 13" (A1369 / Late 2010) (A1466 / Mid 2012/ Mid 2017) (Silver)',
        'description' => 'Bottom Case Compatible For MacBook Air 13" (A1369 / Late 2010) (A1466 / Mid 2012 / Mid 2013 / Early 2014 / Early 2015 / Mid 2017) (Silver)',
        'price' => 28.82,
        'category' => 'MacBook Air 13" Parts (2012-2017)',
        'stock_quantity' => 15
    ],
    [
        'name' => 'Trackpad Flex Cable Compatible For MacBook Air 13" (A1466 / Mid 2013 / Early 2014 / Early 2015 / Mid 2017)',
        'description' => 'Trackpad Flex Cable Compatible For MacBook Air 13" (A1466 / Mid 2013 / Early 2014 / Early 2015 / Mid 2017)',
        'price' => 2.84,
        'category' => 'MacBook Air 13" Parts (2012-2017)',
        'stock_quantity' => 15
    ],
    [
        'name' => 'Trackpad Compatible For MacBook Air 13" (A1369 / Mid 2011 / A1466 / Mid 2012)',
        'description' => 'Trackpad Compatible For MacBook Air 13" (A1369 / Mid 2011 / A1466 / Mid 2012)',
        'price' => 24.72,
        'category' => 'MacBook Air 13" Parts (2012-2017)',
        'stock_quantity' => 10
    ],
    [
        'name' => 'Trackpad Compatible For MacBook Air 13" (A1466 / Mid 2013 / Early 2014 / Early 2015 / Mid 2017)',
        'description' => 'Trackpad Compatible For MacBook Air 13" (A1466 / Mid 2013 / Early 2014 / Early 2015 / Mid 2017)',
        'price' => 25.28,
        'category' => 'MacBook Air 13" Parts (2012-2017)',
        'stock_quantity' => 10
    ],
    [
        'name' => 'Trackpad Keyboard IPD Flex Connector Compatible For MacBook Air 11" / 13" (AA1465 / A1466 / Mid 2013 To Mid 2017) (TF13BS-20S-0.4SH:518S0884: / J4800: 20 Pin)',
        'description' => 'Trackpad Keyboard IPD Flex Connector Compatible For MacBook Air 11" / 13" (AA1465 / A1466 / Mid 2013 To Mid 2017) (TF13BS-20S-0.4SH:518S0884: / J4800: 20 Pin)',
        'price' => 1.52,
        'category' => 'MacBook Air 13" Parts (2012-2017)',
        'stock_quantity' => 15
    ],
    [
        'name' => 'Keycap Compatible For MacBook Air 13" / Pro 13" / 15" Retina (A1466 / A1425 / A1502 / A1398 / Mid 2012 To Mid 2015) (UK) (DARFON)',
        'description' => 'Keycap Compatible For MacBook Air 13" / Pro 13" / 15" Retina (A1466 / A1425 / A1502 / A1398 / Mid 2012 To Mid 2015) (UK) (DARFON)',
        'price' => 4.09,
        'category' => 'MacBook Air 13" Parts (2012-2017)',
        'stock_quantity' => 20
    ],
    [
        'name' => 'Keycap Compatible For MacBook Air 13" / Pro 13" / 15" Retina (A1466 / A1425 / A1502 / A1398 / Mid 2012 To Mid 2015) (US) (DARFON)',
        'description' => 'Keycap Compatible For MacBook Air 13" / Pro 13" / 15" Retina (A1466 / A1425 / A1502 / A1398 / Mid 2012 To Mid 2015) (US) (DARFON)',
        'price' => 4.31,
        'category' => 'MacBook Air 13" Parts (2012-2017)',
        'stock_quantity' => 20
    ],
    [
        'name' => 'Keycap Compatible For MacBook Air 13" / Pro 13" / 15" Retina (A1466 / A1425 / A1502 / A1398 / Mid 2012 To Mid 2015) (UK) (SUNREX)',
        'description' => 'Keycap Compatible For MacBook Air 13" / Pro 13" / 15" Retina (A1466 / A1425 / A1502 / A1398 / Mid 2012 To Mid 2015) (UK) (SUNREX)',
        'price' => 4.31,
        'category' => 'MacBook Air 13" Parts (2012-2017)',
        'stock_quantity' => 20
    ],
    [
        'name' => 'Keycap Compatible For MacBook Air 13" / Pro 13" / 15" Retina (A1466 / A1425 / A1502 / A1398 / Mid 2012 To Mid 2015) (US) (SUNREX)',
        'description' => 'Keycap Compatible For MacBook Air 13" / Pro 13" / 15" Retina (A1466 / A1425 / A1502 / A1398 / Mid 2012 To Mid 2015) (US) (SUNREX)',
        'price' => 4.95,
        'category' => 'MacBook Air 13" Parts (2012-2017)',
        'stock_quantity' => 20
    ],
    [
        'name' => 'Keyboard W/ Backlight & Screws (US English) Compatible For MacBook Air 13" (A1466) / (A1369 / Mid 2011)',
        'description' => 'Keyboard W/ Backlight & Screws (US English) Compatible For MacBook Air 13" (A1466) / (A1369 / Mid 2011)',
        'price' => 15.48,
        'category' => 'MacBook Air 13" Parts (2012-2017)',
        'stock_quantity' => 12
    ],
    [
        'name' => 'I/O Board Flex Cable Compatible For MacBook Air 13" (A1466 / Mid 2013 / Early 2014 / Early 2015 / Mid 2017)',
        'description' => 'I/O Board Flex Cable Compatible For MacBook Air 13" (A1466 / Mid 2013 / Early 2014 / Early 2015 / Mid 2017)',
        'price' => 3.69,
        'category' => 'MacBook Air 13" Parts (2012-2017)',
        'stock_quantity' => 15
    ],
    [
        'name' => 'I/O Board Flex Cable Compatible For MacBook Air 13" (A1466 / Mid 2012)',
        'description' => 'I/O Board Flex Cable Compatible For MacBook Air 13" (A1466 / Mid 2012)',
        'price' => 4.41,
        'category' => 'MacBook Air 13" Parts (2012-2017)',
        'stock_quantity' => 15
    ],
    [
        'name' => 'I/O Board (MagSafe 2: USB: Audio) Compatible For MacBook Air 13" (A1466 / Mid 2012)',
        'description' => 'I/O Board (MagSafe 2: USB: Audio) Compatible For MacBook Air 13" (A1466 / Mid 2012)',
        'price' => 26.17,
        'category' => 'MacBook Air 13" Parts (2012-2017)',
        'stock_quantity' => 10
    ],
    [
        'name' => 'I/O Board (MagSafe 2: US: Audio) Compatible For MacBook Air 13" (A1466 / Mid 2013 / Early 2014 / Early 2015 / Mid 2017)',
        'description' => 'I/O Board (MagSafe 2: US: Audio) Compatible For MacBook Air 13" (A1466 / Mid 2013 / Early 2014 / Early 2015 / Mid 2017)',
        'price' => 34.78,
        'category' => 'MacBook Air 13" Parts (2012-2017)',
        'stock_quantity' => 10
    ],
    [
        'name' => 'Display LVDS Cable + Left Hinge Compatible For MacBook Air 13" (A1466 / Mid 2012 / Mid 2013 / Early 2014 / Early 2015 / Mid 2017)',
        'description' => 'Display LVDS Cable + Left Hinge Compatible For MacBook Air 13" (A1466 / Mid 2012 / Mid 2013 / Early 2014 / Early 2015 / Mid 2017)',
        'price' => 13.01,
        'category' => 'MacBook Air 13" Parts (2012-2017)',
        'stock_quantity' => 12
    ],
    [
        'name' => 'Apollo S3 128GB Mac SSD (NVME PCIe Gen3X4) Compatible For MacBook Air 11 & 13" A1465 A1466 (Mid 2013-2017)',
        'description' => 'Apollo S3 128GB Mac SSD (NVME PCIe Gen3X4) Compatible For MacBook Air 11 & 13" A1465 A1466 (Mid 2013-2017) / Pro Retina A1398 1502 (Late 2013-Mid 2015) / iMac A1418 A1419 (Late 2013-Mid 2017) / Mac Mini A1347 (2014) / Mac Pro A1481 (2013)',
        'price' => 19.24,
        'category' => 'MacBook Air 13" Parts (2012-2017)',
        'stock_quantity' => 10
    ],
    [
        'name' => 'Apollo S2 256GB Mac SSD (NVMe PCIe Gen3x4) Compatible For MacBook Air 11" & 13" A1465 A1466 (2012)',
        'description' => 'Apollo S2 256GB Mac SSD (NVMe PCIe Gen3x4) Compatible For MacBook Air 11" & 13" A1465 A1466 (2012) / Pro 13" & 15" Retina (2012 - 2013)',
        'price' => 25.10,
        'category' => 'MacBook Air 13" Parts (2012-2017)',
        'stock_quantity' => 8
    ],
    [
        'name' => 'Apollo S3 256GB Mac SSD (NVMe PCIe Gen3x4) Compatible For MacBook Air 11 & 13" A1465 A1466 (Mid 2013-2017)',
        'description' => 'Apollo S3 256GB Mac SSD (NVMe PCIe Gen3x4) Compatible For MacBook Air 11 & 13" A1465 A1466 (Mid 2013-2017) / Pro Retina A1398 1502 (Late 2013-Mid 2015) / iMac A1418 A1419 (Late 2013-Mid 2017) / Mac Mini A1347 (2014) / Mac Pro A1481 (2013)',
        'price' => 26.03,
        'category' => 'MacBook Air 13" Parts (2012-2017)',
        'stock_quantity' => 8
    ],
    [
        'name' => 'Apollo S3 512GB Mac SSD (NVMe PCIe Gen3x4) Compatible For MacBook Air 11 & 13" A1465 A1466 (Mid 2013-2017)',
        'description' => 'Apollo S3 512GB Mac SSD (NVMe PCIe Gen3x4) Compatible For MacBook Air 11 & 13" A1465 A1466 (Mid 2013-2017) / Pro Retina A1398 1502 (Late 2013-Mid 2015) / iMac A1418 A1419 (Late 2013-Mid 2017) / Mac Mini A1347 (2014) / Mac Pro A1481 (2013)',
        'price' => 44.72,
        'category' => 'MacBook Air 13" Parts (2012-2017)',
        'stock_quantity' => 6
    ],
    [
        'name' => 'Apollo S2 512GB Mac SSD (NVMe PCIe Gen3x4) Compatible For MacBook Air 11" & 13" A1465 A1466 (2012)',
        'description' => 'Apollo S2 512GB Mac SSD (NVMe PCIe Gen3x4) Compatible For MacBook Air 11" & 13" A1465 A1466 (2012) / Pro 13" & 15" Retina (2012 - 2013)',
        'price' => 45.44,
        'category' => 'MacBook Air 13" Parts (2012-2017)',
        'stock_quantity' => 6
    ],
    [
        'name' => 'Apollo S3 1TB Mac SSD (NVMe PCIe Gen3x4) Compatible For MacBook Air 11 & 13" A1465 A1466 (Mid 2013-2017)',
        'description' => 'Apollo S3 1TB Mac SSD (NVMe PCIe Gen3x4) Compatible For MacBook Air 11 & 13" A1465 A1466 (Mid 2013-2017) / Pro Retina A1398 1502 (Late 2013-Mid 2015) / iMac A1418 A1419 (Late 2013-Mid 2017) / Mac Mini A1347 (2014) / Mac Pro A1481 (2013)',
        'price' => 83.94,
        'category' => 'MacBook Air 13" Parts (2012-2017)',
        'stock_quantity' => 4
    ],
    [
        'name' => 'SSD Connector Compatible For MacBook Air 13" (A1466 / Mid 2013 / Early 2014 / Early 2015 / Mid 2017)',
        'description' => 'SSD Connector Compatible For MacBook Air 13" (A1466 / Mid 2013 / Early 2014 / Early 2015 / Mid 2017)',
        'price' => 4.86,
        'category' => 'MacBook Air 13" Parts (2012-2017)',
        'stock_quantity' => 15
    ],
    [
        'name' => 'Loudspeaker Adhesive Compatible For MacBook Air 13" (A1466) (Compatible With All Years) (2 Piece set)',
        'description' => 'Loudspeaker Adhesive Compatible For MacBook Air 13" (A1466) (Compatible With All Years) (2 Piece set)',
        'price' => 1.57,
        'category' => 'MacBook Air 13" Parts (2012-2017)',
        'stock_quantity' => 20
    ],
    [
        'name' => 'Speaker: Right Compatible For MacBook Air 13" (A1369 / Mid 2011) / MacBook Air 13" (A1466 / Mid 2012 / Mid 2013 / Early 2014 / Early 2015 / Mid 2017)',
        'description' => 'Speaker: Right Compatible For MacBook Air 13" (A1369 / Mid 2011) / MacBook Air 13" (A1466 / Mid 2012 / Mid 2013 / Early 2014 / Early 2015 / Mid 2017)',
        'price' => 2.56,
        'category' => 'MacBook Air 13" Parts (2012-2017)',
        'stock_quantity' => 12
    ],
    [
        'name' => 'Speaker: Left Compatible For MacBook Air 13" (A1369 / Mid 2011) / MacBook Air 13" (A1466 / Mid 2012 / Mid 2013 / Early 2014 / Early 2015 / Mid 2017)',
        'description' => 'Speaker: Left Compatible For MacBook Air 13" (A1369 / Mid 2011) / MacBook Air 13" (A1466 / Mid 2012 / Mid 2013 / Early 2014 / Early 2015 / Mid 2017)',
        'price' => 2.81,
        'category' => 'MacBook Air 13" Parts (2012-2017)',
        'stock_quantity' => 12
    ],
    [
        'name' => 'Left & Right Loudspeaker Compatible For MacBook Air 13" (A1369 / Mid 2011) (A1466 / Mid 2012 / Mid 2013 / Early 2014 / Early 2015 / Mid 2017)',
        'description' => 'Left & Right Loudspeaker Compatible For MacBook Air 13" (A1369 / Mid 2011) (A1466 / Mid 2012 / Mid 2013 / Early 2014 / Early 2015 / Mid 2017)',
        'price' => 3.63,
        'category' => 'MacBook Air 13" Parts (2012-2017)',
        'stock_quantity' => 12
    ],
    [
        'name' => 'Microphone Cable Compatible For MacBook Air 13" (A1466 / Mid 2013 / Early 2014 / Early 2015 / Mid 2017)',
        'description' => 'Microphone Cable Compatible For MacBook Air 13" (A1466 / Mid 2013 / Early 2014 / Early 2015 / Mid 2017)',
        'price' => 4.06,
        'category' => 'MacBook Air 13" Parts (2012-2017)',
        'stock_quantity' => 12
    ],
    [
        'name' => 'Microphone Cable Compatible For MacBook Air 13" (A1466 / Mid 2012)',
        'description' => 'Microphone Cable Compatible For MacBook Air 13" (A1466 / Mid 2012)',
        'price' => 5.30,
        'category' => 'MacBook Air 13" Parts (2012-2017)',
        'stock_quantity' => 12
    ],
    [
        'name' => 'AirPort Wireless Network Card Compatible For MacBook Air 11" (A1370 / Mid 2011) / Air 11" (A1465 / Mid 2012) / Air 13" (A1369 / Mid 2011) / Air 13" (A1466 / Mid 2012)',
        'description' => 'AirPort Wireless Network Card Compatible For MacBook Air 11" (A1370 / Mid 2011) / Air 11" (A1465 / Mid 2012) / Air 13" (A1369 / Mid 2011) / Air 13" (A1466 / Mid 2012)',
        'price' => 3.95,
        'category' => 'MacBook Air 13" Parts (2012-2017)',
        'stock_quantity' => 10
    ],
    [
        'name' => 'Airport Card Compatible For MacBook Air 11" / Air 13" (A1465 / A1466 / Mid 2013 / Early 2014 / Early 2015 / Mid 2017)',
        'description' => 'Airport Card Compatible For MacBook Air 11" / Air 13" (A1465 / A1466 / Mid 2013 / Early 2014 / Early 2015 / Mid 2017)',
        'price' => 22.99,
        'category' => 'MacBook Air 13" Parts (2012-2017)',
        'stock_quantity' => 10
    ],
    [
        'name' => 'WiFi Antenna Cable Compatible For MacBook Air 13" (A1466 / Mid 2013 / Early 2014 / Early 2015 / Mid 2017)',
        'description' => 'WiFi Antenna Cable Compatible For MacBook Air 13" (A1466 / Mid 2013 / Early 2014 / Early 2015 / Mid 2017)',
        'price' => 18.67,
        'category' => 'MacBook Air 13" Parts (2012-2017)',
        'stock_quantity' => 12
    ],
    [
        'name' => 'Hinge Screws (Torx T8) (6 Piece Set) Compatible For MacBook Pro 13" W/ Touch Bar (A1706 / A1708 / A1989 / A2159 / A2289 / A2251 / A1707 / A1990 / A2338 / Late 2016 To Mid 2020) (50 Pack)',
        'description' => 'Hinge Screws (Torx T8) (6 Piece Set) Compatible For MacBook Pro 13" W/ Touch Bar (A1706 / A1708 / A1989 / A2159 / A2289 / A2251 / A1707 / A1990 / A2338 / Late 2016 To Mid 2020) (50 Pack)',
        'price' => 2.00,
        'category' => 'MacBook Air 13" Parts (2012-2017)',
        'stock_quantity' => 5
    ],
    [
        'name' => 'Keyboard Screws Only Compatible For MacBook Air 13" (A1466) / (A1369 / Mid 2011) (100 Pack)',
        'description' => 'Keyboard Screws Only Compatible For MacBook Air 13" (A1466) / (A1369 / Mid 2011) (100 Pack)',
        'price' => 0.58,
        'category' => 'MacBook Air 13" Parts (2012-2017)',
        'stock_quantity' => 5
    ],
    [
        'name' => 'Keyboard Screws Only Compatible For MacBook Pro / Air (2016-2022) (100 Pack)',
        'description' => 'Keyboard Screws Only Compatible For MacBook Pro / Air (2016-2022) (100 Pack)',
        'price' => 5.53,
        'category' => 'MacBook Air 13" Parts (2012-2017)',
        'stock_quantity' => 5
    ],
    [
        'name' => 'Vent / Antenna Screws (Pentalobe P2) Compatible For MacBook Pro / Air (Late 2016 / Late 2020) (100 Pack)',
        'description' => 'Vent / Antenna Screws (Pentalobe P2) Compatible For MacBook Pro / Air (Late 2016 / Late 2020) (100 Pack)',
        'price' => 6.01,
        'category' => 'MacBook Air 13" Parts (2012-2017)',
        'stock_quantity' => 5
    ],
    [
        'name' => 'AirPort Card / SSD Screw (Torx T5) Compatible For MacBook Air 11" (A1370 / A1465) / Air 13" (A1369 / A1466)',
        'description' => 'AirPort Card / SSD Screw (Torx T5) Compatible For MacBook Air 11" (A1370 / A1465) / Air 13" (A1369 / A1466)',
        'price' => 1.13,
        'category' => 'MacBook Air 13" Parts (2012-2017)',
        'stock_quantity' => 15
    ],
    [
        'name' => 'Trackpad Brackets And Screws Compatible For MacBook Air 11" (A1370) / Air 11" (1465) / Air 13" (A1369) / Air 13" (A1466)',
        'description' => 'Trackpad Brackets And Screws Compatible For MacBook Air 11" (A1370) / Air 11" (1465) / Air 13" (A1369) / Air 13" (A1466)',
        'price' => 1.31,
        'category' => 'MacBook Air 13" Parts (2012-2017)',
        'stock_quantity' => 15
    ],
    [
        'name' => 'AirPort Card / SSD Screw (Torx T5) Compatible For MacBook Pro 15" Retina (A1370 / A1465 / A1369 / A1425 / A1502 / A1398 / A1466)',
        'description' => 'AirPort Card / SSD Screw (Torx T5) Compatible For MacBook Pro 15" Retina (A1370 / A1465 / A1369 / A1425 / A1502 / A1398 / A1466)',
        'price' => 1.33,
        'category' => 'MacBook Air 13" Parts (2012-2017)',
        'stock_quantity' => 15
    ],
];

// Insert parts into Supabase
$insertedCount = 0;
$errors = [];

foreach ($macbookAirOlderParts as $part) {
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
echo "Total parts processed: " . count($macbookAirOlderParts) . "\n";
echo "Successfully inserted: $insertedCount\n";
echo "Errors: " . count($errors) . "\n";

if (!empty($errors)) {
    echo "\n=== Errors ===\n";
    foreach ($errors as $error) {
        echo $error . "\n";
    }
}

echo "\nMacBook Air older parts population completed!\n";
