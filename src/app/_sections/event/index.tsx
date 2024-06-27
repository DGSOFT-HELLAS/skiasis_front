'use client';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { useSettingsContext } from 'src/app/components/settings';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { Button } from '@mui/material';
import NewOffer from 'src/app/_sections/event/newOffer';
import { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { EventForm,  BasicItem, FormValues, State } from './_types';
import { FormEvent } from './eventForm';

import styles from './styles.module.css';
import { Avatar } from '@mui/material';
import FolderIcon from '@mui/icons-material/Folder';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteDialog from './DeleteDialog';

const fetcher = async (id: string): Promise<EventForm> => {
  const { data } = await axios.get(`/api/events?id=${id}`);
  return data?.result;
};

const fetchBasicItems = async (): Promise<BasicItem[]> => {
  const { data } = await axios.post(`/api/items`, {
    type: 'getBasicItem',
  });
  return data?.result;
};





const initialState: State = {
  expandForm: {
    index: null,
    open: false,
  },
  formData: [],
};
export default function EventPage({ id }: { id: string }) {
  const [state, setState] = useState<State>(initialState);
  const settings = useSettingsContext();

  const { isError, error, data } = useQuery({
    queryKey: ['event'],
    queryFn: () => fetcher(id),
  });

 

  const {
    isError: isErrorBasicItem,
    error: errorBasicItem,
    data: basicItems,
  } = useQuery({
    queryKey: ['basicItem'],
    queryFn: fetchBasicItems,
  });


  console.log({state: state.formData})
  const onSubmit = (data: FormValues) => {
    setState((prev) => {
      const newData = [...prev.formData];
      if (prev.expandForm.index !== null) {
        newData[prev.expandForm.index] = data;
      } else {
        newData.push(data);
      }
      return {
        ...prev,
        formData: newData,
        expandForm: { index: null, open: false },
      };
    });
   
  }
  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Typography variant="h5"> Ραντεβού: {data?.SOACTIONCODE} </Typography>
      <Grid container spacing={1}>
        <Grid
          item
          xs={12}
          sx={{
            mt: 2,
            padding: 2,
            width: 1,
            borderRadius: 2,
            border: (theme) => `dashed 1px ${theme.palette.divider}`,
          }}
        >
          {data && <FormEvent data={data} />}
          {isError && <div>{error?.message}</div>}
        </Grid>
        <Grid item xs={12}>
          <Typography sx={{ mt: 4 }} variant="h5">
            Συνάντηση:
          </Typography>
        </Grid>
        <Grid>
          <Button
            color="success"
            variant="contained"
            sx={{ mt: 2 }}
            startIcon={<AddIcon />}
          >
            Νέα Προσφορά
          </Button>
        </Grid>
        <div className={styles.spec_container}>
          {state.formData.map((form, index) => (
            <div key={index} className={styles.spec_item}>
              <div className={styles.spec_top_row}>
                <Avatar>
                  <FolderIcon />
                </Avatar>
                <div>
                  <span className={styles.title}>Νέο Εϊδος:</span>
                  <span> {form.BASICITEM ? form.BASICITEM.NAME : `Eίδος ${index + 1}`}</span>
                </div>
                <div>
                  <ExpandMoreIcon
                    onClick={() =>
                      setState((prev) => ({
                        ...prev,
                        expandForm: {
                          index,
                          open: prev.expandForm.index === index ? !prev.expandForm.open : true,
                        },
                      }))
                    }
                  />
                
                  <DeleteDialog state={state} setState={setState} index={index} />
                </div>
              </div>
             
                {index === state.expandForm.index &&
                state.expandForm.open && (
                  <div className={styles.spec_bottom_row}>
                  <NewOffer
                    basicItems={basicItems}
                    formData={form}
                    onSubmit={onSubmit}
                  />
                </div>

                )}
            </div>
          ))}

         <div>
         <Button
            variant="contained"
            sx={{display: 'inline-flex' }}
            startIcon={<AddIcon />}
            onClick={() => {
              const prevData = [...state.formData]
              //REFACTOR:
              setState(prev => ({...prev, formData: [...prevData, {BASICITEM: {ID: '', NAME: ''}, MESSAGE: '', BASICITEMATTRIBUTES: []}]}))
            }}
          >
            Προσθήκη Νέου
          </Button>
         </div>
        </div>
      
      </Grid>
    </Container>
  );
}
