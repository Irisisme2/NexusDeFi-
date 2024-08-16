import React, { useState } from 'react';
import {
  Box,
  Text,
  Flex,
  Select,
  Input,
  Button,
  Stack,
  Image,
  Divider,
} from '@chakra-ui/react';
import Card from 'components/card/Card'; // Ensure this path is correct for your project

// Import token icons
import btcIcon from 'assets/img/icons/Btc.jpg';
import ethIcon from 'assets/img/icons/Eth.png';
import adaIcon from 'assets/img/icons/Ada.jpg';
import dotIcon from 'assets/img/icons/Dot.png';
import bnbIcon from 'assets/img/icons/Bnb.png';

// Example token data with icons and prices
const tokens = [
  { symbol: 'BTC', name: 'Bitcoin', icon: btcIcon, price: 60000 }, // Example: 1 BTC = 60000 USD
  { symbol: 'ETH', name: 'Ethereum', icon: ethIcon, price: 4000 }, // Example: 1 ETH = 4000 USD
  { symbol: 'ADA', name: 'Cardano', icon: adaIcon, price: 2 },     // Example: 1 ADA = 2 USD
  { symbol: 'BNB', name: 'Binance Coin', icon: bnbIcon, price: 500 }, // Example: 1 BNB = 500 USD
  { symbol: 'DOT', name: 'Polkadot', icon: dotIcon, price: 25 },    // Example: 1 DOT = 25 USD
];

const BuyCrypto = () => {
  const [selectedToken, setSelectedToken] = useState('BTC');
  const [amountUSD, setAmountUSD] = useState('');
  const [estimatedCrypto, setEstimatedCrypto] = useState(0);

  const selectedTokenData = tokens.find((t) => t.symbol === selectedToken);

  const handleBuy = () => {
    // Implement purchase logic here
    console.log(`Purchasing ${amountUSD} USD of ${selectedToken}`);
  };

  const handleAmountChange = (e) => {
    const usdValue = e.target.value;
    setAmountUSD(usdValue);
    setEstimatedCrypto(usdValue / selectedTokenData.price);
  };

  return (
    <Card p='6' borderRadius='md' boxShadow='lg' bg='white' minHeight='510px'> {/* Adjust minHeight as needed */}
      <Text fontSize='2xl' fontWeight='bold' mb='4' textAlign='center'>
        Buy Cryptocurrency
      </Text>
      <Divider mb='4' />

      <Stack spacing='6'>
        {/* Select Cryptocurrency */}
        <Flex align='center'>
          <Image
            src={selectedTokenData.icon}
            boxSize='40px'
            objectFit='cover'
            borderRadius='full'
            mr='3'
          />
          <Select
            value={selectedToken}
            onChange={(e) => setSelectedToken(e.target.value)}
            w='full'
          >
            {tokens.map((token) => (
              <option key={token.symbol} value={token.symbol}>
                {token.name} ({token.symbol})
              </option>
            ))}
          </Select>
        </Flex>

        {/* Enter USD Amount */}
        <Input
          placeholder='Enter amount in USD'
          value={amountUSD}
          onChange={handleAmountChange}
          type='number'
        />

        {/* Estimated Cryptocurrency */}
        <Text fontSize='md' color='gray.600'>
          Estimated {selectedTokenData.symbol}: {estimatedCrypto.toFixed(6)}
        </Text>

        {/* Buy Button */}
        <Button
          colorScheme='blue'
          size='lg'
          onClick={handleBuy}
          isFullWidth
          isDisabled={!amountUSD || amountUSD <= 0}
        >
          Buy {selectedTokenData.symbol} with Coinbase
        </Button>
      </Stack>
    </Card>
  );
};

export default BuyCrypto;
