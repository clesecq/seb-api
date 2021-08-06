import MuiBreadcrumbs from '@material-ui/core/Breadcrumbs';
import MuiLink from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import inflection from 'inflection';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const BreadCrumb = () => {
    const location = useLocation();
    let path = location.pathname.split('/');

    if (path.length == 2 && path[1] == "") {
        return (
            <MuiBreadcrumbs aria-label="breadcrumb" style={{ paddingBottom: '5px' }}>
                <Typography color="inherit">
                    Root
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
                Root
            </MuiLink>
            {path.map((val, key) => {
                link += "/" + val;
                return (
                    <MuiLink component={Link} color="inherit" to={link} key={link}>
                        {inflection.humanize(val)}
                    </MuiLink>
                );
            })}
            <Typography color="textPrimary">
                {inflection.humanize(last)}
            </Typography>
        </MuiBreadcrumbs>
    );
};

export default BreadCrumb;