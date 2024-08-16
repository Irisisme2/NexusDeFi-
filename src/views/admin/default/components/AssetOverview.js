import React, { useState } from 'react';
import { Box, Text, Flex, Image, Grid, Divider, Stack, Progress, Tooltip, Icon, Button, Input, useDisclosure, Select, Spinner } from '@chakra-ui/react';
import Card from 'components/card/Card'; // Ensure this path is correct for your project
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip as ChartTooltip, Legend } from 'chart.js';
import { MdInfoOutline, MdFilterList, MdClose } from 'react-icons/md';

// Import icons
import btcIcon from 'assets/img/icons/Btc.jpg';
import ethIcon from 'assets/img/icons/Eth.png';
import adaIcon from 'assets/img/icons/Ada.jpg';
import dotIcon from 'assets/img/icons/Dot.png';
import bnbIcon from 'assets/img/icons/Bnb.png';

// Register necessary components for Chart.js
ChartJS.register(ArcElement, ChartTooltip, Legend);

// Example data with assets and their values
const assetData = [
  { name: 'Bitcoin', symbol: 'BTC', amount: '0.03', value: 1000, icon: btcIcon, history: [950, 980, 1000, 1050, 1030] },
  { name: 'Ethereum', symbol: 'ETH', amount: '5.678', value: 9500, icon: ethIcon, history: [9200, 9300, 9400, 9500, 9600] },
  { name: 'Cardano', symbol: 'ADA', amount: '1234.56', value: 2000, icon: adaIcon, history: [1900, 1950, 2000, 2050, 2100] },
  { name: 'Polkadot', symbol: 'DOT', amount: '89.12', value: 2500, icon: dotIcon, history: [2400, 2450, 2500, 2550, 2600] },
  { name: 'Binance Coin', symbol: 'BNB', amount: '15.00', value: 3500, icon: bnbIcon, history: [3400, 3450, 3500, 3550, 3600] },
];

const totalPortfolioValue = assetData.reduce((acc, asset) => acc + asset.value, 0);

const pieChartData = {
  labels: assetData.map(asset => asset.name),
  datasets: [
    {
      data: assetData.map(asset => asset.value),
      backgroundColor: ['#ff6384', '#36a2eb', '#ffce56', '#4bc0c0', '#9966ff'],
      hoverBackgroundColor: ['#ff6384', '#36a2eb', '#ffce56', '#4bc0c0', '#9966ff'],
    },
  ],
};

// Example wallet addresses
const walletAddresses = [
  '0xA5F9d6D01E13B07f9A5485A4C7E567dBA14D5e1D',
  '0x0D67E6aB0F7B828FBA43dD7c04e3B9F372BCC5D3',
  '0x6E8E6467A5B6D4CE5F9A83E9B8E9D7E3F606D7D4',
  '0x3C8E2C4A9A14A6C4B6C5E5C6D5B1C8D7A9B0C9D8',
  '0x8B4D8E8D5A2C2E9F3E1B8F9C6A4D5B6C7E8D9F0A',
];

