<?php
declare(strict_types=1);

require_once __DIR__ . '/bootstrap.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    json_response(405, ['ok' => false, 'message' => 'Method not allowed.']);
}

$rawBody = file_get_contents('php://input');
$payload = json_decode($rawBody ?: '', true);
if (!is_array($payload)) {
    $payload = $_POST;
}
if (!is_array($payload)) {
    $payload = [];
}

/* ----------------------------- Honeypot ----------------------------- */

if (trim((string) ($payload['website'] ?? '')) !== '') {
    // Pretend success so bots do not learn the trap.
    json_response(200, ['ok' => true]);
}

/* ---------------------------- Validation ---------------------------- */

function text_length(string $value): int
{
    return function_exists('mb_strlen') ? mb_strlen($value, 'UTF-8') : strlen($value);
}

$errors = [];

$name = trim((string) ($payload['name'] ?? ''));
if (text_length($name) < 2 || text_length($name) > 120) {
    $errors['name'] = 'Please enter your full name.';
}

$email = trim((string) ($payload['email'] ?? ''));
if (!filter_var($email, FILTER_VALIDATE_EMAIL) || text_length($email) > 190) {
    $errors['email'] = 'Please enter a valid email address.';
}

$phone = trim((string) ($payload['phone'] ?? ''));
if (text_length($phone) > 40) {
    $errors['phone'] = 'Please enter a valid phone number.';
}

$subjectLine = trim((string) ($payload['subject'] ?? ''));
if ($subjectLine === '' || text_length($subjectLine) > 120) {
    $errors['subject'] = 'Please choose an event type.';
}

$eventDate = trim((string) ($payload['eventDate'] ?? ''));
if (text_length($eventDate) > 40) {
    $errors['eventDate'] = 'Please choose a valid event date.';
}

$guestCount = trim((string) ($payload['guestCount'] ?? ''));
if (
    $guestCount === ''
    || !ctype_digit($guestCount)
    || (int) $guestCount < 1
    || (int) $guestCount > 2000
) {
    $errors['guestCount'] = 'Enter an estimated guest count between 1 and 2,000.';
}

$budget = trim((string) ($payload['budget'] ?? ''));
if (text_length($budget) > 60) {
    $errors['budget'] = 'Please shorten the budget field.';
}

$message = trim((string) ($payload['message'] ?? ''));
if (text_length($message) > 3000) {
    $errors['message'] = 'Please shorten your message.';
}

$reference = strtoupper(trim((string) ($payload['reference'] ?? '')));
if ($reference === '' || !preg_match('/^BCC-[A-Z0-9]{4,12}$/', $reference)) {
    $alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    $reference = 'BCC-';
    for ($i = 0; $i < 6; $i++) {
        $reference .= $alphabet[random_int(0, strlen($alphabet) - 1)];
    }
}

if ($errors !== []) {
    json_response(422, [
        'ok' => false,
        'message' => 'Please check the form and try again.',
        'errors' => $errors,
    ]);
}

/* ---------------------------- Mail config --------------------------- */

$fromAddress = env('MAIL_FROM_ADDRESS', env('MAIL_USERNAME'));
$fromName = env('MAIL_FROM_NAME', 'Beldi Country Club');
$adminEmail = env('ADMIN_EMAIL');
$adminName = env('ADMIN_NAME', env('ADMIN_FROM_NAME', $fromName));
$smtpUsername = env('MAIL_USERNAME');
$smtpPassword = env('MAIL_PASSWORD');

if (
    $fromAddress === ''
    || $smtpUsername === ''
    || $smtpPassword === ''
    || !filter_var($adminEmail, FILTER_VALIDATE_EMAIL)
) {
    error_log('[inquiry] Mail configuration is incomplete.');
    json_response(503, [
        'ok' => false,
        'message' => 'The form is not available right now. Please contact us directly.',
    ]);
}

/* ------------------------------ Data -------------------------------- */

$nameParts = preg_split('/\s+/u', $name) ?: [$name];
$firstName = ($nameParts[0] ?? '') !== '' ? $nameParts[0] : $name;

$siteUrl = rtrim(env('SITE_URL', ''), '/');
$whatsappNumber = preg_replace('/\D+/', '', env('WHATSAPP_NUMBER', '')) ?: '';
$whatsappLink = $whatsappNumber !== ''
    ? 'https://wa.me/' . $whatsappNumber
    : '';

