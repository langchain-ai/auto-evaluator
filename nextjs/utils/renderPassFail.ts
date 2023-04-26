const renderPassFail = (data: any) => {
  if (data.score === 0) {
    return "Incorrect";
  }
  if (data.score === 1) {
    return "Correct";
  }
  throw new Error(`Problem parsing ${data}`);
};

export default renderPassFail;
