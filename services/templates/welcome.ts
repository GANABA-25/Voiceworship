type WelcomeEmailProps = {
  firstName?: string;
  organizationName?: string;
  signInUrl: string;
};

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

export const welcomeEmailTemplate = ({
  firstName,
  organizationName,
  signInUrl,
}: WelcomeEmailProps) => `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Welcome to VoiceWorship</title>
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
                  Welcome${firstName ? `, ${escapeHtml(firstName)}` : ""}! 🎉
                </h2>

                <p
                  style="
                    margin: 0 0 16px;
                    color: #4b5563;
                    font-size: 15px;
                    line-height: 1.7;
                  "
                >
                  Your email has been verified and your VoiceWorship
                  account${
                    organizationName
                      ? ` for <strong>${escapeHtml(organizationName)}</strong>`
                      : ""
                  } is ready to use.
                </p>

                <p
                  style="
                    margin: 0 0 8px;
                    color: #4b5563;
                    font-size: 15px;
                    line-height: 1.7;
                  "
                >
                  Here's what you can do next:
                </p>

                <ul
                  style="
                    margin: 0 0 16px;
                    padding-left: 20px;
                    color: #4b5563;
                    font-size: 15px;
                    line-height: 1.9;
                  "
                >
                  <li>Search and present Bible passages live</li>
                  <li>Build a queue of songs, slides and media</li>
                  <li>Project to a second screen with the output window</li>
                </ul>

                <!-- CTA Button -->
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
                        href="${signInUrl}"
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
                        Sign in to your workspace
                      </a>
                    </td>
                  </tr>
                </table>

                <p
                  style="
                    margin: 0;
                    color: #6b7280;
                    font-size: 14px;
                    line-height: 1.6;
                  "
                >
                  If you didn't create this account, please contact our
                  support team right away.
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
