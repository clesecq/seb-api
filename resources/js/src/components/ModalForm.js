import { Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import inflection from 'inflection';
import * as React from "react";
import { Button, Create, Edit, List, SaveButton, Show, SimpleForm, SimpleShowLayout, Toolbar, useRedirect, useRefresh, useResourceContext } from 'react-admin';
import { Route } from 'react-router-dom';

const DialogEditToolBar = ({ handleClose, ...props }) => (
    <DialogActions>
        <Toolbar {...props} >
            <Box mr={1}>
                <Button label="Cancel" onClick={handleClose} size="medium" />
            </Box>
            <SaveButton disabled={props.pristine} color="secondary" />
        </Toolbar>
    </DialogActions>
);

const ModalFormCreate = ({ handleClose, children, ...props }) => {
    const name = useResourceContext();
    return (
        <DialogContent>
            <DialogTitle>Create {inflection.humanize(inflection.singularize(name), false)}</DialogTitle>
            <Create title=" " {...props}>
                <SimpleForm toolbar={<DialogEditToolBar handleClose={handleClose} />} redirect="list">
                    {children}
                </SimpleForm>
            </Create>
        </DialogContent>
    );
};

const ModalFormEdit = ({ handleClose, children, ...props }) => {
    const name = useResourceContext();
    return (
        <DialogContent>
            <DialogTitle>Edit {inflection.humanize(inflection.singularize(name))} #{props.id}</DialogTitle>
            <Edit title=" " {...props}>
                <SimpleForm toolbar={<DialogEditToolBar handleClose={handleClose} />} redirect="show">
                    {children}
                </SimpleForm>
            </Edit>
        </DialogContent>
    );
};

const ModalFormShow = ({ handleClose, children, ...props }) => {
    const name = useResourceContext();
    return (
        <DialogContent>
            <DialogTitle>{inflection.humanize(inflection.singularize(name))} #{props.id}</DialogTitle>
            <Show title=" " {...props} >
                <SimpleShowLayout>
                    {children}
                    <DialogActions>
                        <Button label="Cancel" onClick={handleClose} size="medium" />
                    </DialogActions>
                </SimpleShowLayout>
            </Show>
        </DialogContent>
    );
};

const ModalList = ({ children, show, edit, create, filters, actions, ...props }) => {
    const name = useResourceContext();
    const redirect = useRedirect();
    const refresh = useRefresh();
    const handleClose = () => {
        redirect(`/${name}`);
        refresh();
    };

    return (
        <React.Fragment>
            <List filters={filters} actions={actions} {...props}>
                {children}
            </List>
            <Route
                path={`/${name}/create`}
                render={() => {
                    const CustomCreate = create;
                    return (
                        <Dialog open maxWidth="md" onClose={handleClose} fullWidth={true}>
                            {CustomCreate === undefined ? redirect(`/${name}`) : <CustomCreate {...props} handleClose={handleClose} />}
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
                        <Dialog open={isMatch} maxWidth="md" onClose={handleClose} fullWidth={true}>
                            {isMatch ? (
                                (match.params.arg == "show" ?
                                    (CustomShow === undefined ? redirect(`/${name}`) : <CustomShow {...props} actions={<></>} handleClose={handleClose} id={isMatch ? match.params.id : null} />)
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
