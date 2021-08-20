import merge from 'lodash/merge';
import { defaultTheme } from 'react-admin';

export default merge(defaultTheme, {
    palette: {
        primary: {
            main: '#c8faee',
            light: '#dcfaee',
            dark: "#303030"
            // dark: '#94f7e5'
        },
        secondary: {
            main: "#89c740",
            dark: "#59a310",
            light: "#b1e368",
            darker: "#458c0a"
        },
        error: {
            main: "#ef947f",
            dark: "#e06a5c",
            light: "#f9c0ac"
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
        RaFormInput: {
            input: {
                width: "100%"
            }
        },
        RaAutocompleteArrayInput: {
            inputRoot: {
                width: "100%"
            }
        },
        MuiFormControl: {
            root: {
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
                "background-color": "#545454"
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
        },
        MuiDialogTitle: {
            root: {
                "padding-top": "0px !important",
                "padding-bottom": "0px !important"
            }
        },
        RaEdit: {
            noActions: {
                "margin-top": 0
            }
        },
        MuiDialogContent: {
            root: {
                padding: "8px, 0 !important"
            }
        },
        MuiListItemIcon: {
            root: {
                "min-width": null
            }
        },
        RaLabeled: {
            value: {
                padding: 0
            }
        }
    }
});