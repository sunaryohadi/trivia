import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  score: {
  	fontSize: 30,
  	color: 'red',
    textAlign: 'center',
    margin: 10,
  },
  text: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  choice: {
    minWidth: 300,
    alignSelf: 'stretch',
  	marginHorizontal: 20,
  	marginBottom: 10,
  	backgroundColor: '#F6F6FF',
  	borderRadius: 3,
    justifyContent: 'center',
  	flexWrap: 'wrap',
  },
  btn: {
  	fontSize: 15,
  	color: '#33C',
  	paddingVertical: 12,
  	paddingHorizontal: 15,
  	
  },
});