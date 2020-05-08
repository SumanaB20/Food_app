import {StyleSheet, Dimensions} from 'react-native';
const {width, height} = Dimensions.get ('window');
const SCREEN_WIDTH = width < height ? width : height;

export const FoodCard = StyleSheet.create ({
  container: {
    position: 'relative',
    flex: 1,
    justifyContent: 'center',
    marginLeft: 20,
    marginTop: 20,
    width: (SCREEN_WIDTH - (2 + 1) * 20) / 2,
    height: 150 + 100,
    borderColor: '#cccccc',
    backgroundColor: 'white',
    borderWidth: 0.5,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  photo: {
    width: (SCREEN_WIDTH - (2 + 1) * 20) / 2,
    height: 150,
    borderRadius: 15,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderColor: 'white',
    borderWidth: 5,
  },
  title: {
    flex: 1,
    fontSize: 15,
    fontWeight: 'bold',
    textTransform: 'capitalize',
    textAlign: 'left',
    color: '#444444',
    marginTop: 3,
    marginRight: 5,
    marginLeft: 5,
  },
  category: {
    fontSize: 12,
    marginTop: 5,
    marginBottom: 5,
  },
  no_data: {
    fontSize: 17,
    textAlign: 'center',
    padding: 50,
    backgroundColor: '#ff9999',
    color: 'white',
  },
});
