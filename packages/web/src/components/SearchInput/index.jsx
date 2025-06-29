import PropTypes from 'prop-types';
import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import SearchIcon from '@mui/icons-material/Search';
import useFormatMessage from 'hooks/useFormatMessage';

export default function SearchInput({ onChange, value }) {
  const formatMessage = useFormatMessage();

  return (
    <FormControl variant="outlined" fullWidth>
      <InputLabel htmlFor="search-input">
        {formatMessage('searchPlaceholder')}
      </InputLabel>

      <OutlinedInput
        value={value}
        id="search-input"
        type="text"
        size="medium"
        fullWidth
        onChange={onChange}
        endAdornment={
          <InputAdornment position="end">
            <SearchIcon sx={{ color: (theme) => theme.palette.primary.main }} />
          </InputAdornment>
        }
        label={formatMessage('searchPlaceholder')}
      />
    </FormControl>
  );
}

SearchInput.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.string,
};
