import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Button, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import { Grid } from '@mui/material';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import Checkbox from '@mui/material/Checkbox';

export const ExpenseManager = () => {
  const [state, setState] = useState({
    expense: "",
    amount: "",
    date: new Date(),
    items: [],
    editIndex: null,
    editExpense: "",
    editAmount: "",
    editDate: new Date()
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleDateChange = (date) => {
    setState(prevState => ({
      ...prevState,
      date: date
    }));
  };

  const handleAddItem = () => {
    const newItem = {
      expense: state.expense,
      amount: state.amount,
      date: state.date.toLocaleDateString(),
      isChecked: false
    };
    setState(prevState => ({
      ...prevState,
      items: [...prevState.items, newItem],
      expense: "",
      amount: "",
      date: new Date()
    }));
  };

  const handleCheckboxChange = (event, index) => {
    const updatedItems = [...state.items];
    updatedItems[index].isChecked = event.target.checked;
    setState(prevState => ({
      ...prevState,
      items: updatedItems
    }));
  };

  const handleRemoveItem = (index) => {
    setState(prevState => ({
      ...prevState,
      items: prevState.items.filter((_, i) => i !== index)
    }));
  };

  const handleEditItem = (index) => {
    const item = state.items[index];
    setState(prevState => ({
      ...prevState,
      editIndex: index,
      editExpense: item.expense,
      editAmount: item.amount,
      editDate: new Date(item.date)
    }));
  };

  const handleSaveItem = () => {
    const updatedItem = {
      expense: state.editExpense,
      amount: state.editAmount,
      date: state.editDate.toLocaleDateString()
    };
    const updatedItems = [...state.items];
    updatedItems[state.editIndex] = updatedItem;
    setState(prevState => ({
      ...prevState,
      items: updatedItems,
      editIndex: null,
      editExpense: "",
      editAmount: "",
      editDate: new Date()
    }));
  };

  const handleCancelEdit = () => {
    setState(prevState => ({
      ...prevState,
      editIndex: null,
      editExpense: "",
      editAmount: "",
      editDate: new Date()
    }));
  };

  

  return (
    <div>
      <AppBar position="static" sx={{ backgroundColor: 'primary' }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1, textAlign: 'center', fontWeight: 'bold', textTransform: 'uppercase' }}>
            Expense Tracker
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>

      <Box sx={{ p: 3, display: 'flex', justifyContent: 'center' }}>
        <Paper sx={{ p: 3, width: '100%', maxWidth: '600px', backgroundColor: '#f5f5f5' }}>
          <FormControl fullWidth>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  id="expense"
                  name="expense"
                  label="Expense"
                  variant="outlined"
                  type="text"
                  multiline
                  fullWidth
                  value={state.expense}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="amount"
                  name="amount"
                  label="Amount"
                  variant="outlined"
                  type="number"
                  fullWidth
                  value={state.amount}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="Select Date"
                    value={state.date}
                    onChange={handleDateChange}
                    renderInput={(params) => <TextField {...params} fullWidth />}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleAddItem}
                >
                  Add Expense
                </Button>
              </Grid>
            </Grid>
          </FormControl>
        </Paper>
      </Box>

      <Box sx={{ p: 3, display: 'flex', justifyContent: 'center' }}>
        <TableContainer component={Paper} sx={{ width: '100%', maxWidth: '800px' }}>
          <Table>
            <TableHead sx={{ backgroundColor: '#1e88e5' }}>
              <TableRow>
                <TableCell align="center" colSpan={5} sx={{ color: 'white', fontWeight: 'bold', textTransform: 'uppercase' }}>
                  Expense List
                </TableCell>
              </TableRow>
              <TableRow sx={{ backgroundColor: 'lightgreen' }}>
                <TableCell sx={{ fontWeight: 'bold' }}>Paid</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Expense($)</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Amount</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Date</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {state.items.map((item, index) => (
                <TableRow key={index} sx={{ '&:hover': { backgroundColor: '#f5f5f5' } }}>
                  <TableCell sx={{ padding: '8px', width: '5%' }}>
                    <Checkbox
                      checked={item.isChecked || false}
                      onChange={(e) => handleCheckboxChange(e, index)}
                      inputProps={{ 'aria-label': 'select item' }}
                    />
                  </TableCell>
                  <TableCell sx={{ padding: '8px', width: '25%' }}>
                    {index === state.editIndex ? (
                      <TextField
                        id="editExpense"
                        name="editExpense"
                        value={state.editExpense}
                        onChange={handleInputChange}
                        fullWidth
                      />
                    ) : (
                      <Box sx={{ padding: '8px' }}>{item.expense}</Box>
                    )}
                  </TableCell>
                  <TableCell sx={{ padding: '8px', width: '20%' }}>
                    {index === state.editIndex ? (
                      <TextField
                        id="editAmount"
                        name="editAmount"
                        value={state.editAmount}
                        onChange={handleInputChange}
                        fullWidth
                      />
                    ) : (
                      <Box sx={{ padding: '8px' }}>{item.amount}</Box>
                    )}
                  </TableCell>
                  <TableCell sx={{ padding: '8px', width: '25%' }}>
                    {index === state.editIndex ? (
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                          value={state.editDate}
                          onChange={(date) => setState((prevState) => ({ ...prevState, editDate: date }))}
                          renderInput={(params) => <TextField {...params} fullWidth />}
                        />
                      </LocalizationProvider>
                    ) : (
                      <Box sx={{ padding: '8px' }}>{item.date}</Box>
                    )}
                  </TableCell>
                  <TableCell sx={{ padding: '8px', width: '25%' }}>
                    {index === state.editIndex ? (
                      <>
                        <IconButton aria-label="save" onClick={handleSaveItem}>
                          <SaveIcon />
                        </IconButton>
                        <IconButton aria-label="cancel" onClick={handleCancelEdit}>
                          <CancelIcon />
                        </IconButton>
                      </>
                    ) : (
                      <>
                        <IconButton aria-label="edit" onClick={() => handleEditItem(index)} disabled={item.isChecked}>
                          <EditIcon />
                        </IconButton>
                        <IconButton aria-label="delete" onClick={() => handleRemoveItem(index)}>
                          <DeleteIcon />
                        </IconButton>
                      </>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </div>
  );
};