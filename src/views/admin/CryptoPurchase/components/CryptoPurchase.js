import React, { useState } from 'react';
import {
  Box,
  Button,
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
  Flex,
  Spinner,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Collapse,
  useDisclosure, // Importing useDisclosure
  useToast // Importing useToast
} from '@chakra-ui/react';
import Card from 'components/card/Card';

// Placeholder data
const cryptoOptions = [
  { symbol: 'BTC', name: 'Bitcoin' },
  { symbol: 'ETH', name: 'Ethereum' },
  { symbol: 'ADA', name: 'Cardano' },
  { symbol: 'DOT', name: 'Polkadot' },
  { symbol: 'BNB', name: 'Binance Coin' },
  { symbol: 'SOL', name: 'Solana' }
];

const paymentMethods = [
  'Credit/Debit Card',
  'Bank Transfer',
  'PayPal',
  'Crypto Wallet'
];

// Placeholder functions
const fetchCryptoPrice = async (symbol) => {
  return 50000; // Replace with actual API call
};

const calculateFee = (amount) => {
  const feePercentage = 0.02; // Example fee percentage
  return amount * feePercentage;
};

const CryptoPurchase = () => {
  const [selectedCrypto, setSelectedCrypto] = useState(cryptoOptions[0].symbol);
  const [amountFiat, setAmountFiat] = useState('');
  const [amountCrypto, setAmountCrypto] = useState('');
  const [paymentMethod, setPaymentMethod] = useState(paymentMethods[0]);
  const [transactionSummary, setTransactionSummary] = useState({
    cryptoData: {},
    totalFiat: 0,
    totalAmountCrypto: 0,
    fee: 0
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure(); // Using useDisclosure
  const toast = useToast(); // Using useToast

  const handleCalculateSummary = async () => {
    try {
      setIsLoading(true);
      const cryptoPrice = await fetchCryptoPrice(selectedCrypto);
      const fiatAmount = amountFiat ? parseFloat(amountFiat) : (parseFloat(amountCrypto) * cryptoPrice);
      const fee = calculateFee(fiatAmount);
      const cryptoAmount = amountFiat ? (fiatAmount / cryptoPrice) : parseFloat(amountCrypto);
      const totalAmountCrypto = cryptoAmount * (1 - fee / fiatAmount);

      setTransactionSummary({
        cryptoData: cryptoOptions.find(c => c.symbol === selectedCrypto) || {},
        totalFiat: fiatAmount || 0,
        totalAmountCrypto: totalAmountCrypto || 0,
        fee: fee || 0
      });

      if (!amountFiat && !amountCrypto) {
        setError('Please enter an amount to purchase.');
      } else {
        setError('');
        onOpen();
      }
    } catch (err) {
      setError('Failed to calculate transaction summary.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirmPurchase = () => {
    toast({
      title: "Purchase Confirmed",
      description: `You have purchased ${transactionSummary.totalAmountCrypto.toFixed(6)} ${transactionSummary.cryptoData.symbol || ''} for ${transactionSummary.totalFiat.toFixed(2)} USD.`,
      status: "success",
      duration: 5000,
      isClosable: true,
    });
    onClose();
    setAmountFiat('');
    setAmountCrypto('');
    setTransactionSummary({
      cryptoData: {},
      totalFiat: 0,
      totalAmountCrypto: 0,
      fee: 0
    });
  };

  return (
    <Card p='6' borderRadius='md' boxShadow='lg' bg='white' border='1px' borderColor='gray.200'>
      <Text fontSize='2xl' fontWeight='bold' mb='6'>
        Purchase Cryptocurrency
      </Text>
      <VStack spacing='4' align='stretch'>
        <FormControl id='crypto-select'>
          <FormLabel>Cryptocurrency</FormLabel>
          <Select
            value={selectedCrypto}
            onChange={(e) => setSelectedCrypto(e.target.value)}
            variant='outline'
          >
            {cryptoOptions.map((crypto) => (
              <option key={crypto.symbol} value={crypto.symbol}>
                {crypto.name} ({crypto.symbol})
              </option>
            ))}
          </Select>
        </FormControl>

        <FormControl id='amount-fiat'>
          <FormLabel>Amount (Fiat Currency)</FormLabel>
          <Input
            type='number'
            value={amountFiat}
            onChange={(e) => {
              setAmountFiat(e.target.value);
              setAmountCrypto('');
            }}
            placeholder='Enter amount in USD'
            variant='outline'
            borderColor='gray.300'
          />
        </FormControl>

        <FormControl id='amount-crypto'>
          <FormLabel>Amount (Cryptocurrency)</FormLabel>
          <Input
            type='number'
            value={amountCrypto}
            onChange={(e) => {
              setAmountCrypto(e.target.value);
              setAmountFiat('');
            }}
            placeholder='Enter amount in selected crypto'
            variant='outline'
            borderColor='gray.300'
          />
        </FormControl>

        <FormControl id='payment-method'>
          <FormLabel>Payment Method</FormLabel>
          <Select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            variant='outline'
          >
            {paymentMethods.map((method) => (
              <option key={method} value={method}>
                {method}
              </option>
            ))}
          </Select>
        </FormControl>

        <Collapse in={Boolean(error)}>
          <Alert status='error'>
            <AlertIcon />
            <AlertTitle mr={2}>Error!</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        </Collapse>

        <Box mt='4' p='4' borderRadius='md' bg='gray.50' boxShadow='md'>
          <Text fontWeight='bold' mb='2'>Transaction Summary</Text>
          <Divider mb='2' />
          {isLoading ? (
            <Flex justify='center' align='center' height='100px'>
              <Spinner size='xl' />
            </Flex>
          ) : (
            <>
              <Text>Cryptocurrency: {transactionSummary.cryptoData.name || 'N/A'} ({transactionSummary.cryptoData.symbol || 'N/A'})</Text>
              <Text>Total Amount to Pay: ${transactionSummary.totalFiat.toFixed(2) || 'N/A'}</Text>
              <Text>Amount to Receive: {transactionSummary.totalAmountCrypto.toFixed(6) || 'N/A'} {transactionSummary.cryptoData.symbol || 'N/A'}</Text>
              <Text>Fee: {transactionSummary.fee.toFixed(2) || 'N/A'}%</Text>
            </>
          )}
        </Box>

        <Button
          colorScheme='teal'
          size='lg'
          onClick={handleCalculateSummary}
          mt='4'
        >
          Review Purchase
        </Button>
      </VStack>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirm Purchase</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontWeight='bold' mb='2'>Confirm the following purchase details:</Text>
            <Text>Cryptocurrency: {transactionSummary.cryptoData.name || 'N/A'} ({transactionSummary.cryptoData.symbol || 'N/A'})</Text>
            <Text>Total Amount to Pay: ${transactionSummary.totalFiat.toFixed(2) || 'N/A'}</Text>
            <Text>Amount to Receive: {transactionSummary.totalAmountCrypto.toFixed(6) || 'N/A'} {transactionSummary.cryptoData.symbol || 'N/A'}</Text>
            <Text>Fee: {transactionSummary.fee.toFixed(2) || 'N/A'}%</Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='teal' mr='3' onClick={handleConfirmPurchase}>
              Confirm Purchase
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Card>
  );
};

export default CryptoPurchase;
