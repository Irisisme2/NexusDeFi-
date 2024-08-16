import React, { useState } from 'react';
import {
  Box,
  Text,
  Flex,
  Grid,
  Divider,
  Image,
  ButtonGroup,
  Button,
} from '@chakra-ui/react';
import Card from 'components/card/Card'; // Ensure this path is correct for your project
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import btcIcon from 'assets/img/icons/Btc.jpg';
import ethIcon from 'assets/img/icons/Eth.png';
import adaIcon from 'assets/img/icons/Ada.jpg';
import dotIcon from 'assets/img/icons/Dot.png';
import bnbIcon from 'assets/img/icons/Bnb.png';

// Register necessary components for Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Example market trend data with colors and multiple time periods
const marketData = {
  '24h': [
    { name: 'Bitcoin', symbol: 'BTC', icon: btcIcon, price: 60000, change: 2.5, color: '#f7931a' },
    { name: 'Ethereum', symbol: 'ETH', icon: ethIcon, price: 4000, change: -1.2, color: '#3c3c3b' },
    { name: 'Cardano', symbol: 'ADA', icon: adaIcon, price: 2.5, change: 5.4, color: '#3c8dbc' },
    { name: 'Polkadot', symbol: 'DOT', icon: dotIcon, price: 30, change: -0.8, color: '#e6007a' },
    { name: 'Binance Coin', symbol: 'BNB', icon: bnbIcon, price: 500, change: 1.5, color: '#f0b90b' },
  ],
  '7d': [
    { name: 'Bitcoin', symbol: 'BTC', icon: btcIcon, price: 61000, change: 5.0, color: '#f7931a' },
    { name: 'Ethereum', symbol: 'ETH', icon: ethIcon, price: 4100, change: 2.3, color: '#3c3c3b' },
    { name: 'Cardano', symbol: 'ADA', icon: adaIcon, price: 2.7, change: 6.2, color: '#3c8dbc' },
    { name: 'Polkadot', symbol: 'DOT', icon: dotIcon, price: 32, change: 1.5, color: '#e6007a' },
    { name: 'Binance Coin', symbol: 'BNB', icon: bnbIcon, price: 520, change: 4.0, color: '#f0b90b' },
  ],
  '30d': [
    { name: 'Bitcoin', symbol: 'BTC', icon: btcIcon, price: 59000, change: 8.0, color: '#f7931a' },
    { name: 'Ethereum', symbol: 'ETH', icon: ethIcon, price: 4200, change: 4.5, color: '#3c3c3b' },
    { name: 'Cardano', symbol: 'ADA', icon: adaIcon, price: 3.0, change: 8.0, color: '#3c8dbc' },
    { name: 'Polkadot', symbol: 'DOT', icon: dotIcon, price: 35, change: 3.0, color: '#e6007a' },
    { name: 'Binance Coin', symbol: 'BNB', icon: bnbIcon, price: 550, change: 6.0, color: '#f0b90b' },
  ],
};

// Initial time period
const initialPeriod = '24h';

const MarketTrends = () => {
  const [timePeriod, setTimePeriod] = useState(initialPeriod);

  // Prepare data for the chart with colors based on selected time period
  const selectedData = marketData[timePeriod];
  const chartData = {
    labels: selectedData.map(token => token.name),
    datasets: [
      {
        label: `${timePeriod} Change (%)`,
        data: selectedData.map(token => token.change),
        backgroundColor: selectedData.map(token => token.color),
        borderColor: selectedData.map(token => token.color),
        borderWidth: 1,
      },
    ],
  };

  return (
    <Card p='6' borderRadius='md' boxShadow='lg' bg='white'>
      <Text fontSize='2xl' fontWeight='bold' mb='4' textAlign='center'>
        Market Trends
      </Text>
      <Divider mb='6' />

      {/* Time Period Selector */}
      <ButtonGroup spacing='4' mb='6' display='flex' justifyContent='center'>
        {Object.keys(marketData).map(period => (
          <Button
            key={period}
            onClick={() => setTimePeriod(period)}
            colorScheme={period === timePeriod ? 'blue' : 'gray'}
          >
            {period}
          </Button>
        ))}
      </ButtonGroup>

      {/* Chart */}
      <Box mb='6' textAlign='center'>
        <Text fontSize='lg' fontWeight='bold' mb='2'>
          {`${timePeriod} Price Change`}
        </Text>
        <Box width='100%' height='400px'>
          <Bar
            data={chartData}
            options={{
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  position: 'top',
                },
                tooltip: {
                  callbacks: {
                    label: function(tooltipItem) {
                      return `${tooltipItem.label}: ${tooltipItem.raw}%`;
                    },
                  },
                },
              },
              scales: {
                x: {
                  beginAtZero: true,
                },
                y: {
                  beginAtZero: true,
                  ticks: {
                    callback: function(value) {
                      return `${value}%`;
                    },
                  },
                },
              },
            }}
          />
        </Box>
      </Box>

      {/* Asset Details */}
      <Grid templateColumns='repeat(auto-fit, minmax(200px, 1fr))' gap='6'>
        {selectedData.map((token, index) => (
          <Flex
            key={index}
            direction='column'
            p='4'
            borderWidth='1px'
            borderRadius='md'
            boxShadow='sm'
            bg='gray.50'
            _hover={{ bg: 'gray.100' }}
            transition='background-color 0.2s'
          >
            <Flex align='center' mb='4'>
              <Image src={token.icon} boxSize='32px' mr='3' alt={token.name} />
              <Box>
                <Text fontSize='lg' fontWeight='bold'>
                  {token.name} ({token.symbol})
                </Text>
                <Text fontSize='sm' color='gray.600'>
                  ${token.price.toLocaleString()}
                </Text>
              </Box>
            </Flex>
          </Flex>
        ))}
      </Grid>
    </Card>
  );
};

export default MarketTrends;
