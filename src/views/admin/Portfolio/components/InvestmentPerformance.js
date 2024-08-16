import React from 'react';
import {
  Box,
  Text,
  Stack,
  Divider,
  Flex,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  IconButton,
  useToast,
  HStack,
  VStack,
  Badge,
} from '@chakra-ui/react';
import { Line, Pie, Bar } from 'react-chartjs-2';
import Card from 'components/card/Card';
import { FaInfoCircle, FaArrowUp, FaArrowDown, FaChartBar, FaDollarSign } from 'react-icons/fa';

// Import Chart.js configuration
import './chartConfig'; // Ensure this path is correct

// Example data
const portfolioGrowthData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Portfolio Growth',
      data: [10000, 10500, 11000, 11500, 12000, 12500],
      borderColor: 'rgba(75, 192, 192, 1)',
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      fill: true,
      tension: 0.1,
    },
  ],
};

const assetAllocationData = {
  labels: ['Bitcoin', 'Ethereum', 'Cardano', 'Polkadot', 'Binance Coin'],
  datasets: [
    {
      label: 'Asset Allocation',
      data: [40, 25, 15, 10, 10],
      backgroundColor: [
        'rgba(75, 192, 192, 0.6)',
        'rgba(255, 99, 132, 0.6)',
        'rgba(255, 206, 86, 0.6)',
        'rgba(54, 162, 235, 0.6)',
        'rgba(153, 102, 255, 0.6)',
      ],
      borderColor: 'rgba(255, 255, 255, 1)',
      borderWidth: 1,
    },
  ],
};

const historicalReturnsData = {
  labels: ['2020', '2021', '2022', '2023'],
  datasets: [
    {
      label: 'Historical Returns',
      data: [15, 25, 10, 20],
      borderColor: 'rgba(255, 99, 132, 1)',
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      fill: true,
      tension: 0.1,
    },
  ],
};

const financialSummary = {
  totalInvested: 150000,
  currentValue: 180000,
  gainLoss: 30000,
  percentageChange: 20,
};

const benchmarkData = {
  labels: ['Your Portfolio', 'Benchmark'],
  datasets: [
    {
      label: 'Portfolio vs Benchmark',
      data: [financialSummary.currentValue, 175000],
      backgroundColor: [
        'rgba(75, 192, 192, 0.6)',
        'rgba(255, 99, 132, 0.6)',
      ],
      borderColor: 'rgba(255, 255, 255, 1)',
      borderWidth: 1,
    },
  ],
};

// Utility functions
const getChangePercentage = (current, previous) => {
  if (previous === 0) return 0;
  return ((current - previous) / previous) * 100;
};

