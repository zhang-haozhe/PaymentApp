import * as React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Button,
} from 'react-native';
import { PaymentsStripe as stripe } from 'expo-payments-stripe';

const axios = require('axios');
export default function App() {
  const [product, setproduct] = React.useState({
    amount: 100,
    productName: 'Coffee',
    customerName: 'John',
    customerEmail: 'John@doe.com',
  });

  React.useEffect(() => {
    stripe.setOptionsAsync({
      publishableKey: '',
    });
  });

  async function test() {
    try {
      const response = await axios.get('http://35.224.196.84:8080/test');
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }
  async function pay() {
    const token = await stripe.paymentRequestWithCardFormAsync();
    console.log(token);

    const apiURL = 'http://10.0.2.2:8080/pay';

    const body = {
      token,
      product,
      // str: 'hello world',
    };

    const headers = {
      'Content-Type': 'application/json',
    };
    return fetch(apiURL, {
      method: 'post',
      headers,
      body: JSON.stringify(body),
    })
      .then((result) => {
        console.log(result);
      })
      .catch((error) => console.log(error));
  }
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri:
            'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
          height: 256,
          width: 256,
        }}
        style={{ borderRadius: 8 }}
      />
      <TouchableOpacity onPress={pay}>
        <View style={styles.button}>
          <Text style={{ color: 'white' }}>Pay me 1 dollah</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  button: {
    backgroundColor: 'orange',
    padding: 20,
    marginTop: 20,
    borderRadius: 8,
  },
});
