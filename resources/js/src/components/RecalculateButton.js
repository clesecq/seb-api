import RefreshIcon from '@material-ui/icons/Refresh';
import * as React from "react";
import { Button, useDataProvider, useRefresh, useResourceContext } from 'react-admin';


const RecalculateButton = (props) => {
    const dataProvider = useDataProvider();
    const name = useResourceContext();
    const refresh = useRefresh();

    return (
        <Button
            onClick={() => {
                dataProvider.reload(name).then(() => {
                    refresh();
                });
            }}
            label="Recalculate"
        ><RefreshIcon /></Button>
    );
};

export { RecalculateButton };
