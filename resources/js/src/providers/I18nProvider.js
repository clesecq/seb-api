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
                reset_password: "Reset password",
                password_confirmation: "Password confirmation",
                new_password: "New password",
                current_password: "Current password",
                change_password: "Change password",
                password_changed: "Password changed!"
            }
        }
    }),
};

export default polyglotI18nProvider(locale => messages[locale]);