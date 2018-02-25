import React, { Component, PropTypes } from 'react';
import { 
    DrawerNavigator, 
    StackNavigator 
} from 'react-navigation'

import Drawer from './drawer'    

import Yufid from '../screens/yufid'
import LenteraIslam from '../screens/lentera'
import ZakirNaikIndonesia from '../screens/zakirNaik'
import Rodja from '../screens/rodja'
import Ustadz from '../screens/ustadz'
import Home from '../screens/home'

const DrawerMenu = DrawerNavigator(
    
    {
        Home: { screen: Home },
        LenteraIslam: { screen: LenteraIslam },
        ZakirNaikIndonesia: { screen: ZakirNaikIndonesia },
        Yufid: { screen: Yufid },
        Rodja: { screen: Rodja },
        Ustadz: { screen: Ustadz },
    },
    {
        drawerOpenRoute: 'DrawerOpen',
        drawerCloseRoute: 'DrawerClose',
        drawerToggleRoute: 'DrawerToggle',
        
        initialRouterName: 'Home',

        drawerWidth: 250,
        contentComponent: props => <Drawer {...props}/>
    },
);

export default DrawerMenu;