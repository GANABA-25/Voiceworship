type PasswordResetEmailProps = {
  firstName?: string;
  expiryMinutes?: number;
};

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

export const passwordResetEmailTemplate = ({
  firstName,
  expiryMinutes = 5,
}: PasswordResetEmailProps = {}) => `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Password Reset Request - VoiceWorship</title>
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
                  Password reset requested
                </h2>

                <p
                  style="
                    margin: 0 0 16px;
                    color: #4b5563;
                    font-size: 15px;
                    line-height: 1.7;
                  "
                >
                  Hi${firstName ? ` ${escapeHtml(firstName)}` : ""},
                </p>

                <p
                  style="
                    margin: 0 0 16px;
                    color: #4b5563;
                    font-size: 15px;
                    line-height: 1.7;
                  "
                >
                  We received a request to reset the password for your
                  VoiceWorship account. For your security, we've sent a
                  verification code by <strong>SMS</strong> to the phone
                  number linked to your account.
                </p>

                <!-- Info box -->
                <table
                  width="100%"
                  cellpadding="0"
                  cellspacing="0"
                  role="presentation"
                  style="margin: 24px 0;"
                >
                  <tr>
                    <td
                      style="
                        background-color: #fef9e7;
                        border-left: 4px solid #f3be47;
                        border-radius: 6px;
                        padding: 16px 20px;
                        color: #111827;
                        font-size: 14px;
                        line-height: 1.7;
                      "
                    >
                      Enter that code on the password reset page to continue.
                      The code expires in
                      <strong>${expiryMinutes} minutes</strong>.
                    </td>
                  </tr>
                </table>

                <p
                  style="
                    margin: 0 0 16px;
                    color: #4b5563;
                    font-size: 15px;
                    line-height: 1.7;
                  "
                >
                  <strong>Didn't request this?</strong> You can safely
                  ignore this email. Your password won't change unless the
                  code is entered. If you're concerned about your account's
                  security, we recommend contacting our support team.
                </p>

                <p
                  style="
                    margin: 24px 0 0;
                    color: #6b7280;
                    font-size: 14px;
                    line-height: 1.6;
                  "
                >
                  Never share your verification code with anyone.
                  VoiceWorship will never ask you for it.
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
