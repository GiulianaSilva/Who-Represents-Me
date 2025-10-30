import React from 'react';
import Box from '@mui/material/Box';
import { colors } from '../UI/style';

const ResultsPage = ({ resultsData = [] }) => {
  // Group by jurisdiction level
  const federalReps = resultsData.filter(
    (rep) => rep.jurisdiction?.classification === 'country'
  );
  const stateReps = resultsData.filter(
    (rep) => rep.jurisdiction?.classification === 'state'
  );
  const localReps = resultsData.filter(
    (rep) => rep.jurisdiction?.classification === 'municipality' ||
             rep.jurisdiction?.classification === 'county'
  );

  const renderRepCard = (rep) => (
    <Box
      key={rep.id}
      sx={{
        width: 220,
        height: 420,
        borderRadius: 2,
        bgcolor: colors.PastelBlue.main,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '6px',
        padding: '10px',
        textAlign: 'center',
        color: '#545454',
        fontWeight: 'bold',
      }}
    >
      <img
        src={rep.image || require('../UI/PfpPlaceHolder.png')}
        alt={rep.name}
        style={{
          width: 160,
          height: 160,
          borderRadius: '8px',
          objectFit: 'cover',
        }}
      />
      <div>{rep.name}</div>
      <div style={{ fontSize: '0.9rem', fontWeight: 500 }}>
        {rep.current_role?.title || 'Position N/A'}
      </div>
      <div style={{ fontSize: '0.9rem', fontWeight: 500 }}>
        {rep.party || 'Party N/A'}
      </div>
      <div style={{ fontSize: '0.8rem' }}>
        {rep.email || 'No email available'}
      </div>
      <div style={{ fontSize: '0.8rem' }}>
        {rep.offices?.[0]?.voice || 'No phone'}
      </div>
      <div style={{ fontSize: '0.8rem' }}>
        {rep.offices?.[0]?.address || 'No address'}
      </div>
    </Box>
  );

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        width: '100%',
        marginTop: '50px',
        gap: '40px',
      }}
    >
      {/* Federal */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
        <Box sx={{
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
        }}>
          Federal
        </Box>
        {federalReps.length > 0 ? federalReps.map(renderRepCard) : <div>No federal data</div>}
      </div>

      {/* State */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
        <Box sx={{
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
        }}>
          State
        </Box>
        {stateReps.length > 0 ? stateReps.map(renderRepCard) : <div>No state data</div>}
      </div>


      {/* Local */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
        <Box sx={{
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
        }}>
          Local
        </Box>
        {localReps.length > 0 ? localReps.map(renderRepCard) : <div>No local data</div>}
      </div>
    </div>
  );
};

export default ResultsPage;
