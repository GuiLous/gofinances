/* eslint-disable camelcase */
import 'react-native-gesture-handler'
import 'intl'
import 'intl/locale-data/jsonp/pt-BR'

import React, { useCallback, useEffect, useState } from 'react'
import { ThemeProvider } from 'styled-components'
import * as SplashScreen from 'expo-splash-screen'
import * as Font from 'expo-font'
import { StatusBar, View } from 'react-native'

import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins'

import theme from './src/global/styles/theme'

import { NavigationContainer } from '@react-navigation/native'
import { AppRoutes } from './src/routes/app.routes'

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false)

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync()
        await Font.loadAsync({
          Poppins_400Regular,
          Poppins_500Medium,
          Poppins_700Bold,
        })
      } catch (e) {
        console.warn(e)
      } finally {
        setAppIsReady(true)
      }
    }

    prepare()
  }, [])

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync()
    }
  }, [appIsReady])

  if (!appIsReady) {
    return null
  }

  return (
    <View
      onLayout={onLayoutRootView}
      style={{
        flex: 1,
      }}
    >
      <ThemeProvider theme={theme}>
        <NavigationContainer>
          <StatusBar barStyle="light-content" />
          <AppRoutes />
        </NavigationContainer>
      </ThemeProvider>
    </View>
  )
}
