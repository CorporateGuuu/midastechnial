<?php
/**
 * Installation script for RepairDesk API Client
 * 
 * This script helps users set up their configuration file
 */

echo "RepairDesk API Client Installation\n";
echo "==================================\n\n";

// Check if config.php already exists
if (file_exists(__DIR__ . '/config.php')) {
    echo "✓ config.php already exists\n";
    echo "Your API client is ready to use!\n";
    exit(0);
}

// Check if config.example.php exists
if (!file_exists(__DIR__ . '/config.example.php')) {
    echo "✗ Error: config.example.php not found\n";
    exit(1);
}

echo "Setting up RepairDesk API Client configuration...\n\n";

// Read the example config
$exampleConfig = file_get_contents(__DIR__ . '/config.example.php');
if ($exampleConfig === false) {
    echo "✗ Error: Could not read config.example.php\n";
    exit(1);
}

// Ask user for API key
echo "Please enter your RepairDesk API key: ";
$apiKey = trim(fgets(STDIN));

if (empty($apiKey)) {
    echo "✗ Error: API key cannot be empty\n";
    exit(1);
}

// Replace placeholder with actual API key
$configContent = str_replace("'your_repairdesk_api_key_here'", "'" . addslashes($apiKey) . "'", $exampleConfig);

// Write the config file
if (file_put_contents(__DIR__ . '/config.php', $configContent) !== false) {
    echo "✓ config.php created successfully!\n";
    echo "✓ API key saved securely\n";
    echo "\nNext steps:\n";
    echo "1. Run 'php test.php' to test your connection\n";
    echo "2. Run 'php example.php' to see usage examples\n";
    echo "3. Check README.md for detailed documentation\n";
} else {
    echo "✗ Error: Could not create config.php\n";
    echo "Please check file permissions or create config.php manually\n";
    exit(1);
}

echo "\nInstallation completed successfully! 🎉\n";
?>
