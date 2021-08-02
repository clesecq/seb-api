import merge from 'lodash/merge';
import polyglotI18nProvider from 'ra-i18n-polyglot';
import englishMessages from 'ra-language-english';

const messages = {
    'en': merge(englishMessages, {
        ra: {
            auth: {
                email: "Email"
            }
        }
    }),
};

export default polyglotI18nProvider(locale => messages[locale]);