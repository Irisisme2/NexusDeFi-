import React, { useState } from 'react';
import {
  Box,
  Text,
  Flex,
  Select,
  Input,
  Button,
  Divider,
  Stack,
  Image,
  IconButton,
  InputGroup,
  InputLeftElement,
  HStack,
} from '@chakra-ui/react';
import Card from 'components/card/Card'; // Ensure this path is correct for your project
import { MdSwapVert } from 'react-icons/md';

// Import token icons
import btcIcon from 'assets/img/icons/Btc.jpg';
import ethIcon from 'assets/img/icons/Eth.png';
import adaIcon from 'assets/img/icons/Ada.jpg';
import dotIcon from 'assets/img/icons/Dot.png';
import bnbIcon from 'assets/img/icons/Bnb.png';

// Example token data with icons and balances
const tokens = [
  { symbol: 'BTC', name: 'Bitcoin', icon: btcIcon, balance: 0.5, rate: 60000 },  // Example: 1 BTC = 60000 USD
  { symbol: 'ETH', name: 'Ethereum', icon: ethIcon, balance: 10, rate: 4000 },   // Example: 1 ETH = 4000 USD
  { symbol: 'USDT', name: 'Tether', icon: adaIcon, balance: 10000, rate: 1 },    // Example: 1 USDT = 1 USD
  { symbol: 'BNB', name: 'Binance Coin', icon: bnbIcon, balance: 50, rate: 500 },// Example: 1 BNB = 500 USD
  { symbol: 'ADA', name: 'Cardano', icon: dotIcon, balance: 5000, rate: 2 },     // Example: 1 ADA = 2 USD
];

// Example swap history data
const swapHistory = [
  { from: 'BTC', to: 'ETH', fromAmount: 0.1, toAmount: 1.5, date: '2024-08-01', fee: 0.0075 },
  { from: 'ADA', to: 'USDT', fromAmount: 1000, toAmount: 2000, date: '2024-08-02', fee: 10 },
  { from: 'ETH', to: 'BNB', fromAmount: 2, toAmount: 4, date: '2024-08-03', fee: 0.02 },
];

const SwapWidget = () => {
  const [fromToken, setFromToken] = useState('BTC');
  const [toToken, setToToken] = useState('ETH');
  const [amount, setAmount] = useState('');
  const transactionFeeRate = 0.005; // 0.5% transaction fee

  const fromTokenData = tokens.find((t) => t.symbol === fromToken);
  const toTokenData = tokens.find((t) => t.symbol === toToken);

  const handleSwap = () => {
    // Implement swap logic here
    console.log(`Swapping ${amount} ${fromToken} to ${toToken}`);
  };

  const renderTokenOption = (token) => (
    <option key={token.symbol} value={token.symbol}>
      {token.name} ({token.symbol})
    </option>
  );

  const getTokenIcon = (symbol) => {
    const token = tokens.find((t) => t.symbol === symbol);
    return token ? token.icon : null;
  };

  const calculateEstimatedReceive = () => {
    if (!amount || isNaN(amount)) return 0;
    const estimatedAmount = (amount * fromTokenData.rate) / toTokenData.rate;
    const transactionFee = estimatedAmount * transactionFeeRate;
    return estimatedAmount - transactionFee;
  };

  return (
    <Box>
      {/* Swap Widget */}
      <Card p='6' borderRadius='md' boxShadow='lg' bg='white' mb='6'>
        <Text fontSize='2xl' fontWeight='bold' mb='4' textAlign='center'>
          Swap Tokens
        </Text>
        <Divider mb='4' />

        <Stack spacing='6'>
          <Flex align='center' justify='space-between'>
            <Flex align='center'>
              <Image
                src={getTokenIcon(fromToken)}
                boxSize='40px'
                objectFit='cover'
                borderRadius='full'
                mr='3'
              />
              <Select
                value={fromToken}
                onChange={(e) => setFromToken(e.target.value)}
                w='full'
              >
                {tokens.map(renderTokenOption)}
              </Select>
            </Flex>

            <IconButton
              icon={<MdSwapVert size='24px' />}
              aria-label='Swap Tokens'
              onClick={() => {
                const temp = fromToken;
                setFromToken(toToken);
                setToToken(temp);
              }}
              colorScheme='blue'
              variant='outline'
              borderRadius='full'
              mx='4'
            />

            <Flex align='center'>
              <Image
                src={getTokenIcon(toToken)}
                boxSize='40px'
                objectFit='cover'
                borderRadius='full'
                mr='3'
              />
              <Select
                value={toToken}
                onChange={(e) => setToToken(e.target.value)}
                w='full'
              >
                {tokens.map(renderTokenOption)}
              </Select>
            </Flex>
          </Flex>

          <Text fontSize='sm' color='gray.600' textAlign='right'>
            You have: {fromTokenData.balance} {fromTokenData.symbol}
          </Text>

          <InputGroup size='lg'>
            <InputLeftElement
              pointerEvents='none'
              children={<Text fontWeight='bold'>{fromToken}</Text>}
            />
            <Input
              placeholder='Enter amount'
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              type='number'
            />
          </InputGroup>

          <HStack justifyContent='space-between'>
            <Text fontSize='sm' color='gray.600'>
              Estimated Receive: {calculateEstimatedReceive().toFixed(4)} {toToken}
            </Text>
            <Text fontSize='sm' color='gray.600'>
              Transaction Fee: {(calculateEstimatedReceive() * transactionFeeRate).toFixed(4)} {toToken}
            </Text>
          </HStack>

          <Button
            colorScheme='blue'
            size='lg'
            onClick={handleSwap}
            isFullWidth
            isDisabled={!amount || amount <= 0 || amount > fromTokenData.balance}
          >
            Swap
          </Button>
        </Stack>
      </Card>

      {/* Swap History */}
      <Card p='6' borderRadius='md' boxShadow='lg' bg='white'>
        <Text fontSize='2xl' fontWeight='bold' mb='4' textAlign='center'>
          Swap History
        </Text>
        <Divider mb='4' />

        <Stack spacing='4'>
          {swapHistory.map((swap, index) => (
            <Flex key={index} justify='space-between' align='center' p='3' borderRadius='md' bg='gray.50' _hover={{ bg: 'gray.100' }}>
              <HStack spacing='3'>
                <Image src={getTokenIcon(swap.from)} boxSize='24px' />
                <Text fontWeight='bold'>
                  {swap.fromAmount} {swap.from} {'->'} {swap.toAmount} {swap.to}
                </Text>
              </HStack>
              <Text fontSize='sm' color='gray.600'>
                {swap.date}
              </Text>
              <Text fontSize='sm' color='gray.600'>
                Fee: {swap.fee} {swap.to}
              </Text>
            </Flex>
          ))}
        </Stack>
      </Card>
    </Box>
  );
};

export default SwapWidget;

