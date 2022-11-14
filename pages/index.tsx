import { GetServerSideProps } from "next";
import { getMakes, Make } from "../database/export";
import { Formik, Form, Field, useField, useFormikContext } from "formik";
import {
  FormControl,
  Grid,
  Box,
  InputLabel,
  makeStyles,
  MenuItem,
  Paper,
  Select,
  SelectProps,
  Button,
} from "@material-ui/core";
import router, { useRouter } from "next/router";
import { getModels, Model } from "../database/getModels";
import { getAsString } from "./getAsString";
import useSWR from "swr";

export interface HomeProps {
  makes: Make[];
  models: Model[];
  singleColumn ?: boolean
}

const useStyle = makeStyles((theme) => ({
  paper: {
    margin: "auto",
    maxWidth: 500,
    padding: theme.spacing(3),
  },
}));

const prices = [500, 1000, 50000, 2500000];

export default function Search({ makes, models, singleColumn }: HomeProps) {
  const classes = useStyle();
  const { query } = useRouter();
  const smValue= singleColumn ? 12 : 6

  const initialValues = {
    make: getAsString(query.make) || "all",
    model: getAsString(query.model) || "all",
    minPrice: getAsString(query.minPrice) || "all",
    maxPrice: getAsString(query.maxPrice) || "all",
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => {
        router.push(
          {
            pathname: "/cars",
            query: { ...values, page: 1 },
          },
          undefined,
        //   { shallow: true }
        );
      }}
    >
      {({ values }) => (
        <Form>
          <Paper elevation={5} className={classes.paper}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={smValue}>
                <Box sx={{ minWidth: 120 }}>
                  <FormControl fullWidth>
                    <InputLabel id="search-make">Make</InputLabel>
                    <Field
                      name="make"
                      as={Select}
                      labelId="search-make"
                      label="Make"
                    >
                      <MenuItem value="all">
                        <em>Any Make</em>
                      </MenuItem>
                      {makes.map((make) => (
                        <MenuItem key={make.make} value={make.make}>
                          {`${make.make} (${make.count})`}
                        </MenuItem>
                      ))}
                    </Field>
                  </FormControl>
                </Box>
              </Grid>
              <Grid item xs={12} sm={smValue}>
                <ModelSelect make={values.make} name="model" models={models} />
              </Grid>
              <Grid item xs={12} sm={smValue}>
                <Box sx={{ minWidth: 120 }}>
                  <FormControl fullWidth>
                    <InputLabel id="search-minPrice">Min Price</InputLabel>
                    <Field
                      name="minPrice"
                      as={Select}
                      labelId="search-minPrice"
                      label="minPrice"
                    >
                      <MenuItem value="all">
                        <em>Min Price</em>
                      </MenuItem>
                      {prices.map((price) => (
                        <MenuItem key={price} value={price}>
                          ${price}
                        </MenuItem>
                      ))}
                    </Field>
                  </FormControl>
                </Box>
              </Grid>
              <Grid item xs={12} sm={smValue}>
                <Box sx={{ minWidth: 120 }}>
                  <FormControl fullWidth>
                    <InputLabel id="search-maxPrice">Max Price</InputLabel>
                    <Field
                      name="maxPrice"
                      as={Select}
                      labelId="search-maxPrice"
                      label="maxPrice"
                    >
                      <MenuItem value="all">
                        <em>Max Price</em>
                      </MenuItem>
                      {prices.map((price) => (
                        <MenuItem key={price} value={price}>
                          ${price}
                        </MenuItem>
                      ))}
                    </Field>
                  </FormControl>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  Search
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Form>
      )}
    </Formik>
  );
}

export interface ModelSelectProps extends SelectProps {
  name: string;
  models: Model[];
  make: string;
}

export function ModelSelect({ make, models, ...props }: ModelSelectProps) {
  const { setFieldValue } = useFormikContext();
  const [field] = useField({
    name: props.name,
  });
  const { data } = useSWR<Model[]>(`/api/models?make=${make}`, {
    dedupingInterval: 60000,
    onSuccess: (newValues) => {
      if (!newValues.map((a) => a.model).includes(field.value)) {
        setFieldValue(`model`, `all`);
      }
    },
  });

  const newModels = data || models;

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="search-model">Model Price</InputLabel>
        <Select
          name="model"
          labelId="search-model"
          label="Model"
          {...field}
          {...props}
        >
          <MenuItem value="all">
            <em>Model</em>
          </MenuItem>
          {newModels.map((model) => (
            <MenuItem key={model.model} value={model.model}>
              {`${model.model} (${model.count})`}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const make = getAsString(context.query.make);

  const [makes, models] = await Promise.all([getMakes(), getModels(make)]);

  return {
    props: {
      makes,
      models,
    },
  };
};
