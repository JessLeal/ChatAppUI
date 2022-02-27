import { Button } from "@mui/material";
import axiosBase from "../API/axiosBase";

const TestErrors = () => {
  const testNullRef = async () => {
    const res = await axiosBase.get("/buggy/server-error");
    console.log(res);
  };

  const test401 = async () => {
    const res = await axiosBase.get("/buggy/auth");
    console.log(res);
  };

  const test404 = async () => {
    const res = await axiosBase.get("/buggy/not-found");
    console.log(res);
  };

  const testBadRequest = async () => {
    const res = await axiosBase.get("/buggy/bad-request");
    console.log(res);
  };

  const testValidation = async () => {
    const res = await axiosBase.post("/accounts/register", {});
    console.log(res);
  };

  return (
    <div>
      <Button onClick={testNullRef}>Test Null Ref</Button>
      <Button onClick={test401}>Test 401</Button>
      <Button onClick={test404}>Test 404</Button>
      <Button onClick={testBadRequest}>Test Bad Request</Button>
      <Button onClick={testValidation}>Test validation</Button>
    </div>
  );
};

export default TestErrors;
