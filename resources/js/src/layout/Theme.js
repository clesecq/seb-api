import merge from 'lodash/merge';
import { defaultTheme } from 'react-admin';

export default merge(defaultTheme, {
    palette: {
        primary: {
            main: '#ade6fd',
            light: '#',
            dark: '#303030'
        },
        secondary: {
            main: "#fb963a",
            dark: "#f77c36",
            light: "#ffc646"
        },
        error: {
            main: "#ffadad"
        },
        type: 'dark',
    },
    shadows: [
        "none",
        "none",
        "none",
        "none",
        "none",
        "none",
        "none",
        "none",
        "none",
        "none",
        "none",
        "none",
        "none",
        "none",
        "none",
        "none",
        "none",
        "none",
        "none",
        "none",
        "none",
        "none",
        "none",
        "none",
        "none"
    ],
    overrides: {
        RaLayout: {
            content: {
                "padding-right": "5px",
                "padding-top": "5px"
            }
        },
        RaTopToolbar: {
            root: {
                "padding-top": 0
            }
        },
        RaFormInput: {
            input: {
                width: "100%"
            }
        },
        MuiTableHead: {
            root: {
                "border-radius": "4px 4px 0 0"
            }
        },
        RaToolbar: {
            toolbar: {
                "background-color": "none"
            }
        },
        RaCreate: {
            main: {
                "margin-top": "0px !important"
            }
        },
        MuiList: {
            root: {
                "background": "#545454"
            }
        }
    }
});