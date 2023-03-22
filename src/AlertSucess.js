
import * as React from 'react';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import { Fade } from '@mui/material';

const AlertSuccess = ({openSucess}) => {


    return (
        <Box sx={{ width: '100%' }}>
            <Fade timeout={1000} enter={false} unmountOnExit={true} in={openSucess}>
                <Alert
                    action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                        >
                        </IconButton>
                    }
                    sx={{ mb: 2 }}
                >
                    New painting has been successfully added!
                </Alert>
            </Fade>
        </Box>
    );
}
export default AlertSuccess;