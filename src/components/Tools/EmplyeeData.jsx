import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"

const EmplyeeData = () => {
    const navigate = useNavigate();
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/employee/get/all').then((response) => {
            setEmployees(response.data);
        })
    }, [employees]);
    const handleAddButtonClick = () => {
        navigate("/add");
    }

    const handleDeleteClick = (id) => {
        axios.delete(`http://localhost:8080/employee/delete/${id}`).then((res) => {
            console.log(res.data);
        }).catch((e) => {
            console.log("Error recived while deleting: ", e);
        })
    }

    const handleEditClick = (id) => {
        navigate(`/edit/${id}`, { state: { id } });
    }

    return (
        <div className="m-10">
            <Button variant="contained" onClick={handleAddButtonClick}>Add Employee</Button>
            {employees.length > 0 ? (
                <TableContainer component={Paper} className="mt-6 border-2 border-blue-950">
                    <div className="bg-blue-400 py-4">
                        <p className="text-white text-xl text-center font-extrabold">
                            Employee Data
                        </p>
                    </div>
                    <Table aria-label="Employee Data" >
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ fontSize: 20 }}>Index</TableCell>
                                <TableCell align="right" sx={{ fontSize: 20 }}>First Name</TableCell>
                                <TableCell align="right" sx={{ fontSize: 20 }}>Last Name</TableCell>
                                <TableCell align="right" sx={{ fontSize: 20 }}>Email</TableCell>
                                <TableCell align="right" sx={{ fontSize: 20 }}>Phone</TableCell>
                                <TableCell align="right" sx={{ fontSize: 20 }}>Update</TableCell>
                                <TableCell align="right" sx={{ fontSize: 20 }}>Delete</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {employees.map((employee, index) => (
                                <TableRow key={employee.id}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell align="right" sx={{ fontSize: 15 }}>{employee.firstName}</TableCell>
                                    <TableCell align="right" sx={{ fontSize: 15 }}>{employee.lastName}</TableCell>
                                    <TableCell align="right" sx={{ fontSize: 15 }}>{employee.email}</TableCell>
                                    <TableCell align="right" sx={{ fontSize: 15 }}>{employee.phn}</TableCell>
                                    <TableCell align="right">
                                        <Button
                                            variant="contained"
                                            sx={{
                                                backgroundColor: '#eed202',
                                                borderColor: '#eed202'
                                            }}
                                            onClick={() => handleEditClick(employee.id)}
                                        >Update</Button>
                                    </TableCell>
                                    <TableCell align="right">
                                        <Button
                                            variant="contained"
                                            color="error"
                                            onClick={() => handleDeleteClick(employee.id)}
                                        >
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

            ) : (
                <p>No employees found</p>
            )}

        </div>
    )
}

export default EmplyeeData;