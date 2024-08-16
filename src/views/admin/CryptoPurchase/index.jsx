import { Box, Grid, Flex, SimpleGrid, GridItem } from "@chakra-ui/react";
import CryptoPurchase from "views/admin/CryptoPurchase/components/CryptoPurchase";
import React from "react";

export default function Settings() {
  return (
    <SimpleGrid columns={{ base: 1 }} gap='20px' mt='20'>
<CryptoPurchase />
</SimpleGrid>
  );
}
