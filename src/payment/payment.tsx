import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import FormLabel from '@mui/material/FormLabel'
import { ClearAll } from '@mui/icons-material';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const Label = styled(FormLabel)(({ theme }) => ({
  "fontFamily": "fantasy", "fontSize": "40px", color: "royalblue"
}))

function changeFuncGen(stateUpdFunc: Function) {
  return (event: any) => {
    stateUpdFunc(event.target.value as any);
  }
}

export default function PaymentForm() {
  const [user, setUser] = useState('');
  const [phone, setPhone] = useState('');
  const [school, setSchool] = useState('');
  const [grade, setGrade] = useState('1');
  const [childNum, setChildNum] = useState(1);
  const [isChecked, setChecked] = useState(false);

  const handleUserChange = changeFuncGen(setUser);

  const handlePhoneChange = changeFuncGen(setPhone);
  const handleSchoolChange = changeFuncGen(setSchool);
  const handleChildNumChange = changeFuncGen(setChildNum);

  const handleGradeChange = (event: SelectChangeEvent) => {
    setGrade(event.target.value as string);
  };
  const handleChecker = (event: any) => {
    setChecked(event.target.checked);
  }

  const questSubmit = (event: any) => {
    const pageData = {
      user,
      phone,
      school,
      grade,
      childNum,
      isChecked
    }
    alert(JSON.stringify(pageData));
  }

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        用户信息
      </Typography>
      <Stack spacing={3} margin="0 10%">
        <Item>
          <TextField
            required
            id="userName"
            label="姓名"
            value={user}
            onChange={handleUserChange}
            fullWidth
            autoComplete="cc-name"
            variant="standard"
          />
        </Item>
        <Item>
          <TextField
            required
            id="phone"
            label="电话"
            value={phone}
            onChange={handlePhoneChange}
            fullWidth
            autoComplete="cc-number"
            variant="standard"
          />
        </Item>
        <Item>
          <TextField
            required
            id="school"
            label="单位"
            value={school}
            onChange={handleSchoolChange}
            fullWidth
            autoComplete="cc-exp"
            variant="standard"
          />
        </Item>
        <Item>
          <FormControl fullWidth>
            <InputLabel id="grade">年级</InputLabel>
            <Select
              labelId="grade-select-label"
              id="grade-select"
              value={grade}
              onChange={handleGradeChange}
            >
              <MenuItem value={1}>一年级</MenuItem>
              <MenuItem value={2}>二年级</MenuItem>
              <MenuItem value={3}>三年级</MenuItem>
            </Select>
          </FormControl>
        </Item>
        <Item >
          <TextField
            required
            id="childNum"
            label="人数"
            type='number'
            value={childNum}
            onChange={handleChildNumChange}
            defaultValue={1}
            fullWidth
            autoComplete="cc-csc"
            variant="standard"
          />
        </Item>
        <Grid item xs={12}>
          <Label>总价格: <b>{childNum * parseInt(grade ? grade : '1') * 100}</b></Label>
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveCard" checked={isChecked} onChange={handleChecker} />}
            label="我确认以上信息准确无误"
          />
        </Grid>
        <Grid item xs={12} >
          <Button variant="contained" color="warning" disabled={!isChecked} onClick={questSubmit} endIcon={<ClearAll />}>
            清空
          </Button>
          <Button variant="contained" color="success" disabled={!isChecked} onClick={questSubmit} endIcon={<SendIcon />}>
            提交
          </Button>
        </Grid>
      </Stack>
    </React.Fragment >
  );
}