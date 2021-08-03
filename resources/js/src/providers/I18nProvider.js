import merge from 'lodash/merge';
import polyglotI18nProvider from 'ra-i18n-polyglot';
import englishMessages from 'ra-language-english';

const messages = {
    'en': merge(englishMessages, {
        ra: {
            auth: {
                email: "Email",
                forgot: "Forgot your password?",
                back: "Go back",
                cancel: "Cancel",
                reset_password: "Reset password",
                password_confirmation: "Password confirmation",
                new_password: "New password",
                current_password: "Current password",
                change_password: "Change password",
                password_changed: "Password changed!",
                "2fa": {
                    ask: "Do you really want to enable Two Factor Authentication?",
                    enable: "Enable 2FA",
                    scan: "Please scan the following QR code in your 2FA app",
                    verify: "Enter a 2FA code to validate",
                    verification_code: "2FA Code",
                    success: "Two Factor Authentication is now enabled",
                    validate: "Done!",
                    disabled: "Two Factor Authentication has been disabled",
                    disable: "Disable 2FA",
                    askdisable: "Do you really want to disable Two Factor Authentication?"
                }
            }
        }
    }),
};

export default polyglotI18nProvider(locale => messages[locale]);