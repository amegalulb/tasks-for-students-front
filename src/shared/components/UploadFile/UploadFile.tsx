import React, { useEffect, useState } from 'react';
import {
  Box, IconButton, List, ListItem, ListItemText, Typography,
} from '@mui/material';
import styled from '@emotion/styled';
import CloseIcon from '@mui/icons-material/Close';
import { LoadingButton } from '@mui/lab';

const Input = styled('input')({
  display: 'none',
});

export interface UploadFileProps {
  label: string;
  onChange: (files: File[]) => void;
  loading?: boolean;
  error?: boolean;
  initialFiles?: File[]
}

export const UploadFile: React.FC<UploadFileProps> = ({
  label,
  onChange,
  loading,
  error,
  initialFiles,
}) => {
  const [files, setFiles] = useState<File[]>(initialFiles || []);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const filesArray = Array.from(event.target.files || []);
    setFiles((prevFiles) => [...prevFiles, ...filesArray]);
  };

  const handleFileDelete = (name: string) => () => {
    setFiles((prevFiles) => prevFiles.filter((file) => file.name !== name));
  };

  useEffect(() => {
    onChange(files);
  }, [files]);

  useEffect(() => {
    if (initialFiles) {
      setFiles(initialFiles);
    }
  }, [initialFiles]);

  return (
    <Box>
      {error && <Typography variant="body2" color="error" gutterBottom>Произошла ошибка!</Typography>}
      <label htmlFor="contained-button-file">
        { /* @ts-ignore */}
        <Input id="contained-button-file" type="file" multiple onChange={handleChange} />
        <LoadingButton variant="contained" component="span" loading={loading}>
          {label}
        </LoadingButton>
      </label>
      <List>
        {
          files.map(({ name }) => (
            <ListItem key={name}>
              <ListItemText>{name}</ListItemText>
              <IconButton onClick={handleFileDelete(name)}><CloseIcon /></IconButton>
            </ListItem>
          ))
        }
      </List>
    </Box>
  );
};
