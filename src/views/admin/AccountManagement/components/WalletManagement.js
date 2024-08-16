import React, { useState } from 'react';
import {
  Box,
  Text,
  Flex,
  Stack,
  Button,
  Divider,
  IconButton,
  FormControl,
  FormLabel,
  Input,
  Image,
  VStack,
  Grid,
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
  useToast,
  Tag,
} from '@chakra-ui/react';
import Card from 'components/card/Card'; // Ensure this path is correct for your project
import { FaPlus, FaEdit, FaTrash, FaGoogle, FaFacebook, FaTwitter, FaGithub, FaLink } from 'react-icons/fa';

// Example data for wallets
const wallets = [
  {
    id: 1,
    name: 'MetaMask',
    address: '0x123...abc',
    balance: 1.25,
    assets: { BTC: 0.5, ETH: 0.75 },
    transactionHistory: [
      { date: '2024-08-15', amount: 0.1, type: 'Deposit' },
      { date: '2024-08-14', amount: 0.05, type: 'Withdrawal' },
    ],
  },
  {
    id: 2,
    name: 'Trust Wallet',
    address: '0x456...def',
    balance: 0.35,
    assets: { BTC: 0.1, ETH: 0.25 },
    transactionHistory: [
      { date: '2024-08-10', amount: 0.2, type: 'Deposit' },
    ],
  },
];

// Example data for social accounts
const socialAccounts = [
  { platform: 'Google', icon: FaGoogle, linked: true, lastLinked: '2024-08-10' },
  { platform: 'Facebook', icon: FaFacebook, linked: false },
  { platform: 'Twitter', icon: FaTwitter, linked: true, lastLinked: '2024-07-20' },
  { platform: 'GitHub', icon: FaGithub, linked: false },
];

