
import { Layout } from 'react-admin';
import AppBar from './AppBar';
import { Menu } from './Menu';

const MyLayout = ({ children, ...props }) => (
    <Layout {...props} menu={Menu} appBar={AppBar} >
        {children}
    </Layout>
);

export default MyLayout;