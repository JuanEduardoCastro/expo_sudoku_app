const Animated = require("react-native").Animated;

module.exports = {
  default: {
    createAnimatedComponent: (component) => component,
    View: require("react-native").View,
    Text: require("react-native").Text,
    ScrollView: require("react-native").ScrollView,
    Image: require("react-native").Image,
  },
  Easing: {
    in: jest.fn((x) => x),
    out: jest.fn((x) => x),
    inOut: jest.fn((x) => x),
    quad: jest.fn(),
    cubic: jest.fn(),
  },
  useSharedValue: jest.fn((init) => ({ value: init })),
  useAnimatedStyle: jest.fn((fn) => ({})),
  withTiming: jest.fn((toValue) => toValue),
  withRepeat: jest.fn((animation) => animation),
  withSequence: jest.fn((...args) => args[0]),
  createAnimatedComponent: (component) => component,
};
