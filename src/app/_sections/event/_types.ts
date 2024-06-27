import { s } from '@fullcalendar/core/internal-common';
import { z } from 'zod';


  export const schema = z.object({
    MESSAGE: z.string(),
    BASICITEM: z.object({
      ID: z.string(),
      NAME: z.string(),
    }),
    BASICITEMATTRIBUTES: z.array(
      z.object({
        ID: z.number(),
        VALUE: z.number(),
      })
    ),
  });

  export type BasicItem = {
    ID: string;
    NAME: string;
  };
  
export type FormValues = z.infer<typeof schema>;
   
  export const eventFormSchema = z.object({
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
 export type EventForm = z.infer<typeof eventFormSchema>;


export type BasicItemAttributes = {
    ID: string;
    NAME: string;
    TYPE: string;
    DATASET: string;
    VALUE: { NAME: string, ID: number}[];

}


export interface State {
  expandForm: {
    index: number | null;
    open: boolean;
  };
  formData: FormValues[];
}