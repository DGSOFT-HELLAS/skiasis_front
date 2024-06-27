

'use client';
import Grid from '@mui/material/Grid';
import { Checkbox, Stack } from '@mui/material';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import TextInput from 'src/app/components/inputs/textInput';
import FormControlLabel from '@mui/material/FormControlLabel';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import Link from 'next/link';
import { EventForm, eventFormSchema } from './_types';


export const FormEvent = ({ data }: { data: EventForm }) => {
    const methods = useForm({
      resolver: zodResolver(eventFormSchema),
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
          <Grid item md={6} xs={12}>
            <TextInput
              disabled
              name="TPHONE01"
              label="Tηλέφωνο 01"
              type={'text'}
              onChange={(e) => {}}
              value={values?.TPHONE01}
            />
          </Grid>
          <Grid item md={6} xs={12}>
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
          <Grid item md={6} xs={12}>
            <TextInput
              disabled
              name="REMARKS"
              label="Σημειώση"
              type={'text'}
              onChange={(e) => {}}
              value={values?.REMARKS}
            />
          </Grid>
          <Grid item md={6} xs={12}>
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
              control={<Checkbox disabled checked={values.PLACEREDINESS === '1' ? true : false} />}
              label="Ετοιμότητα χώρου"
            />
          </Grid>
        </Grid>
      </Stack>
    );
};