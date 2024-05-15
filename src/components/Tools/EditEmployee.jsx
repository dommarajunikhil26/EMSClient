import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"
import { Box, Button, TextField } from "@mui/material"

const EditEmployee = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { id } = location.state || {};

    const [formData, setFormData] = useState({
        id: '',
        firstName: '',
        lastName: '',
        email: '',
        phn: ''
    });

    useEffect(() => {
        axios.get(`http://localhost:8080/employee/get/${id}`)
            .then(res => {
                setFormData(res.data[0]);
            })
            .catch(err => console.log(err))
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put('http://localhost:8080/employee/edit', formData)
            .then(res => {
                console.log("Employee update", res.data);
                navigate("/");
            })
            .catch(err => console.log(err))
    };

    return (
        <div className="w-full h-[640px] flex justify-center items-center">
            <form className="w-[40%]" onSubmit={handleSubmit}>
                <Box
                    className="flex flex-col p-4"
                >
                    <TextField
                        required
                        name="firstName"
                        id="firstName"
                        label="First Name"
                        placeholder="Enter First Name"
                        value={formData.firstName}
                        onChange={handleChange}
                        sx={{ marginBottom: "20px" }}
                    />
                    <TextField
                        required
                        name="lastName"
                        value={formData.lastName}
                        id="lastName"
                        label="Last Name"
                        placeholder="Enter Last Name"
                        onChange={handleChange}
                        sx={{ marginBottom: "20px" }}
                    />
                    <TextField
                        required
                        name="email"
                        value={formData.email}
                        id="email"
                        label="Email"
                        placeholder="Enter Email"
                        type="email"
                        onChange={handleChange}
                        sx={{ marginBottom: "20px" }}
                    />
                    <TextField
                        required
                        name="phn"
                        value={formData.phn}
                        id="phn"
                        label="Phone Number"
                        placeholder="Enter Phone Number"
                        type="tel"
                        onChange={handleChange}
                        sx={{ marginBottom: "15px" }}
                    />
                </Box>
                <div className="flex justify-center">
                    <Button variant="contained" type="submit">Save</Button>
                </div>
            </form>
        </div>
    )
}

export default EditEmployee