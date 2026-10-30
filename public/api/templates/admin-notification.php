<?php
/** @var string $name */
/** @var string $firstName */
/** @var string $email */
/** @var string $phone */
/** @var string $eventType */
/** @var string $eventDate */
/** @var string $guestCount */
/** @var string $budget */
/** @var string $message */
/** @var string $reference */
/** @var string $submittedAt */
/** @var string $ipAddress */
/** @var string $siteUrl */
/** @var string $year */
/** @var string $brandName */
$replySubject = rawurlencode('Re: Your inquiry ' . $reference . ' — ' . $brandName);
$replyLink = 'mailto:' . $email . '?subject=' . $replySubject;
?>
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>New inquiry</title>
</head>
<body style="margin:0;padding:0;background-color:#f2f3f5;font-family:Arial,Helvetica,sans-serif;color:#131516;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f2f3f5;">
    <tr>
      <td align="center" style="padding:28px 12px;">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px;max-width:600px;background-color:#ffffff;border:1px solid #d9dcd6;overflow:hidden;">

          <tr>
            <td style="background-color:#131516;padding:26px 32px;">
              <div style="font-family:Georgia,'Times New Roman',serif;font-size:20px;letter-spacing:0.14em;color:#ffffff;text-transform:uppercase;">
                <?= e($brandName) ?>
              </div>
              <div style="margin-top:6px;font-size:10px;letter-spacing:0.24em;color:#b4c3a0;text-transform:uppercase;">
                New inquiry · <?= e($reference) ?>
              </div>
            </td>
          </tr>

          <tr>
            <td style="padding:30px 40px 6px;">
              <h1 style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:26px;line-height:1.3;font-weight:normal;color:#131516;">
                New inquiry from <?= e($name) ?>
              </h1>
              <p style="margin:8px 0 0;font-size:12px;letter-spacing:0.08em;color:#6b7069;">
                Reference <?= e($reference) ?> · <?= e($submittedAt) ?>
              </p>
            </td>
          </tr>

          <tr>
            <td style="padding:22px 40px 0;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1px solid #d9dcd6;">
                <tr>
                  <td style="padding:10px 14px;font-size:12px;color:#6b7069;border-bottom:1px solid #eceee9;width:32%;">Name</td>
                  <td style="padding:10px 14px;font-size:13px;font-weight:bold;border-bottom:1px solid #eceee9;"><?= e($name) ?></td>
                </tr>
                <tr>
                  <td style="padding:10px 14px;font-size:12px;color:#6b7069;border-bottom:1px solid #eceee9;">Email</td>
                  <td style="padding:10px 14px;font-size:13px;border-bottom:1px solid #eceee9;">
                    <a href="mailto:<?= e($email) ?>" style="color:#131516;"><?= e($email) ?></a>
                  </td>
                </tr>
                <tr>
                  <td style="padding:10px 14px;font-size:12px;color:#6b7069;border-bottom:1px solid #eceee9;">Phone</td>
                  <td style="padding:10px 14px;font-size:13px;border-bottom:1px solid #eceee9;"><?= e($phone) ?></td>
                </tr>
                <tr>
                  <td style="padding:10px 14px;font-size:12px;color:#6b7069;border-bottom:1px solid #eceee9;">Event</td>
                  <td style="padding:10px 14px;font-size:13px;font-weight:bold;border-bottom:1px solid #eceee9;"><?= e($eventType) ?></td>
                </tr>
                <tr>
                  <td style="padding:10px 14px;font-size:12px;color:#6b7069;border-bottom:1px solid #eceee9;">Event date</td>
                  <td style="padding:10px 14px;font-size:13px;border-bottom:1px solid #eceee9;"><?= e($eventDate) ?></td>
                </tr>
                <tr>
                  <td style="padding:10px 14px;font-size:12px;color:#6b7069;border-bottom:1px solid #eceee9;">Guests</td>
                  <td style="padding:10px 14px;font-size:13px;border-bottom:1px solid #eceee9;"><?= e($guestCount) ?></td>
                </tr>
                <tr>
                  <td style="padding:10px 14px;font-size:12px;color:#6b7069;border-bottom:1px solid #eceee9;">Budget</td>
                  <td style="padding:10px 14px;font-size:13px;border-bottom:1px solid #eceee9;"><?= e($budget) ?></td>
                </tr>
                <tr>
                  <td style="padding:10px 14px;font-size:12px;color:#6b7069;">IP</td>
                  <td style="padding:10px 14px;font-size:13px;"><?= e($ipAddress) ?></td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="padding:20px 40px 0;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f7f8f6;border-left:3px solid #6e8458;">
                <tr>
                  <td style="padding:16px 18px;">
                    <span style="display:block;margin-bottom:6px;font-size:10px;letter-spacing:0.16em;text-transform:uppercase;color:#6b7069;">
                      Message
                    </span>
                    <span style="font-size:13px;line-height:1.7;color:#44483f;">
                      <?= nl2br(e($message)) ?>
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td align="center" style="padding:26px 40px 8px;">
              <a href="<?= e($replyLink) ?>" style="display:inline-block;background-color:#131516;color:#ffffff;text-decoration:none;padding:13px 26px;font-size:12px;font-weight:bold;letter-spacing:0.1em;text-transform:uppercase;">
                Reply to <?= e($firstName) ?>
              </a>
            </td>
          </tr>

          <tr>
            <td style="padding:22px 40px 26px;">
              <div style="border-top:1px solid #d9dcd6;padding-top:16px;text-align:center;">
                <p style="margin:0;font-size:11px;color:#8a8f86;">
                  Sent from <?= e($brandName) ?><?php if ($siteUrl !== ''): ?> · <?= e($siteUrl) ?><?php endif; ?>
                </p>
              </div>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
