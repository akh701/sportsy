return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName={homeName}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            const rn = route.name;

            if (rn === homeName) {
              iconName = focused ? 'home' : 'home-outline';
            } else if (rn === findEventsName) {
              iconName = focused ? 'search' : 'search-outline';
            } else if (rn === myEventsName) {
              iconName = focused ? 'list' : 'list-outline';
            } else if (rn === createEventName) {
              iconName = focused ? 'create' : 'create-outline';
            } else if (rn === myProfileName) {
              iconName = focused ? 'person' : 'person-outline';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'grey',
          labelStyle: { paddingBottom: 10, fontSize: 10 },
          style: { padding: 10, height: 70 },
        }}
      >

        <Tab.Screen name={homeName} component={HomeScreen} options={{ headerShown: false }} />
        <Tab.Screen name={findEventsName} component={FindEventsScreen} options={{ headerShown: false }} />
        <Tab.Screen name={myEventsName} component={MyEventsScreen} options={{ headerShown: false }} />
        <Tab.Screen name={createEventName} component={CreateEventScreen} options={{ headerShown: false }} />
        <Tab.Screen name={myProfileName} component={UserProfileScreen} options={{ headerShown: false }} />

      </Tab.Navigator>
    </NavigationContainer>
  );