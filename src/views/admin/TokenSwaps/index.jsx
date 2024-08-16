import { Box, Grid, SimpleGrid, GridItem } from "@chakra-ui/react";
import SwapInterface from "views/admin/TokenSwaps/components/SwapInterface";
import React from "react";

export default function Settings() {
  return (
    <SimpleGrid columns={{ base: 1 }} gap='20px' mt='20'>
<SwapInterface />
</SimpleGrid>
  );
}
