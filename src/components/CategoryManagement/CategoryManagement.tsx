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

  const handleSave = () => {
    if (isEditing) {
      dispatch(editCategory(formState));
    } else {
      dispatch(createNewCategory(formState));
    }
    setOpenDialog(false);
  };

  if (isFetchingAllCategories) return <CircularProgress />;

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
              <Button variant="outlined" color="error" onClick={() => handleDeleteCategory(category.id)}>
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
