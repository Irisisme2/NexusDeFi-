import React, { useState, useEffect } from 'react';
import {
  Box,
  Text,
  Flex,
  VStack,
  Input,
  Button,
  Select,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  IconButton,
  HStack,
  useToast,
  Spinner,
} from '@chakra-ui/react';
import { FiDownload, FiSearch, FiX } from 'react-icons/fi';
import Card from 'components/card/Card';
import DatePicker from 'react-datepicker'; // Assuming you have react-datepicker installed
import 'react-datepicker/dist/react-datepicker.css';

// Import icons
import btcIcon from 'assets/img/icons/Btc.jpg';
import ethIcon from 'assets/img/icons/Eth.png';
import adaIcon from 'assets/img/icons/Ada.jpg';
import dotIcon from 'assets/img/icons/Dot.png';
import bnbIcon from 'assets/img/icons/Bnb.png';
import solIcon from 'assets/img/icons/sol.jpg';

// Sample data for transactions
const sampleTransactions = [
  { date: '2024-08-10', amount: 0.5, type: 'Purchase', asset: 'Bitcoin' },
  { date: '2024-08-11', amount: 1.2, type: 'Swap', asset: 'Ethereum' },
  { date: '2024-08-12', amount: 15, type: 'Transfer', asset: 'Polkadot' },
  { date: '2024-08-13', amount: 10, type: 'Purchase', asset: 'Binance Coin' },
  { date: '2024-08-14', amount: 30, type: 'Swap', asset: 'Solana' },
  // Add more sample data as needed
];

// Map asset names to icons
const assetIcons = {
  Bitcoin: btcIcon,
  Ethereum: ethIcon,
  Polkadot: dotIcon,
  'Binance Coin': bnbIcon,
  Solana: solIcon,
  Cardano: adaIcon,
};

