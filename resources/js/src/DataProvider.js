
import jsonServerProvider from 'ra-data-json-server';

const dataProvider = jsonServerProvider('http://127.0.0.1:3000/api/');

export default dataProvider;