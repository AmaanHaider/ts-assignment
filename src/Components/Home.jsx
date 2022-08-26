import React, { useState, useEffect } from "react";
import "../App.css";
import axios from "axios";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import ChildModal from "@mui/material/Modal";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

function Home() {
  const [edata, setEdata] = useState([]);
  const [text, setText] = useState({});
  useEffect(() => {
    getdata();
  }, []);

  const getdata = () => {
    axios
      .get("http://localhost:3001/employee")
      .then((res) => {
        let data = res.data;
        for (let i = 0; i < data.length; i++) {
          data[i].status = false;
        }

        setEdata(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function handledelete(id) {
    const result = edata.filter((e) => id !== e.id);

    setEdata(result);
    axios.delete(`http://localhost:3001/employee/${id}`);
  }
  function handleedit(e) {
    const add_data = edata.map((ele) => {
      if (ele.id === e.id) {
        e.status = !e.status;
      }
      return ele;
    });
    setEdata(add_data);
  }

  function handleupdated(e) {
    axios
      .put(`http://localhost:3001/employee/${e.id}`, text)
      .then((res) => getdata());
  }

  function handlechange(e) {
    const { name, value, checked, type } = e.target;

    setText({
      ...text,
      [name]: type === "checkbox" ? checked : value,
    });
  }

  return (
    <>
      <div className="navbar">
        <div className="addemployees">
          <Link to="./component/add">
            <Button style={{marginBottom:"2%"}} variant="outlined">Add Employess</Button>
          </Link>
        </div>
      </div>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Names</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">Number</TableCell>
              <TableCell align="right">D-O-B</TableCell>
              <TableCell align="right">Gender</TableCell>
              <TableCell align="right">Delete</TableCell>
              <TableCell align="right">Edit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {edata.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.email}</TableCell>
                <TableCell align="right">{row.number}</TableCell>
                <TableCell align="right">{row.d0b}</TableCell>
                <TableCell align="right">{row.gender}</TableCell>
                <TableCell align="right">
                  <Button
                    onClick={() => {
                      handledelete(row.id);
                    }}
                    variant="outlined"
                  >
                    Delete
                  </Button>
                </TableCell>

                <TableCell align="right">
                  <Button
                    onClick={() => {
                      handleedit(row);
                    }}
                  >
                    edit
                  </Button>
                  <Modal
                    aria-labelledby="parent-modal-title"
                    aria-describedby="parent-modal-description"
                  ></Modal>
                </TableCell>
                {row.status ? (
                  <>
                    <Box sx={{ ...style, width: 400 }}>
                      <TextField
                        id="name-input"
                        name="name"
                        label="name"
                        type="text"
                        variant="filled"
                      
                        onChange={handlechange}
                      />
                      <TextField
                        id="name-input"
                        name="email"
                        label="email"
                        type="text"
                        variant="filled"
                       
                        onChange={handlechange}
                      />
                      <TextField
                        id="name-input"
                        name="number"
                        label="number"
                        type="text"
                        variant="filled"
                      
                        onChange={handlechange}
                      />
                      <TextField
                        id="name-input"
                        name="d0b"
                        label=""
                        type="Date"
                        variant="filled"
                       
                        onChange={handlechange}
                      />

                      <RadioGroup name="gender" onChange={handlechange}>
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
                        sx={{ margin: 3 }}
                        onClick={() => {
                          handleupdated(row);
                        }}
                        variant="contained"
                      >
                        Update
                      </Button>

                      <ChildModal />
                    </Box>
                  </>
                ) : null}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default Home;
