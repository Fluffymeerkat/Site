<?php
declare(strict_types=1);

header('Content-Type: application/json');

$directory = __DIR__ . DIRECTORY_SEPARATOR . 'assets' . DIRECTORY_SEPARATOR . 'futaventura';
$webDirectory = 'assets/futaventura';

if (!is_dir($directory)) {
    echo json_encode(['images' => []]);
    exit;
}

$allowedExtensions = ['jpg', 'jpeg', 'png', 'webp', 'gif'];
$images = [];

$entries = scandir($directory);
if ($entries === false) {
    http_response_code(500);
    echo json_encode(['images' => []]);
    exit;
}

foreach ($entries as $entry) {
    if ($entry === '.' || $entry === '..') {
        continue;
    }

    $fullPath = $directory . DIRECTORY_SEPARATOR . $entry;
    if (!is_file($fullPath)) {
        continue;
    }

    $extension = strtolower((string) pathinfo($entry, PATHINFO_EXTENSION));
    if (!in_array($extension, $allowedExtensions, true)) {
        continue;
    }

    $images[] = $webDirectory . '/' . rawurlencode($entry);
}

sort($images);
echo json_encode(['images' => $images]);
