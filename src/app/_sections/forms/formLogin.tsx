'use client';

import * as Yup from 'yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Link from '@mui/material/Link';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';
import { useRouter } from 'src/routes/hooks';
import { useBoolean } from 'src/hooks/use-boolean';
import Iconify from 'src/app/components/iconify';
import FormProvider from 'src/app/components/hook-form';
import TextInput from 'src/app/components/inputs/textInput';
import Image from 'next/image';
import {  toast } from 'react-toastify';
import axios from 'axios';
import { setStorage } from 'src/hooks/use-local-storage';
const LoginSchema = Yup.object().shape({
  username: Yup.string().required('Το email είναι υποχρεωτικό'),
  password: Yup.string().required('Ο κωδικός είναι υποχρεωτικός'),
});


export default function FormLogin() {
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState('');
  // const searchParams = useSearchParams();
  // const returnTo = searchParams.get('returnTo');
  const password = useBoolean();
  
  const defaultValues = {
    username: 'demo',
    password: '1234',
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = methods;
  const values = methods.watch();
  const onSubmit = handleSubmit(async (data) => {
    try {
      const response = await axios.post('/api/auth/login', {
        username: data.username,
        password: data.password
      })
      if(response.data.status === 200) {
        setStorage('user', response.data.user)
        router.push('/dashboard/calendar')
        toast.success('Επιτυχής σύνδεση')
      } 
    } catch(e) {
        console.log(e)
        toast.warn(e?.response?.data?.message || e.message)
    }  
   

  
  });

  const renderHead = (
    <Stack spacing={2} sx={{ mb: 5, alignItems: 'center', justifyContent: "center" }}>
      <Image  
          src="/assets/newlogo.png"
          alt="logo"
          width={220}
          height={80}
      />
     
    </Stack>
  );

  const renderForm = (
    <Stack spacing={2.5}>
       <TextInput  
         name="username"
         label="Όνομα"
         type={'text'}
        helperText="Παρακαλώ συμπληρώστε το όνομα σας"
        value={values.username}
        onChange={(event) => {
          setValue('username', event.target.value)
        }}
      />
      <TextInput  
         name="password"
         label="Password"
         type={password.value ? 'text' : 'password'}
        helperText="Please enter a valid email address"
        value={values.password}
        onChange={(event) => setValue('password', event.target.value)}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={password.onToggle} edge="end">
                <Iconify icon={password.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    
      <Link variant="body2" color="inherit" underline="always" sx={{ alignSelf: 'flex-end' }}>
        Forgot password?
      </Link>

      <LoadingButton
        fullWidth
        color="inherit"
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
      >
        Login
      </LoadingButton>
    </Stack>
  );

  return (
    <>
      {renderHead}

  

      {!!errorMsg && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {errorMsg}
        </Alert>
      )}

      <FormProvider methods={methods} onSubmit={onSubmit}>
        {renderForm}
      </FormProvider>
    </>
  );
}