const WalletManagement = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedWallet, setSelectedWallet] = useState(null);
  const [newWallet, setNewWallet] = useState('');
  const [walletBalances, setWalletBalances] = useState({});
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleAddWallet = () => {
    if (newWallet) {
      setWalletBalances((prev) => ({ ...prev, [newWallet]: 0 }));
      setNewWallet('');
      toast({
        title: 'Wallet Added',
        description: `Wallet ${newWallet} has been added successfully.`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleRemoveWallet = (id) => {
    // Logic to remove wallet
    toast({
      title: 'Wallet Removed',
      description: `Wallet with ID ${id} has been removed.`,
      status: 'warning',
      duration: 5000,
      isClosable: true,
    });
  };

  const handleViewDetails = (wallet) => {
    setSelectedWallet(wallet);
    onOpen();
  };

  return (
    <Box p='6'>
      <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap='20px'>
        {/* Connected Wallets */}
        <Card p='6' borderRadius='md' boxShadow='lg' bg='white'>
          <Text fontSize='2xl' fontWeight='bold' mb='4'>
            Connected Wallets
          </Text>
          <Divider mb='4' />
          <Stack spacing='6'>
            {wallets.map((wallet) => (
              <Box key={wallet.id} borderWidth='1px' borderRadius='md' p='4' mb='4' bg='gray.50'>
                <Flex justify='space-between' align='center'>
                  <Text fontSize='lg' fontWeight='bold'>
                    {wallet.name}
                  </Text>
                  <Flex align='center'>
                    <IconButton
                      icon={<FaEdit />}
                      aria-label='Edit Wallet'
                      variant='outline'
                      size='sm'
                      mr='2'
                      onClick={() => handleViewDetails(wallet)}
                    />
                    <IconButton
                      icon={<FaTrash />}
                      aria-label='Remove Wallet'
                      variant='outline'
                      size='sm'
                      onClick={() => handleRemoveWallet(wallet.id)}
                    />
                  </Flex>
                </Flex>
                <Text fontSize='sm' color='gray.600' mt='2'>
                  Address: {wallet.address}
                </Text>
                <Text fontSize='sm' color='gray.600'>
                  Balance: {wallet.balance} ETH
                </Text>
                <Flex mt='2'>
                  {Object.entries(wallet.assets).map(([asset, amount]) => (
                    <Badge key={asset} colorScheme='teal' mr='2'>
                      {asset}: {amount}
                    </Badge>
                  ))}
                </Flex>
                <Button
                  mt='4'
                  colorScheme='blue'
                  onClick={() => handleViewDetails(wallet)}
                >
                  View Details
                </Button>
              </Box>
            ))}
            <Button
              colorScheme='blue'
              leftIcon={<FaPlus />}
              onClick={() => setShowModal(true)}
            >
              Add New Wallet
            </Button>
          </Stack>
        </Card>

        {/* Social/Email Accounts */}
        <Card p='6' borderRadius='md' boxShadow='lg' bg='white'>
          <Text fontSize='2xl' fontWeight='bold' mb='4'>
            Social/Email Accounts
          </Text>
          <Divider mb='4' />
          <Stack spacing='6'>
            {socialAccounts.map((account) => (
              <Flex key={account.platform} align='center' justify='space-between' p='4' borderWidth='1px' borderRadius='md' bg='gray.50' mb='4'>
                <Flex align='center'>
                  <IconButton
                    icon={<account.icon />}
                    aria-label={account.platform}
                    colorScheme={account.linked ? 'teal' : 'gray'}
                    mr='3'
                  />
                  <Text fontSize='lg' fontWeight='bold'>
                    {account.platform}
                  </Text>
                </Flex>
                <Button
                  colorScheme={account.linked ? 'red' : 'blue'}
                  onClick={() => console.log(account.linked ? 'Unlink' : 'Link')}
                >
                  {account.linked ? 'Unlink' : 'Link'}
                </Button>
                {account.lastLinked && (
                  <Tooltip label={`Last linked on ${account.lastLinked}`}>
                    <Tag ml='4' colorScheme='gray'>
                      Last Linked: {account.lastLinked}
                    </Tag>
                  </Tooltip>
                )}
              </Flex>
            ))}
          </Stack>
        </Card>
      </Grid>

      {/* Modal for Adding New Wallet */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Wallet</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Wallet Address</FormLabel>
              <Input
                value={newWallet}
                onChange={(e) => setNewWallet(e.target.value)}
                placeholder='Enter wallet address'
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' onClick={handleAddWallet} mr='3'>
              Add Wallet
            </Button>
            <Button variant='ghost' onClick={() => setShowModal(false)}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Modal for Viewing Wallet Details */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Wallet Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedWallet && (
              <VStack spacing='4'>
                <Text fontSize='lg' fontWeight='bold'>{selectedWallet.name}</Text>
                <Text fontSize='sm'>Address: {selectedWallet.address}</Text>
                <Text fontSize='sm'>Balance: {selectedWallet.balance} ETH</Text>
                <Text fontSize='sm'>Assets:</Text>
                <Stack spacing='2'>
                  {Object.entries(selectedWallet.assets).map(([asset, amount]) => (
                    <Text key={asset} fontSize='sm'>{asset}: {amount}</Text>
                  ))}
                </Stack>
                <Divider mt='4' mb='4' />
                <Text fontSize='md' fontWeight='bold'>Transaction History</Text>
                <Stack spacing='2'>
                  {selectedWallet.transactionHistory.map((transaction, index) => (
                    <Flex key={index} justify='space-between' p='2' borderWidth='1px' borderRadius='md' bg='gray.50'>
                      <Text fontSize='sm'>{transaction.date}</Text>
                      <Text fontSize='sm' color={transaction.type === 'Deposit' ? 'green.500' : 'red.500'}>
                        {transaction.type}: {transaction.amount} ETH
                      </Text>
                    </Flex>
                  ))}
                </Stack>
              </VStack>
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' onClick={onClose} mr='3'>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default WalletManagement;

