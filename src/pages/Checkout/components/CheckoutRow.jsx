import { Button, TableCell, TableRow, TextField } from "@mui/material";
import React, { memo } from "react";
import { removeAll, setQuatity } from "../../../redux/slices/store.slice";
import { useDispatch, useSelector } from "react-redux";

export const CheckoutRow = memo(({ itemKey, value }) => {
  const dispatch = useDispatch();
  const { list } = useSelector((state) => state.store);

  const item = list.find(({ sku }) => sku === Number(itemKey));
  const handleRemoveAllBusket = () => dispatch(removeAll(itemKey));

  const limits = Array.from({ length: item.basketLimit }, (_, i) => i + 1);

  const handleChange = (event) => {
    dispatch(setQuatity({ key: itemKey, value: event.target.value }));
  };

  return (
    <TableRow
      key={item.sku}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell component="th" scope="row">
        {item.name}
      </TableCell>
      <TableCell>
        <TextField
          id="outlined-select-currency-native"
          select
          value={value}
          onChange={handleChange}
          SelectProps={{
            native: true,
          }}
          helperText="Please select quantity"
        >
          {limits.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </TextField>
      </TableCell>
      <TableCell>{item.price}$</TableCell>
      <TableCell>{(item.price * value).toFixed(2)}$</TableCell>
      <TableCell>
        <Button
          onClick={handleRemoveAllBusket}
          color="error"
          variant="contained"
        >
          Remove all
        </Button>
      </TableCell>
    </TableRow>
  );
});