const AssetOverview = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [selectedWallet, setSelectedWallet] = useState(walletAddresses[0]); // Default wallet
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSearch = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const handleFilterChange = (event) => {
    setSelectedFilter(event.target.value);
  };

  const handleWalletChange = (event) => {
    setSelectedWallet(event.target.value);
  };

  const filteredAssets = assetData
    .filter(asset => asset.name.toLowerCase().includes(searchQuery))
    .filter(asset => selectedFilter === 'All' || asset.symbol === selectedFilter);

  return (
    <Card p='6' borderRadius='md' boxShadow='md' bg='white'>
      <Box>
        {/* Title and Filter Options */}
        <Flex align='center' justify='space-between' mb='4'>
          <Text fontSize='2xl' fontWeight='bold'>
            Asset Overview
          </Text>
          <Flex align='center'>
            <Button leftIcon={<MdFilterList />} onClick={onOpen} variant='outline' colorScheme='blue' mr='4'>
              Filter
            </Button>
            <Select placeholder='Select wallet' value={selectedWallet} onChange={handleWalletChange} size='lg' width='300px'>
              {walletAddresses.map((address, index) => (
                <option key={index} value={address}>
                  {address}
                </option>
              ))}
            </Select>
          </Flex>
        </Flex>
        <Divider mb='4' />

        {/* Search Bar */}
        <Input
          placeholder='Search assets...'
          mb='4'
          value={searchQuery}
          onChange={handleSearch}
          size='lg'
        />

        {/* Filter Options Modal */}
        {isOpen && (
          <Box p='4' borderWidth='1px' borderRadius='md' bg='white' position='absolute' top='20%' right='10%' width='250px' boxShadow='md'>
            <Flex justify='space-between' align='center' mb='4'>
              <Text fontSize='lg' fontWeight='bold'>
                Filter Options
              </Text>
              <Icon as={MdClose} cursor='pointer' onClick={onClose} />
            </Flex>
            <Select placeholder='Select filter' mb='4' value={selectedFilter} onChange={handleFilterChange}>
              <option value='All'>All</option>
              <option value='BTC'>Bitcoin (BTC)</option>
              <option value='ETH'>Ethereum (ETH)</option>
              <option value='ADA'>Cardano (ADA)</option>
              <option value='DOT'>Polkadot (DOT)</option>
              <option value='BNB'>Binance Coin (BNB)</option>
            </Select>
          </Box>
        )}

        {/* Chart */}
        <Box mb='6' textAlign='center'>
          <Text fontSize='lg' fontWeight='bold' mb='2'>
            Asset Value Distribution
          </Text>
          <Box width='300px' height='300px' mx='auto'>
            <Pie data={pieChartData} options={{ maintainAspectRatio: false }} />
          </Box>
        </Box>

        {/* Portfolio Summary */}
        <Box mb='6'>
          <Text fontSize='lg' fontWeight='bold' mb='2'>
            Portfolio Summary
          </Text>
          <Flex justify='space-between' mb='2'>
            <Text fontSize='md' fontWeight='bold'>
              Total Portfolio Value:
            </Text>
            <Text fontSize='md'>
              {`$${totalPortfolioValue.toLocaleString()}`}
            </Text>
          </Flex>
          <Flex justify='space-between'>
            <Text fontSize='md' fontWeight='bold'>
              Number of Assets:
            </Text>
            <Text fontSize='md'>
              {assetData.length}
            </Text>
          </Flex>
        </Box>

        {/* Asset Data Grid */}
        <Grid templateColumns='repeat(auto-fit, minmax(250px, 1fr))' gap='6'>
          {filteredAssets.map((asset, index) => {
            const percentage = ((asset.value / totalPortfolioValue) * 100).toFixed(2);
            
            return (
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
                onClick={() => setSelectedAsset(asset)}
              >
                <Flex align='center' mb='2'>
                  <Image src={asset.icon} boxSize='32px' mr='4' />
                  <Box>
                    <Text fontSize='lg' fontWeight='bold'>
                      {asset.name} ({asset.symbol})
                    </Text>
                    <Text fontSize='sm' color='gray.600'>
                      Amount: {asset.amount}
                    </Text>
                  </Box>
                </Flex>
                <Box mb='2'>
                  <Text fontSize='md' fontWeight='bold'>
                    Value: {`$${asset.value.toLocaleString()}`}
                  </Text>
                  <Text fontSize='sm' color='gray.500'>
                    {percentage}% of Portfolio
                  </Text>
                </Box>
                <Progress
                  value={percentage}
                  size='sm'
                  colorScheme='blue'
                  mb='2'
                />
                <Tooltip label={`Percentage of total portfolio value: ${percentage}%`} aria-label='A tooltip'>
                  <Icon as={MdInfoOutline} color='blue.500' />
                </Tooltip>
              </Flex>
            );
          })}
        </Grid>
      </Box>

      {/* Asset Detail Modal */}
      {selectedAsset && (
        <Box p='6' borderWidth='1px' borderRadius='md' bg='white' boxShadow='md'>
          <Flex align='center' mb='4'>
            <Image src={selectedAsset.icon} boxSize='48px' mr='4' />
            <Box>
              <Text fontSize='xl' fontWeight='bold'>
                {selectedAsset.name} ({selectedAsset.symbol})
              </Text>
              <Text fontSize='md' color='gray.600'>
                Amount: {selectedAsset.amount}
              </Text>
              <Text fontSize='lg' fontWeight='bold'>
                Value: {`$${selectedAsset.value.toLocaleString()}`}
              </Text>
            </Box>
          </Flex>
          <Divider mb='4' />
          <Text fontSize='lg' fontWeight='bold' mb='2'>
            Historical Data
          </Text>
          <Box>
            {selectedAsset.history.map((value, idx) => (
              <Flex key={idx} align='center' mb='2'>
                <Text fontSize='sm' mr='4'>
                  {`Day ${idx + 1}:`}
                </Text>
                <Text fontSize='sm' color='gray.600'>
                  {`$${value.toLocaleString()}`}
                </Text>
              </Flex>
            ))}
          </Box>
        </Box>
      )}
    </Card>
  );
};

export default AssetOverview;
