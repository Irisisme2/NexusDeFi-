import { useState, useEffect } from 'react';
import { Box, SimpleGrid, useColorModeValue, Icon, Flex, Select, Image, Text } from '@chakra-ui/react';
import { MdAccountBalance, MdReceipt, MdTrendingUp, MdInsertChart } from 'react-icons/md';
import IconBox from 'components/icons/IconBox';
import MiniStatistics from 'components/card/MiniStatistics';
import AssetOverview from 'views/admin/default/components/AssetOverview';
import SwapWidget from 'views/admin/default/components/SwapWidget';
import MarketTrends from 'views/admin/default/components/MarketTrends';
import BuyCrypto from 'views/admin/default/components/BuyCrypto';


// Import icons
import usdIcon from 'assets/img/icons/usd.jpg';
import btcIcon from 'assets/img/icons/Btc.jpg';
import ethIcon from 'assets/img/icons/Eth.png';
import adaIcon from 'assets/img/icons/Ada.jpg';
import dotIcon from 'assets/img/icons/Dot.png';
import bnbIcon from 'assets/img/icons/Bnb.png';

// Function to fetch conversion rates
const fetchCryptoConversionRates = async (currency) => {
  const rates = {
    usd: 1,
    btc: 0.000031,
    eth: 0.00045,
    ada: 0.5,
    dot: 0.2,
    bnb: 0.0005,
  };
  return rates[currency] || 1;
};

