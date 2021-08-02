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
                password_confirmation: "Password confirmation"
            }
        }
    }),
};

export default polyglotI18nProvider(locale => messages[locale]);