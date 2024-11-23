import React, { useState, useEffect, ChangeEvent } from "react";
import { useSelector } from "react-redux";
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
  CardContent,
  Typography,
  Card,
} from '@mui/material';
import { ICategoryFromDB } from '../../types';
import { RootState } from "../../app/store.ts";
import { useAppDispatch } from "../../app/hooks.ts";
import {
  createNewCategory,
  fetchAllCategories,
  editCategory,
  deleteCategory
} from '../../store/thunks/financeThunk.ts';

const CategoryManagement = () => {
  const dispatch = useAppDispatch();
  const { categories, isFetchingAllCategories } = useSelector(
    (state: RootState) => state.finance
  );

  const [formState, setFormState] = useState<ICategoryFromDB>({
    id: "",
    name: "",
    type: "",
  });
  const [openDialog, setOpenDialog] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    dispatch(fetchAllCategories());
  }, [dispatch]);

  const handleOpenDialog = () => {
    setIsEditing(false);
    setFormState({ id: "", name: "", type: "" });
    setOpenDialog(true);
  };

  const handleEditCategory = (categoryId: string) => {
    const category = categories.find((cat) => cat.id === categoryId);
    if (category) {
      setIsEditing(true);
      setFormState(category);
      setOpenDialog(true);
    }
  };

  const handleDeleteCategory =  (categoryId: string) => {
    dispatch(deleteCategory(categoryId));
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleFormChange = (
    event: SelectChangeEvent | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    if (isEditing) {
      dispatch(editCategory(formState));
    } else {
      dispatch(createNewCategory(formState));
    }
    setOpenDialog(false);
  };

  if (isFetchingAllCategories) return <CircularProgress />;

  return (
    <div style={{ padding: "20px", display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
      <Button variant="contained" color="primary" onClick={handleOpenDialog} sx={{ marginBottom: 2 }}>
        Add Category
      </Button>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", justifyContent: "center" }}>
        {categories && categories.map((category) => (
          <Card
            key={category.id}
            sx={{
              maxWidth: 345,
              boxShadow: 3,
              borderRadius: 2,
              padding: 2,
              marginBottom: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
            }}
          >
            <CardContent>
              <Typography variant="h6" align="center">{category.name}</Typography>
              <Typography variant="body2" color="textSecondary" align="center">{category.type}</Typography>
            </CardContent>
            <DialogActions style={{ justifyContent: "center" }}>
              <Button variant="contained" color="primary" onClick={() => handleEditCategory(category.id)}>
                Edit
              </Button>
              <Button variant="contained" color="warning" onClick={() => handleDeleteCategory(category.id)}>
                Delete
              </Button>
            </DialogActions>
          </Card>
        ))}
      </div>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{isEditing ? "Edit Category" : "Add Category"}</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSave}>
            <TextField
              label="Category Name"
              fullWidth
              value={formState.name}
              onChange={handleFormChange}
              name="name"
            />
            <FormControl fullWidth margin="normal">
              <InputLabel>Type</InputLabel>
              <Select
                variant="outlined"
                value={formState.type}
                onChange={handleFormChange}
                name="type"
              >
                <MenuItem value="income">Income</MenuItem>
                <MenuItem value="expense">Expense</MenuItem>
              </Select>
            </FormControl>
            <DialogActions>
              <Button onClick={handleCloseDialog} color="primary">
                Cancel
              </Button>
              <Button color="primary" type="submit">
                {isEditing ? "Save Changes" : "Save"}
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CategoryManagement;
