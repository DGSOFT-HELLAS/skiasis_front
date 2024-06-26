import { useForm, FormProvider } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, MenuItem } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import FormControl from '@mui/material/FormControl';
import { InputLabel } from '@mui/material';
import SubForm from './subForm';
const schema = z.object({
  BASICITEM: z.object({
    ID: z.string(),
    NAME: z.string(),
  }),
  BASICITEMATTRIBUTES: z.array(
    z.object({
      ID: z.number(),
      VALUE: z.union([z.string(), z.number()]),
    })
  ),
});

type NewEvent = {
  ID: number;
  NAME: string;
};

type FormValues = z.infer<typeof schema>;

const fetchBasicItems = async (): Promise<NewEvent[]> => {
  const { data } = await axios.post(`/api/items`, {
    type: 'getBasicItem',
  });
  return data?.result;
};

export default function NewMeeting() {
  const methods = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      BASICITEM: { ID: '', NAME: '' },
      BASICITEMATTRIBUTES: [{
      
      }],
    },
  });
  const { setValue, handleSubmit } = methods;
  const values = methods.watch();

  const {
    isError,
    error,
    data: basicItem,
  } = useQuery({
    queryKey: ['basicItem'],
    queryFn: fetchBasicItems,
  });

  if (isError) {
    toast.error(error?.message);
  }

  const onSubmit = (formData: z.infer<typeof schema>) => {
    console.log({ formData });
  };

  return (
    <div>
      <FormProvider {...methods}>
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <FormControl fullWidth>
            <InputLabel id="basic-item-select">Επιλογή Πεδίου</InputLabel>
            <Select
              labelId="basic-item-select"
              id="basicItem"
              name="BASICITEM"
              value={values.BASICITEM.ID}
              label="NAME"
              onChange={(e) => setValue('BASICITEM', { ID: e.target.value, NAME: '' })}
            >
              {basicItem?.map((item, index) => {
                return (
                  <MenuItem key={index} value={item.ID}>
                    {item.NAME}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <SubForm id={values.BASICITEM.ID} setValue={setValue} values={values} />
          <Button type="submit" variant="contained">
            Αποθήκευση
          </Button>
        </form>
      </FormProvider>
    </div>
  );
}
