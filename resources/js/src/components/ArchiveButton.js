import ArchiveIcon from '@material-ui/icons/Archive';
import * as React from "react";
import { Button, useDataProvider, useRefresh, useResourceContext, useTranslate } from 'react-admin';

const ArchiveButton = (props) => {
    const dataProvider = useDataProvider();
    const name = useResourceContext();
    const refresh = useRefresh();
    const translate = useTranslate();

    return (
        <Button
            onClick={() => {
                dataProvider.archive(name).then(() => {
                    refresh();
                });
            }}
            label={translate('actions.archive')}
        ><ArchiveIcon /></Button>
    );
};

export { ArchiveButton };
