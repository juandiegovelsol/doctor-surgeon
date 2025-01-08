import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
saveTimeout;
const MultiStepForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const localStorageKey = "mySurveyFormData"; // Unique key for your form data

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      address: "",
      city: "",
      // ... more fields for other steps
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("First Name is required"),
      lastName: Yup.string().required("Last Name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      address: Yup.string().when("currentStep", {
        is: () => currentStep > 1,
        then: Yup.string().required("Address is required"),
      }),
      city: Yup.string().when("currentStep", {
        is: () => currentStep > 1,
        then: Yup.string().required("City is required"),
      }),
    }),
    onSubmit: (values) => {
      console.log("Form submitted!", values);
      localStorage.removeItem(localStorageKey); // Clear on successful submission
      // Handle final submission logic here
    },
  });

  // Load saved data from local storage on mount
  useEffect(() => {
    const savedData = localStorage.getItem(localStorageKey);
    if (savedData) {
      formik.setValues(JSON.parse(savedData));
      // Optionally, restore the current step as well if you save it
      // const savedStep = localStorage.getItem('mySurveyCurrentStep');
      // if (savedStep) {
      //   setCurrentStep(parseInt(savedStep, 10));
      // }
    }
  }, []);

  // Save data to local storage whenever form values change
  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(formik.values));
    // Optionally, save the current step
    // localStorage.setItem('mySurveyCurrentStep', currentStep);
  }, [formik.values, currentStep]);

  const handleNext = async () => {
    await formik.validateForm();
    const currentStepFields = Object.keys(formik.values).filter((key) => {
      if (currentStep === 1) {
        return ["firstName", "lastName", "email"].includes(key);
      } else if (currentStep === 2) {
        return ["address", "city"].includes(key);
      }
      return false;
    });

    const hasErrorsInCurrentStep = currentStepFields.some(
      (field) => formik.errors[field]
    );

    if (!hasErrorsInCurrentStep) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    setCurrentStep(currentStep - 1);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div>
            <h2>Step 1: Personal Information</h2>
            <div>
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.firstName}
              />
              {formik.touched.firstName && formik.errors.firstName ? (
                <div>{formik.errors.firstName}</div>
              ) : null}
            </div>
            <div>
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.lastName}
              />
              {formik.touched.lastName && formik.errors.lastName ? (
                <div>{formik.errors.lastName}</div>
              ) : null}
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              {formik.touched.email && formik.errors.email ? (
                <div>{formik.errors.email}</div>
              ) : null}
            </div>
          </div>
        );
      case 2:
        return (
          <div>
            <h2>Step 2: Address Information</h2>
            <div>
              <label htmlFor="address">Address</label>
              <input
                type="text"
                id="address"
                name="address"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.address}
              />
              {formik.touched.address && formik.errors.address ? (
                <div>{formik.errors.address}</div>
              ) : null}
            </div>
            <div>
              <label htmlFor="city">City</label>
              <input
                type="text"
                id="city"
                name="city"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.city}
              />
              {formik.touched.city && formik.errors.city ? (
                <div>{formik.errors.city}</div>
              ) : null}
            </div>
          </div>
        );
      // ... more cases for other steps
      default:
        return <div>Form Completed!</div>;
    }
  };

  const handleClearSave = () => {
    localStorage.removeItem(localStorageKey);
    formik.resetForm();
    setCurrentStep(1); // Reset to the first step
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      {renderStepContent()}

      <div>
        {currentStep > 1 && (
          <button type="button" onClick={handlePrev}>
            Previous
          </button>
        )}
        {currentStep < 2 && (
          <button type="button" onClick={handleNext}>
            Next
          </button>
        )}
        {currentStep === 2 && <button type="submit">Submit</button>}
      </div>

      <div>
        <button type="button" onClick={handleClearSave}>
          Clear Saved Progress
        </button>
      </div>
    </form>
  );
};

export default MultiStepForm;
