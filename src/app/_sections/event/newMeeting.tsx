import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { MenuItem } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import axios from 'axios';
import {  useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import FormControl from '@mui/material/FormControl';
import {InputLabel} from '@mui/material';
import SubForm from './subForm';
const schema = z.object({
  SOACTIONCODE: z.string(),
  TNAME: z.string(),
});


type NewEvent = {
    ID: string;
    NAME: string;
}
const  fetchBasicItems = async (): Promise< NewEvent[] > => {
  const { data } = await axios.post(`/api/items`, {
    type: 'getBasicItem',
  });
  return data?.result;
};
const  fetchBasicItemsAttr = async (id: string): Promise< NewEvent[] > => {
  const { data } = await axios.post(`/api/items`, {
    type: 'getBasicItemAttr',
    id,
  });
  return data?.result;
};

export default function NewMeeting() {
    const methods = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
          ID: '',
        },
      });
    
        const { setValue, handleSubmit } = methods;
      const values = methods.watch();

  const { isError, error, data: basicItem } = useQuery({
    queryKey: ['basicItem'],
    queryFn: fetchBasicItems,
  });


  if (isError) {
    toast.error(error?.message);
  }

  return (
    <div>
      <h1>New Meeting</h1>
      <form 
      >
      <FormControl fullWidth>
        <InputLabel id="basicItem">Επιλογή Πεδίου</InputLabel>
        <Select
          labelId="basicItem"
          id="basicItem"
          value={values.ID}
          label="NAME"
          onChange={(e) => setValue('ID', e.target.value)}
        >
          {basicItem?.map((item , index) => {
            return <MenuItem key={index} value={item.ID}>{item.NAME}</MenuItem>
        })}
        </Select>
        <SubForm id={values.ID} setValue={setValue} values={values} />
      </FormControl>
      </form>
    </div>
  );
}




