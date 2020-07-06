/**
 * @format
 */

import {AppRegistry, YellowBox} from 'react-native';
//import App from './App';
import {name as appName} from './app.json';
import 'react-native-gesture-handler';

import { createStore,applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
const middleware = [thunk];
const initialState = {};
import { Provider } from 'react-redux';
import React, {Component} from 'react';
import allReducer from './redux/reducers'
import App from './App'
YellowBox.ignoreWarnings(['Warning: ...']);
console.disableYellowBox = true;

let store = createStore(allReducer, initialState, applyMiddleware(...middleware));

class AppContainer extends Component {
    render() {
        return (
            <Provider store={store}>
                <App/>
            </Provider>
        )}
};

AppRegistry.registerComponent(appName, () => AppContainer);
