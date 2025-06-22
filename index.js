import 'react-native-gesture-handler'; // ต้องอยู่บนสุดแบบนี้ เพราะต้อง register gesture handler module ให้กับ React Native Bridge ทันที
import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
