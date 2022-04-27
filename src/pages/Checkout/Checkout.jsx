import {
  Box,
  Button,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import React, { useMemo } from "react";
import { changeCardNumber, handleSubmit } from "../../redux/slices/store.slice";
import { useDispatch, useSelector } from "react-redux";

import { CheckoutRow } from "./components/CheckoutRow";
import { LoadingButton } from "@mui/lab";
import { getTotal } from "../../lib";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { list, checkout, cardNumber, isValid, error, loadingSubmit } =
    useSelector((state) => state.store);

  const { totalCount, totalPrice } = useMemo(
    () => getTotal({ list, checkout }),
    [list, checkout]
  );

  const isDisabled = !Boolean(totalCount) || !isValid;

  const handleChange = (event) => {
    dispatch(changeCardNumber(event.target.value));
  };

  const onSubmit = () => {
    dispatch(handleSubmit());
  };

  const handleNavigate = () => {
    navigate("/list");
  };

  return (
    <Box px={5}>
      <Typography gutterBottom align="right" variant="subtitle1">
        Basket Items: {totalCount}
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Product Name</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Total Price</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.entries(checkout)
              .filter(([, value]) => Boolean(value))
              .map(([key, value]) => (
                <CheckoutRow itemKey={key} key={key} value={value} />
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Typography align="right" variant="subtitle1">
        Total Price {totalPrice}$
      </Typography>

      <Box display="flex" justifyContent="center" alignItems="center" my={2}>
        <Typography>Input Your Card Number</Typography>
        <TextField
          sx={{ marginLeft: 4 }}
          value={cardNumber}
          error={Boolean(cardNumber && !isValid)}
          helperText={error}
          onChange={handleChange}
        />
      </Box>
      <Stack direction="row" spacing={2}>
        <Button variant="contained" onClick={handleNavigate}>
          Continue shopping
        </Button>
        <LoadingButton
          loading={loadingSubmit}
          variant="contained"
          onClick={onSubmit}
          disabled={isDisabled}
        >
          Submit
        </LoadingButton>
      </Stack>
    </Box>
  );
};

export default Checkout;
