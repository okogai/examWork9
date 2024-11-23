import { useState, useEffect, ChangeEvent } from "react";
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
} from "@mui/material";
import { ICategoryFromDB } from '../../types';
import { RootState } from "../../app/store.ts";
import { useAppDispatch } from "../../app/hooks.ts";
import {
  createNewCategory,
  deleteCategory,
  editCategory,
  fetchAllCategories,
  fetchOneCategory,
} from "../../store/thunks/financeThunk.ts";

const initialState = {
  id: "",
  name: "",
  type: "",
};

const CategoryManagement = () => {
  const dispatch = useAppDispatch();
  const { categories, isFetchingAllCategories, categoryToEdit, isFetchingOneCategory } = useSelector(
    (state: RootState) => state.finance
  );

  const [formState, setFormState] = useState<ICategoryFromDB>(initialState);
  const [openDialog, setOpenDialog] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    dispatch(fetchAllCategories());
  }, [dispatch]);

  useEffect(() => {
    if (categoryToEdit) {
      setFormState(categoryToEdit);
    }
  }, [categoryToEdit]);

  const handleOpenDialog = () => {
    setIsEditing(false);
    setFormState(initialState);
    setOpenDialog(true);
  };

  const handleEditCategory = (categoryId: string) => {
    dispatch(fetchOneCategory(categoryId));
    setIsEditing(true);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setFormState(initialState);
  };

  const handleFormChange = (
    event:
      | SelectChangeEvent
      | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSave = () => {
    if (isEditing) {
      dispatch(editCategory(formState));
    } else {
      dispatch(createNewCategory(formState));
    }
    setFormState(initialState);
    setOpenDialog(false);
  };

  if (isFetchingAllCategories || isFetchingOneCategory) return <CircularProgress />;

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleOpenDialog}>
        Add Category
      </Button>

      {categories && (
        <ul>
          {categories.map((category) => (
            <li key={category.id}>
              <span>
                {category.name} ({category.type})
              </span>
              <Button variant="outlined" onClick={() => handleEditCategory(category.id)}>
                Edit
              </Button>
              <Button variant="outlined" color="error" onClick={() => dispatch(deleteCategory(category.id))}>
                Delete
              </Button>
            </li>
          ))}
        </ul>
      )}

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{isEditing ? "Edit Category" : "Add Category"}</DialogTitle>
        <DialogContent>
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
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button color="primary" onClick={handleSave}>
            {isEditing ? "Save Changes" : "Save"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CategoryManagement;