const InvestmentPerformance = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const handleShowDetails = () => {
    toast({
      title: 'Details',
      description: 'Additional details about investment performance.',
      status: 'info',
      duration: 5000,
      isClosable: true,
    });
  };

  return (
    <Card p='6' borderRadius='md' boxShadow='lg' bg='white'>
      <Tabs variant='enclosed'>
        <TabList mb='1em'>
          <Tab>Portfolio Growth</Tab>
          <Tab>Asset Allocation</Tab>
          <Tab>Historical Returns</Tab>
          <Tab>Financial Summary</Tab>
          <Tab>Benchmark Comparison</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <Text fontSize='2xl' fontWeight='bold' mb='4'>
              Portfolio Growth
              <IconButton
                icon={<FaInfoCircle />}
                aria-label='Info'
                ml='2'
                variant='link'
                onClick={handleShowDetails}
              />
            </Text>
            <Divider mb='4' />
            <Line
              data={portfolioGrowthData}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    display: true,
                  },
                  tooltip: {
                    callbacks: {
                      label: function (tooltipItem) {
                        return `$${tooltipItem.raw.toFixed(2)}`;
                      },
                    },
                  },
                },
                scales: {
                  x: {
                    beginAtZero: true,
                    title: {
                      display: true,
                      text: 'Month',
                    },
                  },
                  y: {
                    beginAtZero: true,
                    title: {
                      display: true,
                      text: 'Value',
                    },
                    ticks: {
                      callback: function (value) {
                        return `$${value}`;
                      },
                    },
                  },
                },
              }}
            />
          </TabPanel>

          <TabPanel>
            <Text fontSize='2xl' fontWeight='bold' mb='4'>
              Asset Allocation
              <IconButton
                icon={<FaInfoCircle />}
                aria-label='Info'
                ml='2'
                variant='link'
                onClick={handleShowDetails}
              />
            </Text>
            <Divider mb='4' />
            <Pie
              data={assetAllocationData}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    display: true,
                  },
                  tooltip: {
                    callbacks: {
                      label: function (tooltipItem) {
                        return `${tooltipItem.label}: ${tooltipItem.raw}%`;
                      },
                    },
                  },
                },
              }}
            />
          </TabPanel>

          <TabPanel>
            <Text fontSize='2xl' fontWeight='bold' mb='4'>
              Historical Returns
              <IconButton
                icon={<FaInfoCircle />}
                aria-label='Info'
                ml='2'
                variant='link'
                onClick={handleShowDetails}
              />
            </Text>
            <Divider mb='4' />
            <Line
              data={historicalReturnsData}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    display: true,
                  },
                  tooltip: {
                    callbacks: {
                      label: function (tooltipItem) {
                        return `${tooltipItem.raw.toFixed(2)}%`;
                      },
                    },
                  },
                },
                scales: {
                  x: {
                    beginAtZero: true,
                    title: {
                      display: true,
                      text: 'Year',
                    },
                  },
                  y: {
                    beginAtZero: true,
                    title: {
                      display: true,
                      text: 'Returns (%)',
                    },
                    ticks: {
                      callback: function (value) {
                        return `${value}%`;
                      },
                    },
                  },
                },
              }}
            />
          </TabPanel>

          <TabPanel>
            <Text fontSize='2xl' fontWeight='bold' mb='4'>
              Financial Summary
            </Text>
            <Divider mb='4' />
            <VStack align='start'>
              <HStack spacing='4'>
                <FaDollarSign color='blue.500' />
                <Text fontSize='lg'>Total Invested: ${financialSummary.totalInvested.toLocaleString()}</Text>
              </HStack>
              <HStack spacing='4'>
                <FaArrowUp color='green.500' />
                <Text fontSize='lg'>Current Value: ${financialSummary.currentValue.toLocaleString()}</Text>
              </HStack>
              <HStack spacing='4'>
                <FaArrowUp color='green.500' />
                <Text fontSize='lg'>Gain/Loss: ${financialSummary.gainLoss.toLocaleString()}</Text>
              </HStack>
              <HStack spacing='4'>
                <Badge colorScheme={financialSummary.percentageChange >= 0 ? 'green' : 'red'}>
                  {financialSummary.percentageChange.toFixed(2)}%
                </Badge>
                <Text fontSize='lg'>Percentage Change</Text>
              </HStack>
            </VStack>
          </TabPanel>

          <TabPanel>
            <Text fontSize='2xl' fontWeight='bold' mb='4'>
              Benchmark Comparison
              <IconButton
                icon={<FaInfoCircle />}
                aria-label='Info'
                ml='2'
                variant='link'
                onClick={handleShowDetails}
              />
            </Text>
            <Divider mb='4' />
            <Bar
              data={benchmarkData}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    display: true,
                  },
                  tooltip: {
                    callbacks: {
                      label: function (tooltipItem) {
                        return `$${tooltipItem.raw.toLocaleString()}`;
                      },
                    },
                  },
                },
                scales: {
                  x: {
                    title: {
                      display: true,
                      text: 'Category',
                    },
                  },
                  y: {
                    beginAtZero: true,
                    title: {
                      display: true,
                      text: 'Value',
                    },
                    ticks: {
                      callback: function (value) {
                        return `$${value}`;
                      },
                    },
                  },
                },
              }}
            />
          </TabPanel>
        </TabPanels>
      </Tabs>

      {/* Details Modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Investment Performance Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text mb='4'>
              Here are some more detailed insights about your investment performance.
              You can view different metrics and trends related to your investments.
            </Text>
            {/* Insert detailed charts or data here */}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Card>
  );
};

export default InvestmentPerformance;
