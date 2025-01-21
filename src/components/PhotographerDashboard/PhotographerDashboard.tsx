import React, { useState } from 'react';
import { 
  Container, 
  Grid, 
  Tabs, 
  Tab, 
  Box, 
  Typography 
} from '@mui/material';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`photographer-dashboard-tabpanel-${index}`}
      aria-labelledby={`photographer-dashboard-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component="div">{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `photographer-dashboard-tab-${index}`,
    'aria-controls': `photographer-dashboard-tabpanel-${index}`,
  };
}

const PhotographerDashboard: React.FC = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs 
          value={value} 
          onChange={handleChange} 
          aria-label="photographer dashboard tabs"
          variant="fullWidth"
        >
          <Tab label="Analytics" {...a11yProps(0)} />
          <Tab label="Profile" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Typography variant="h5">Analytics Coming Soon</Typography>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Typography variant="h5">Profile Coming Soon</Typography>
      </TabPanel>
    </Container>
  );
};

export default PhotographerDashboard;
