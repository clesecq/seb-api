import InputAdornment from '@material-ui/core/InputAdornment';
import PropTypes from 'prop-types';
import * as React from "react";
import { TextInput } from 'react-admin';

const MoneyInput = ({ currency, ...props }) => (
    <TextInput
        InputProps={{
            endAdornment: <InputAdornment position="end">{currency}</InputAdornment>,
        }}
        {...props}
    />
);

MoneyInput.propTypes = {
    label: PropTypes.string,
    record: PropTypes.object,
    currency: PropTypes.string,
    source: PropTypes.string.isRequired
};

MoneyInput.defaultProps = {
    currency: "€"
}

export default MoneyInput;