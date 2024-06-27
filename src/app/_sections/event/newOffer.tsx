import { z } from 'zod';
import { Box, Button, InputAdornment, MenuItem, Stack } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import { InputLabel } from '@mui/material';
import { schema, } from './_types';
import TextInput from 'src/app/components/inputs/textInput';
import { FormValues, BasicItemAttributes, DefaultValues } from './_types';
import { Form, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import NumericCustomInput from 'src/app/components/numericCustomInput';


const DEFAULT_VALUES: DefaultValues = {
  Width: {
    min: 300,
    max: 3300,
   },
    Height: {
      min: 359,
      max: 3300,
    },
}



const fetchBasicItemsAttr = async (id: string): Promise<BasicItemAttributes[]> => {
  const { data } = await axios.post(`/api/items`, {
    type: 'getBasicItemAttr',
    id,
  });
  return data?.result;
};





export default function NewOffer({
  basicItems,
  onSubmit,
  formData
}: 
  { 
    onSubmit: any,
    basicItems: {ID: string, NAME: string}[] | undefined,
    formData: any,
  }) {

    // console.log({formData})
    const methods = useForm<FormValues>({
      resolver: zodResolver(schema),
      defaultValues: {
        MESSAGE: formData?.MESSAGE || "",
        BASICITEM: {
          ID: formData?.BASICITEM?.ID || "",
          NAME: formData?.BASICITEM?.NAME || "",
        },
        BASICITEMATTRIBUTES: [...formData?.BASICITEMATTRIBUTES] || [],
      },
    });
    const { setValue, handleSubmit, formState: {errors}, setError } = methods;
    const values = methods.watch();

    const {
      status,
      fetchStatus,
      isError: isErrorAttr,
      error,
      data: basicItemAttr,
    } = useQuery({
      queryKey: ['basicItemAttribute', values.BASICITEM.ID],
      queryFn: () => fetchBasicItemsAttr(values.BASICITEM.ID),
      enabled: !!values.BASICITEM.ID,
    });
  
  

    // console.log({values})

    const handleDataSetChange = (e: SelectChangeEvent, index: number, id: number) => {
      setValue(`BASICITEMATTRIBUTES[${index}]`, {
          ID: id,
          VALUE: e.target.value
      })
  
    }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number, id: number) => {
    if(e.target.value < 300 || e.target.value > 3300) {
      setError(`BASICITEMATTRIBUTES[${index}].VALUE`, {
        type: "manual",
        message: "Λαμβάνει τιμές από 300mm μέχρι 3300mm."
      }) 
    } else {
      setError(`BASICITEMATTRIBUTES[${index}].VALUE`, null)
    }
    setValue(`BASICITEMATTRIBUTES[${index}]`, {
        ID: id,
        VALUE: parseInt(e.target.value)
    })
  }
  const attributes = basicItemAttr && basicItemAttr?.map((item:BasicItemAttributes, index) => {
    if(item.TYPE === "FLOAT") {
        return (
          <NumericCustomInput 
            value={values?.BASICITEMATTRIBUTES[index]?.VALUE}
            label={item?.NAME}
            error={errors?.BASICITEMATTRIBUTES?.[index]?.VALUE?.message}
            defaultValue={DEFAULT_VALUES?.[item.NAME]?.min || 0}
            helperText={"Λαμβάνει τιμές από 300mm μέχρι 3300mm."}
            onChange={(e) => handleChange(e, index, parseInt(item.ID)) }           
          />
       
        )
    } 
    if(item.TYPE === "DATASET" ) {
        return (
            <FormControl key={index} >
            <InputLabel id="demo-simple-select-label">{item?.NAME}</InputLabel>
            <Select
              error={errors?.BASICITEMATTRIBUTES?.[index]?.VALUE?.message}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={values?.BASICITEMATTRIBUTES[index]?.VALUE || ''}
              label={item?.NAME}
              onChange={(e) => handleDataSetChange(e, index, item.ID) } 
              MenuProps={{ PaperProps: { style: { maxHeight: 200 } } }} // Set max height here

            >
               {item?.VALUE.map((value, index2) => {
                    return (
                    <MenuItem key={index2} value={value?.ID}>
                        {value?.NAME}
                    </MenuItem>
                    );
                })}
              
            </Select>
          </FormControl>
        )
    }
  })

  return (
    <Box
          sx={{mt: 2}}
        >
        <form className='form' noValidate onSubmit={handleSubmit(onSubmit)}>
          <FormControl fullWidth>
            <InputLabel id="basic-item-select">Επιλογή Πεδίου</InputLabel>
            <Select
              labelId="basic-item-select"
              id="basicItem"
              name="BASICITEM"
              value={values.BASICITEM.ID ? JSON.stringify(values.BASICITEM) : ''}
              label="NAME"
              onChange={(e) => setValue('BASICITEM', JSON.parse(e.target.value))}
            >
              {basicItems?.map((item, index) => {
                return (
                  <MenuItem key={index} value={JSON.stringify({
                    ID: item.ID,
                    NAME: item.NAME
                  })}>
                    {item.NAME}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <Stack spacing={2}>
            {attributes}
            <TextInput
            type="number"
            name={"message"}
            label={"Σημειώσεις"}
            multiline
            onChange={(e) => setValue("MESSAGE", e.target.value) }           
            value={values?.MESSAGE}
          />
         
            </Stack>
            <div>
            <Button type="submit" variant="contained" sx={{display: "inline-flex"}}>
            Αποθήκευση
          </Button>
            </div>
        
        </form>
    </Box>
  );
}


 //   <TextInput
          //   error={errors?.BASICITEMATTRIBUTES?.[index]?.VALUE?.message}
          //   key={index}
          //   type="number"
          //   id="outlined-adornment-weight"
          //   aria-describedby="outlined-weight-helper-text"
          //   InputProps={{
          //     endAdornment: <InputAdornment position="end">mm</InputAdornment>,
          // }}
          //   name={item?.NAME}
          //   label={item?.NAME}
          //   onChange={(e) => handleChange(e, index, parseInt(item.ID)) }           
          //   value={values?.BASICITEMATTRIBUTES[index]?.VALUE}
          // />