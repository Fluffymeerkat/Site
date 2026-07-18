<?php
declare(strict_types=1);

header('Content-Type: application/json');

$targetDirectory = __DIR__ . DIRECTORY_SEPARATOR . 'assets' . DIRECTORY_SEPARATOR . 'futaventura';
$maxFileSize = 10 * 1024 * 1024; // 10MB

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed.']);
    exit;
}

if (!isset($_FILES['image']) || !is_array($_FILES['image'])) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'No image uploaded.']);
    exit;
}

$image = $_FILES['image'];
if (($image['error'] ?? UPLOAD_ERR_NO_FILE) !== UPLOAD_ERR_OK) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Image upload failed.']);
    exit;
}

if (($image['size'] ?? 0) > $maxFileSize) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Image is too large (max 10MB).']);
    exit;
}

$tmpName = $image['tmp_name'] ?? '';
if (!is_uploaded_file($tmpName)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Invalid upload source.']);
    exit;
}

$finfo = new finfo(FILEINFO_MIME_TYPE);
$mimeType = $finfo->file($tmpName);
$allowedMimeTypes = [
    'image/jpeg' => 'jpg',
    'image/png' => 'png',
    'image/webp' => 'webp',
    'image/gif' => 'gif'
];

if (!isset($allowedMimeTypes[$mimeType])) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Only JPG, PNG, WEBP, or GIF images are allowed.']);
    exit;
}

if (!is_dir($targetDirectory) && !mkdir($targetDirectory, 0755, true) && !is_dir($targetDirectory)) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Failed to create upload directory.']);
    exit;
}

$extension = $allowedMimeTypes[$mimeType];
$baseName = pathinfo((string) ($image['name'] ?? 'upload'), PATHINFO_FILENAME);
$sanitizedBaseName = preg_replace('/[^a-zA-Z0-9_-]/', '-', $baseName) ?: 'image';
$finalName = $sanitizedBaseName . '-' . date('Ymd-His') . '-' . bin2hex(random_bytes(3)) . '.' . $extension;
$targetPath = $targetDirectory . DIRECTORY_SEPARATOR . $finalName;

if (!move_uploaded_file($tmpName, $targetPath)) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Failed to save image.']);
    exit;
}

echo json_encode(['success' => true, 'message' => 'Image uploaded successfully.']);
