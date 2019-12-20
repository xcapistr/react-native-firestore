import React, { useState } from 'react'
import {
  StyleSheet,
  View,
  Text,
  Button,
  FlatList,
  ActivityIndicator
} from 'react-native'
import * as firebase from 'firebase'
import 'firebase/firestore'

import { config } from '../firebase.config'
import Card from '../components/Card'

try {
  firebase.initializeApp(config)
  console.log('DB init')
} catch (error) {
  console.log('DB exists')
}

const firestore = firebase.firestore()

const MainScreen = props => {
  const [songs, setSongs] = useState([])
  const [loading, setLoading] = useState(false)

  const getData = () => {
    setLoading(true)
    setSongs([])
    const songsRef = firestore.collection('songs')
    songsRef
      .get()
      .then(songs => {
        songs.forEach(doc => {
          const song = doc.data()
          // TODO: get artist from reference
          setSongs(prev => [
            ...prev,
            { name: song.name, artist: 'Korben Dallas', text: song.text }
          ])
        })
      })
      .then(() => {
        setLoading(false)
      })
      .catch(err => {
        console.log('ERROR:', err)
        setLoading(false)
      })
  }

  return (
    <View style={styles.screen}>
      <Button title="getData" onPress={getData} />
      <View style={styles.container}>
        {loading ? (
          <ActivityIndicator size="large" />
        ) : songs.length === 0 ? (
          <Text style={styles.noContent}>No data loaded!</Text>
        ) : (
          <FlatList
            data={songs}
            keyExtractor={item => item.name + '-' + item.artist}
            renderItem={itemData => (
              <Card>
                <Text style={styles.title}>{itemData.item.name}</Text>
                <Text style={styles.artist}>{itemData.item.artist}</Text>
                <Text style={styles.text}>{itemData.item.text}</Text>
              </Card>
            )}
          />
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    marginTop: 50
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  content: {
    flex: 1,
    justifyContent: 'center'
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20
  },
  artist: {
    marginTop: 5,
    fontSize: 18
  },
  text: {
    marginTop: 10
  },
  noContent: {
    margin: 50,
    textAlign: 'center',
    color: '#888'
  }
})

export default MainScreen
