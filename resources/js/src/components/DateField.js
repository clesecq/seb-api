import { DateField as RADateField } from "react-admin";

const DateField = RADateField;

DateField.defaultProps.locales = "fr-FR";
DateField.defaultProps.showTime = true;

export default DateField;
