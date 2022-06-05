import * as React from "react";
import TextField from "@mui/material/TextField";
import { Button, Grid, Stack } from "@mui/material";
import { Card, CardContent } from "@mui/material";

interface InputSearchProps {
  callBackFunc: Function;
}
const InputSearch = ({ callBackFunc }: InputSearchProps) => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };
  return (
    <div style={{ padding: "2%" }}>
      <Card >
        <CardContent>
          <Grid
            container
            spacing={1}
            direction="row"
            alignItems="center"
            justifyContent="center"
          >
            <Grid item>
              <Stack spacing={2} direction="row">
                <TextField
                  id="outlined-basic"
                  label="Pesquisar"
                  variant="outlined"
                  value={searchTerm}
                  onChange={handleChange}
                />
                <Button
                  variant="contained"
                  onClick={() => {
                    callBackFunc(searchTerm);
                  }}
                >
                  Buscar
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      </div>
  );
};
export default InputSearch;
