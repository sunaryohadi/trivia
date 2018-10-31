/**
 * Sample Trivia - Sunaryo Hadi
 * https://www.sunaryohadi.info
 *
 * @format
 * @flow
 */
import React, {Component} from 'react';
import {Text, View, Button, ActivityIndicator, TouchableOpacity } from 'react-native';
import axios from 'axios'
import styles from './styles'

const instructions = 'Test your knowlege about the movie!!';

type Props = {};
export default class App extends Component<Props> {
  constructor(props, context) {
    super(props, context);
    this.state = {
      data: [],
      count: 0,
      point: 0,
      error: null,
      loading: false,
      result: false,
    }
  }

  makeRemoteRequest = () => {
    this.setState({ loading: true, error: null });

    axios.get('https://opentdb.com/api.php?amount=10&category=11&type=multiple').then(res => {
      console.log('Result',res)
      this.setState({
        data: res.data.results,
        count: 0, 
        point:0,
        result: false,
        loading: false,
      })
    }).catch( (error) => {
      this.setState({
        error,
        data: [],
        trivia: { no: 0, point: 0},
        loading: false,
      })
      console.log(error.message)
    });
  }

  _submit = (answer) => {
    this.setState({ loading: true, error: null });
    let qa = this.state.data[this.state.count]
    // console.log(qa)
    if (qa.correct_answer === answer) {
      this.setState({ loading: false, count: this.state.count+1, point: this.state.point + 1 });
    } else {
      this.setState({ loading: false, count: this.state.count+1 });
    }

    // Move to the Next Question or set result=true when ending
    if (this.state.count < this.state.data.length-1 )
      this.setState({ count: this.state.count+1 });
    else 
      this.setState({ result: true });

  }

  render() {
    console.log(this.state)

    if (this.state.loading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator animating size="large" />
          <View style={{ height: 20 }}/>
          <Text style={styles.text}>Loading ...</Text>
        </View>
      )
    } else if (this.state.result) {
      return (
        <View style={styles.container}>
          <Text style={styles.title}>Your Score!</Text>
          <View style={{ height: 20 }}/>
          <Text style={styles.score}>{ this.state.point }/10</Text>
          <View style={{ height: 50 }}/>
          <Button title="Play Again!" onPress={ () => this.makeRemoteRequest() } />
        </View>
      )
    } else if (this.state.error) {
      return (
        <View style={styles.container}>
          <Text style={styles.title}>Uh Oh!</Text>
          <Text style={styles.text}>Cannot fech questions {'\n'} '{this.state.error.message}'</Text>
          <View style={{ height: 
            0 }}/>
          <Button title="Try Again" onPress={ () => this.makeRemoteRequest() } />
        </View>
      )
    } else if (this.state.data.length > 0 ) {
      let qa = this.state.data[this.state.count]
      let mchoice = shuffleArray([ ...qa.incorrect_answers,qa.correct_answer]);
      console.log(mchoice);
      return (
        <View style={{ ...styles.container, paddingHorizontal: 20 } }>
          <Text style={styles.title}>{ esc(qa.question) }</Text>
          <View style={{ height: 30 }}/>
          <View style={{ flexDirection: 'column', alignItems: 'center', width: '100%' }}>
          { 
            mchoice.map(function(item, index) {
              return (
                <TouchableOpacity key={index} onPress={ () => this._submit(item) }>
                <View style={styles.choice}>
                    <Text style={styles.btn}>{ esc(item) }</Text>
                </View>
                </TouchableOpacity>
              )
            }.bind(this))
          }
          </View>
        </View>
      )
    } else {
      return (
          <View style={styles.container}>
            <Text style={styles.title}>Movie Trivia!</Text>
            <Text style={styles.text}>{instructions}</Text>

            <View style={{ height: 50 }}/>
            <Button title="Start Quiz" onPress={ () => this.makeRemoteRequest() } />
          </View>
      );
    }
  }
}

// Shuffle the array
function shuffleArray(array) {
  let i = array.length - 1;
  for (; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

// Escape common HTML entity
function esc(text) {
  var entities = {
    'amp': '&',
    'apos': '\'',
    'lt': '<',
    'gt': '>',
    'quot': '"',
    'nbsp': '\xa0',
    'aacute': "á",
    'oacute': "ó",
    'ntilde': 'ñ',

  };
  var entityPattern = /&([a-z]+);/ig;

  var res = text.replace(entityPattern, function(match, entity) {
    entity = entity.toLowerCase();
    if (entities.hasOwnProperty(entity)) {
      return entities[entity];
    }
    // return original string if there is no matching entity (no replace)
    return match;
  });

  return res.replace(/&#039;/g,"'");

}
