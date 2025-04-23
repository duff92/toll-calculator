import { TextField, Box, Button } from '@mui/material'
import { useState } from 'react'

interface RegNumberInputProps {
  value: string
  onChange: (value: string) => void
  onSubmit?: () => void
  loading?: boolean
  error?: string | null
}

const RegNumberInput: React.FC<RegNumberInputProps> = ({
  value,
  onChange,
  onSubmit,
  error: externalError,
}) => {
  const [localError, setLocalError] = useState<string>('')

  // Handle input change
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Convert to uppercase and remove special characters
    const sanitizedValue = event.target.value
      .toUpperCase()
      .replace(/[^A-Z0-9]/g, '')
    onChange(sanitizedValue)

    // Clear validation errors when the user is typing
    if (localError) setLocalError('')
  }

  // Validate the input before submitting
  const validateAndSubmit = () => {
    // Reset previous error
    setLocalError('')

    // Basic validation
    if (!value || value.trim() === '') {
      setLocalError('Registration number is required')
      return
    }

    // Swedish registration number format: ABC123 or ABC12D
    const regexPattern = /^[A-Z]{3}[0-9]{2}[0-9A-Z]{1}$/

    if (!regexPattern.test(value)) {
      setLocalError('Invalid format. Use format ABC123 or ABC12D')
      return
    }

    // If validation passes and onSubmit exists, call it
    if (onSubmit) {
      onSubmit()
    }
  }

  // Handle submit on Enter key press
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      validateAndSubmit()
    }
  }

  // Use external error if provided, otherwise use local validation error
  const displayError = externalError || localError

  return (
    <Box mb={2}>
      <Box display="flex" alignItems="flex-start" gap={1}>
        <TextField
          fullWidth
          label="Registration Number"
          value={value}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          error={!!displayError}
          helperText={
            displayError || 'Enter vehicle registration number (e.g., ABC123)'
          }
          slotProps={{ input: { 'aria-label': 'registration number' } }}
          placeholder="ABC123"
        />
        <Button
          variant="contained"
          color="primary"
          onClick={validateAndSubmit}
          sx={{ mt: 1 }}
        >
          Submit
        </Button>
      </Box>
    </Box>
  )
}

export default RegNumberInput
