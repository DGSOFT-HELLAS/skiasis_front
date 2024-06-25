import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { MenuItem, Stack, Typography } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import axios from 'axios';
import {  useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import FormControl from '@mui/material/FormControl';
import {InputLabel} from '@mui/material';
import TextInput from 'src/app/components/inputs/textInput';
const schema = z.object({
  SOACTIONCODE: z.string(),
  TNAME: z.string(),
});


type BasicTimesAttributes = {
    ID: string;
    NAME: string;
    TYPE: string;
    DATASET: string;
    VALUE: string[];
}



const  fetchBasicItemsAttr = async (id: string): Promise< BasicTimesAttributes[] > => {
  const { data } = await axios.post(`/api/items`, {
    type: 'getBasicItemAttr',
    id,
  });
  return data?.result;
};

export default function SubForm({id, setValue, values}: {id: string, setValue: any, values: any}) {
    
  const {
    status,
    fetchStatus,
    data: basicItemAttr,
  } = useQuery({
    queryKey: ['basicItemAttribute', id],
    queryFn: () => fetchBasicItemsAttr(id),
    enabled: !!id,
  })

  const attributes = basicItemAttr?.map((item:BasicTimesAttributes) => {
    if(item.TYPE === "FLOAT") {
        return (
            <TextInput
            name={item?.NAME}
            label={item?.NAME}
            type={'text'}
            onChange={(e) => {}}
            value={values?.FINALDATE}
          />
        )
    } 
    if(item.TYPE === "DATASET" ) {
        return (
            <FormControl>
            <InputLabel id="demo-simple-select-label">{item?.NAME}</InputLabel>
            <Select
           
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={values?.FINALDATE}
              label={item?.NAME}
              onChange={(e: SelectChangeEvent) => {}}
            >
                {item?.VALUE.map((value, index) => {
                    return (
                    <MenuItem key={index} value={value}>
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
       <div>
              <h1>SubForm</h1>
            <div>
                <Typography variant="subtitle1">Πεδία</Typography>
                <Typography variant="subtitle2">{attributes?.length}</Typography>
            </div>
            <Stack spacing={2}>
            {attributes}
            </Stack>
       </div>
  );
}




