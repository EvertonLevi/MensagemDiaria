import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';

import { Dimensions } from 'react-native'
import TabBarIcon from '../components/TabBarIcon';
import PaoDiario from '../screens/PaoDiario';
import LeituraLonga from '../screens/LeituraLonga';

import Colors from '../constants/Colors';


const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'PaoDiario';
const { height, width } = Dimensions.get("window")

export default function BottomTabNavigator({ navigation, route }) {

  navigation.setOptions({ headerShown: false });

  return (
    <BottomTab.Navigator
      tabBarOptions={{
        style: {
          backgroundColor: 'transparent',
          borderTopWidth: 0,
          position: 'absolute',
          left: 50,
          right: 50,
          bottom: 10,
          height: 80,
          borderRadius: 20,
          shadowColor: 'rgba(46, 229, 157, 0)',
          shadowOpacity: 0,
          elevation: 0,
          shadowRadius: 0,
          shadowOffset: { width: 0, height: 0 },
        }
      }}
      initialRouteName={INITIAL_ROUTE_NAME} >
      <BottomTab.Screen
        name="PaoDiario"
        component={PaoDiario}
        options={{
          title: '',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-today" />,
        }}
      />
      <BottomTab.Screen
        name="LeituraLonga"
        component={LeituraLonga}
        options={{
          title: '',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-book" />,
        }}
      />
    </BottomTab.Navigator >
  );
}

function getHeaderTitle(route) {
  const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
    case 'PaoDiario':
      return 'Pão Diário';
    case 'LeituraLonga':
      return 'Leitura Longa';
  }
}
