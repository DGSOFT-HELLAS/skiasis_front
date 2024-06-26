import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { MenuItem, Stack, Typography } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import axios from 'axios';
import {  useQuery } from '@tanstack/react-query';
import FormControl from '@mui/material/FormControl';
import {InputLabel} from '@mui/material';
import TextInput from 'src/app/components/inputs/textInput';




type BasicTimesAttributes = {
    ID: string;
    NAME: string;
    TYPE: string;
    DATASET: string;
    VALUE: { NAME: string, ID: number}[];

}


const  fetchBasicItemsAttr = async (id: string): Promise< BasicTimesAttributes[] > => {
  const { data } = await axios.post(`/api/items`, {
    type: 'getBasicItemAttr',
    id,
  });
  return data?.result;
};

export default function SubForm({
  id, 
  setValue, 
  values 
}: {id: string, setValue: any, values: any}) {
  const {
    status,
    fetchStatus,
    data: basicItemAttr,
  } = useQuery({
    queryKey: ['basicItemAttribute', id],
    queryFn: () => fetchBasicItemsAttr(id),
    enabled: !!id,
  })


  const handleDataSetChange = (e: SelectChangeEvent, index: number, id: string) => {
    setValue(`BASICITEMATTRIBUTES[${index}]`, {
        ID: id,
        VALUE: e.target.value
    })

  }
  const attributes = basicItemAttr?.map((item:BasicTimesAttributes, index) => {
    if(item.TYPE === "FLOAT") {
        return (
            <TextInput
            key={index}
            name={item?.NAME}
            label={item?.NAME}
            type={'text'}
            onChange={(e) => setValue(`BASICITEMATTRIBUTES[${index}]`, {
                ID: item?.ID,
                VALUE: parseInt(e.target.value)
            })}           
            value={values?.BASICITEMATTRIBUTES[index]?.VALUE || ''}
          />
        )
    } 
    if(item.TYPE === "DATASET" ) {
        return (
            <FormControl key={index} >
            <InputLabel id="demo-simple-select-label">{item?.NAME}</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={values?.BASICITEMATTRIBUTES[index]?.VALUE || ''}
              label={item?.NAME}
              onChange={(e) => handleDataSetChange(e, index, item.ID) } 
              MenuProps={{ PaperProps: { style: { maxHeight: 200 } } }} // Set max height here

            >
               {/* <Stack sx={{maxHeight: '200px'}}> */}
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

  console.log({values})
 
  return (
       <>
            {/* <Stack spacing={1} direction={"row"} sx={{mb: 2}}>
                <Typography variant="subtitle1">Πεδία</Typography>
                <Typography variant="subtitle2">{attributes?.length}</Typography>
            </Stack> */}
            <Stack spacing={2}>
            {attributes}
            </Stack>
       </>
  );
}




