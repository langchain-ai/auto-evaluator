const renderPassFail = (data: any) => {
  if (data.score === 0) {
    return "INCORRECT";
  }
  if (data.score === 1) {
    return "CORRECT";
  }
  throw new Error(`Problem parsing ${data}`);
};

export default renderPassFail;