const TransactionHistory = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState([]);
  const [filterAsset, setFilterAsset] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [filteredTransactions, setFilteredTransactions] = useState(sampleTransactions);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [transactionsPerPage] = useState(10);
  const [sortColumn, setSortColumn] = useState('date');
  const [sortDirection, setSortDirection] = useState('asc');
  const toast = useToast();

  useEffect(() => {
    handleSearch();
  }, [searchQuery, filterType, filterAsset, startDate, endDate, sortColumn, sortDirection]);

  const handleSearch = () => {
    setLoading(true);
    try {
      let filtered = sampleTransactions.filter(transaction => {
        const transactionDate = new Date(transaction.date);
        const isWithinDateRange = !startDate || !endDate || (transactionDate >= new Date(startDate) && transactionDate <= new Date(endDate));
        const matchesSearchQuery = transaction.date.includes(searchQuery) || transaction.asset.includes(searchQuery);
        const matchesTypeFilter = filterType.length === 0 || filterType.includes(transaction.type);
        const matchesAssetFilter = filterAsset.length === 0 || filterAsset.includes(transaction.asset);

        return matchesSearchQuery && matchesTypeFilter && matchesAssetFilter && isWithinDateRange;
      });

      // Sorting
      filtered = filtered.sort((a, b) => {
        const aValue = a[sortColumn];
        const bValue = b[sortColumn];
        if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
        return 0;
      });

      setFilteredTransactions(filtered);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'An error occurred while filtering transactions.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleExport = (format) => {
    // Placeholder for export logic
    console.log(`Exporting to ${format}`);
    toast({
      title: 'Export Initiated',
      description: `Exporting data as ${format}`,
      status: 'info',
      duration: 5000,
      isClosable: true,
    });
    onClose(); // Close modal after export action
  };

  // Pagination
  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = filteredTransactions.slice(indexOfFirstTransaction, indexOfLastTransaction);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Card p='6' borderRadius='md' boxShadow='lg' bg='white'>
      <Text fontSize='2xl' fontWeight='bold' mb='4'>
        Transaction History
      </Text>

      <VStack spacing='4' mb='6'>
        <Flex width='100%' gap='4' align='center'>
          <Input
            placeholder='Search by date or asset'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button onClick={handleSearch} leftIcon={<FiSearch />} colorScheme='blue'>
            Search
          </Button>
        </Flex>

        <Flex width='100%' gap='4'>
          <Select placeholder='Filter by Type' onChange={(e) => setFilterType(Array.from(e.target.selectedOptions, option => option.value))} multiple>
            <option value=''>All Types</option>
            <option value='Purchase'>Purchase</option>
            <option value='Swap'>Swap</option>
            <option value='Transfer'>Transfer</option>
          </Select>
          <Select placeholder='Filter by Asset' onChange={(e) => setFilterAsset(Array.from(e.target.selectedOptions, option => option.value))} multiple>
            <option value=''>All Assets</option>
            {Array.from(new Set(sampleTransactions.map(transaction => transaction.asset))).map(asset => (
              <option key={asset} value={asset}>{asset}</option>
            ))}
          </Select>
          <DatePicker
            placeholderText='Start Date'
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
          />
          <DatePicker
            placeholderText='End Date'
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
          />
        </Flex>
      </VStack>

      {loading ? (
        <Flex justify='center' align='center' height='200px'>
          <Spinner size='xl' />
        </Flex>
      ) : (
        <>
          <Box overflowX='auto' mb='4'>
            <Table variant='simple'>
              <TableCaption>Recent Transactions</TableCaption>
              <Thead>
                <Tr>
                  <Th>
                    <Flex align='center'>
                      Date
                      <IconButton
                        aria-label='Sort by date'
                        icon={sortColumn === 'date' && sortDirection === 'asc' ? <FiX /> : <FiSearch />}
                        onClick={() => {
                          setSortColumn('date');
                          setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
                        }}
                        ml='2'
                        size='sm'
                      />
                    </Flex>
                  </Th>
                  <Th>
                    <Flex align='center'>
                      Amount
                      <IconButton
                        aria-label='Sort by amount'
                        icon={sortColumn === 'amount' && sortDirection === 'asc' ? <FiX /> : <FiSearch />}
                        onClick={() => {
                          setSortColumn('amount');
                          setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
                        }}
                        ml='2'
                        size='sm'
                      />
                    </Flex>
                  </Th>
                  <Th>
                    <Flex align='center'>
                      Type
                      <IconButton
                        aria-label='Sort by type'
                        icon={sortColumn === 'type' && sortDirection === 'asc' ? <FiX /> : <FiSearch />}
                        onClick={() => {
                          setSortColumn('type');
                          setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
                        }}
                        ml='2'
                        size='sm'
                      />
                    </Flex>
                  </Th>
                  <Th>
                    <Flex align='center'>
                      Asset
                      <IconButton
                        aria-label='Sort by asset'
                        icon={sortColumn === 'asset' && sortDirection === 'asc' ? <FiX /> : <FiSearch />}
                        onClick={() => {
                          setSortColumn('asset');
                          setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
                        }}
                        ml='2'
                        size='sm'
                      />
                    </Flex>
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {currentTransactions.length > 0 ? (
                  currentTransactions.map((transaction, index) => (
                    <Tr key={index}>
                      <Td>{transaction.date}</Td>
                      <Td>{transaction.amount}</Td>
                      <Td>{transaction.type}</Td>
                      <Td>
                        <Flex align='center'>
                          <img src={assetIcons[transaction.asset]} alt={transaction.asset} style={{ width: '24px', height: '24px', marginRight: '8px' }} />
                          {transaction.asset}
                        </Flex>
                      </Td>
                    </Tr>
                  ))
                ) : (
                  <Tr>
                    <Td colSpan='4' textAlign='center'>No transactions found</Td>
                  </Tr>
                )}
              </Tbody>
            </Table>
          </Box>

          <Flex justify='space-between' align='center'>
            <HStack>
              {[...Array(Math.ceil(filteredTransactions.length / transactionsPerPage)).keys()].map(number => (
                <Button
                  key={number}
                  onClick={() => paginate(number + 1)}
                  colorScheme='blue'
                  variant={currentPage === number + 1 ? 'solid' : 'outline'}
                >
                  {number + 1}
                </Button>
              ))}
            </HStack>
            <Button colorScheme='blue' onClick={onOpen} leftIcon={<FiDownload />}>
              Export
            </Button>
          </Flex>
        </>
      )}

      {isOpen && (
        <Modal isOpen={isOpen} onClose={onClose} size='sm'>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Export Transactions</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text>Select format to export:</Text>
              <Flex direction='column' mt='4'>
                <Button onClick={() => handleExport('CSV')} colorScheme='blue' mb='2'>
                  Export as CSV
                </Button>
                <Button onClick={() => handleExport('PDF')} colorScheme='blue'>
                  Export as PDF
                </Button>
              </Flex>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme='blue' onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </Card>
  );
};

export default TransactionHistory;
