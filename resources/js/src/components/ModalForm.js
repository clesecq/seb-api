// TODO: Rewrite properly, reimplementing SimpleForm and stuff, because right now the way components
// are organized because of RA is aweful

import { Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import { styled, useTheme } from "@material-ui/core/styles";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { spacing } from "@material-ui/system";
import inflection from 'inflection';
import * as React from "react";
import { Button, Create, CreateButton, Edit, EditButton, ExportButton, FilterButton, List, SaveButton, Show, SimpleForm, SimpleShowLayout, Toolbar, TopToolbar, useGetResourceLabel, useNotify, useRedirect, useRefresh, useResourceContext } from 'react-admin';
import { Route } from 'react-router-dom';

const StyledButton = styled(Button)(spacing);

const DialogEditToolBar = ({ handleClose, ...props }) => (
    <DialogActions>
        <Toolbar {...props} >
            <StyledButton label="Cancel" onClick={handleClose} size="medium" mr={1} />
            <SaveButton disabled={props.pristine} color="secondary" />
        </Toolbar>
    </DialogActions>
);


const ModalFormCreate = ({ handleClose, syncWithLocation, children, ...props }) => {
    const name = useResourceContext();
    const label = useGetResourceLabel();
    return (
        <DialogContent>
            <DialogTitle>Create {inflection.humanize(label(name, 1), true)}</DialogTitle>
            <Create title=" " {...props}>
                <SimpleForm toolbar={<DialogEditToolBar handleClose={handleClose} />} redirect="list">
                    {children}
                </SimpleForm>
            </Create>
        </DialogContent>
    );
};

const ModalFormEdit = ({ handleClose, syncWithLocation, children, ...props }) => {
    const name = useResourceContext();
    const label = useGetResourceLabel();
    return (
        <DialogContent>
            <DialogTitle>Edit {inflection.humanize(label(name, 1), true)} #{props.id}</DialogTitle>
            <Edit title=" " {...props}>
                <SimpleForm toolbar={<DialogEditToolBar handleClose={handleClose} />} redirect="list">
                    {children}
                </SimpleForm>
            </Edit>
        </DialogContent>
    );
};

const ModalFormShow = ({ handleClose, syncWithLocation, children, hasEdit, ...props }) => {
    const name = useResourceContext();
    const label = useGetResourceLabel();

    return (
        <DialogContent>
            <DialogTitle>{label(name, 1)} #{props.id}</DialogTitle>
            <Show title=" " {...props} >
                <SimpleShowLayout>
                    {children}
                </SimpleShowLayout>
            </Show>
            <DialogActions>
                <Button label="Cancel" onClick={handleClose} size="medium" />
                {hasEdit ? (<EditButton ml={1} size="medium" basePath={props.basePath} record={{ id: props.id }} />) : ""}
            </DialogActions>
        </DialogContent>
    );
};

const ModalAction = ({ hasFilters, hasCreate, ...props }) => (
    <TopToolbar>
        {hasFilters ? <FilterButton /> : ""}
        {hasCreate ? <CreateButton /> : ""}
        <ExportButton />
    </TopToolbar>
);

const ModalList = ({ children, show, edit, create, filters, actions, bulkActionButtons, ...props }) => {
    const name = useResourceContext();
    const redirect = useRedirect();
    const refresh = useRefresh();
    const notify = useNotify();
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const handleClose = () => {
        redirect(`/${name}`);
    };

    const handleCreate = () => {
        notify('ra.notification.created', 'info', { smart_count: 1 });
        redirect(`/${name}`);
        refresh();
    };

    return (
        <React.Fragment>
            <List filters={filters} actions={actions === undefined ? <ModalAction hasFilters={filters !== undefined} hasCreate={create !== undefined} /> : actions} bulkActionButtons={bulkActionButtons} {...props}>
                {children}
            </List>
            <Route
                path={`/${name}/create`}
                render={() => {
                    const CustomCreate = create;
                    return (
                        <Dialog open maxWidth="md" onClose={handleClose} fullWidth={true} scroll="body" fullScreen={fullScreen}>
                            {CustomCreate === undefined ? redirect(`/${name}`) : <CustomCreate {...props} handleClose={handleClose} onSuccess={handleCreate} />}
                        </Dialog>
                    );
                }}
            />
            <Route
                path={`/${name}/:id/:arg?`}
                render={({ match }) => {
                    const isMatch = match && match.params && match.params.id !== 'create';
                    const CustomShow = show;
                    const CustomEdit = edit;
                    return (
                        <Dialog open={isMatch} maxWidth="md" onClose={handleClose} fullWidth={true} scroll="body" fullScreen={fullScreen}>
                            {isMatch ? (
                                (match.params.arg == "show" ?
                                    (CustomShow === undefined ? redirect(`/${name}`) : <CustomShow {...props} actions={<></>} handleClose={handleClose} id={isMatch ? match.params.id : null} hasEdit={CustomEdit !== undefined} />)
                                    :
                                    (CustomEdit === undefined ? redirect(`/${name}`) : <CustomEdit {...props} actions={<></>} handleClose={handleClose} id={isMatch ? match.params.id : null} />)
                                )
                            ) : ""}
                        </Dialog>
                    );
                }}
            />
        </React.Fragment>
    );
};

export { ModalFormCreate, ModalFormEdit, ModalFormShow, ModalList };
