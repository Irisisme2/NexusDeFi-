import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
  Text,
  VStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Divider,
  IconButton,
  useDisclosure,
  useToast,
  Spinner,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Collapse,
  Tooltip,
  Stack
} from '@chakra-ui/react';
import { AiOutlineSwap } from 'react-icons/ai'; // Example swap icon
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip as ChartTooltip, Legend, LineElement, CategoryScale, LinearScale } from 'chart.js';
import { calculateSwapAmount, getExchangeRate, getHistoricalData } from './utils/swapUtils'; // Placeholder utility functions
import Card from 'components/card/Card';

ChartJS.register(Title, ChartTooltip, Legend, LineElement, CategoryScale, LinearScale);

const tokenOptions = [
  { symbol: 'BTC', name: 'Bitcoin' },
  { symbol: 'ETH', name: 'Ethereum' },
  { symbol: 'ADA', name: 'Cardano' },
  { symbol: 'DOT', name: 'Polkadot' },
  { symbol: 'BNB', name: 'Binance Coin' },
  { symbol: 'SOL', name: 'Solana' }
];

const SwapInterface = () => {
  const [fromToken, setFromToken] = useState(tokenOptions[0].symbol);
  const [toToken, setToToken] = useState(tokenOptions[1].symbol);
  const [amount, setAmount] = useState('');
  const [expectedAmount, setExpectedAmount] = useState('');
  const [exchangeRate, setExchangeRate] = useState(0);
  const [fee, setFee] = useState(0.1); // Example fee percentage
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [historicalData, setHistoricalData] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  useEffect(() => {
    const fetchExchangeRate = async () => {
      try {
        setIsLoading(true);
        const rate = await getExchangeRate(fromToken, toToken);
        setExchangeRate(rate);
        const result = calculateSwapAmount(amount, rate, fee);
        setExpectedAmount(result);
        setError('');
      } catch (e) {
        setError('Failed to fetch exchange rate.');
        setExpectedAmount('');
      } finally {
        setIsLoading(false);
      }
    };

    if (amount && fromToken && toToken) {
      fetchExchangeRate();
    }
  }, [amount, fromToken, toToken]);

  useEffect(() => {
    const fetchHistoricalData = async () => {
      try {
        const data = await getHistoricalData(fromToken, toToken);
        setHistoricalData(data);
      } catch (e) {
        console.error('Failed to fetch historical data', e);
      }
    };

    if (fromToken && toToken) {
      fetchHistoricalData();
    }
  }, [fromToken, toToken]);

  const handleSwap = () => {
    if (isNaN(amount) || amount <= 0) {
      setError('Please enter a valid amount.');
      return;
    }
    onOpen();
  };

  const handleConfirmSwap = () => {
    toast({
      title: "Swap Executed",
      description: `You have swapped ${amount} ${fromToken} for ${expectedAmount} ${toToken}.`,
      status: "success",
      duration: 5000,
      isClosable: true,
    });
    onClose();
    setAmount('');
    setExpectedAmount('');
    setError('');
  };

  const lineChartData = {
    labels: historicalData.map(data => data.date),
    datasets: [
      {
        label: `Historical ${fromToken}/${toToken} Exchange Rate`,
        data: historicalData.map(data => data.rate),
        borderColor: '#3182CE',
        backgroundColor: 'rgba(49, 130, 206, 0.2)',
      },
    ],
  };

  return (
    <Card p='6' borderRadius='md' boxShadow='lg' bg='white' border='1px' borderColor='gray.200'>
      <Flex direction='column' align='center' mb='6'>
        <Text fontSize='2xl' fontWeight='bold' mb='2'>
          Swap Tokens
        </Text>
        <IconButton
          aria-label='Swap'
          icon={<AiOutlineSwap />}
          colorScheme='teal'
          size='lg'
          mb='4'
        />
      </Flex>
      <VStack spacing='4' align='stretch'>
        <FormControl id='from-token'>
          <FormLabel>From Token</FormLabel>
          <Select
            value={fromToken}
            onChange={(e) => setFromToken(e.target.value)}
            variant='outline'
          >
            {tokenOptions.map((token) => (
              <option key={token.symbol} value={token.symbol}>
                {token.name} ({token.symbol})
              </option>
            ))}
          </Select>
        </FormControl>
        <FormControl id='to-token'>
          <FormLabel>To Token</FormLabel>
          <Select
            value={toToken}
            onChange={(e) => setToToken(e.target.value)}
            variant='outline'
          >
            {tokenOptions.map((token) => (
              <option key={token.symbol} value={token.symbol}>
                {token.name} ({token.symbol})
              </option>
            ))}
          </Select>
        </FormControl>
        <FormControl id='amount'>
          <FormLabel>Amount</FormLabel>
          <Input
            type='number'
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder='Enter amount to swap'
            variant='outline'
            borderColor='gray.300'
          />
        </FormControl>
        <Collapse in={Boolean(error)}>
          <Alert status='error'>
            <AlertIcon />
            <AlertTitle mr={2}>Error!</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        </Collapse>
        <Box mt='4' p='4' borderRadius='md' bg='gray.50' boxShadow='md'>
          <Text fontWeight='bold' mb='2'>Swap Preview</Text>
          <Divider mb='2' />
          {isLoading ? (
            <Flex justify='center' align='center' height='100px'>
              <Spinner size='xl' />
            </Flex>
          ) : (
            <>
              <Text>From: {amount} {fromToken}</Text>
              <Text>To: {expectedAmount} {toToken}</Text>
              <Text>Exchange Rate: {exchangeRate.toFixed(6)}</Text>
              <Text>Fee: {fee}%</Text>
              <Text fontWeight='bold'>Total Amount to Receive: {expectedAmount} {toToken}</Text>
            </>
          )}
        </Box>
        <Button
          colorScheme='teal'
          size='lg'
          onClick={handleSwap}
          mt='4'
          isDisabled={!amount || isNaN(amount) || amount <= 0}
        >
          Execute Swap
        </Button>
      </VStack>

      <Box mt='6'>
        <Text fontSize='lg' fontWeight='bold'>Historical Exchange Rate</Text>
        <Box width='100%' height='300px'>
          <Line data={lineChartData} options={{ responsive: true, maintainAspectRatio: false }} />
        </Box>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirm Swap</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontWeight='bold' mb='2'>Confirm the following swap details:</Text>
            <Text>From: {amount} {fromToken}</Text>
            <Text>To: {expectedAmount} {toToken}</Text>
            <Text>Exchange Rate: {exchangeRate.toFixed(6)}</Text>
            <Text>Fee: {fee}%</Text>
            <Text fontWeight='bold'>Total Amount to Receive: {expectedAmount} {toToken}</Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='teal' mr='3' onClick={handleConfirmSwap}>
              Confirm
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Card>
  );
};

export default SwapInterface;
