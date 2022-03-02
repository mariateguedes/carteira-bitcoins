import { Grid, Typography } from "@material-ui/core";
import React from "react";
import { Container, Flex } from "./styles";

interface ValuesContainerProps {
  title: string;
  sell: string;
  buy: string;
  type: "dol" | "real";
}

const ValuesContainer: React.FunctionComponent<ValuesContainerProps> = ({
  title,
  sell,
  buy,
  type,
}) => {
  return (
    <Container>
      <Typography variant="h5" color="textSecondary">{title}:</Typography>
      <Flex>
        {type == "real" ? (
          <Typography variant="h5" color="textSecondary">R$ {Number(sell).toFixed(2)} </Typography>
        ) : (
          <Typography variant="h5" color="textSecondary">US$ {Number(sell).toFixed(2)} </Typography>
        )}
        <Typography color="textSecondary">venda</Typography>
      </Flex>
      <Flex>
        {type == "real" ? (
          <Typography variant="h5" color="textSecondary">R$ {Number(buy).toFixed(2)} </Typography>
        ) : (
          <Typography variant="h5" color="textSecondary">US$ {Number(buy).toFixed(2)} </Typography>
        )}
        <Typography color="textSecondary">compra</Typography>
      </Flex>
    </Container>
  );
};

export default ValuesContainer;
