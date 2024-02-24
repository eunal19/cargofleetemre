/* const prodConfig = {
  apiKey: 'AIzaSyAo9XhYAvVgtVynXridFdsg4Qtb0DvgTo0',
  authDomain: 'emplosoft-2db9f.firebaseapp.com',
  projectId: 'emplosoft-2db9f',
  databaseURL: 'https://emplosoft-2db9f-default-rtdb.firebaseio.com',
  storageBucket: 'emplosoft-2db9f.appspot.com',
  messagingSenderId: '460039525265',
  appId: '1:460039525265:web:aec32080d87de88acf0030'
};
const devConfig = {
  apiKey: 'AIzaSyAo9XhYAvVgtVynXridFdsg4Qtb0DvgTo0',
  authDomain: 'emplosoft-2db9f.firebaseapp.com',
  projectId: 'emplosoft-2db9f',
  databaseURL: 'https://emplosoft-2db9f-default-rtdb.firebaseio.com',
  storageBucket: 'emplosoft-2db9f.appspot.com',
  messagingSenderId: '460039525265',
  appId: '1:460039525265:web:aec32080d87de88acf0030'
}; */

const prodConfig = {
  apiKey: 'AIzaSyDS1rd7aVd4NWzMVrZQhL1q6rkmKROmjbw',
  authDomain: 'cargofleet-23-4-team1.firebaseapp.com',
  databaseURL: 'https://cargofleet-23-4-team1-default-rtdb.firebaseio.com',
  projectId: 'cargofleet-23-4-team1',
  storageBucket: 'cargofleet-23-4-team1.appspot.com',
  messagingSenderId: '734721739593',
  appId: '1:734721739593:web:26febe17c8f0ea81192898',
  measurementId: 'G-JBTQ2R1QF1'
};
const devConfig = {
  apiKey: 'AIzaSyDS1rd7aVd4NWzMVrZQhL1q6rkmKROmjbw',
  authDomain: 'cargofleet-23-4-team1.firebaseapp.com',
  databaseURL: 'https://cargofleet-23-4-team1-default-rtdb.firebaseio.com',
  projectId: 'cargofleet-23-4-team1',
  storageBucket: 'cargofleet-23-4-team1.appspot.com',
  messagingSenderId: '734721739593',
  appId: '1:734721739593:web:26febe17c8f0ea81192898',
  measurementId: 'G-JBTQ2R1QF1'
};

const config = process.env.NODE_ENV === 'production' ? prodConfig : devConfig;

export default config;
