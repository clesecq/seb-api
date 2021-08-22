
import amber from '@material-ui/core/colors/amber';
import blue from '@material-ui/core/colors/blue';
// import blueGrey from '@material-ui/core/colors/blueGrey';
// import brown from '@material-ui/core/colors/brown';
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
import _ from 'lodash';

const colors = {
    'amber': amber,
    'blue': blue,
//    'blueGrey': blueGrey,
//    'brown': brown,
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
    constructor() {
        this.shuffled_colors = ['#FF0000'];
        this.counter = 0;
    }

    randomColor(shade) {
        return randomProperty(colors)[shade];
    }

    randomSColor() {
        this.counter = (this.counter+1) % this.shuffled_colors.length;
        return this.shuffled_colors[this.counter];
    }

    shuffledColors(shade) {
        let color_arr = [];
        for(let key in colors) {
            color_arr.push(colors[key][shade]);
        }
        return _.shuffle(color_arr);
    }

    shuffle(shade) {
        this.shuffled_colors = this.shuffledColors(shade);
        this.counter = 0;
    }
}

const instance = new ColorProvider();
export default instance;