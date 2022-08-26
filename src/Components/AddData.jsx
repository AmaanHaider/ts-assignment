import React, { useState } from "react";
import "../App.css";
import axios from "axios";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Form from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

function AddData() {
  const [data, setData] = useState({});

  function handleInputChange(e) {
    const { name, value, checked, type } = e.target;
    setData({ ...data, [name]: type === "checkbox" ? checked : value });
  }
  const navigate= useNavigate()

  const handlesubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/employee", data)

      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

      navigate("/")
      alert("Details Added")
  };

  return (
    <div className="forms">
      <h1>Add Employess</h1>

      <Form style={{width:"70%"}}>
        <Grid container alignItems="center" justify="center" direction="column">
          <FormControl>
            <FormLabel>Name</FormLabel>
            <TextField
              id="name-input"
              name="name"
              label="Name"
              type="text"
              onChange={handleInputChange}
            />
            <FormLabel>Email</FormLabel>
            <TextField
              id="email-input"
              name="email"
              label="email"
              type="text"
              onChange={handleInputChange}
            />
            <FormLabel>Number</FormLabel>
            <TextField
              id="phonenumber-input"
              name="number"
              label="number"
              type="Number"
              onChange={handleInputChange}
            />
            <FormLabel>D-0-B</FormLabel>
            <TextField
              id="dob-input"
              name="d0b"
              label=""
              type="Date"
              onChange={handleInputChange}
            />

            <FormLabel>Gender</FormLabel>
            <RadioGroup name="gender" onChange={handleInputChange}>
              <FormControlLabel
                key="male"
                value="male"
                control={<Radio size="small" />}
                label="Male"
              />
              <FormControlLabel
                key="female"
                value="female"
                control={<Radio size="small" />}
                label="Female"
              />
              <FormControlLabel
                key="other"
                value="other"
                control={<Radio size="small" />}
                label="Other"
              />
            </RadioGroup>

            <Button
              variant="contained"
              onClick={handlesubmit}
              color="primary"
              type="submit"
            >
              Submit
            </Button>
          </FormControl>
        </Grid>
      </Form>
    </div>
  );
}

export default AddData;
