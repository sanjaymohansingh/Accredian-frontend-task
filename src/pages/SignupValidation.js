const SignupValidation = (values) => {
  let error = {};
  const email_pattern =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const password_pattern =
    /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  const cpassword_pattern =
    /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

  if (values.username === "") {
    error.username = "Name should not be empty";
  } else {
    error.username = "";
  }
  if (values.email === "") {
    error.email = "Email should not be empty";
  } else if (!email_pattern.test(values.email)) {
    error.email = "Email Didn't match";
  } else {
    error.email = "";
  }
  if (values.password === "") {
    error.password = "Password should not be empty";
  } else if (!password_pattern.test(values.password)) {
    error.password = "Password didn't match";
  } else {
    error.password = "";
  }
  if (values.password === "") {
    error.cpassword = "Confirm password should not be empty";
  } else if (!cpassword_pattern.test(values.cpassword)) {
    error.password = "Password didn't match";
  } else {
    error.cpassword = "";
  }
  return error;
};

export default SignupValidation;
