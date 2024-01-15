// Imports
import React from 'react'
import PropTypes from 'prop-types'
import { View, StatusBar } from 'react-native'
import { SafeAreaView } from 'react-navigation'

// UI Imports
import { white, grey6, primary1 } from '../../../ui/common/colors'
import styles from './styles'

// App Imports
//import Message from '../Message'

// Component
const BodyInner = ({ children }) => (
  <React.Fragment>
    <View style={styles.wrapper}>
      {/* Content */}
      <View style={styles.content}>
        {children}
      </View>

      {/* Toast Message */}
     {/* <Message /> */}
    </View>
  </React.Fragment>
)

const Body = ({ fullscreen, backgroundColor, children }) => (
  <SafeAreaView style={[styles.container, { backgroundColor }]}>
    {/* <StatusBar
      // barStyle={'dark-content'}
      backgroundColor={'#F8F6E0'}
    /> */}
    <StatusBar translucent backgroundColor="transparent" />
    {
      fullscreen
        ? <SafeAreaView style={styles.container}>
          <BodyInner>{children}</BodyInner>
        </SafeAreaView>
        : <BodyInner>{children}</BodyInner>
    }
  </SafeAreaView>
)

Body.propTypes = {
  fullscreen: PropTypes.bool.isRequired,
  backgroundColor: PropTypes.string,
}
Body.defaultProps = {
  fullscreen: false,
  backgroundColor: grey6,
}

export default Body
