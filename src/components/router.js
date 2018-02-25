import React from 'react';
import { StackNavigator } from 'react-navigation';

import Splash from '../screens/splash';
import Videos from '../screens/videos';

import DrawerNav from './drawerNav';

export const Root = StackNavigator({
    Splash: {
        screen: Splash,
    },
    DrawerNav: {
        screen: DrawerNav,
    },
    Videos: {
        screen: Videos,
    },
}, {
        mode: 'modal',
        headerMode: 'none',
    });