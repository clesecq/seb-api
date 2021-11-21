/**
 * https://github.com/vascofg/react-admin-date-inputs
 * 
 * MIT License
 * 
 * Copyright (c) 2017 Alexey Simakov
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import DateFnsUtils from '@date-io/date-fns';
import { DatePicker, DateTimePicker, MuiPickersUtilsProvider, TimePicker } from '@material-ui/pickers';
import format from "date-fns/format";
import frLocale from "date-fns/locale/fr";
import PropTypes from 'prop-types';
import { FieldTitle, useInput } from 'ra-core';
import React, { useCallback } from 'react';

class LocalizedUtils extends DateFnsUtils {
    getDatePickerHeaderText(date) {
        return format(date, "d MMM", { locale: this.locale });
    }

    getDateTimePickerHeaderText(date) {
        return format(date, "d MMM", { locale: this.locale });
    }
}

const Picker = ({ PickerComponent, ...fieldProps }) => {

    const {
        options,
        label,
        source,
        resource,
        className,
        isRequired,
        providerOptions,
        disabled,
    } = fieldProps;

    const { input, meta } = useInput({ source });

    const { touched, error } = meta;

    const handleChange = useCallback(value => {
        Date.parse(value) ? input.onChange(value.toISOString()) : input.onChange(null);
    }, []);

    return (
        <div className="picker">
            <MuiPickersUtilsProvider {...providerOptions} locale={frLocale}>
                <PickerComponent
                    {...options}
                    label={<FieldTitle
                        label={label}
                        source={source}
                        resource={resource}
                        isRequired={isRequired}
                    />}
                    margin="normal"
                    error={!!(touched && error)}
                    helperText={touched && error}
                    className={className}
                    value={input.value ? new Date(input.value) : null}
                    onChange={date => handleChange(date)}
                    onBlur={() => input.onBlur(input.value ? new Date(input.value).toISOString() : null)}
                    disabled={disabled}
                    format="dd/MM/yyyy, HH:mm:ss"
                    ampm={false}
                    inputVariant="filled"
                />
            </MuiPickersUtilsProvider>
        </div>
    )
}

Picker.propTypes = {
    input: PropTypes.object,
    isRequired: PropTypes.bool,
    label: PropTypes.string,
    meta: PropTypes.object,
    options: PropTypes.object,
    resource: PropTypes.string,
    source: PropTypes.string,
    labelTime: PropTypes.string,
    className: PropTypes.string,
    providerOptions: PropTypes.shape({
        utils: PropTypes.func,
        locale: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    }),
    disabled: PropTypes.bool
};

Picker.defaultProps = {
    input: {},
    isRequired: false,
    meta: { touched: false, error: false },
    options: {},
    resource: '',
    source: '',
    labelTime: '',
    className: '',
    disabled: false,
    providerOptions: {
        utils: LocalizedUtils,
        locale: undefined,
    },
};

export const DateInput = props => <Picker PickerComponent={DatePicker} {...props} />
export const TimeInput = props => <Picker PickerComponent={TimePicker} {...props} />
export const DateTimeInput = props => <Picker PickerComponent={DateTimePicker} {...props} />
