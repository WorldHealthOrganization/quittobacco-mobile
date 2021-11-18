// Imports
import { Dimensions } from 'react-native'

// Scale
const scaleFactor = 1.4
export const scalable = size => (size * (deviceWidth >= breakpointTablet ? scaleFactor : 1))

// Breakpoints
export const breakpointMobile = 320
export const breakpointTablet = 768

// Device
export const deviceWidth = Dimensions.get('window').width
export const deviceHeight = Dimensions.get('window').height

// Margin and Padding
export const blockMargin = deviceWidth >= breakpointTablet ? (14 * scaleFactor) : 14
export const blockMarginHalf = blockMargin / 2
export const blockPadding = deviceWidth >= breakpointTablet ? (14 * scaleFactor) : 14
export const blockPaddingHalf = blockPadding / 2

// Font
export const font = size => (size * (deviceWidth >= breakpointTablet ? scaleFactor : 1))

// Button
export const buttonPadding = deviceWidth >= breakpointTablet ? (10 * scaleFactor) : 10
export const buttonRadius = deviceWidth >= breakpointTablet ? (20 * scaleFactor) : 20

// Item
export const itemSpacing = deviceWidth >= breakpointTablet ? (20 * scaleFactor) : 20
export const itemRadius = deviceWidth >= breakpointTablet ? (14 * scaleFactor) : 14
export const itemRadiusHalf = itemRadius / 2

// Navigation
export const navigationTopHeight = deviceWidth >= breakpointTablet ? (90 * scaleFactor) : 90

// Navigation
export const navigationTopHeightCheckOut = deviceWidth >= breakpointTablet ? (90 * scaleFactor) : 90