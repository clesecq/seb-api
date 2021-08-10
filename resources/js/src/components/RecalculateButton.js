import RefreshIcon from '@material-ui/icons/Refresh';
import * as React from "react";
import { Button, useDataProvider, useRefresh, useResourceContext, useTranslate } from 'react-admin';


const RecalculateButton = (props) => {
    const dataProvider = useDataProvider();
    const name = useResourceContext();
    const refresh = useRefresh();
    const translate = useTranslate();

    return (
        <Button
            onClick={() => {
                dataProvider.reload(name).then(() => {
                    refresh();
                });
            }}
            label={translate('actions.recalculate')}
        ><RefreshIcon /></Button>
    );
};

export { RecalculateButton };
