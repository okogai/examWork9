import React from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, CircularProgress } from "@mui/material";

interface FormModalProps {
  open: boolean;
  onClose: () => void;
  onSave: () => void;
  title: string;
  isLoading: boolean;
  formComponent: React.ReactNode;
}

const FormModal: React.FC<FormModalProps> = ({ open, onClose, onSave, title, isLoading, formComponent }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        {formComponent}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={onSave} color="primary" disabled={isLoading}>
          {isLoading ? <CircularProgress size={24} /> : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FormModal;
