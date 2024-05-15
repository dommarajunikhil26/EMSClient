import { Box, Button, TextField } from "@mui/material"
import axios from "axios";
import { useState } from "react"
import { useNavigate } from "react-router-dom";

const AddEmployee = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phn: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("sending Form data: ", JSON.stringify(formData));
        axios.post('http://localhost:8080/employee/add', formData).then((res) => {
            console.log("Response: ", res.data);
            navigate("/");
        }).catch((e) => {
            console.log("error postinf data: ", e);
        })
    }

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
                    <Button variant="contained" type="submit">Submit</Button>
                </div>
            </form>
        </div>
    )
}

export default AddEmployee