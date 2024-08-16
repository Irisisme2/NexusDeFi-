import React, { useState } from 'react';
import {
  Box,
  Text,
  Flex,
  Input,
  Button,
  Stack,
  Image,
  Divider,
  FormControl,
  FormLabel,
  Switch,
  Select,
  Textarea,
  IconButton,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  useDisclosure,
  VStack,
  HStack,
  InputGroup,
  InputLeftAddon,
  Center,
} from '@chakra-ui/react';
import Card from 'components/card/Card'; // Ensure this path is correct for your project
import { FaUpload, FaLock, FaTrash } from 'react-icons/fa';

// Example initial data
const initialProfile = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  profilePicture: 'https://via.placeholder.com/150',
  contact: '123-456-7890',
  bio: 'This is a brief bio about John Doe.',
  address: '123 Main St, Anytown, USA',
  dob: '1990-01-01',
  securityQuestions: [
    { question: 'What is your mother\'s maiden name?', answer: '' },
    { question: 'What was the name of your first pet?', answer: '' }
  ]
};

const ProfileSettings = () => {
  const [userName, setUserName] = useState(initialProfile.name);
  const [email, setEmail] = useState(initialProfile.email);
  const [profilePicture, setProfilePicture] = useState(initialProfile.profilePicture);
  const [contact, setContact] = useState(initialProfile.contact);
  const [bio, setBio] = useState(initialProfile.bio);
  const [address, setAddress] = useState(initialProfile.address);
  const [dob, setDob] = useState(initialProfile.dob);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [twoFA, setTwoFA] = useState(false);
  const [language, setLanguage] = useState('English');
  const [notifications, setNotifications] = useState(true);
  const [privacy, setPrivacy] = useState(true);
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(0);
  const [securityAnswer, setSecurityAnswer] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [profilePicFile, setProfilePicFile] = useState(null);
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSaveChanges = () => {
    // Implement save logic here
    toast({
      title: 'Profile updated.',
      description: 'Your profile information has been updated successfully.',
      status: 'success',
      duration: 5000,
      isClosable: true,
    });
  };

  const handleUploadPicture = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result);
        setProfilePicFile(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEnable2FA = () => {
    // Implement 2FA setup logic here
    console.log('Enable 2FA');
  };

  const handleSaveSecurityAnswers = () => {
    // Implement save security answers logic here
    console.log('Security answers saved');
  };

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <Box p='6'>
      <Stack spacing='20px'>
        {/* User Information */}
        <Card p='6' borderRadius='md' boxShadow='lg' bg='white'>
          <Text fontSize='2xl' fontWeight='bold' mb='4'>
            User Information
          </Text>
          <Divider mb='4' />
          <Stack spacing='6'>
            {/* Profile Picture */}
            <Flex align='center'>
              <Image
                src={profilePicture}
                boxSize='150px'
                borderRadius='full'
                mr='4'
                alt='Profile Picture'
                fallbackSrc='https://via.placeholder.com/150'
              />
              <Stack spacing='2'>
                <Button
                  colorScheme='blue'
                  onClick={() => document.getElementById('fileInput').click()}
                  leftIcon={<FaUpload />}
                >
                  Upload Picture
                </Button>
                <Input
                  id='fileInput'
                  type='file'
                  accept='image/*'
                  display='none'
                  onChange={handleUploadPicture}
                />
              </Stack>
            </Flex>

            {/* Name */}
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </FormControl>

            {/* Email */}
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>

            {/* Contact Information */}
            <FormControl>
              <FormLabel>Contact Information</FormLabel>
              <Input
                value={contact}
                onChange={(e) => setContact(e.target.value)}
              />
            </FormControl>

            {/* Address */}
            <FormControl>
              <FormLabel>Address</FormLabel>
              <Input
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </FormControl>

            {/* Date of Birth */}
            <FormControl>
              <FormLabel>Date of Birth</FormLabel>
              <Input
                type='date'
                value={dob}
                onChange={(e) => setDob(e.target.value)}
              />
            </FormControl>

            {/* Bio */}
            <FormControl>
              <FormLabel>Bio</FormLabel>
              <Textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder='Tell us about yourself...'
              />
            </FormControl>

            <Button colorScheme='blue' onClick={handleSaveChanges}>
              Save Changes
            </Button>
            <Button
              colorScheme='red'
              onClick={() => {
                setUserName(initialProfile.name);
                setEmail(initialProfile.email);
                setProfilePicture(initialProfile.profilePicture);
                setContact(initialProfile.contact);
                setBio(initialProfile.bio);
                setAddress(initialProfile.address);
                setDob(initialProfile.dob);
                toast({
                  title: 'Changes discarded.',
                  description: 'Profile changes have been reset.',
                  status: 'info',
                  duration: 5000,
                  isClosable: true,
                });
              }}
              leftIcon={<FaTrash />}
            >
              Reset Changes
            </Button>
          </Stack>
        </Card>

        {/* Security Settings */}
        <Card p='6' borderRadius='md' boxShadow='lg' bg='white'>
          <Text fontSize='2xl' fontWeight='bold' mb='4'>
            Security Settings
          </Text>
          <Divider mb='4' />
          <Stack spacing='6'>
            {/* Password Change */}
            <FormControl>
              <FormLabel>Change Password</FormLabel>
              <Input
                type='password'
                placeholder='New Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Confirm Password</FormLabel>
              <Input
                type='password'
                placeholder='Confirm New Password'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </FormControl>

            {/* Two-Factor Authentication */}
            <FormControl display='flex' alignItems='center'>
              <FormLabel htmlFor='twoFA' mb='0'>
                Two-Factor Authentication
              </FormLabel>
              <Switch
                id='twoFA'
                isChecked={twoFA}
                onChange={(e) => setTwoFA(e.target.checked)}
                ml='3'
              />
              <Button
                ml='4'
                colorScheme='blue'
                onClick={handleOpenModal}
              >
                {twoFA ? 'Disable' : 'Enable'} 2FA
              </Button>
            </FormControl>

            {/* Security Questions */}
            <FormControl>
              <FormLabel>Security Questions</FormLabel>
              {initialProfile.securityQuestions.map((question, index) => (
                <Stack key={index} spacing='4' mb='4'>
                  <Text fontWeight='bold'>{question.question}</Text>
                  <Input
                    value={securityAnswer}
                    onChange={(e) => setSecurityAnswer(e.target.value)}
                    placeholder='Your answer'
                  />
                </Stack>
              ))}
              <Button colorScheme='blue' onClick={handleSaveSecurityAnswers}>
                Save Security Answers
              </Button>
            </FormControl>
          </Stack>
        </Card>

        {/* Account Preferences */}
        <Card p='6' borderRadius='md' boxShadow='lg' bg='white'>
          <Text fontSize='2xl' fontWeight='bold' mb='4'>
            Account Preferences
          </Text>
          <Divider mb='4' />
          <Stack spacing='6'>
            {/* Language Preferences */}
            <FormControl>
              <FormLabel>Language</FormLabel>
              <Select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              >
                <option value='English'>English</option>
                <option value='Spanish'>Spanish</option>
                <option value='French'>French</option>
                <option value='German'>German</option>
                {/* Add more languages as needed */}
              </Select>
            </FormControl>

            {/* Email Notifications */}
            <FormControl display='flex' alignItems='center'>
              <FormLabel htmlFor='emailNotifications' mb='0'>
                Receive Email Notifications
              </FormLabel>
              <Switch
                id='emailNotifications'
                isChecked={notifications}
                onChange={(e) => setNotifications(e.target.checked)}
                ml='3'
              />
            </FormControl>

            {/* SMS Notifications */}
            <FormControl display='flex' alignItems='center'>
              <FormLabel htmlFor='smsNotifications' mb='0'>
                Receive SMS Notifications
              </FormLabel>
              <Switch
                id='smsNotifications'
                isChecked={notifications}
                onChange={(e) => setNotifications(e.target.checked)}
                ml='3'
              />
            </FormControl>

            {/* Privacy Settings */}
            <FormControl display='flex' alignItems='center'>
              <FormLabel htmlFor='privacy' mb='0'>
                Privacy Mode
              </FormLabel>
              <Switch
                id='privacy'
                isChecked={privacy}
                onChange={(e) => setPrivacy(e.target.checked)}
                ml='3'
              />
            </FormControl>

            {/* Connected Applications */}
            <FormControl>
              <FormLabel>Connected Applications</FormLabel>
              <VStack align='start'>
                <HStack spacing='4'>
                  <Text>App 1</Text>
                  <Button size='sm' colorScheme='red'>Disconnect</Button>
                </HStack>
                <HStack spacing='4'>
                  <Text>App 2</Text>
                  <Button size='sm' colorScheme='red'>Disconnect</Button>
                </HStack>
                {/* Add more connected applications as needed */}
              </VStack>
            </FormControl>
          </Stack>
        </Card>
      </Stack>

      {/* 2FA Modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Enable Two-Factor Authentication</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text mb='4'>
              To enhance the security of your account, please follow the instructions to enable two-factor authentication (2FA).
            </Text>
            {/* Insert 2FA setup instructions or a QR code here */}
            <Text>QR Code or instructions for 2FA setup will be displayed here.</Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' onClick={handleEnable2FA}>
              Enable 2FA
            </Button>
            <Button variant='ghost' ml='3' onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ProfileSettings;
