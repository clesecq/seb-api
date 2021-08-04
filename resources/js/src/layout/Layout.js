
import { Layout } from 'react-admin';
import BreadCrumb from '../components/Breadcrumb';
import AppBar from './AppBar';
import { Menu } from './Menu';

const MyLayout = ({ children, ...props }) => (
    <Layout {...props} menu={Menu} appBar={AppBar} >
        <BreadCrumb />
        {children}
    </Layout>
);

export default MyLayout;