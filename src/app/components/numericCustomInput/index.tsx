import * as React from 'react';
import { NumericFormat, NumericFormatProps } from 'react-number-format';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
  min: number;
  max: number;
}



const NumericFormatCustom = React.forwardRef<NumericFormatProps, CustomProps>(
  function NumericFormatCustom(props, ref): {
  
  } {
    const { onChange, ...other } = props;

    return (
      <NumericFormat
        {...other}
        getInputRef={ref}
        onValueChange={(values) => {
          onChange({
            target: {
              name: props.name,
              value: values.value,
            },
          });
        }}
        thousandSeparator
        valueIsNumericString
        suffix=" mm"
      />
    );
  },
);

export default function NumericCustomInput({
  onChange,
  value,
  name,
  label,
  helperText,
  defaultValue,
error,
}: {
  onChange: {e: React.ChangeEvent<HTMLInputElement>};
  value: number;
  name: string;
  label: string;
  helperText: string;
  defaultValue: number;
  error: string;

}) {
 
  return (
    <Stack direction="row" spacing={2}>
      <TextField
        fullWidth
        error={error ? true : false}
        defaultValue={defaultValue}
        label={label}
        value={value}
        helperText={error ? error : helperText}
        onChange={onChange}
        name={name}
        id="formatted-numberformat-input"
        InputProps={{
          inputComponent: NumericFormatCustom  as any,
        }}
       
      />
    </Stack>
  );
}