import TextField, { TextFieldProps } from '@mui/material/TextField';
// ----------------------------------------------------------------------

type Props = TextFieldProps & {
  name: string;
    helperText?: string;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function TextInput({error,  name,  value, onChange, helperText, type, disabled = false, ...other }: Props) {

  return (
        <TextField
          disabled={disabled}
          fullWidth
          type={type}
          value={value}
          onChange={onChange}
          error={!!error}
          helperText={error ? error : helperText}
          {...other}
        />
  );
}
