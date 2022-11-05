import { observer } from "mobx-react-lite"
import * as React from "react"
import { StyleProp, TextStyle, ViewStyle } from "react-native"
import { colors, spacing } from "../theme"
import { CardWrapper } from "./CardWrapper"
import { ProgressBar } from "./ProgressBar"
import { Text } from "./Text"

export interface CategoryProgressCardProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
}

/**
 * Describe your component here
 */
export const CategoryProgressCard = observer(function CategoryProgressCard(
  props: CategoryProgressCardProps,
) {
  const { style } = props
  const $styles = [$container, style]

  return (
    <CardWrapper style={$styles}>
      <Text style={$secondaryText} size="xs">
        40 Tasks
      </Text>
      <Text size="md" preset="bold">
        Business
      </Text>
      <ProgressBar style={$progressBar} />
    </CardWrapper>
  )
})

const $container: ViewStyle = {
  padding: spacing.medium,
}

const $text: TextStyle = {}

const $secondaryText: TextStyle = {
  color: colors.palette.primary300,
}

const $progressBar: ViewStyle = {
  marginTop: spacing.medium,
}
