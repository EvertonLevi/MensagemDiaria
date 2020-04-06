import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';

import TabBarIcon from '../components/TabBarIcon';
import PaoDiario from '../screens/PaoDiario';
import LeituraLonga from '../screens/LeituraLonga';

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'PaoDiario';

export default function BottomTabNavigator({ navigation, route }) {

  navigation.setOptions({ headerShown: false, });

  return (
    <BottomTab.Navigator
      initialRouteName={INITIAL_ROUTE_NAME}>
      <BottomTab.Screen
        // screenOptions={{ headerShown: false }}
        name="PaoDiario"
        component={PaoDiario}
        options={{
          title: 'Pão Diário',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-today" />,
        }}
      />
      <BottomTab.Screen
        name="LeituraLonga"
        component={LeituraLonga}
        options={{
          title: 'Leitura Longa',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-book" />,
        }}
      />
    </BottomTab.Navigator>
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
