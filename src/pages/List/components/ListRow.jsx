import { Button, TableCell, TableRow } from "@mui/material";
import React, { memo } from "react";
import {
  addToBusket,
  removeFromBusket,
} from "../../../redux/slices/store.slice";
import { useDispatch, useSelector } from "react-redux";

export const ListRow = memo(({ row }) => {
  const dispatch = useDispatch();

  const { checkout } = useSelector((state) => state.store);
  const count = checkout[row.sku];

  const disableToAdd = count >= row.basketLimit;

  const handleAddToBusket = () => dispatch(addToBusket(row.sku));
  const handleRemoveFromBusket = () => dispatch(removeFromBusket(row.sku));

  return (
    <TableRow
      key={row.sku}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell component="th" scope="row">
        {row.name}
      </TableCell>
      <TableCell>{row.description}</TableCell>
      <TableCell>{row.price}$</TableCell>
      <TableCell>
        <Button
          disabled={disableToAdd}
          variant="outlined"
          onClick={handleAddToBusket}
        >
          Add to Basket
        </Button>
      </TableCell>
      <TableCell>
        <Button
          onClick={handleRemoveFromBusket}
          disabled={!Boolean(count)}
          color="error"
          variant="contained"
        >
          Remove from Basket
        </Button>
      </TableCell>
    </TableRow>
  );
});
