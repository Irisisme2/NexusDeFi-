import React, { useState } from 'react';
import {
  Box,
  Text,
  Flex,
  Image,
  Stack,
  SimpleGrid,
  Badge,
  Tooltip,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Button,
  Spinner,
  VStack,
  FormControl,
  FormLabel,
  Select,
  Input
} from '@chakra-ui/react';
import { Line, Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip as ChartTooltip, Legend, LineElement, BarElement, CategoryScale, LinearScale, ArcElement } from 'chart.js';
import { FiDownload, FiShare } from 'react-icons/fi';
import Card from 'components/card/Card'; 
import btcIcon from 'assets/img/icons/Btc.jpg';
import ethIcon from 'assets/img/icons/Eth.png';
import adaIcon from 'assets/img/icons/Ada.jpg';
import dotIcon from 'assets/img/icons/Dot.png';
import bnbIcon from 'assets/img/icons/Bnb.png';
import solIcon from 'assets/img/icons/sol.jpg';

ChartJS.register(Title, ChartTooltip, Legend, LineElement, BarElement, CategoryScale, LinearScale, ArcElement);

// Sample asset data with additional details
const holdingsData = [
  // Existing assets
  {
    name: 'Bitcoin',
    symbol: 'BTC',
    amount: 0.5,
    currentValue: 25000,
    previousValue: 24000,
    marketCap: '450B',
    volume24h: '25B',
    change24h: 5.5,
    highestValue: 26000,
    lowestValue: 23000,
    averageValue: 24500,
    historicalValues: [24000, 24500, 25000, 25500, 26000],
    dailyChanges: [1.5, 2.0, 1.8, 2.5, 2.2],
    icon: btcIcon,
  },
  {
    name: 'Ethereum',
    symbol: 'ETH',
    amount: 1.2,
    currentValue: 2000,
    previousValue: 1900,
    marketCap: '200B',
    volume24h: '10B',
    change24h: -2.3,
    highestValue: 2100,
    lowestValue: 1850,
    averageValue: 1950,
    historicalValues: [1900, 1950, 2000, 2050, 2100],
    dailyChanges: [-1.0, -1.5, -1.2, -1.8, -2.0],
    icon: ethIcon,
  },
  {
    name: 'Cardano',
    symbol: 'ADA',
    amount: 112,
    currentValue: 1000,
    previousValue: 950,
    marketCap: '90B',
    volume24h: '5B',
    change24h: 1.8,
    highestValue: 1050,
    lowestValue: 950,
    averageValue: 1000,
    historicalValues: [950, 980, 1000, 1020, 1050],
    dailyChanges: [0.5, 0.7, 1.0, 1.2, 1.3],
    icon: adaIcon,
  },
  {
    name: 'Polkadot',
    symbol: 'DOT',
    amount: 15,
    currentValue: 300,
    previousValue: 280,
    marketCap: '45B',
    volume24h: '2B',
    change24h: 3.6,
    highestValue: 310,
    lowestValue: 270,
    averageValue: 290,
    historicalValues: [280, 290, 300, 305, 310],
    dailyChanges: [2.0, 2.5, 3.0, 3.2, 3.6],
    icon: dotIcon,
  },
  {
    name: 'Binance Coin',
    symbol: 'BNB',
    amount: 10,
    currentValue: 1500,
    previousValue: 1450,
    marketCap: '60B',
    volume24h: '3B',
    change24h: -1.2,
    highestValue: 1550,
    lowestValue: 1400,
    averageValue: 1475,
    historicalValues: [1450, 1475, 1500, 1525, 1550],
    dailyChanges: [-0.5, -1.0, -0.8, -1.2, -1.5],
    icon: bnbIcon,
  },
  // New asset
  {
    name: 'Solana',
    symbol: 'SOL',
    amount: 30,
    currentValue: 100,
    previousValue: 95,
    marketCap: '30B',
    volume24h: '1B',
    change24h: 2.1,
    highestValue: 110,
    lowestValue: 90,
    averageValue: 100,
    historicalValues: [95, 98, 100, 105, 110],
    dailyChanges: [1.0, 1.5, 2.0, 2.2, 2.1],
    icon: solIcon,
  }
];

const calculatePercentageChange = (currentValue, previousValue) => {
  if (currentValue === undefined || previousValue === undefined) return 0;
  const change = currentValue - previousValue;
  return (change / previousValue) * 100;
};

