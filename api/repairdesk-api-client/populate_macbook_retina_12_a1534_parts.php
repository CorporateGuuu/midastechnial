<?php
/**
 * Populate Supabase with MacBook Retina 12 A1534 Parts (Early 2015 - Mid 2017)
 *
 * This script inserts MacBook Retina 12 A1534 parts data into the Supabase 'parts' table
 */

require_once __DIR__ . '/vendor/autoload.php';
require_once 'config.php';

use Supabase\CreateClient;

$supabase = new CreateClient(SUPABASE_KEY, SUPABASE_URL);

// MacBook Retina 12 A1534 Parts Data (Early 2015 - Mid 2017)
$macbookRetina12A1534Parts = [
    [
        'name' => 'Complete LCD Display Assembly Compatible For MacBook Retina 12" (A1534 / Early 2015) (Used OEM Pull: Cosmetic Grade: C) (Space Grey)',
        'description' => 'Complete LCD Display Assembly Compatible For MacBook Retina 12" (A1534 / Early 2015) (Used OEM Pull: Cosmetic Grade: C) (Space Grey)',
        'price' => 223.34,
        'category' => 'MacBook Retina 12" Parts (2015-2017)',
        'stock_quantity' => 5
    ],
    [
        'name' => 'Complete LCD Display Assembly Compatible For MacBook Retina 12" (A1534 / Early 2015 / Early 2016 / Mid 2017) (Used OEM Pull: Grade B) (Silver)',
        'description' => 'Complete LCD Display Assembly Compatible For MacBook Retina 12" (A1534 / Early 2015 / Early 2016 / Mid 2017) (Used OEM Pull: Grade B) (Silver)',
        'price' => 218.75,
        'category' => 'MacBook Retina 12" Parts (2015-2017)',
        'stock_quantity' => 8
    ],
    [
        'name' => 'Complete LCD Display Assembly Compatible For MacBook Retina 12" (A1534 / Early 2015 / Early 2016 / Mid 2017) (Used OEM Pull: Grade B) (Space Gray)',
        'description' => 'Complete LCD Display Assembly Compatible For MacBook Retina 12" (A1534 / Early 2015 / Early 2016 / Mid 2017) (Used OEM Pull: Grade B) (Space Gray)',
        'price' => 220.03,
        'category' => 'MacBook Retina 12" Parts (2015-2017)',
        'stock_quantity' => 8
    ],
    [
        'name' => 'Complete LCD Display Assembly Compatible For MacBook Retina 12" (A1534 / Early 2015) (Used OEM Pull: Grade B) (Silver)',
        'description' => 'Complete LCD Display Assembly Compatible For MacBook Retina 12" (A1534 / Early 2015) (Used OEM Pull: Grade B) (Silver)',
        'price' => 220.03,
        'category' => 'MacBook Retina 12" Parts (2015-2017)',
        'stock_quantity' => 8
    ],
    [
        'name' => 'Complete LCD Display Assembly Compatible For MacBook Retina 12" (A1534 / Early 2015 / Early 2016 / Mid 2017) (Used OEM Pull: Grade B) (Gold)',
        'description' => 'Complete LCD Display Assembly Compatible For MacBook Retina 12" (A1534 / Early 2015 / Early 2016 / Mid 2017) (Used OEM Pull: Grade B) (Gold)',
        'price' => 237.06,
        'category' => 'MacBook Retina 12" Parts (2015-2017)',
        'stock_quantity' => 6
    ],
    [
        'name' => 'Complete LCD Display Assembly Compatible For MacBook Retina 12" (A1534 / Early 2015 / Early 2016 / Mid 2017) (Used OEM Pull: Grade B) (Rose Gold)',
        'description' => 'Complete LCD Display Assembly Compatible For MacBook Retina 12" (A1534 / Early 2015 / Early 2016 / Mid 2017) (Used OEM Pull: Grade B) (Rose Gold)',
        'price' => 237.78,
        'category' => 'MacBook Retina 12" Parts (2015-2017)',
        'stock_quantity' => 6
    ],
    [
        'name' => 'Complete LCD Display Assembly Compatible For MacBook Retina 12" (A1534 / Early 2015) (Used OEM Pull: Grade B) (Space Gray)',
        'description' => 'Complete LCD Display Assembly Compatible For MacBook Retina 12" (A1534 / Early 2015) (Used OEM Pull: Grade B) (Space Gray)',
        'price' => 265.45,
        'category' => 'MacBook Retina 12" Parts (2015-2017)',
        'stock_quantity' => 5
    ],
    [
        'name' => 'Complete LCD Display Assembly Compatible For MacBook Retina 12" (A1534 / Early 2015 / Early 2016 / Mid 2017) (Used OEM Pull: Grade A) (Gold)',
        'description' => 'Complete LCD Display Assembly Compatible For MacBook Retina 12" (A1534 / Early 2015 / Early 2016 / Mid 2017) (Used OEM Pull: Grade A) (Gold)',
        'price' => 228.15,
        'category' => 'MacBook Retina 12" Parts (2015-2017)',
        'stock_quantity' => 8
    ],
    [
        'name' => 'Complete LCD Display Assembly Compatible For MacBook Retina 12" (A1534 / Early 2015 / Early 2016 / Mid 2017) (Used OEM Pull: Grade A) (Silver)',
        'description' => 'Complete LCD Display Assembly Compatible For MacBook Retina 12" (A1534 / Early 2015 / Early 2016 / Mid 2017) (Used OEM Pull: Grade A) (Silver)',
        'price' => 228.15,
        'category' => 'MacBook Retina 12" Parts (2015-2017)',
        'stock_quantity' => 8
    ],
    [
        'name' => 'Complete LCD Display Assembly Compatible For MacBook Retina 12" (A1534 / Early 2015 / Early 2016 / Mid 2017) (Used OEM Pull: Grade A) (Space Gray)',
        'description' => 'Complete LCD Display Assembly Compatible For MacBook Retina 12" (A1534 / Early 2015 / Early 2016 / Mid 2017) (Used OEM Pull: Grade A) (Space Gray)',
        'price' => 228.15,
        'category' => 'MacBook Retina 12" Parts (2015-2017)',
        'stock_quantity' => 8
    ],
    [
        'name' => 'Complete LCD Display Assembly Compatible For MacBook Retina 12" (A1534 / Early 2015) (Used OEM Pull: Grade A) (Space Gray)',
        'description' => 'Complete LCD Display Assembly Compatible For MacBook Retina 12" (A1534 / Early 2015) (Used OEM Pull: Grade A) (Space Gray)',
        'price' => 242.92,
        'category' => 'MacBook Retina 12" Parts (2015-2017)',
        'stock_quantity' => 8
    ],
    [
        'name' => 'Complete LCD Display Assembly Compatible For MacBook Retina 12" (A1534 / Early 2015) (Used OEM Pull: Grade A) (Gold)',
        'description' => 'Complete LCD Display Assembly Compatible For MacBook Retina 12" (A1534 / Early 2015) (Used OEM Pull: Grade A) (Gold)',
        'price' => 244.41,
        'category' => 'MacBook Retina 12" Parts (2015-2017)',
        'stock_quantity' => 6
    ],
    [
        'name' => 'Complete LCD Display Assembly Compatible For MacBook Retina 12" (A1534 / Early 2015) (Used OEM Pull: Grade A) (Silver)',
        'description' => 'Complete LCD Display Assembly Compatible For MacBook Retina 12" (A1534 / Early 2015) (Used OEM Pull: Grade A) (Silver)',
        'price' => 364.93,
        'category' => 'MacBook Retina 12" Parts (2015-2017)',
        'stock_quantity' => 4
    ],
    [
        'name' => 'Battery (A1705) Compatible For MacBook Retina 12" (A1534 Early 2016 / Mid 2017)',
        'description' => 'Battery (A1705) Compatible For MacBook Retina 12" (A1534 Early 2016 / Mid 2017)',
        'price' => 65.94,
        'category' => 'MacBook Retina 12" Parts (2015-2017)',
        'stock_quantity' => 15
    ],
    [
        'name' => 'Battery (A1527) Compatible For MacBook Retina 12" (A1534 Early 2015)',
        'description' => 'Battery (A1527) Compatible For MacBook Retina 12" (A1534 Early 2015)',
        'price' => 67.53,
        'category' => 'MacBook Retina 12" Parts (2015-2017)',
        'stock_quantity' => 15
    ],
    [
        'name' => 'Complete LCD Display Assembly Compatible For MacBook Retina 12" (A1534 / Early 2015 / Early 2016 / Mid 2017) (Used OEM Pull: Grade C) (Gold)',
        'description' => 'Complete LCD Display Assembly Compatible For MacBook Retina 12" (A1534 / Early 2015 / Early 2016 / Mid 2017) (Used OEM Pull: Grade C) (Gold)',
        'price' => 173.61,
        'category' => 'MacBook Retina 12" Parts (2015-2017)',
        'stock_quantity' => 3
    ],
    [
        'name' => 'Top Case With Keyboard Compatible For MacBook Retina 12" (A1534 / Early 2015) (US English) (Used OEM Pull: Grade A) (Silver)',
        'description' => 'Top Case With Keyboard Compatible For MacBook Retina 12" (A1534 / Early 2015) (US English) (Used OEM Pull: Grade A) (Silver)',
        'price' => 15.81,
        'category' => 'MacBook Retina 12" Parts (2015-2017)',
        'stock_quantity' => 12
    ],
    [
        'name' => 'Top Case with Keyboard and Microphone Compatible For MacBook Retina 12" (A1534 / Early 2015) (Space Gray) (US English) (Used OEM Pull: Cosmetic Grade: A)',
        'description' => 'Top Case With Keyboard And Microphone Compatible For MacBook Retina 12" (A1534 / Early 2015) (US English) (Used OEM Pull: Cosmetic Grade: A) (Space Gray)',
        'price' => 36.92,
        'category' => 'MacBook Retina 12" Parts (2015-2017)',
        'stock_quantity' => 10
    ],
    [
        'name' => 'Top Case With Keyboard And Microphone Compatible For MacBook Retina 12" (A1534 / Early 2016 / Mid 2017) (US English) (Used OEM Pull: Grade New) (Space Gray)',
        'description' => 'Top Case With Keyboard And Microphone Compatible For MacBook Retina 12" (A1534 / Early 2016 / Mid 2017) (US English) (Used OEM Pull: Grade New) (Space Gray)',
        'price' => 69.56,
        'category' => 'MacBook Retina 12" Parts (2015-2017)',
        'stock_quantity' => 8
    ],
    [
        'name' => 'Top Case With Keyboard And Microphone Compatible For MacBook Retina 12" (A1534 / Early 2016 / Mid 2017) (US English) (Used OEM Pull: Grade New) (Gold)',
        'description' => 'Top Case With Keyboard And Microphone Compatible For MacBook Retina 12" (A1534 / Early 2016 / Mid 2017) (US English) (Used OEM Pull: Grade New) (Gold)',
        'price' => 74.37,
        'category' => 'MacBook Retina 12" Parts (2015-2017)',
        'stock_quantity' => 8
    ],
    [
        'name' => 'Top Case With Keyboard And Microphone Compatible For MacBook Retina 12" (A1534 / Early 2016 / Mid 2017) (US English) (Used OEM Pull: Grade New) (Silver)',
        'description' => 'Top Case With Keyboard And Microphone Compatible For MacBook Retina 12" (A1534 / Early 2016 / Mid 2017) (US English) (Used OEM Pull: Grade New) (Silver)',
        'price' => 76.88,
        'category' => 'MacBook Retina 12" Parts (2015-2017)',
        'stock_quantity' => 8
    ],
    [
        'name' => 'Top Case With Keyboard And Microphone Compatible For MacBook Retina 12" (A1534 / Early 2015) (US English) (Used OEM Pull: Grade New) (Space Gray)',
        'description' => 'Top Case With Keyboard And Microphone Compatible For MacBook Retina 12" (A1534 / Early 2015) (US English) (Used OEM Pull: Grade New) (Space Gray)',
        'price' => 79.25,
        'category' => 'MacBook Retina 12" Parts (2015-2017)',
        'stock_quantity' => 8
    ],
    [
        'name' => 'Top Case With Keyboard And Microphone Compatible For MacBook Retina 12" (A1534 / Early 2015) (US English) (Used OEM Pull: Grade New) (Silver)',
        'description' => 'Top Case With Keyboard And Microphone Compatible For MacBook Retina 12" (A1534 / Early 2015) (US English) (Used OEM Pull: Grade New) (Silver)',
        'price' => 79.25,
        'category' => 'MacBook Retina 12" Parts (2015-2017)',
        'stock_quantity' => 8
    ],
    [
        'name' => 'Top Case With Keyboard And Microphone Compatible For MacBook Retina 12" (A1534 / Early 2015) (US English) (Used OEM Pull: Grade New) (Gold)',
        'description' => 'Top Case With Keyboard And Microphone Compatible For MacBook Retina 12" (A1534 / Early 2015) (US English) (Used OEM Pull: Grade New) (Gold)',
        'price' => 87.40,
        'category' => 'MacBook Retina 12" Parts (2015-2017)',
        'stock_quantity' => 6
    ],
    [
        'name' => 'Top Case With Keyboard And Microphone Compatible For MacBook Retina 12" (A1534 / Early 2016 / Mid 2017) (US English) (Used OEM Pull: Grade New) (Rose Gold)',
        'description' => 'Top Case With Keyboard And Microphone Compatible For MacBook Retina 12" (A1534 / Early 2016 / Mid 2017) (US English) (Used OEM Pull: Grade New) (Rose Gold)',
        'price' => 89.56,
        'category' => 'MacBook Retina 12" Parts (2015-2017)',
        'stock_quantity' => 6
    ],
    [
        'name' => 'Top Case With Keyboard And Microphone Compatible For MacBook Retina 12" (A1534 / Early 2016 / Mid 2017) (UK English) (Used OEM Pull: Grade New) (Space Gray)',
        'description' => 'Top Case With Keyboard And Microphone Compatible For MacBook Retina 12" (A1534 / Early 2016 / Mid 2017) (UK English) (Used OEM Pull: Grade New) (Space Gray)',
        'price' => 98.41,
        'category' => 'MacBook Retina 12" Parts (2015-2017)',
        'stock_quantity' => 6
    ],
    [
        'name' => 'Display Bottom Glass Bezel Strip (Without Logo) Compatible For MacBook Retina 12" (A1534) (10 Pack)',
        'description' => 'Display Bottom Glass Bezel Strip (Without Logo) Compatible For MacBook Retina 12" (A1534) (10 Pack)',
        'price' => 5.15,
        'category' => 'MacBook Retina 12" Parts (2015-2017)',
        'stock_quantity' => 5
    ],
    [
        'name' => 'Bottom Case Compatible For MacBook Retina 12" (A1534 / Early 2015) (Rose Gold)',
        'description' => 'Bottom Case Compatible For MacBook Retina 12" (A1534 / Early 2015) (Rose Gold)',
        'price' => 5.43,
        'category' => 'MacBook Retina 12" Parts (2015-2017)',
        'stock_quantity' => 12
    ],
    [
        'name' => 'Bottom Case Compatible For MacBook Retina 12" (A1534 / Early 2015) (Space Gray)',
        'description' => 'Bottom Case Compatible For MacBook Retina 12" (A1534 / Early 2015) (Space Gray)',
        'price' => 6.67,
        'category' => 'MacBook Retina 12" Parts (2015-2017)',
        'stock_quantity' => 12
    ],
    [
        'name' => 'Bottom Case Compatible For MacBook Retina 12" (A1534 / Early 2015) (Gold)',
        'description' => 'Bottom Case Compatible For MacBook Retina 12" (A1534 / Early 2015) (Gold)',
        'price' => 6.67,
        'category' => 'MacBook Retina 12" Parts (2015-2017)',
        'stock_quantity' => 12
    ],
    [
        'name' => 'Bottom Case With Battery (A1527) Compatible For MacBook Retina 12" (A1534 / Early 2015) (Silver)',
        'description' => 'Bottom Case With Battery (A1527) Compatible For MacBook Retina 12" (A1534 / Early 2015) (Silver)',
        'price' => 93.52,
        'category' => 'MacBook Retina 12" Parts (2015-2017)',
        'stock_quantity' => 8
    ],
    [
        'name' => 'Bottom Case Compatible For MacBook Retina 12" (A1534 / Early 2015) (Silver)',
        'description' => 'Bottom Case Compatible For MacBook Retina 12" (A1534 / Early 2015) (Silver)',
        'price' => 96.13,
        'category' => 'MacBook Retina 12" Parts (2015-2017)',
        'stock_quantity' => 12
    ],
    [
        'name' => 'Bottom Case With Battery (A1527) Compatible For MacBook Retina 12" (A1534 / Early 2015) (Space Gray)',
        'description' => 'Bottom Case With Battery (A1527) Compatible For MacBook Retina 12" (A1534 / Early 2015) (Space Gray)',
        'price' => 96.37,
        'category' => 'MacBook Retina 12" Parts (2015-2017)',
        'stock_quantity' => 8
    ],
    [
        'name' => 'Bottom Case With Battery (A1705) Compatible For MacBook Retina 12" (A1534 / Early 2016 / Mid 2017) (Gold)',
        'description' => 'Bottom Case With Battery (A1705) Compatible For MacBook Retina 12" (A1534 / Early 2016 / Mid 2017) (Gold)',
        'price' => 100.44,
        'category' => 'MacBook Retina 12" Parts (2015-2017)',
        'stock_quantity' => 8
    ],
    [
        'name' => 'Bottom Case With Battery (A1705) Compatible For MacBook Retina 12" (A1534 / Early 2016 / Mid 2017) (Rose Gold)',
        'description' => 'Bottom Case With Battery (A1705) Compatible For MacBook Retina 12" (A1534 / Early 2016 / Mid 2017) (Rose Gold)',
        'price' => 101.08,
        'category' => 'MacBook Retina 12" Parts (2015-2017)',
        'stock_quantity' => 8
    ],
    [
        'name' => 'Bottom Case With Battery (A1705) Compatible For MacBook Retina 12" (A1534 / Early 2016 / Mid 2017) (Silver)',
        'description' => 'Bottom Case With Battery (A1705) Compatible For MacBook Retina 12" (A1534 / Early 2016 / Mid 2017) (Silver)',
        'price' => 104.04,
        'category' => 'MacBook Retina 12" Parts (2015-2017)',
        'stock_quantity' => 8
    ],
    [
        'name' => 'Bottom Case With Battery (A1705) Compatible For MacBook Retina 12" (A1534 / Early 2016 / Mid 2017) (Space Gray)',
        'description' => 'Bottom Case With Battery (A1705) Compatible For MacBook Retina 12" (A1534 / Early 2016 / Mid 2017) (Space Gray)',
        'price' => 130.29,
        'category' => 'MacBook Retina 12" Parts (2015-2017)',
        'stock_quantity' => 6
    ],
    [
        'name' => 'Trackpad Flex Cable Compatible For MacBook Retina 12" (A1534 / Early 2015 / Early 2016 / Mid 2017)',
        'description' => 'Trackpad Flex Cable Compatible For MacBook Retina 12" (A1534 / Early 2015 / Early 2016 / Mid 2017)',
        'price' => 3.80,
        'category' => 'MacBook Retina 12" Parts (2015-2017)',
        'stock_quantity' => 15
    ],
    [
        'name' => 'Trackpad Compatible For MacBook Retina 12" (A1534 / Early 2016 / Mid 2017) (Space Gray)',
        'description' => 'Trackpad Compatible For MacBook Retina 12" (A1534 / Early 2016 / Mid 2017) (Space Gray)',
        'price' => 17.96,
        'category' => 'MacBook Retina 12" Parts (2015-2017)',
        'stock_quantity' => 10
    ],
    [
        'name' => 'Trackpad Compatible For MacBook Retina 12" (A1534 / Early 2016 / Mid 2017) (Gold)',
        'description' => 'Trackpad Compatible For MacBook Retina 12" (A1534 / Early 2016 / Mid 2017) (Gold)',
        'price' => 18.59,
        'category' => 'MacBook Retina 12" Parts (2015-2017)',
        'stock_quantity' => 10
    ],
    [
        'name' => 'Trackpad Compatible For MacBook Retina 12" (A1534 / Early 2015) (Gold)',
        'description' => 'Trackpad Compatible For MacBook Retina 12" (A1534 / Early 2015) (Gold)',
        'price' => 19.92,
        'category' => 'MacBook Retina 12" Parts (2015-2017)',
        'stock_quantity' => 10
    ],
    [
        'name' => 'Trackpad Compatible For MacBook Retina 12" (A1534 / Early 2016 / Mid 2017) (Silver)',
        'description' => 'Trackpad Compatible For MacBook Retina 12" (A1534 / Early 2016 / Mid 2017) (Silver)',
        'price' => 20.29,
        'category' => 'MacBook Retina 12" Parts (2015-2017)',
        'stock_quantity' => 10
    ],
    [
        'name' => 'Trackpad Compatible For MacBook Retina 12" (A1534 / Early 2016 / Mid 2017) (Rose Gold)',
        'description' => 'Trackpad Compatible For MacBook Retina 12" (A1534 / Early 2016 / Mid 2017) (Rose Gold)',
        'price' => 21.07,
        'category' => 'MacBook Retina 12" Parts (2015-2017)',
        'stock_quantity' => 10
    ],
    [
        'name' => 'Trackpad Compatible For MacBook Retina 12" (A1534 / Early 2015) (Space Gray)',
        'description' => 'Trackpad Compatible For MacBook Retina 12" (A1534 / Early 2015) (Space Gray)',
        'price' => 24.19,
        'category' => 'MacBook Retina 12" Parts (2015-2017)',
        'stock_quantity' => 10
    ],
    [
        'name' => 'Trackpad Compatible For MacBook Retina 12" (A1534 / Early 2015) (Silver)',
        'description' => 'Trackpad Compatible For MacBook Retina 12" (A1534 / Early 2015) (Silver)',
        'price' => 26.60,
        'category' => 'MacBook Retina 12" Parts (2015-2017)',
        'stock_quantity' => 10
    ],
    [
        'name' => 'Keyboard Backlight Compatible For MacBook Retina 12" (A1534)',
        'description' => 'Keyboard Backlight Compatible For MacBook Retina 12" (A1534)',
        'price' => 1.22,
        'category' => 'MacBook Retina 12" Parts (2015-2017)',
        'stock_quantity' => 20
    ],
    [
        'name' => 'Keyboard To Input Device (IPD) Flex Cable Compatible For MacBook Retina 12" (A1534 / Early 2015 / Early 2016 / Mid 2017)',
        'description' => 'Keyboard To Input Device (IPD) Flex Cable Compatible For MacBook Retina 12" (A1534 / Early 2015 / Early 2016 / Mid 2017)',
        'price' => 3.75,
        'category' => 'MacBook Retina 12" Parts (2015-2017)',
        'stock_quantity' => 15
    ],
    [
        'name' => 'Keyboard Only Compatible For MacBook Retina 12" (A1534 / Early 2015) (US English)',
        'description' => 'Keyboard Only Compatible For MacBook Retina 12" (A1534 / Early 2015) (US English)',
        'price' => 60.09,
        'category' => 'MacBook Retina 12" Parts (2015-2017)',
        'stock_quantity' => 8
    ],
    [
        'name' => 'Keyboard Only Compatible For MacBook Retina 12" (A1534 / Early 2016 / Mid 2017) (UK English)',
        'description' => 'Keyboard Only Compatible For MacBook Retina 12" (A1534 / Early 2016 / Mid 2017) (UK English)',
        'price' => 65.14,
        'category' => 'MacBook Retina 12" Parts (2015-2017)',
        'stock_quantity' => 8
    ],
    [
        'name' => 'Keyboard Only Compatible For MacBook Retina 12" (A1534 / Early 2016 / Mid 2017) (US English)',
        'description' => 'Keyboard Only Compatible For MacBook Retina 12" (A1534 / Early 2016 / Mid 2017) (US English)',
        'price' => 68.31,
        'category' => 'MacBook Retina 12" Parts (2015-2017)',
        'stock_quantity' => 8
    ],
    [
        'name' => 'Display Bottom Plastic Bezel Strip (Without Logo) Compatible For MacBook Retina 12" (A1534) (9 Pack)',
        'description' => 'Display Bottom Plastic Bezel Strip (Without Logo) Compatible For MacBook Retina 12" (A1534) (9 Pack)',
        'price' => 4.81,
        'category' => 'MacBook Retina 12" Parts (2015-2017)',
        'stock_quantity' => 5
    ],
    [
        'name' => 'I/O Flex Cable Cowling Compatible For MacBook Retina 12" (A1534 / Early 2015)',
        'description' => 'I/O Flex Cable Cowling Compatible For MacBook Retina 12" (A1534 / Early 2015)',
        'price' => 2.09,
        'category' => 'MacBook Retina 12" Parts (2015-2017)',
        'stock_quantity' => 15
    ],
    [
        'name' => 'Audio Board Flex Cable Compatible For MacBook Retina 12" (A1534 / Early 2015 / Early 2016 / Mid 2017)',
        'description' => 'Audio Board Flex Cable Compatible For MacBook Retina 12" (A1534 / Early 2015 / Early 2016 / Mid 2017)',
        'price' => 3.30,
        'category' => 'MacBook Retina 12" Parts (2015-2017)',
        'stock_quantity' => 15
    ],
    [
        'name' => 'USB-C I/O Board Flex Cable Compatible For MacBook Retina 12" (A1534 / Early 2015)',
        'description' => 'USB-C I/O Board Flex Cable Compatible For MacBook Retina 12" (A1534 / Early 2015)',
        'price' => 5.47,
        'category' => 'MacBook Retina 12" Parts (2015-2017)',
        'stock_quantity' => 12
    ],
    [
        'name' => 'Audio Board Compatible For MacBook Retina 12" (A1534 / Early 2015 / Early 2016 / Mid 2017) (Silver)',
        'description' => 'Audio Board Compatible For MacBook Retina 12" (A1534 / Early 2015 / Early 2016 / Mid 2017) (Silver)',
        'price' => 15.37,
        'category' => 'MacBook Retina 12" Parts (2015-2017)',
        'stock_quantity' => 10
    ],
    [
        'name' => 'USB-C I/O Connector Board Compatible For MacBook Retina 12" (A1534 / Early 2015)',
        'description' => 'USB-C I/O Connector Board Compatible For MacBook Retina 12" (A1534 / Early 2015)',
        'price' => 18.94,
        'category' => 'MacBook Retina 12" Parts (2015-2017)',
        'stock_quantity' => 10
    ],
    [
        'name' => 'Audio Board Compatible For MacBook Retina 12" (A1534 / Early 2015 / Early 2016 / Mid 2017) (Space Gray)',
        'description' => 'Audio Board Compatible For MacBook Retina 12" (A1534 / Early 2015 / Early 2016 / Mid 2017) (Space Gray)',
        'price' => 19.35,
        'category' => 'MacBook Retina 12" Parts (2015-2017)',
        'stock_quantity' => 10
    ],
    [
        'name' => 'USB-C I/O Board Flex Cable (Charging Port Pre-Soldered) Compatible For MacBook Retina 12" (A1534 / Mid 2017)',
        'description' => 'USB-C I/O Board Flex Cable (Charging Port Pre-Soldered) Compatible For MacBook Retina 12" (A1534 / Mid 2017)',
        'price' => 51.80,
        'category' => 'MacBook Retina 12" Parts (2015-2017)',
        'stock_quantity' => 8
    ],
    [
        'name' => 'LCD TCON Board Flex Cable Compatible For MacBook Retina 12" (A1534 / Early 2015 / Early 2016 / Mid 2017)',
        'description' => 'LCD TCON Board Flex Cable Compatible For MacBook Retina 12" (A1534 / Early 2015 / Early 2016 / Mid 2017)',
        'price' => 3.77,
        'category' => 'MacBook Retina 12" Parts (2015-2017)',
        'stock_quantity' => 12
    ],
    [
        'name' => 'Right Loudspeaker Compatible For MacBook Retina 12" (A1534 / Early 2015 / Early 2016 / Mid 2017)',
        'description' => 'Right Loudspeaker Compatible For MacBook Retina 12" (A1534 / Early 2015 / Early 2016 / Mid 2017)',
        'price' => 0.63,
        'category' => 'MacBook Retina 12" Parts (2015-2017)',
        'stock_quantity' => 15
    ],
    [
        'name' => 'Left & Right Loudspeaker Compatible For MacBook Retina 12" (A1534 / Early 2015 / Early 2016 / Mid 2017)',
        'description' => 'Left & Right Loudspeaker Compatible For MacBook Retina 12" (A1534 / Early 2015 / Early 2016 / Mid 2017)',
        'price' => 4.44,
        'category' => 'MacBook Retina 12" Parts (2015-2017)',
        'stock_quantity' => 12
    ],
    [
        'name' => 'TPU Screen Protector Compatible For MacBook Retina 12" (A1534) (2015 / 2016 / 2017) (10 Pack)',
        'description' => 'TPU Screen Protector Compatible For MacBook Retina 12" (A1534) (2015 / 2016 / 2017) (10 Pack)',
        'price' => 9.11,
        'category' => 'MacBook Retina 12" Parts (2015-2017)',
        'stock_quantity' => 10
    ],
    [
        'name' => 'Keyboard Screws Compatible For MacBook Retina 12" (A1534)',
        'description' => 'Keyboard Screws Compatible For MacBook Retina 12" (A1534)',
        'price' => 1.55,
        'category' => 'MacBook Retina 12" Parts (2015-2017)',
        'stock_quantity' => 20
    ],
    [
        'name' => 'Hinge Screws (Torx T8) Compatible For MacBook Retina 12" (A1534 / Early 2015 / Early 2016 / Mid 2017)',
        'description' => 'Hinge Screws (Torx T8) Compatible For MacBook Retina 12" (A1534 / Early 2015 / Early 2016 / Mid 2017)',
        'price' => 1.69,
        'category' => 'MacBook Retina 12" Parts (2015-2017)',
        'stock_quantity' => 15
    ],
    [
        'name' => 'Bottom Case Screws (Pentalobe P5) Compatible For MacBook Retina 12" (A1534) (Space Gray)',
        'description' => 'Bottom Case Screws (Pentalobe P5) Compatible For MacBook Retina 12" (A1534) (Space Gray)',
        'price' => 2.80,
        'category' => 'MacBook Retina 12" Parts (2015-2017)',
        'stock_quantity' => 15
    ],
    [
        'name' => 'Bottom Case Screws (Pentalobe P5) Compatible For MacBook Retina 12" (A1534) (Gold)',
        'description' => 'Bottom Case Screws (Pentalobe P5) Compatible For MacBook Retina 12" (A1534) (Gold)',
        'price' => 3.61,
        'category' => 'MacBook Retina 12" Parts (2015-2017)',
        'stock_quantity' => 15
    ],
    [
        'name' => 'Bottom Case Screws (Pentalobe P5) Compatible For MacBook Retina 12" (A1534) (Silver)',
        'description' => 'Bottom Case Screws (Pentalobe P5) Compatible For MacBook Retina 12" (A1534) (Silver)',
        'price' => 3.80,
        'category' => 'MacBook Retina 12" Parts (2015-2017)',
        'stock_quantity' => 15
    ],
    [
        'name' => 'Bottom Case Screws (Pentalobe P5) Compatible For MacBook Retina 12" (A1534) (Rose Gold)',
        'description' => 'Bottom Case Screws (Pentalobe P5) Compatible For MacBook Retina 12" (A1534) (Rose Gold)',
        'price' => 3.86,
        'category' => 'MacBook Retina 12" Parts (2015-2017)',
        'stock_quantity' => 15
    ],
    [
        'name' => 'Clutch Cover Compatible For MacBook Retina 12" (A1534 / Early 2015 / Early 2016 / Mid 2017)',
        'description' => 'Clutch Cover Compatible For MacBook Retina 12" (A1534 / Early 2015 / Early 2016 / Mid 2017)',
        'price' => 3.28,
        'category' => 'MacBook Retina 12" Parts (2015-2017)',
        'stock_quantity' => 12
    ],
    [
        'name' => 'Display Gasket Compatible For MacBook Retina 12" (A1534 / Early 2015 / Early 2016 / Mid 2017)',
        'description' => 'Display Gasket Compatible For MacBook Retina 12" (A1534 / Early 2015 / Early 2016 / Mid 2017)',
        'price' => 3.98,
        'category' => 'MacBook Retina 12" Parts (2015-2017)',
        'stock_quantity' => 20
    ]
];

// Insert parts into Supabase
$insertedCount = 0;
$errors = [];

foreach ($macbookRetina12A1534Parts as $part) {
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
echo "Total parts processed: " . count($macbookRetina12A1534Parts) . "\n";
echo "Successfully inserted: $insertedCount\n";
echo "Errors: " . count($errors) . "\n";

if (!empty($errors)) {
    echo "\n=== Errors ===\n";
    foreach ($errors as $error) {
        echo $error . "\n";
    }
}

echo "\nMacBook Retina 12 A1534 parts population completed!\n";
