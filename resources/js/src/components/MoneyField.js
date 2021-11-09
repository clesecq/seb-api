import get from 'lodash/get';
import PropTypes from 'prop-types';
import * as React from "react";
import { FunctionField, Labeled } from 'react-admin';

const MoneyField = ({ source, noLabel, currency, digits, ...props }) => {
    return (
        noLabel ?
            <FunctionField {...props} style={{ width: '100%', whiteSpace: 'nowrap', textAlign: 'right', display: 'inline-block' }} render={record => (Number(get(record, source)).toLocaleString('fr-FR', { currency: currency, currencyDisplay: 'symbol', style: 'currency' }))} />
            :
            <Labeled source={source} {...props}>
                <FunctionField {...props} render={record => (Number(get(record, source)).toLocaleString('fr-FR', { currency: currency, currencyDisplay: 'symbol', style: 'currency' }))} />
            </Labeled>
    );
}

MoneyField.propTypes = {
    label: PropTypes.string,
    noLabel: PropTypes.bool,
    record: PropTypes.object,
    currency: PropTypes.string,
    source: PropTypes.string.isRequired,
    digits: PropTypes.number
};

MoneyField.defaultProps = {
    currency: "EUR",
    noLabel: false,
    digits: 2
}

export default MoneyField;
