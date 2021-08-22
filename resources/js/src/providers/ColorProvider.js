
import amber from '@material-ui/core/colors/amber';
import blue from '@material-ui/core/colors/blue';
// import blueGrey from '@material-ui/core/colors/blueGrey';
// import brown from '@material-ui/core/colors/brown';
import common from '@material-ui/core/colors/common';
import cyan from '@material-ui/core/colors/cyan';
import deepOrange from '@material-ui/core/colors/deepOrange';
import deepPurple from '@material-ui/core/colors/deepPurple';
import green from '@material-ui/core/colors/green';
// import grey from '@material-ui/core/colors/grey';
import indigo from '@material-ui/core/colors/indigo';
import lightBlue from '@material-ui/core/colors/lightBlue';
import lightGreen from '@material-ui/core/colors/lightGreen';
import lime from '@material-ui/core/colors/lime';
import orange from '@material-ui/core/colors/orange';
import pink from '@material-ui/core/colors/pink';
import purple from '@material-ui/core/colors/purple';
import red from '@material-ui/core/colors/red';
import teal from '@material-ui/core/colors/teal';
import yellow from '@material-ui/core/colors/yellow';

const colors = {
    'amber': amber,
    'blue': blue,
//    'blueGrey': blueGrey,
//    'brown': brown,
    'common': common,
    'cyan': cyan,
    'deepOrange': deepOrange,
    'deepPurple': deepPurple,
    'green': green,
//    'grey': grey,
    'indigo': indigo,
    'lightBlue': lightBlue,
    'lightGreen': lightGreen,
    'lime': lime,
    'orange': orange,
    'pink': pink,
    'purple': purple,
    'red': red,
    'teal': teal,
    'yellow': yellow
}

const randomProperty = (obj) => {
    var keys = Object.keys(obj);
    return obj[keys[ keys.length * Math.random() << 0]];
};

class ColorProvider {
    randomColor(shade) {
        return randomProperty(colors)[shade];
    }
}

const instance = new ColorProvider();
export default instance;