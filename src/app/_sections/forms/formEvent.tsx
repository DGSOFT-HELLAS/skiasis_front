'use client';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { useSettingsContext } from 'src/app/components/settings';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { Box, Checkbox, Stack } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { Form, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import TextInput from 'src/app/components/inputs/textInput';
import FormControlLabel from '@mui/material/FormControlLabel';
import Icon from '@mui/material/Icon';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import Link from 'next/link';

const schema = z.object({
  SOACTIONCODE: z.string(),
  TNAME: z.string(),
  REMARKS: z.string(),
  ACTSTATUS: z.string(),
  FROMDATE: z.string(),
  FINALDATE: z.string(),
  COMMENTS: z.string(),
  PLACEREDINESS: z.string(),
  TPHONE01: z.string(),
  TPHONE02: z.string(),
  TADDRESS: z.string(),

  TCODE: z.string(),
  TDISTRICT: z.string(),
  TZIP: z.string(),
  REMOVENOTE: z.string(),
  REMOVENOTE2: z.string(),
});
type EventForm = z.infer<typeof schema>;

const fetcher = async (id: string): Promise<EventForm> => {
  const { data } = await axios.get(`/api/events?id=${id}`);
  return data?.result;
};
export default function FormWrapper({ id }: { id: string }) {
  const settings = useSettingsContext();
  const { isError, error, data } = useQuery({
    queryKey: ['event'],
    queryFn: () => fetcher(id),
  });

 
  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Typography variant="h4"> Ραντεβού: {data?.SOACTIONCODE} </Typography>
      <Grid container spacing={2}>
        <Grid item xs={10}>
          <Box
            sx={{
              mt: 5,
              padding: 2,
              width: 1,
              borderRadius: 2,
              border: (theme) => `dashed 1px ${theme.palette.divider}`,
            }}
          >
            {data && <FormEvent data={data} />}
            {isError && <div>{error?.message}</div>}
          </Box>
        </Grid>
        <Grid item xs={2}>
          <Box
            sx={{
              mt: 5,
              width: 1,
              borderRadius: 2,
              bgcolor: (theme) => alpha(theme.palette.grey[500], 0.04),
              border: (theme) => `dashed 1px ${theme.palette.divider}`,
            }}
          />
          <Box />
        </Grid>
      </Grid>
    </Container>
  );
}

const FormEvent = ({ data }: { data: EventForm }) => {
  const methods = useForm({
    resolver: zodResolver(schema),
    defaultValues: data,
  });

  const values = methods.watch();
  const query = encodeURIComponent(`${values.TADDRESS} ${values.TZIP}`);
  return (
    <Stack spacing={2}>
      <Stack direction="row" alignItems={'center'} sx={{ marginBottom: '8px' }}>
        <FmdGoodIcon sx={{ fontSize: '1.2rem' }} />
        <Link
          className="link_text"
          href={`https://www.google.com/maps/search/?api=1&query=${query}`}
          target="_blank"
          rel="noopener"
        >
          {values.TADDRESS}
        </Link>
      </Stack>

      <Grid container spacing={2}>
        <Grid item md={6} xs={12}>
          <TextInput
            disabled
            name="FROMDATE"
            label="Ημερομηνία Έναρξης"
            type={'text'}
            // helperText="Παρακαλώ συμπληρώστε το όνομα σας"
            onChange={(e) => {}}
            value={values?.FROMDATE}
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <TextInput
            disabled
            name="FINALDATE"
            label="Ημερομηνία Λήξης"
            type={'text'}
            // helperText="Παρακαλώ συμπληρώστε το όνομα σας"
            onChange={(e) => {}}
            value={values?.FINALDATE}
          />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item md={6} xs={12}>
          <TextInput
            disabled
            name="TNAME"
            label="Όνομα Πελάτη"
            type={'text'}
            onChange={(e) => {}}
            value={values?.TNAME}
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <TextInput
            disabled
            name="SOACTIONCODE"
            label="Όνομα Ραντεβού"
            type={'text'}
            onChange={(e) => {}}
            value={values?.SOACTIONCODE}
          />
        </Grid>
      </Grid>
      <TextInput
        disabled
        name="TADDRESS"
        label="Διεύθυνση"
        type={'text'}
        onChange={(e) => {}}
        value={values?.TADDRESS}
      />
      <Grid container spacing={2}>
        <Grid item md={6} xs={12}>
          <TextInput
            disabled
            name="TZIP"
            label="ΤΚ"
            type={'text'}
            onChange={(e) => {}}
            value={values?.TZIP}
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <TextInput
            disabled
            name="TDISTRICT"
            label="Περιοχή"
            type={'text'}
            onChange={(e) => {}}
            value={values?.TDISTRICT}
          />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item    md={6} xs={12}>
          <TextInput
            disabled
            name="TPHONE01"
            label="Tηλέφωνο 01"
            type={'text'}
            onChange={(e) => {}}
            value={values?.TPHONE01}
          />
        </Grid>
        <Grid item  md={6} xs={12}>
          <TextInput
            disabled
            name="TPHONE02"
            label="Tηλέφωνο 02"
            type={'text'}
            onChange={(e) => {}}
            value={values?.TPHONE02}
          />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item  md={6} xs={12}>
          <TextInput
            disabled
            name="REMARKS"
            label="Σημειώση"
            type={'text'}
            onChange={(e) => {}}
            value={values?.REMARKS}
          />
        </Grid>
        <Grid item  md={6} xs={12}>
          <TextInput
            disabled
            name="COMMENTS"
            label="Σχόλια"
            type={'text'}
            // helperText="Παρακαλώ συμπληρώστε το όνομα σας"
            onChange={(e) => {}}
            value={values?.COMMENTS}
          />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item md={6} xs={12}>
          <FormControlLabel
            control={
              <Checkbox
                defaultChecked
                disabled
                checked={values.PLACEREDINESS === '1' ? true : false}
              />
            }
            label="Ετοιμότητα χώρου"
          />
        </Grid>
      </Grid>
    </Stack>
  );
};
