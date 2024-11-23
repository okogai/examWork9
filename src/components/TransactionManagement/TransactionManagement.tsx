import React, { useState, useEffect, ChangeEvent } from "react";
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  SelectChangeEvent,
  CardContent, Typography,
  Card
} from '@mui/material';
import { TransactionFromDB } from "../../types";
import { useAppDispatch } from "../../app/hooks.ts";
import { useSelector } from "react-redux";
import { createNewTransaction, editTransaction, fetchAllCategories, fetchAllTransactions, fetchOneTransaction, deleteTransaction } from "../../store/thunks/financeThunk.ts";
import { RootState } from "../../app/store.ts";

const initialState: TransactionFromDB = {
  id: "",
  amount: 0,
  date: '',
  categoryId: '',
  type: '',
};

const TransactionManagement = () => {
  const dispatch = useAppDispatch();
  const { transactions, categories, isFetchingAllCategories, isFetchingAllTransactions, transactionToEdit, isFetchingOneTransaction } = useSelector(
    (state: RootState) => state.finance
  );

  const [formState, setFormState] = useState<TransactionFromDB>(initialState);
  const [openDialog, setOpenDialog] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    dispatch(fetchAllCategories());
    dispatch(fetchAllTransactions());
  }, [dispatch]);

  useEffect(() => {
    if (transactionToEdit) {
      setFormState(transactionToEdit);
      setIsEditing(true);
    }
  }, [transactionToEdit]);

  const handleOpenDialog = () => {
    setIsEditing(false);
    setFormState(initialState);
    setOpenDialog(true);
  };

  const handleEditTransaction = (transactionId: string) => {
    dispatch(fetchOneTransaction(transactionId));
    setIsEditing(true);
    setOpenDialog(true);
  };

  const handleDeleteTransaction = (transactionId: string) => {
    dispatch(deleteTransaction(transactionId));
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setFormState(initialState);
  };

  const handleFormChange = (event: SelectChangeEvent | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleTypeChange = (value: string) => {
    setFormState(prev => ({ ...prev, type: value, categoryId: '' }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(transactionToEdit);
    if (transactionToEdit) {
      await dispatch(editTransaction(formState));
      console.log(formState);
    } else {
      await dispatch(createNewTransaction(formState));
    }
    setFormState(initialState);
    setOpenDialog(false);
  };

  if (isFetchingAllCategories || isFetchingAllTransactions || isFetchingOneTransaction) return <CircularProgress />;

  const filteredCategories = categories.filter(category => category.type === formState.type);

  return (
    <div style={{ padding: "20px", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <Button variant="contained" color="primary" onClick={handleOpenDialog} sx={{ marginBottom: 2 }}>
        Add Transaction
      </Button>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", justifyContent: "center" }}>
        {transactions && transactions.map((transaction) => (
          <Card
            key={transaction.id}
            sx={{
              width: 300,
              boxShadow: 3,
              borderRadius: 2,
              padding: 2,
              marginBottom: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <CardContent>
              <Typography variant="h6" align="center">{transaction.amount} - {transaction.type}</Typography>
              <Typography variant="body2" color="textSecondary" align="center">
                Category: {categories.find(cat => cat.id === transaction.categoryId)?.name || "Unknown"}
              </Typography>
            </CardContent>
            <DialogActions style={{ justifyContent: "center" }}>
              <Button variant="outlined" color="primary" onClick={() => handleEditTransaction(transaction.id)}>
                Edit
              </Button>
              <Button variant="outlined" color="error" onClick={() => handleDeleteTransaction(transaction.id)}>
                Delete
              </Button>
            </DialogActions>
          </Card>
        ))}
      </div>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{isEditing ? "Edit Transaction" : "Add Transaction"}</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <FormControl fullWidth margin="normal">
              <InputLabel>Type</InputLabel>
              <Select
                variant="outlined"
                value={formState.type}
                onChange={(e) => handleTypeChange(e.target.value)}
                name="type"
              >
                <MenuItem value="income">Income</MenuItem>
                <MenuItem value="expense">Expense</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth margin="normal">
              <InputLabel>Category</InputLabel>
              <Select
                variant="outlined"
                value={formState.categoryId}
                onChange={handleFormChange}
                name="categoryId"
              >
                {filteredCategories.map((category) => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label="Amount"
              fullWidth
              value={formState.amount}
              onChange={handleFormChange}
              name="amount"
              type="number"
            />
            <DialogActions>
              <Button onClick={handleCloseDialog} color="primary">
                Cancel
              </Button>
              <Button color="primary" type="submit" disabled={isFetchingOneTransaction}>
                {isEditing ? "Save Changes" : "Save"}
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TransactionManagement;

