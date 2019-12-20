import React from 'react'
import { StyleSheet, View } from 'react-native'

const Card = props => {
  return(
    <View style={styles.container}>
        {props.children}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderColor: '#ccc',
    borderRadius: 10,
    borderWidth: 1,
    padding: 20,
    margin: 20
  }
})

export default Card