const generateLineChartData = (data) => ({
  labels: ['1 Day Ago', '2 Days Ago', '3 Days Ago', '4 Days Ago', 'Today'],
  datasets: [
    {
      label: 'Value',
      data: data,
      borderColor: '#3182CE',
      backgroundColor: 'rgba(49, 130, 206, 0.2)',
    },
  ],
});

const generateBarChartData = (data, assets) => {
  const colors = {
    BTC: '#F7931A', // Orange for Bitcoin
    ETH: '#3C3C3D', // Light Blue for Ethereum
    ADA: '#3C8EB1', // Light Blue for Cardano
    DOT: '#E6007A', // Pink for Polkadot
    BNB: '#F3BA2F', // Yellow for Binance Coin
    SOL: '#0F7D8C', // Teal for Solana
  };

  const labels = ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5'];
  const datasets = assets.map((asset) => ({
    label: asset.name,
    data: asset.dailyChanges,
    backgroundColor: colors[asset.symbol] || '#3182CE',
  }));

  return {
    labels,
    datasets,
  };
};

const generatePieChartData = (assets) => {
  const labels = assets.map(asset => asset.name);
  const data = assets.map(asset => asset.currentValue * asset.amount);
  const colors = {
    BTC: '#F7931A', // Orange for Bitcoin
    ETH: '#3C3C3D', // Light Blue for Ethereum
    ADA: '#3C8EB1', // Light Blue for Cardano
    DOT: '#E6007A', // Pink for Polkadot
    BNB: '#F3BA2F', // Yellow for Binance Coin
    SOL: '#0F7D8C', // Teal for Solana
  };

  return {
    labels,
    datasets: [
      {
        label: 'Asset Distribution',
        data,
        backgroundColor: labels.map(name => colors[holdingsData.find(asset => asset.name === name).symbol] || '#3182CE'),
      },
    ],
  };
};

