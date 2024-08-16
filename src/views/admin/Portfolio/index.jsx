import { Box, Grid, GridItem } from "@chakra-ui/react";
import AssetSummary from "views/admin/Portfolio/components/AssetSummary";
import InvestmentPerformance from "views/admin/Portfolio/components/InvestmentPerformance";
import CurrentHoldings from "views/admin/Portfolio/components/CurrentHoldings";
import TransactionHistory from "views/admin/Portfolio/components/TransactionHistory";
import React from "react";

export default function Settings() {
  return (
    <Box p='6' mt='12'>
      <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap='20px'>
        <GridItem colSpan={{ base: 1, md: 1 }}>
          <AssetSummary />
        </GridItem>
        <GridItem colSpan={{ base: 1, md: 2 }}>
          <InvestmentPerformance />
          <Box mt='12'>
            <CurrentHoldings />
            <Box mt='12'>
              <TransactionHistory />
            </Box>
          </Box>
        </GridItem>
      </Grid>
    </Box>
  );
}
