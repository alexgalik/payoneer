/* eslint-disable react-hooks/exhaustive-deps */
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableContainer,
  Typography,
} from "@mui/material";
import React, { memo, useEffect, useMemo } from "react";
import { addNewItemToList, getList } from "../../redux/slices/store.slice";
import { createNewListItem, getTotal } from "../../lib";
import { useDispatch, useSelector } from "react-redux";

import { ListRow } from "./components/ListRow";
import { sortBy } from "lodash";
import { useNavigate } from "react-router-dom";

const List = memo(() => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { list, checkout, listError, loading } = useSelector(
    (state) => state.store
  );
  const handleInit = () => dispatch(getList());

  useEffect(() => {
    if (!list.length) {
      handleInit();
    }
  }, [list]);

  const { totalCount, totalPrice } = useMemo(
    () => getTotal({ list, checkout }),
    [list, checkout]
  );

  const handleAddProduct = () => {
    const lastItem = sortBy(list, "sku")[list.length - 1];
    const newItem = createNewListItem(lastItem.sku);
    dispatch(addNewItemToList(newItem));
  };

  const handleNavigate = () => {
    navigate("/checkout");
  };

  return (
    <Box px={5}>
      <Typography align="right" onClick={handleNavigate} variant="subtitle1">
        Basket Items: {totalCount} Total Price: {totalPrice}$
      </Typography>

      {listError && (
        <Box>
          <Alert severity="error">This is an error alert — check it out!</Alert>
          <Button onClick={handleInit} variant="contained">
            Try one more time
          </Button>
        </Box>
      )}

      {loading ? (
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableBody>
              {list.map((row) => (
                <ListRow key={row.sku} row={row} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Button
        sx={{ marginTop: 2 }}
        variant="contained"
        onClick={handleNavigate}
        disabled={loading || !totalCount}
      >
        Proceed to checkout
      </Button>

      <Button variant="contained" onClick={handleAddProduct}>
        Add new product
      </Button>
    </Box>
  );
});

export default List;
