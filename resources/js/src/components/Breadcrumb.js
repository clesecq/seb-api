import MuiBreadcrumbs from '@material-ui/core/Breadcrumbs';
import MuiLink from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { useTranslate } from 'react-admin';
import { Link, useLocation } from 'react-router-dom';

const BreadCrumb = () => {
    const location = useLocation();
    let path = location.pathname.split('/');
    const translate = useTranslate();

    if (path.length == 2 && path[1] == "") {
        return (
            <MuiBreadcrumbs aria-label="breadcrumb" style={{ paddingBottom: '5px' }}>
                <Typography color="inherit">
                    {translate('menu.left.dashboard')}
                </Typography>
            </MuiBreadcrumbs>
        );
    }

    path.shift();
    let last = path.pop();
    let link = "";
    return (
        <MuiBreadcrumbs aria-label="breadcrumb" style={{ paddingBottom: '5px' }}>
            <MuiLink component={Link} color="inherit" to="/">
                {translate('menu.left.dashboard')}
            </MuiLink>
            {path.map((val, key) => {
                link += "/" + val;
                return (
                    <MuiLink component={Link} color="inherit" to={link} key={link}>
                        {(isNaN(val) ? translate('menu.left.' + val) : val)}
                    </MuiLink>
                );
            })}
            <Typography color="textPrimary">
                {(isNaN(last) ? translate('menu.left.' + last) : last)}
            </Typography>
        </MuiBreadcrumbs>
    );
};

export default BreadCrumb;