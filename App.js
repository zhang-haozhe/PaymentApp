import * as React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import { PaymentsStripe as stripe } from 'expo-payments-stripe';

export default function App() {
  const [product, setproduct] = React.useState({
    amount: 100,
    productName: 'Coffee',
    customerName: 'John',
    customerEmail: 'John@doe.com',
  });

  React.useEffect(() => {
    stripe.setOptionsAsync({
      publishableKey: 'pk_test_5k46Yz1BbQw48FbrnqPhvDpW00wDV72QeN',
    });
  });
  async function pay() {
    const token = await stripe.paymentRequestWithCardFormAsync();
    console.log(token);

    const apiURL = 'http://localhost:8282/pay';

    const body = {
      token,
      product,
    };

    const headers = {
      'Content-Type': 'application/json',
    };
    return fetch(apiURL, {
      method: 'post',
      headers,
      body: JSON.stringify(body),
    })
      .then()
      .catch((error) => alert(error));
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
