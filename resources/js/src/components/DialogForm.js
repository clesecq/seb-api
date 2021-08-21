import { Dialog, DialogContent, DialogTitle, useMediaQuery, useTheme } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import { styled, withStyles } from "@material-ui/core/styles";
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import { spacing } from "@material-ui/system";
import * as React from "react";
import { Create, DeleteButton, Edit, SaveButton, Show, Toolbar, useGetResourceLabel, useRedirect, useResourceContext, useResourceDefinition, useTranslate } from 'react-admin';
import { Route, withRouter } from 'react-router-dom';

const StyledDeleteButton = styled(DeleteButton)(spacing);

const CustomToolbar = props => (
    <Toolbar {...props}>
        <SaveButton color="secondary" />
        <StyledDeleteButton size="medium" ml="auto" undoable={false} />
    </Toolbar>
);

const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
});

const MyDialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
        <DialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
});
const CreateDialog = withRouter(({ history, handleClose, staticContext, syncWithLocation, children, ...props }) => {
    const name = useResourceContext();
    const resource = useResourceDefinition(props);
    const label = useGetResourceLabel();
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const redirect = useRedirect();
    const translate = useTranslate();

    return (
        <Route path={`/${name}/create`} exact render={() => {
            const handleClose = () => {
                if (history.length === 1) {
                    redirect(`/${name}`);
                } else {
                    history.goBack();
                }
            };
            return (
                <Dialog fullScreen={fullScreen} open maxWidth="md" onClose={handleClose} fullWidth={true} scroll="body" fullScreen={fullScreen}>
                    {resource.hasCreate === undefined ? handleClose() : <>
                        <DialogContent>
                            <MyDialogTitle onClose={handleClose}>{translate('ra.page.create', {name: label(name, 1)})}</MyDialogTitle>
                            <Create title=" " {...props}>
                                {React.cloneElement(children, { toolbar: (<CustomToolbar />) })}
                            </Create>
                        </DialogContent>
                    </>}
                </Dialog>
            );
        }} />
    );
});

const EditDialog = withRouter(({ history, handleClose, staticContext, syncWithLocation, children, ...props }) => {
    const name = useResourceContext();
    const resource = useResourceDefinition(props);
    const label = useGetResourceLabel();
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const redirect = useRedirect();
    const translate = useTranslate();

    return (
        <Route path={`/${name}/:id`} render={({ match }) => {
            const handleClose = () => {
                if (history.length === 1) {
                    redirect(`/${name}`);
                } else {
                    history.goBack();
                }
            };
            const isMatch = match && match.params && match.params.id !== 'create';
            return (
                <Dialog fullScreen={fullScreen} open={isMatch} maxWidth="md" onClose={handleClose} fullWidth={true} scroll="body" fullScreen={fullScreen}>
                    {isMatch ? (
                        (resource.hasEdit === undefined ? handleClose() : <>
                            <DialogContent>
                                <MyDialogTitle onClose={handleClose}>{translate('ra.page.edit', {name: label(name, 1), id: isMatch ? match.params.id : null})}</MyDialogTitle>
                                <Edit actions={null} id={isMatch ? match.params.id : null} title=" " {...props}>
                                    {React.cloneElement(children, { toolbar: (<CustomToolbar />) })}
                                </Edit>
                            </DialogContent>
                        </>)
                    ) : ""}
                </Dialog>
            );
        }} exact />
    );
});

const ShowDialog = withRouter(({ history, handleClose, staticContext, syncWithLocation, children, hasEdit, ...props }) => {
    const name = useResourceContext();
    const resource = useResourceDefinition(props);
    const label = useGetResourceLabel();
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const redirect = useRedirect();
    const translate = useTranslate();

    return (
        <Route path={`/${name}/:id/show`} render={({ match }) => {
            const handleClose = () => {
                if (history.length === 1) {
                    redirect(`/${name}`);
                } else {
                    history.goBack();
                }
            };
            const isMatch = match && match.params && match.params.id !== 'create';
            return (
                <Dialog fullScreen={fullScreen} open={isMatch} maxWidth="md" onClose={handleClose} fullWidth={true} scroll="body" fullScreen={fullScreen}>
                    {isMatch ? (
                        (resource.hasShow ? <>
                            <DialogContent>
                                <MyDialogTitle onClose={handleClose}>{translate('ra.page.show', {name: label(name, 1), id: isMatch ? match.params.id : null})}</MyDialogTitle>
                                <Show actions={null} id={isMatch ? match.params.id : null} basePath={props.basePath} resource={name} title=" " {...props} >
                                    {children}
                                </Show>
                            </DialogContent>
                        </> : handleClose())) : ""}
                </Dialog>
            );
        }} exact />
    );
});

export { CreateDialog, EditDialog, ShowDialog };