const CurrentHoldings = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [filterValue, setFilterValue] = useState('');
  const [filterChange, setFilterChange] = useState('');
  const [sortCriteria, setSortCriteria] = useState('value');
  const [loading, setLoading] = useState(false);

  const handleCardClick = (asset) => {
    setSelectedAsset(asset);
    onOpen();
  };

  const handleSortChange = (e) => {
    setSortCriteria(e.target.value);
  };

  const filteredHoldings = holdingsData
    .filter(asset => {
      const valueCondition = !filterValue || asset.currentValue >= parseFloat(filterValue);
      const changeCondition = !filterChange || asset.change24h >= parseFloat(filterChange);
      return valueCondition && changeCondition;
    })
    .sort((a, b) => {
      if (sortCriteria === 'value') {
        return (b.currentValue * b.amount) - (a.currentValue * a.amount);
      } else if (sortCriteria === 'change') {
        return b.change24h - a.change24h;
      } else {
        return 0;
      }
    });

  const pieChartData = generatePieChartData(filteredHoldings);
  const barChartData = generateBarChartData(filteredHoldings.map(asset => ({ ...asset, dailyChanges: asset.dailyChanges })), filteredHoldings);

  return (
    <Card p='6' borderRadius='md' boxShadow='lg' bg='white'>
      <Text fontSize='2xl' fontWeight='bold' mb='4'>
        Current Holdings
      </Text>

      {loading ? (
        <Flex justify='center' align='center' height='400px'>
          <Spinner size='xl' />
        </Flex>
      ) : (
        <>
          <VStack spacing='4' mb='4'>
            <FormControl id='value-filter'>
              <FormLabel>Filter by Minimum Value</FormLabel>
              <Input
                type='number'
                placeholder='Enter minimum value'
                value={filterValue}
                onChange={(e) => setFilterValue(e.target.value)}
              />
            </FormControl>
            <FormControl id='change-filter'>
              <FormLabel>Filter by Minimum 24h Change</FormLabel>
              <Input
                type='number'
                placeholder='Enter minimum 24h change (%)'
                value={filterChange}
                onChange={(e) => setFilterChange(e.target.value)}
              />
            </FormControl>
            <FormControl id='sort-by'>
              <FormLabel>Sort By</FormLabel>
              <Select value={sortCriteria} onChange={handleSortChange}>
                <option value='value'>Sort by Value</option>
                <option value='change'>Sort by 24h Change</option>
              </Select>
            </FormControl>
          </VStack>

          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing='4'>
            {filteredHoldings.map((asset, index) => {
              const percentageChange = calculatePercentageChange(asset.currentValue, asset.previousValue);
              const isPositive = percentageChange >= 0;
              const change24hColor = asset.change24h >= 0 ? 'green.500' : 'red.500';

              return (
                <Card
                  key={index}
                  p='4'
                  borderRadius='md'
                  boxShadow='md'
                  bg='gray.50'
                  _hover={{ bg: 'gray.100', cursor: 'pointer' }}
                  onClick={() => handleCardClick(asset)}
                >
                  <Flex align='center'>
                    <Image
                      src={asset.icon}
                      boxSize='80px'
                      borderRadius='full'
                      alt={`${asset.name} icon`}
                      mr='4'
                    />
                    <Stack spacing='2'>
                      <Text fontSize='lg' fontWeight='bold'>
                        {asset.name} ({asset.symbol})
                      </Text>
                      <Text color='gray.600'>Amount: {asset.amount}</Text>
                      <Text fontWeight='bold'>
                        Current Value: ${asset.currentValue.toFixed(2)}
                      </Text>
                      <Text color={isPositive ? 'green.500' : 'red.500'}>
                        {isPositive ? '▲' : '▼'} {percentageChange.toFixed(2)}%
                      </Text>
                      <Flex align='center' fontSize='sm'>
                        <Tooltip label={`24h Change: ${asset.change24h.toFixed(2)}%`} aria-label='24h Change'>
                          <Text color={change24hColor}>24h Change: {asset.change24h.toFixed(2)}%</Text>
                        </Tooltip>
                        <Badge ml='2' colorScheme={isPositive ? 'green' : 'red'}>
                          {isPositive ? 'Positive' : 'Negative'}
                        </Badge>
                      </Flex>
                    </Stack>
                  </Flex>
                </Card>
              );
            })}
          </SimpleGrid>

          <Box mt='6'>
            <Text fontSize='lg' fontWeight='bold'>Asset Distribution</Text>
            <Box width='100%' height='300px'>
              <Pie data={pieChartData} options={{ responsive: true, maintainAspectRatio: false }} />
            </Box>
          </Box>
        </>
      )}

      {selectedAsset && (
        <Modal isOpen={isOpen} onClose={onClose} size='lg'>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{selectedAsset.name} ({selectedAsset.symbol})</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Flex direction='column' align='center'>
                <Image
                  src={selectedAsset.icon}
                  boxSize='120px'
                  borderRadius='full'
                  alt={`${selectedAsset.name} icon`}
                  mb='4'
                />
                <Text fontSize='lg' fontWeight='bold'>{selectedAsset.name}</Text>
                <Text fontSize='md'>{selectedAsset.symbol}</Text>
                <Text mt='2'>Amount: {selectedAsset.amount}</Text>
                <Text mt='2'>Current Value: ${selectedAsset.currentValue.toFixed(2)}</Text>
                <Text mt='2' color={selectedAsset.change24h >= 0 ? 'green.500' : 'red.500'}>
                  24h Change: {selectedAsset.change24h.toFixed(2)}%
                </Text>
                <Text mt='2'>Highest Value: ${selectedAsset.highestValue.toFixed(2)}</Text>
                <Text mt='2'>Lowest Value: ${selectedAsset.lowestValue.toFixed(2)}</Text>
                <Text mt='2'>Average Value: ${selectedAsset.averageValue.toFixed(2)}</Text>
                <Box mt='4' width='100%' height='200px'>
                  <Line
                    data={generateLineChartData(selectedAsset.historicalValues)}
                    options={{ responsive: true, maintainAspectRatio: false }}
                  />
                </Box>
                <Box mt='4' width='100%' height='200px'>
                  <Bar
                    data={generateBarChartData(selectedAsset.dailyChanges, [selectedAsset])}
                    options={{ responsive: true, maintainAspectRatio: false }}
                  />
                </Box>
              </Flex>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme='blue' mr='3' leftIcon={<FiDownload />}>
                Download
              </Button>
              <Button colorScheme='blue' leftIcon={<FiShare />}>
                Share
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </Card>
  );
};

export default CurrentHoldings;
