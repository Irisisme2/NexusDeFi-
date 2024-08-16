import React, { useState } from 'react';
import {
  Box,
  Text,
  Flex,
  Image,
  Stack,
  Divider,
  Button,
  Select,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Input,
  HStack,
} from '@chakra-ui/react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale } from 'chart.js';
import btcIcon from 'assets/img/icons/Btc.jpg';
import ethIcon from 'assets/img/icons/Eth.png';
import adaIcon from 'assets/img/icons/Ada.jpg';
import dotIcon from 'assets/img/icons/Dot.png';
import bnbIcon from 'assets/img/icons/Bnb.png';
import Card from 'components/card/Card'; // Ensure this path is correct for your project

ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale);

// Example asset data with previous values and weekly change
const assetData = [
  {
    name: 'Bitcoin',
    symbol: 'BTC',
    amount: 0.5,
    currentValue: 25000,
    previousValue: 24000,
    weeklyChange: 5.5,
    icon: btcIcon,
    historicalValues: [24000, 24500, 25000], // Historical values for the past few days
  },
  {
    name: 'Ethereum',
    symbol: 'ETH',
    amount: 1.2,
    currentValue: 2000,
    previousValue: 1900,
    weeklyChange: -2.3,
    icon: ethIcon,
    historicalValues: [1900, 1950, 2000],
  },
  {
    name: 'Cardano',
    symbol: 'ADA',
    amount: 5000,
    currentValue: 1000,
    previousValue: 950,
    weeklyChange: 1.8,
    icon: adaIcon,
    historicalValues: [950, 980, 1000],
  },
  {
    name: 'Polkadot',
    symbol: 'DOT',
    amount: 15,
    currentValue: 300,
    previousValue: 280,
    weeklyChange: 3.6,
    icon: dotIcon,
    historicalValues: [280, 290, 300],
  },
  {
    name: 'Binance Coin',
    symbol: 'BNB',
    amount: 10,
    currentValue: 1500,
    previousValue: 1450,
    weeklyChange: -1.2,
    icon: bnbIcon,
    historicalValues: [1450, 1475, 1500],
  },
];

const AssetSummary = () => {
  const [sortBy, setSortBy] = useState('value');
  const [searchTerm, setSearchTerm] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedAsset, setSelectedAsset] = useState(null);

  const handleSortChange = (e) => setSortBy(e.target.value);

  const filteredData = assetData.filter(asset =>
    asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    asset.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const calculateChange = (currentValue, previousValue) => {
    if (currentValue === undefined || previousValue === undefined) return { change: 0, percentageChange: 0 };
    const change = currentValue - previousValue;
    const percentageChange = (change / previousValue) * 100;
    return { change, percentageChange };
  };

  const sortedData = [...filteredData].sort((a, b) => {
    if (sortBy === 'value') {
      return (b.amount * b.currentValue) - (a.amount * a.currentValue);
    } else if (sortBy === 'change') {
      return b.weeklyChange - a.weeklyChange;
    } else {
      return 0;
    }
  });

  const totalValue = sortedData.reduce((acc, asset) => acc + (asset.amount * asset.currentValue), 0);

  return (
    <Box p='6'>
      <Card p='6' borderRadius='md' boxShadow='lg' bg='white'>
        <Text fontSize='2xl' fontWeight='bold' mb='4'>
          Asset Summary
        </Text>
        <Divider mb='4' />
        <HStack mb='4' spacing='4'>
          <Input
            placeholder='Search by name or symbol...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Select value={sortBy} onChange={handleSortChange} width='200px'>
            <option value='value'>Sort by Value</option>
            <option value='change'>Sort by Weekly Change</option>
          </Select>
        </HStack>
        <Stack spacing='4'>
          <Flex wrap='wrap' gap='4'>
            {sortedData.map((asset, index) => {
              const { change, percentageChange } = calculateChange(asset.currentValue, asset.previousValue);
              const isPositive = change >= 0;
              const weeklyChangeColor = asset.weeklyChange >= 0 ? 'green.500' : 'red.500';

              return (
                <Flex
                  key={index}
                  direction='column'
                  align='center'
                  p='4'
                  borderRadius='md'
                  boxShadow='sm'
                  bg='gray.50'
                  _hover={{ bg: 'gray.100' }}
                  onClick={() => {
                    setSelectedAsset(asset);
                    onOpen();
                  }}
                  cursor='pointer'
                  width={{ base: 'full', md: '45%' }}
                >
                  <Image
                    src={asset.icon}
                    boxSize='100px'
                    borderRadius='full'
                    alt={`${asset.name} icon`}
                    mb='4'
                  />
                  <Stack spacing='2' textAlign='center'>
                    <Text fontWeight='bold'>{asset.name}</Text>
                    <Text color='gray.500'>Amount: {asset.amount}</Text>
                    <Text color={isPositive ? 'green.500' : 'red.500'}>
                      {isPositive ? '▲' : '▼'} {isPositive ? '+' : ''}{percentageChange.toFixed(2)}%
                    </Text>
                    <Text color={weeklyChangeColor}>
                      Weekly Change: {asset.weeklyChange.toFixed(2)}%
                    </Text>
                    <Text fontWeight='bold'>{`$${(asset.amount * asset.currentValue).toFixed(2)}`}</Text>
                  </Stack>
                </Flex>
              );
            })}
          </Flex>
        </Stack>
        <Divider my='4' />
        <Flex justify='space-between' fontWeight='bold'>
          <Text>Total Value</Text>
          <Text>{`$${totalValue.toFixed(2)}`}</Text>
        </Flex>
      </Card>

      {/* Asset Details Modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{selectedAsset?.name ? selectedAsset.name : 'Asset Details'}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedAsset ? (
              <Stack spacing='4'>
                <Flex align='center' justify='center'>
                  <Image src={selectedAsset.icon} boxSize='100px' mr='4' borderRadius='full' alt={`${selectedAsset.name} icon`} />
                  <Stack spacing='2'>
                    <Text fontSize='lg' fontWeight='bold'>{selectedAsset.name}</Text>
                    <Text fontSize='md'>{`Symbol: ${selectedAsset.symbol}`}</Text>
                    <Text fontSize='md'>{`Amount: ${selectedAsset.amount}`}</Text>
                    <Text fontSize='md'>{`Current Value: $${(selectedAsset.currentValue).toFixed(2)}`}</Text>
                    <Text fontSize='md'>{`Previous Value: $${(selectedAsset.previousValue).toFixed(2)}`}</Text>
                    <Text color={selectedAsset.weeklyChange >= 0 ? 'green.500' : 'red.500'}>
                      Weekly Change: {selectedAsset.weeklyChange.toFixed(2)}%
                    </Text>
                  </Stack>
                </Flex>
                <Box mt='4'>
                  <Text fontSize='lg' fontWeight='bold'>Historical Values</Text>
                  <Line
                    data={{
                      labels: ['1 Day Ago', '2 Days Ago', 'Today'],
                      datasets: [
                        {
                          label: 'Value',
                          data: selectedAsset.historicalValues,
                          borderColor: '#3182CE',
                          backgroundColor: 'rgba(49, 130, 206, 0.2)',
                        },
                      ],
                    }}
                    options={{
                      responsive: true,
                      plugins: {
                        legend: {
                          display: false,
                        },
                        tooltip: {
                          callbacks: {
                            label: function (tooltipItem) {
                              return `$${tooltipItem.raw.toFixed(2)}`;
                            },
                          },
                        },
                      },
                    }}
                  />
                </Box>
              </Stack>
            ) : (
              <Text>No asset selected</Text>
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default AssetSummary;

