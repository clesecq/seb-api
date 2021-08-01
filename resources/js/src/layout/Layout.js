
import { Layout } from 'react-admin';
import AppBar from './AppBar';
import { Menu } from './Menu';

const MyLayout = (props) => <Layout {...props} menu={Menu} appBar={AppBar} />;

export default MyLayout;