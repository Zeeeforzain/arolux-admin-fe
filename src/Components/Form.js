import React, { useState } from "react";
import BoxComponent from "./Box";
import TypographyComponent from "./Typography";
import InputComponent from "./InputComponent";
import AdminSelection from "./AdminSelection";
import ButtonComponent from "./Button";
import { account } from "../api/constants"; // Importing account function from api

// Popup component for error and success messages
function Popup({ message, onClose, isSuccess }) {
  return (
    <BoxComponent
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
      onClick={onClose}
    >
      <BoxComponent
        style={{
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "10px",
          maxWidth: "400px",
          width: "100%",
          textAlign: "center",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <TypographyComponent
          color={isSuccess ? "green" : "red"}
          fontSize="16px"
          fontFamily="var(--main)"
        >
          {message}
        </TypographyComponent>
      </BoxComponent>
    </BoxComponent>
  );
}

export default function Form({ onCancel, title, token: receivedToken }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });

  const [selectedadminType, setSelectedadminType] = useState("super-admin");
  const [permissions, setPermissions] = useState({
    dashboard: false,
    rides: false,
    vehicles: false,
    locations: false,
    drivers: false,
    customers: false,
    configurations: false,
    admins: false,
  });

  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleadminTypeChange = (adminType) => {
    setSelectedadminType(adminType);
  };

  const handlePermissionsChange = (permission, checked) => {
    setPermissions((prev) => ({ ...prev, [permission]: checked }));
  };

  const handleSubmit = async () => {
    setMessage("");
  
    // Validate form fields
    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.phoneNumber.trim() ||
      !formData.password.trim() ||
      !formData.confirmPassword.trim()
    ) {
      setMessage("Please fill all the required fields!");
      setIsSuccess(false);
      setShowPopup(true);
      return;
    }
  
    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match!");
      setIsSuccess(false);
      setShowPopup(true);
      return;
    }
  
    const token = receivedToken || localStorage.getItem("token");
    if (!token) {
      setMessage("Authentication token is missing. Please log in again.");
      setIsSuccess(false);
      setShowPopup(true);
      return;
    }
  
    try {
      // Prepare the request data
      const requestData = {
        name: formData.name,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        adminType: selectedadminType,
      };
  
      // Include permissions only if admin type is "sub-admin"
      if (selectedadminType === "sub-admin") {
        const selectedPermissions = Object.keys(permissions)
          .filter((permission) => permissions[permission]) // Keep only checked permissions
          .reduce((obj, key) => {
            obj[key] = true; // Maintain object structure
            return obj;
          }, {});
      
        if (Object.keys(selectedPermissions).length === 0) {
          setMessage("At least one permission must be selected for sub-admin.");
          setIsSuccess(false);
          setShowPopup(true);
          return;
        }
      
        requestData.permissions = selectedPermissions;
      }
      
  
      const response = await account(requestData, token);
      console.log(requestData)
      if (!response || response.status !== 200) {
        setMessage(response.data?.message || "Failed to add admin");
        setIsSuccess(false);
        setShowPopup(true);
        return;
      }
  
      setMessage("New Admin added successfully!");
      setIsSuccess(true);
      setShowPopup(true);
  
      // Reset form data
      setFormData({
        name: "",
        email: "",
        phoneNumber: "",
        password: "",
        confirmPassword: "",
      });
  
      setPermissions({
        dashboard: false,
        rides: false,
        vehicles: false,
        locations: false,
        drivers: false,
        customers: false,
        configurations: false,
        admins: false,
      });
  
    } catch (error) {
      console.error("Error adding admin:", error);
      setMessage(
        error.response?.data?.error || error.message || "An unexpected error occurred."
      );
      setIsSuccess(false);
      setShowPopup(true);
    }
  };
  
  
  return (
    <>
      {showPopup && (
        <Popup
          message={message}
          isSuccess={isSuccess}
          onClose={() => {
            setShowPopup(false);
            if (isSuccess) {
              onCancel();
            }
          }}
        />
      )}

      <BoxComponent
        boxShadow="1px 1px 1px 1px var(--paragraph)"
        maxHeight="90vh"
        overflow="auto"
        display="flex"
        flexDirection="column"
        justifyContent="space-around"
        alignItems="center"
        gap="10px"
      >
        <TypographyComponent
          marginTop="20px"
          fontSize="25px"
          fontWeight="600"
          fontFamily="var(--main)"
          color="var(--dull)"
        >
          {title}
        </TypographyComponent>
        <BoxComponent
          width="92%"
          gap="10px"
          display="flex"
          flexDirection="column"
        >
          <InputComponent
            label="Name"
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
          />
          <InputComponent
            label="Email"
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
          />
          <InputComponent
            label="Phone Number"
            value={formData.phoneNumber}
            onChange={(e) => handleChange("phoneNumber", e.target.value)}
          />
          <InputComponent
            label="Password"
            type="password"
            value={formData.password}
            onChange={(e) => handleChange("password", e.target.value)}
          />
          <InputComponent
            label="Confirm Password"
            type="password"
            value={formData.confirmPassword}
            onChange={(e) => handleChange("confirmPassword", e.target.value)}
          />
        </BoxComponent>
        <BoxComponent
          width="92%"
          gap="10px"
          display="flex"
          flexDirection="column"
        >
          <AdminSelection
            selectedadminType={selectedadminType}
            selectedPermissions={permissions}
            onadminTypeChange={handleadminTypeChange}
            onPermissionsChange={handlePermissionsChange}
          />
        </BoxComponent>
        <BoxComponent
          display="flex"
          justifyContent="space-between"
          width="90%"
          marginBottom="20px"
        >
          <ButtonComponent
            sx={{
              color: "var(--primary)",
              padding: "10px 70px",
              fontSize: "12px",
              textTransform: "none",
              fontWeight: "600",
              borderRadius: "20px",
            }}
            onClick={onCancel}
          >
            Cancel
          </ButtonComponent>
          <ButtonComponent
            variant="contained"
            backgroundColor="var(--primary)"
            sx={{
              padding: "10px 70px",
              fontSize: "12px",
              borderRadius: "20px",
            }}
            onClick={handleSubmit}
          >
            {title === "Add Sub-Admin" ? "Add Sub-Admin" : "Update Sub-Admin"}
          </ButtonComponent>
        </BoxComponent>
      </BoxComponent>
    </>
  );
}
