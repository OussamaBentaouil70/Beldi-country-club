<?php
/** @var string $firstName */
/** @var string $reference */
/** @var string $eventType */
/** @var string $eventDate */
/** @var string $guestCount */
/** @var string $budget */
/** @var string $message */
/** @var string $whatsappLink */
/** @var string $siteUrl */
/** @var string $year */
/** @var string $brandName */
?>
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Thank you</title>
</head>
<body style="margin:0;padding:0;background-color:#f2f3f5;font-family:Arial,Helvetica,sans-serif;color:#131516;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f2f3f5;">
    <tr>
      <td align="center" style="padding:28px 12px;">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px;max-width:600px;background-color:#ffffff;border:1px solid #d9dcd6;overflow:hidden;">

          <tr>
            <td style="background-color:#131516;padding:28px 32px;text-align:center;">
              <div style="font-family:Georgia,'Times New Roman',serif;font-size:21px;letter-spacing:0.14em;color:#ffffff;text-transform:uppercase;">
                <?= e($brandName) ?>
              </div>
              <div style="margin-top:6px;font-size:10px;letter-spacing:0.24em;color:#b4c3a0;text-transform:uppercase;">
                Weddings &amp; Events · Marrakech
              </div>
            </td>
          </tr>

          <tr>
            <td style="padding:34px 40px 8px;">
              <p style="margin:0 0 8px;font-size:11px;font-weight:bold;letter-spacing:0.22em;text-transform:uppercase;color:#55683e;">
                Thank you
              </p>
              <h1 style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:27px;line-height:1.3;font-weight:normal;color:#131516;">
                Thank you, <?= e($firstName) ?>.
              </h1>
              <p style="margin:16px 0 0;font-size:15px;line-height:1.7;color:#4b5047;">
                We have received your inquiry and our team will reply within
                <strong style="color:#131516;">24–48 hours</strong>.
              </p>
              <p style="margin:12px 0 0;font-size:13px;line-height:1.7;color:#6b7069;">
                Your reference: <strong style="color:#131516;letter-spacing:0.08em;"><?= e($reference) ?></strong>
              </p>
            </td>
          </tr>

          <tr>
            <td style="padding:22px 40px 0;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1px solid #d9dcd6;">
                <tr>
                  <td style="padding:10px 14px;font-size:12px;color:#6b7069;border-bottom:1px solid #eceee9;width:34%;">Event</td>
                  <td style="padding:10px 14px;font-size:13px;font-weight:bold;border-bottom:1px solid #eceee9;"><?= e($eventType) ?></td>
                </tr>
                <tr>
                  <td style="padding:10px 14px;font-size:12px;color:#6b7069;border-bottom:1px solid #eceee9;">Date</td>
                  <td style="padding:10px 14px;font-size:13px;border-bottom:1px solid #eceee9;"><?= e($eventDate) ?></td>
                </tr>
                <tr>
                  <td style="padding:10px 14px;font-size:12px;color:#6b7069;border-bottom:1px solid #eceee9;">Guests</td>
                  <td style="padding:10px 14px;font-size:13px;border-bottom:1px solid #eceee9;"><?= e($guestCount) ?></td>
                </tr>
                <tr>
                  <td style="padding:10px 14px;font-size:12px;color:#6b7069;">Budget</td>
                  <td style="padding:10px 14px;font-size:13px;"><?= e($budget) ?></td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="padding:22px 40px 0;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f7f8f6;border-left:3px solid #6e8458;">
                <tr>
                  <td style="padding:16px 18px;">
                    <span style="display:block;margin-bottom:6px;font-size:10px;letter-spacing:0.16em;text-transform:uppercase;color:#6b7069;">
                      Your message
                    </span>
                    <span style="font-size:13px;line-height:1.7;color:#44483f;">
                      <?= nl2br(e($message)) ?>
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <?php if ($whatsappLink !== ''): ?>
            <tr>
              <td align="center" style="padding:28px 40px 8px;">
                <a href="<?= e($whatsappLink) ?>" style="display:inline-block;background-color:#131516;color:#ffffff;text-decoration:none;padding:13px 26px;font-size:12px;font-weight:bold;letter-spacing:0.1em;text-transform:uppercase;">
                  Chat on WhatsApp
                </a>
              </td>
            </tr>
          <?php endif; ?>

          <tr>
            <td style="padding:24px 40px 28px;">
              <div style="border-top:1px solid #d9dcd6;padding-top:18px;text-align:center;">
                <?php if ($siteUrl !== ''): ?>
                  <p style="margin:0 0 8px;font-size:12px;">
                    <a href="<?= e($siteUrl) ?>" style="color:#131516;text-decoration:underline;">
                      <?= e($siteUrl) ?>
                    </a>
                  </p>
                <?php endif; ?>
                <p style="margin:0;font-size:11px;color:#8a8f86;">
                  © <?= e($year) ?> <?= e($brandName) ?>. Wedding planning by Weddings Planner Morocco.
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
