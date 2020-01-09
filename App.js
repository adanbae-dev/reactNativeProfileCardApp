import React, { Component } from 'react'
import { StyleSheet, View, Text, Image, Platform, TouchableHighlight } from 'react-native'
import PropTypes from 'prop-types'
import update from 'immutability-helper'


const userImage = require('./user.png')

const data = [{
  image: userImage,
  name: 'John Doe',
  occupation: 'React Native Devloper',
  description: 'John is a really great JavaScript developer, He Loves using JS to build React Native applications for iOS and Android.',
  showThumbnail: true
}];

const ProfileCard = (props) => {
  const { image, name, occupation, description, onPress, showThumbnail } = props;
  let conatinerStyls = [styles.cardContainer];

  if(showThumbnail){
    conatinerStyls.push(styles.cardThumbnail)
  }
  return (
    <TouchableHighlight onPress= {onPress} >
      <View style={[conatinerStyls]}>
        <View style={styles.cardImageContainer}>
          <Image style={styles.cardImage} source={image} />
        </View>
        <View>
          <Text style={styles.cardTitle}>
            {name}
          </Text>
        </View>
        <View style={styles.cardSubtitleContainer}>
          <Text style={styles.cardSubtitle}>
            {occupation}
          </Text>
        </View>
        <View>
          <Text style={styles.cardDescription}>
            {description}
          </Text>
        </View>
      </View>
    </TouchableHighlight>
  )
}

ProfileCard.propTypes = {
  image: PropTypes.number.isRequired,
  name: PropTypes.string.isRequiredm,
  occupation : PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  showThumbnail: PropTypes.bool.isRequired,
  onPress: PropTypes.func.isRequired
}
export default class App extends Component {

  constructor(props, context) {
    super(props, context)
    this.state = {
      data: data
    }
  }

  handleProfileCardPress = (index) => {
    const showThumbnail = !this.state.data[index].showThumbnail
    this.setState({
      data: update(this.state.data, {[index]:{showThumbnail: {$set: showThumbnail}}})
    })
  }
  render() {
    const list = this.state.data.map(function(item, index) {
      const { image, name, occupation, description, showThumbnail } = item
      return <ProfileCard key={'card-'+index}
                          image={image}
                          name={name}
                          occupation={occupation}
                          description={description}
                          onPress={this.handleProfileCardPress.bind(this, index)}
                          showThumbnail={showThumbnail}/>
    }, this)
    return (
      <View style={styles.container}>
        {list}
      </View>
    )
  }
}

const profileCardColor = 'dodgerblue'

const styles = StyleSheet.create({
  container : {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

  },
  cardThumbnail: {
    transform:[{scale: 0.2}]
  },
  cardContainer: {
    alignItems: 'center',
    borderColor: 'black',
    borderWidth: 3,
    borderStyle: 'solid',
    borderRadius: 20,
    backgroundColor: profileCardColor,
    width: 300,
    height: 400,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: {
          height: 10
        },
        shadowOpacity: 1
      },
      android: {
        elevation: 15
      }
    })
  },
  cardImageContainer: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderWidth: 3,
    borderColor: 'black',
    width: 120,
    height: 120,
    borderRadius: 60,
    marginTop: 30,
    paddingTop: 15,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: {
          height: 10
        },
        shadowOpacity: 1
      },
      android: {
        elevation: 15,
        borderColor: 'black',
        borderWidth: 3
      }
    })
  },
  cardImage: {
    width: 80,
    height: 80
  },
  cardTitle: {
    color: 'white',
    marginTop: 30,
    fontWeight: 'bold',
    fontSize: 24,
    textShadowColor: 'black',
    textShadowOffset: {
      height: 2,
      width: 2
    },
    textShadowRadius: 3

  },
  cardSubtitleContainer: {
    borderColor: 'black',
    borderWidth: 3,
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderLeftWidth: 0
  },
  cardSubtitle: {
    marginTop: 10,
    marginBottom: 10,
    fontWeight: 'bold'
  },
  cardDescription : {
    fontStyle: 'italic',
    marginTop: 10,
    marginRight: 40,
    marginLeft: 40,
    marginBottom: 10
  }

})