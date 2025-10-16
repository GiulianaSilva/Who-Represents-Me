import React from 'react';
import Box from '@mui/material/Box';
import { colors } from '../UI/style'; 

const ResultsPage = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        width: '100%',
        marginTop: '50px',
        gap: '40px', // space between each column
      }}
    >
      {/* Federal column */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '20px',
        }}
      >
        <Box
          sx={{
            width: 200,
            height: 100,
            borderRadius: 1,
            bgcolor: colors.PastelRed.main,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#545454',
            fontWeight: 'bold',
            fontSize: 'calc(1rem + 1vw)',
          }}
        >
          Federal
        </Box>


        <Box
          sx={{
            width: 200,
            height: 400,
            borderRadius: 1,
            bgcolor: colors.PastelBlue.main,
            display: 'flex',
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center', 
            color: '#545454',
            fontWeight: 'bold',
            fontSize: 'calc(1rem + 1vw)',
          }}
        >
        <img
        src={require('../UI/PfpPlaceHolder.png')}
        alt="Federal Representative Placeholder"
        style={{ width: 160, height: 160, borderRadius: '8px' }}
        />
          <div>Name</div>
          <div>Position</div>
          <div>Email</div>
          <div>Phone Number</div>
          <div>Office Address</div>
        </Box>
      </div>

      {/* State column */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '20px',
        }}
      >
        <Box
          sx={{
            width: 200,
            height: 100,
            borderRadius: 1,
            bgcolor: colors.PastelRed.main,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#545454',
            fontWeight: 'bold',
            fontSize: 'calc(1rem + 1vw)',
          }}
        >
          State
        </Box>

        <Box
          sx={{
            width: 200,
            height: 400,
            borderRadius: 1,
            bgcolor: colors.PastelBlue.main,
            display: 'flex',
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center', 
            color: '#545454',
            fontWeight: 'bold',
            fontSize: 'calc(1rem + 1vw)',
          }}
        >
        <img
        src={require('../UI/PfpPlaceHolder.png')}
        alt="Federal Representative Placeholder"
        style={{ width: 160, height: 160, borderRadius: '8px' }}
        />
          <div>Name</div>
          <div>Position</div>
          <div>Email</div>
          <div>Phone Number</div>
          <div>Office Address</div>
        </Box>
      </div>

      {/* Local column */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '20px',
        }}
      >
        <Box
          sx={{
            width: 200,
            height: 100,
            borderRadius: 1,
            bgcolor: colors.PastelRed.main,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#545454',
            fontWeight: 'bold',
            fontSize: 'calc(1rem + 1vw)',
          }}
        >
          Local
        </Box>

        <Box
          sx={{
            width: 200,
            height: 400,
            borderRadius: 1,
            bgcolor: colors.PastelBlue.main,
            display: 'flex',
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center', 
            color: '#545454',
            fontWeight: 'bold',
            fontSize: 'calc(1rem + 1vw)',
          }}
        >
        <img
        src={require('../UI/PfpPlaceHolder.png')}
        alt="Federal Representative Placeholder"
        style={{ width: 160, height: 160, borderRadius: '8px' }}
        />
          <div>Name</div>
          <div>Position</div>
          <div>Email</div>
          <div>Phone Number</div>
          <div>Office Address</div>
        </Box>
      </div>
    </div>
  );
};

export default ResultsPage;
