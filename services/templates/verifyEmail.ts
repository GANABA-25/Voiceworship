export const verifyEmailTemplate = (verifyUrl: string) => `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Verify Your Email - VoiceWorship</title>
  </head>

  <body
    style="margin: 0; padding: 0; background-color: #f5f7fb; font-family: Arial, Helvetica, sans-serif;"
  >
    <table width="100%" cellpadding="0" cellspacing="0" role="presentation"
      style="background-color: #f5f7fb; padding: 20px 0;"
    >
      <tr>
        <td align="center">
          <table
            width="600"
            cellpadding="0"
            cellspacing="0"
            role="presentation"
            style="width: 100%; max-width: 600px;
              background-color: #ffffff;
              margin: 20px auto;
              border-radius: 10px;
              overflow: hidden;
              border: 1px solid #e5e7eb;
            "
          >
            <!-- Header -->
            <tr>
              <td
                align="center"
                style="
                  background-color: #f3be47;
                  color: #111827;
                  padding: 30px;
                  font-size: 26px;
                  font-weight: bold;
                "
              >
                VoiceWorship
              </td>
            </tr>

            <!-- Email Content -->
            <tr>
              <td style="padding: 40px 30px;">
                <h2
                  style="
                    margin: 0 0 20px;
                    color: #111827;
                    font-size: 24px;
                  "
                >
                  Verify your email address
                </h2>

                <p
                  style="
                    margin: 0 0 16px;
                    color: #4b5563;
                    font-size: 15px;
                    line-height: 1.7;
                  "
                >
                  Thank you for creating your VoiceWorship account.
                  Please verify your email address to complete your
                  registration and get started.
                </p>

                <!-- Verification Button -->
                <table
                  align="center"
                  cellpadding="0"
                  cellspacing="0"
                  role="presentation"
                  style="margin: 30px auto;"
                >
                  <tr>
                    <td
                      align="center"
                      style="
                        background-color: #f3be47;
                        border-radius: 6px;
                      "
                    >
                      <a
                        href="${verifyUrl}"
                        style="
                          display: inline-block;
                          padding: 14px 30px;
                          color: #111827;
                          text-decoration: none;
                          font-size: 15px;
                          font-weight: bold;
                          border-radius: 6px;
                        "
                      >
                        Verify Email Address
                      </a>
                    </td>
                  </tr>
                </table>

                <p
                  style="
                    margin: 0 0 12px;
                    color: #6b7280;
                    font-size: 14px;
                    line-height: 1.6;
                  "
                >
                  If the button doesn't work, copy and paste the
                  following link into your browser:
                </p>

                <p
                  style="
                    margin: 0;
                    font-size: 14px;
                    line-height: 1.6;
                    word-break: break-all;
                  "
                >
                  <a
                    href="${verifyUrl}"
                    style="color: #2563eb;"
                  >
                    ${verifyUrl}
                  </a>
                </p>

                <p
                  style="
                    margin: 30px 0 0;
                    color: #6b7280;
                    font-size: 14px;
                    line-height: 1.6;
                  "
                >
                  This verification link expires in
                  <strong>1 hour</strong>.
                </p>

                <p
                  style="
                    margin: 16px 0 0;
                    color: #6b7280;
                    font-size: 14px;
                    line-height: 1.6;
                  "
                >
                  If you didn't create a VoiceWorship account,
                  you can safely ignore this email.
                </p>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td
                align="center"
                style="
                  background-color: #f9fafb;
                  padding: 20px;
                  border-top: 1px solid #e5e7eb;
                  color: #9ca3af;
                  font-size: 12px;
                  line-height: 1.6;
                "
              >
                <p style="margin: 0;">
                  &copy; ${new Date().getFullYear()} VoiceWorship.
                  All rights reserved.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`;