$templateData = [
    'name' => $name,
    'firstName' => $firstName,
    'email' => $email,
    'phone' => $phone !== '' ? $phone : 'Not provided',
    'subjectLine' => $subjectLine,
    'eventType' => $subjectLine,
    'eventDate' => $eventDate !== '' ? $eventDate : 'Date to be confirmed',
    'guestCount' => $guestCount,
    'budget' => $budget !== '' ? $budget : 'To be discussed',
    'message' => $message !== '' ? $message : 'No additional details provided.',
    'reference' => $reference,
    'submittedAt' => (new DateTimeImmutable('now'))->format('j F Y, H:i'),
    'ipAddress' => $_SERVER['REMOTE_ADDR'] ?? 'Unknown',
    'siteUrl' => $siteUrl,
    'whatsappLink' => $whatsappLink,
    'year' => date('Y'),
    'brandName' => $fromName,
    'adminEmail' => $adminEmail,
    'adminName' => $adminName,
];

/* ------------------------------ Mailers ----------------------------- */

function make_mailer(string $fromAddress, string $fromName): PHPMailer
{
    $mail = new PHPMailer(true);
    $mail->isSMTP();
    $mail->Host = env('MAIL_HOST', 'smtp.hostinger.com');
    $mail->SMTPAuth = env('MAIL_USERNAME') !== '';
    $mail->Username = env('MAIL_USERNAME');
    $mail->Password = env('MAIL_PASSWORD');
    $mail->SMTPDebug = SMTP::DEBUG_OFF;
    $mail->CharSet = 'UTF-8';
    $mail->Timeout = 20;

    $encryption = strtolower(env('MAIL_ENCRYPTION', 'ssl'));

    if ($encryption === 'tls') {
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $defaultPort = 587;
    } elseif ($encryption === 'none') {
        $mail->SMTPSecure = '';
        $defaultPort = 25;
    } else {
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
        $defaultPort = 465;
    }

    $port = (int) env('MAIL_PORT', (string) $defaultPort);
    $mail->Port = $port > 0 ? $port : $defaultPort;
    $mail->setFrom($fromAddress, $fromName);
    $mail->isHTML(true);

    return $mail;
}

function client_plain_text(array $data): string
{
    return "Thank you, {$data['firstName']}.\n\n"
        . "We have received your wedding inquiry and will reply within 24-48 hours.\n\n"
        . "Reference: {$data['reference']}\n"
        . "Event: {$data['eventType']}\n"
        . "Date: {$data['eventDate']}\n"
        . "Guests: {$data['guestCount']}\n"
        . "Budget: {$data['budget']}\n"
        . ($data['whatsappLink'] !== '' ? "WhatsApp: {$data['whatsappLink']}\n" : '')
        . ($data['siteUrl'] !== '' ? "Website: {$data['siteUrl']}\n" : '');
}

function admin_plain_text(array $data): string
{
    return "New wedding inquiry ({$data['reference']})\n\n"
        . "Name: {$data['name']}\n"
        . "Email: {$data['email']}\n"
        . "Phone: {$data['phone']}\n"
        . "Event: {$data['eventType']}\n"
        . "Date: {$data['eventDate']}\n"
        . "Guests: {$data['guestCount']}\n"
        . "Budget: {$data['budget']}\n"
        . "Submitted: {$data['submittedAt']}\n\n"
        . "Message:\n{$data['message']}\n";
}

$subjectName = str_replace(["\r", "\n"], ' ', $name);
$subjectType = str_replace(["\r", "\n"], ' ', $subjectLine);

/* -------------------------- Admin notification ---------------------- */

try {
    $adminMail = make_mailer($fromAddress, $fromName);
    $adminMail->addAddress($adminEmail, $adminName);
    $adminMail->addReplyTo($email, $subjectName);
    $adminMail->Subject = "New inquiry [{$reference}]: {$subjectType} - {$subjectName}";
    $adminMail->Body = render_template(
        __DIR__ . '/templates/admin-notification.php',
        $templateData
    );
    $adminMail->AltBody = admin_plain_text($templateData);
    $adminMail->send();
} catch (Throwable $exception) {
    error_log('[inquiry] Admin email failed: ' . $exception->getMessage());
    json_response(500, [
        'ok' => false,
        'message' => 'We could not send your request. Please try again or contact us directly.',
    ]);
}

/* --------------------------- Client thank-you ----------------------- */

try {
    $clientMail = make_mailer($fromAddress, $fromName);
    $clientMail->addAddress($email, $subjectName);
    $clientMail->addReplyTo($adminEmail, $adminName);
    $clientMail->Subject = "Thank you for your inquiry — {$fromName}";
    $clientMail->Body = render_template(
        __DIR__ . '/templates/client-thank-you.php',
        $templateData
    );
    $clientMail->AltBody = client_plain_text($templateData);
    $clientMail->send();
} catch (Throwable $exception) {
    // The admin already has the lead; do not block the visitor.
    error_log('[inquiry] Client email failed: ' . $exception->getMessage());
}

json_response(200, [
    'ok' => true,
    'message' => 'Thank you. Your request has been sent.',
    'reference' => $reference,
]);
