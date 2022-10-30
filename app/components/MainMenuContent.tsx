import * as React from "react"
import { FlatList, ImageStyle, StyleProp, TextStyle, View, ViewStyle, Image } from "react-native"
import { observer } from "mobx-react-lite"
import { colors, spacing, typography } from "../theme"
import { Text } from "./Text"
import { useRef } from "react"
import { SafeAreaView } from "react-native-safe-area-context"

const logo = require("../../assets/images/logo.png")

export interface AppMenuProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
}

/**
 * App menu content
 */
export const MainMenuContent = function MainMenuContent(props: AppMenuProps) {
  const { style } = props
  const $styles = [$container, style]
  const menuRef = useRef<FlatList>()

  return (
    <SafeAreaView style={$drawer} edges={["top"]}>
      <View style={$logoContainer}>
        <Image source={logo} style={$logoImage} />
      </View>

      <FlatList<{ name: string; useCases: string[] }>
        ref={menuRef}
        contentContainerStyle={$flatListContentContainer}
        data={[]}
        keyExtractor={(item) => item.name}
        renderItem={({ item, index: sectionIndex }) => <View></View>}
      />
    </SafeAreaView>
  )
}

const $container: ViewStyle = {
  justifyContent: "center",
}

const $text: TextStyle = {
  fontFamily: typography.primary.normal,
  fontSize: 14,
  color: colors.palette.primary500,
}

const $logoContainer: ViewStyle = {
  alignSelf: "flex-start",
  height: 56,
  paddingHorizontal: spacing.large,
}

const $drawer: ViewStyle = {
  flex: 1,
}

const $logoImage: ImageStyle = {
  height: 42,
  width: 77,
}

const $flatListContentContainer: ViewStyle = {
  paddingHorizontal: spacing.large,
}
