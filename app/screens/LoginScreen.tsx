import type { AuthCredential } from "@firebase/auth"
import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import { Alert, Image, ImageStyle, TextStyle, View, ViewStyle } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Button, Text } from "../components"
import useGoogleAuthentication from "../hooks/useGoogleAuthentication"
import { isRTL } from "../i18n"
import { useStores } from "../models"
import { AppStackScreenProps } from "../navigators"
import { authenticationService } from "../services/firebase/authenticationService"
import { colors, spacing } from "../theme"

const welcomeLogo = require("../../assets/images/logo.png")
const welcomeFace = require("../../assets/images/welcome-face.png")

interface WelcomeScreenProps extends AppStackScreenProps<"Login"> {}

export const LoginScreen: FC<WelcomeScreenProps> = observer(function WelcomeScreen() {
  const [googleAuthLoading, authWithGoogle] = useGoogleAuthentication()

  const { authenticationStore } = useStores()

  async function login(credential: AuthCredential, data?: any) {
    const user = await authenticationService.loginWithCredential(credential, data)
    authenticationStore.setUser(user)
  }

  async function loginWithGoogle() {
    try {
      const [credential] = await authWithGoogle()
      await login(credential)
    } catch (error: any) {
      console.error(error)
      Alert.alert("Error", "Something went wrong. Please try again later.")
    }
  }

  return (
    <View style={$container}>
      <View style={$topContainer}>
        <Image style={$welcomeLogo} source={welcomeLogo} resizeMode="contain" />
        <Text
          testID="welcome-heading"
          style={$welcomeHeading}
          tx="welcomeScreen.readyForLaunch"
          preset="heading"
        />
        <Text tx="welcomeScreen.exciting" preset="subheading" />
        <Image style={$welcomeFace} source={welcomeFace} resizeMode="contain" />
      </View>

      <SafeAreaView style={$bottomContainer} edges={["bottom"]}>
        <Button style={$button} onPress={loginWithGoogle}>
          Zaloguj
        </Button>
      </SafeAreaView>
    </View>
  )
})

const $container: ViewStyle = {
  flex: 1,
  backgroundColor: colors.background,
}

const $topContainer: ViewStyle = {
  flexShrink: 1,
  flexGrow: 1,
  flexBasis: "57%",
  justifyContent: "center",
  paddingHorizontal: spacing.large,
}

const $bottomContainer: ViewStyle = {
  flexShrink: 1,
  flexGrow: 0,
  flexBasis: "43%",
  justifyContent: "flex-end",
  backgroundColor: colors.palette.neutral100,
  borderTopLeftRadius: 16,
  borderTopRightRadius: 16,
  paddingHorizontal: spacing.large,
  paddingBottom: spacing.large,
}

const $bottomContentContainer: ViewStyle = {
  flex: 1,
  paddingHorizontal: spacing.large,
  justifyContent: "space-around",
}

const $welcomeLogo: ImageStyle = {
  height: 88,
  width: "100%",
  marginBottom: spacing.huge,
}

const $welcomeFace: ImageStyle = {
  height: 169,
  width: 269,
  position: "absolute",
  bottom: -47,
  right: -80,
  transform: [{ scaleX: isRTL ? -1 : 1 }],
}

const $welcomeHeading: TextStyle = {
  marginBottom: spacing.medium,
}

const $button: ViewStyle = {}
