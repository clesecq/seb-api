import { Dialog, DialogContent, DialogTitle, useMediaQuery, useTheme } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import { styled, withStyles } from "@material-ui/core/styles";
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import { spacing } from "@material-ui/system";
import inflection from 'inflection';
import * as React from "react";
import { Create, DeleteButton, Edit, SaveButton, Show, Toolbar, useGetResourceLabel, useRedirect, useResourceContext, useResourceDefinition } from 'react-admin';
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
const CreateDialog = withRouter(({ history: { goBack }, handleClose, syncWithLocation, children, ...props }) => {
    const name = useResourceContext();
    const resource = useResourceDefinition(props);
    const label = useGetResourceLabel();
    const redirect = useRedirect();
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <Route path={`/${name}/create`} exact render={() => {
            const handleClose = () => {
                goBack();
            };
            return (
                <Dialog fullScreen={fullScreen} open maxWidth="md" onClose={handleClose} fullWidth={true} scroll="body" fullScreen={fullScreen}>
                    {resource.hasCreate === undefined ? redirect(`/${name}`) : <>
                        <DialogContent>
                            <MyDialogTitle onClose={handleClose}>Create {inflection.humanize(label(name, 1), true)}</MyDialogTitle>
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

const EditDialog = withRouter(({ history: { goBack }, handleClose, syncWithLocation, children, ...props }) => {
    const name = useResourceContext();
    const resource = useResourceDefinition(props);
    const label = useGetResourceLabel();
    const redirect = useRedirect();
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <Route path={`/${name}/:id`} render={({ match }) => {
            const handleClose = () => {
                goBack();
            };
            const isMatch = match && match.params && match.params.id !== 'create';
            return (
                <Dialog fullScreen={fullScreen} open={isMatch} maxWidth="md" onClose={handleClose} fullWidth={true} scroll="body" fullScreen={fullScreen}>
                    {isMatch ? (
                        (resource.hasEdit === undefined ? redirect(`/${name}`) : <>
                            <DialogContent>
                                <MyDialogTitle onClose={handleClose}>Edit {inflection.humanize(label(name, 1), true)} #{isMatch ? match.params.id : null}</MyDialogTitle>
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

const ShowDialog = withRouter(({ history: { goBack }, handleClose, syncWithLocation, children, hasEdit, ...props }) => {
    const name = useResourceContext();
    const resource = useResourceDefinition(props);
    const label = useGetResourceLabel();
    const redirect = useRedirect();
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <Route path={`/${name}/:id/show`} render={({ match }) => {
            const handleClose = () => {
                goBack();
            };
            const isMatch = match && match.params && match.params.id !== 'create';
            return (
                <Dialog fullScreen={fullScreen} open={isMatch} maxWidth="md" onClose={handleClose} fullWidth={true} scroll="body" fullScreen={fullScreen}>
                    {isMatch ? (
                        (resource.hasShow ? <>
                            <DialogContent>
                                <MyDialogTitle onClose={handleClose}>{label(name, 1)} #{isMatch ? match.params.id : null}</MyDialogTitle>
                                <Show actions={null} id={isMatch ? match.params.id : null} basePath={props.basePath} resource={name} title=" " {...props} >
                                    {children}
                                </Show>
                            </DialogContent>
                        </> : redirect(`/${name}`))) : ""}
                </Dialog>
            );
        }} exact />
    );
});

export { CreateDialog, EditDialog, ShowDialog };
