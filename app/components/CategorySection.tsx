import { observer } from "mobx-react-lite"
import * as React from "react"
import { StyleProp, TextStyle, View, ViewStyle } from "react-native"
import { spacing } from "../theme"
import { CategoryCard } from "./CategoryCard"
import { SectionHeader } from "./SectionHeader"

export interface CategorySectionProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
}

/**
 * Describe your component here
 */
export const CategorySection = observer(function CategorySection(props: CategorySectionProps) {
  const { style } = props
  const $styles = [$container, style]

  return (
    <View style={$styles}>
      <View style={$textContainer}>
        <SectionHeader tx="categorySectionComponent.name"></SectionHeader>
      </View>
      <View style={$categoryList}>
        <CategoryCard style={$category} />
        <CategoryCard style={$category} />
      </View>
    </View>
  )
})

const $container: ViewStyle = {
  justifyContent: "center",
}

const $categoryList: ViewStyle = {
  flexDirection: "row",
  marginTop: spacing.medium,
}

const $category: ViewStyle = {
  marginRight: spacing.small,
}

const $textContainer: TextStyle = {
  marginTop: spacing.large,
}
