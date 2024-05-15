import { Box, Button, TextField } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddEmployee = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phn: ''
    });

    const [errors, setErrors] = useState({
        firstName: false,
        lastName: false,
        email: false,
        phn: false
    });

    const [helperText, setHelperText] = useState({
        email: "",
        phn: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });

        if (name === 'email') {
            const isValid = checkEmail(value);
            setErrors((prevErrors) => ({
                ...prevErrors,
                email: !isValid
            }));
            setHelperText((prevHelperText) => ({
                ...prevHelperText,
                email: !isValid ? "Invalid email" : ""
            }));
        }

        if (name === 'phn') {
            const isValid = checkPhoneNumber(value);
            setErrors((prevErrors) => ({
                ...prevErrors,
                phn: !isValid
            }));
            setHelperText((prevHelperText) => ({
                ...prevHelperText,
                phn: !isValid ? "Phone number must be 10 digits" : ""
            }));
        }
    }

    const checkEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const checkPhoneNumber = (phn) => {
        const phoneRegex = /^\d{10}$/;
        return phoneRegex.test(phn);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const isEmailValid = checkEmail(formData.email);
        const isPhoneNumberValid = checkPhoneNumber(formData.phn);

        if (!isEmailValid || !isPhoneNumberValid) {
            setErrors({
                email: !isEmailValid,
                phn: !isPhoneNumberValid
            });
            setHelperText({
                email: !isEmailValid ? "Invalid email" : "",
                phn: !isPhoneNumberValid ? "Phone number must be 10 digits" : ""
            });
            return;
        }
        console.log("sending Form data: ", JSON.stringify(formData));
        axios.post('http://localhost:8080/employee/add', formData).then((res) => {
            console.log("Response: ", res.data);
            navigate("/");
        }).catch((e) => {
            console.log("error posting data: ", e);
        });
    }

    return (
        <div className="w-full h-[640px] flex justify-center items-center">
            <form className="w-[40%]" onSubmit={handleSubmit}>
                <Box className="flex flex-col p-4">
                    <TextField
                        required
                        name="firstName"
                        id="firstName"
                        label="First Name"
                        placeholder="Enter First Name"
                        value={formData.firstName}
                        inputProps={{ maxLength: 20 }}
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
                        inputProps={{ maxLength: 20 }}
                        onChange={handleChange}
                        sx={{ marginBottom: "20px" }}
                    />
                    <TextField
                        required
                        error={errors.email}
                        helperText={helperText.email}
                        name="email"
                        value={formData.email}
                        id="email"
                        label="Email"
                        placeholder="Enter Email"
                        type="email"
                        inputProps={{ maxLength: 30 }}
                        onChange={handleChange}
                        sx={{ marginBottom: "20px" }}
                    />
                    <TextField
                        required
                        error={errors.phn}
                        helperText={helperText.phn}
                        name="phn"
                        value={formData.phn}
                        id="phn"
                        label="Phone Number"
                        placeholder="Enter Phone Number"
                        type="tel"
                        inputProps={{ maxLength: 10 }}
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

export default AddEmployee;
