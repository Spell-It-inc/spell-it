import app from "./app";

const port = process.env.PORT || 8080;
try {
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

}catch (err) {
  console.log(err)
}