export default function UserReports() {
  const [selectedBalanceCurrency, setSelectedBalanceCurrency] = useState('usd');
  const [selectedPortfolioCurrency, setSelectedPortfolioCurrency] = useState('usd');
  const [balanceConversionRate, setBalanceConversionRate] = useState(1);
  const [portfolioConversionRate, setPortfolioConversionRate] = useState(1);

  const brandColor = useColorModeValue('brand.500', 'white');
  const boxBg = useColorModeValue('secondaryGray.300', 'whiteAlpha.100');

  // Update conversion rates when currency changes
  useEffect(() => {
    const updateBalanceConversionRate = async () => {
      const rate = await fetchCryptoConversionRates(selectedBalanceCurrency);
      setBalanceConversionRate(rate);
    };
    updateBalanceConversionRate();
  }, [selectedBalanceCurrency]);

  useEffect(() => {
    const updatePortfolioConversionRate = async () => {
      const rate = await fetchCryptoConversionRates(selectedPortfolioCurrency);
      setPortfolioConversionRate(rate);
    };
    updatePortfolioConversionRate();
  }, [selectedPortfolioCurrency]);

  const balanceUSD = 1000;
  const portfolioValueUSD = 3450.76;

  // Convert values based on the selected currencies
  const balance = (balanceUSD * balanceConversionRate).toFixed(2);
  const portfolioValue = (portfolioValueUSD * portfolioConversionRate).toFixed(2);

  const currencyOptions = [
    { value: 'usd', label: 'USD', icon: usdIcon },
    { value: 'btc', label: 'BTC', icon: btcIcon },
    { value: 'eth', label: 'ETH', icon: ethIcon },
    { value: 'ada', label: 'ADA', icon: adaIcon },
    { value: 'dot', label: 'DOT', icon: dotIcon },
    { value: 'bnb', label: 'BNB', icon: bnbIcon },
  ];

  const balanceCurrencyOption = currencyOptions.find(option => option.value === selectedBalanceCurrency);
  const portfolioCurrencyOption = currencyOptions.find(option => option.value === selectedPortfolioCurrency);

  return (
    <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3, '2xl': 3 }} gap='20px' mb='20px'>
        <MiniStatistics
          startContent={
            <IconBox
              w='56px'
              h='56px'
              bg={boxBg}
              icon={<Icon w='32px' h='32px' as={MdAccountBalance} color={brandColor} />}
            />
          }
          name='Total Balance'
          value={
            <Flex align='center' fontSize='xl' fontWeight='bold'>
              <Text>{balance}</Text>
              <Image src={balanceCurrencyOption?.icon} boxSize='24px' ml='10px' />
              <Text ml='2px'>{balanceCurrencyOption?.label}</Text>
            </Flex>
          }
          endContent={
            <Flex direction='column' me='-16px' mt='10px' align='center'>
              <Select
                id='balance-currency'
                variant='outline'
                mt='5px'
                size='sm'
                width='auto'
                value={selectedBalanceCurrency}
                onChange={(e) => setSelectedBalanceCurrency(e.target.value)}
                bg='white'
                color='black'
                borderColor='gray.300'
                borderRadius='md'
                _focus={{ boxShadow: '0 0 0 2px rgba(66, 153, 225, 0.6)' }}
                _hover={{ borderColor: 'gray.400' }}
                >
                <option value='usd'>USD</option>
                <option value='btc'>BTC</option>
                <option value='eth'>ETH</option>
                <option value='ada'>ADA</option>
                <option value='dot'>DOT</option>
                <option value='bnb'>BNB</option>
              </Select>
            </Flex>
          }
          style={{ maxWidth: '160px' }} // Increased width
        />
        <MiniStatistics
          startContent={
            <IconBox
              w='56px'
              h='56px'
              bg={boxBg}
              icon={<Icon w='32px' h='32px' as={MdReceipt} color={brandColor} />}
            />
          }
          name='Recent Transactions'
          value='5'
          style={{ minWidth: '160px' }} // Increased width
        />
        <MiniStatistics
          startContent={
            <IconBox
              w='56px'
              h='56px'
              bg={boxBg}
              icon={<Icon w='28px' h='28px' as={MdTrendingUp} color={brandColor}  />}
            />
          }
          name='Portfolio Value'
          value={
            <Flex align='center' fontSize='xl' fontWeight='bold'>
              <Text>{portfolioValue}</Text>
              <Image src={portfolioCurrencyOption?.icon} boxSize='24px' ml='10px' />
              <Text ml='2px'>{portfolioCurrencyOption?.label}</Text>
            </Flex>
          }
          endContent={
            <Flex direction='column' me='-16px' mt='10px' align='center'>
              <Select
                id='portfolio-currency'
                variant='outline'
                mt='5px'
                size='sm'
                width='auto'
                value={selectedPortfolioCurrency}
                onChange={(e) => setSelectedPortfolioCurrency(e.target.value)}
                bg='white'
                color='black'
                borderColor='gray.300'
                borderRadius='md'
                _focus={{ boxShadow: '0 0 0 2px rgba(66, 153, 225, 0.6)' }}
                _hover={{ borderColor: 'gray.400' }}
                >
                <option value='usd'>USD</option>
                <option value='btc'>BTC</option>
                <option value='eth'>ETH</option>
                <option value='ada'>ADA</option>
                <option value='dot'>DOT</option>
                <option value='bnb'>BNB</option>
              </Select>
            </Flex>
          }
          style={{ minWidth: '160px' }} // Increased width
        />
        <MiniStatistics
          startContent={
            <IconBox
              w='56px'
              h='56px'
              bg={boxBg}
              icon={<Icon w='32px' h='32px' as={MdInsertChart} color={brandColor} />}
            />
          }
          name='Overall Performance'
          value='+12.3%'
          style={{ minWidth: '160px' }}
        />
      </SimpleGrid>
      <Box p='6'>
      <SimpleGrid columns={{ base: 1, md: 2 }} gap='20px' mb='20px'>
        <AssetOverview />
        <Box>
          <SwapWidget />
          <Box mt='6'>
            <BuyCrypto />
          </Box>
        </Box>
      </SimpleGrid>
            <SimpleGrid columns={{ base: 1 }} gap='20px'>
        <MarketTrends />
      </SimpleGrid>
    </Box>
    </Box>
  );
}
