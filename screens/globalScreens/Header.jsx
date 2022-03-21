import React, { useState, useEffect } from 'react';

import {
  View, SafeAreaView, StyleSheet, StatusBar,

} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  text: {
    fontSize: 42,
  },
});

function Header() {
  return (

    <SafeAreaView style={styles.container}>

      <View />

    </SafeAreaView>
  );
}

export default Testscreen;
