// material
import { styled } from '@mui/material/styles';
import {
  Toolbar, OutlinedInput, Select, MenuItem, FormControl, InputLabel,
} from '@mui/material';
// component
import React from 'react';

// ----------------------------------------------------------------------

const RootStyle = styled(Toolbar)(({ theme }) => ({
  height: 96,
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 1, 0, 3),
}));

const SearchStyle = styled(OutlinedInput)(({ theme }) => ({
  width: '100%',
  maxWidth: 350,
  minWidth: 240,
  // @ts-ignore
  '&.Mui-focused': { boxShadow: theme.customShadows.z8 },
  '& fieldset': {
    borderWidth: '1px !important',
    // @ts-ignore
    borderColor: `${theme.palette.grey[500_32]} !important`,
  },
}));

const SelectStyle = styled(Select)(({ theme }) => ({
  width: '100%',
  maxWidth: 350,
  minWidth: 240,
  // @ts-ignore
  '&.Mui-focused': { boxShadow: theme.customShadows.z8 },
  '& fieldset': {
    borderWidth: '1px !important',
    // @ts-ignore
    borderColor: `${theme.palette.grey[500_32]} !important`,
  },
}));

// ----------------------------------------------------------------------

interface DefaultField {
  type: 'input' | 'select';
  label: string;
  name: string;
  startAdornment?: React.ReactNode
  value?: number;
}

export interface Option {
  value: string | number;
  label: string
}

interface SelectField extends DefaultField {
  type: 'select';
  options: Option[]
}

interface InputField extends DefaultField {
  type: 'input';
  multiline?: boolean;
}

export type FiltersField = SelectField | InputField;

interface FiltersProps {
  fields: FiltersField[];
  onChange: (values: any) => void;
}

export const Filters: React.FC<FiltersProps> = ({ fields, onChange }) => {
  const handleFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ [event.target.name]: event.target.value });
  };

  return (
    <RootStyle>
      { (fields).map((field) => {
        switch (field.type) {
          case 'input':
            return (
              <SearchStyle
                key={field.name}
                name={field.name}
                placeholder={field.label}
                onChange={handleFieldChange}
                startAdornment={field.startAdornment}
              />
            );
          case 'select':
            return (
              <FormControl key={field.name}>
                <InputLabel id={`filter-select-${field.name}`}>{field.label}</InputLabel>
                <SelectStyle
                  labelId={`filter-select-${field.name}`}
                  name={field.name}
                  // @ts-ignore
                  onChange={handleFieldChange}
                  startAdornment={field.startAdornment}
                >
                  {field.options.map((option: Option) => (
                    <MenuItem
                      key={option.value}
                      value={option.value}
                    >
                      { option.label }
                    </MenuItem>
                  ))}
                </SelectStyle>
              </FormControl>
            );
          default: return null;
        }
      }) }
    </RootStyle>
  );
};
