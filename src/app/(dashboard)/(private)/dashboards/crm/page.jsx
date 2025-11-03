// MUI Imports
import Grid from '@mui/material/Grid2'

// Components Imports
import WebsiteAnalyticsSlider from '@views/dashboards/analytics/WebsiteAnalyticsSlider'

// Data Imports

/**
 * ! If you need data using an API call, uncomment the below API code, update the `process.env.API_URL` variable in the
 * ! `.env` file found at root of your project and also update the API endpoints like `/pages/profile` in below example.
 * ! because we've used the server action for getting our static data.
 */
/* const getProfileData = async () => {
  // Vars
  const res = await fetch(`${process.env.API_URL}/pages/profile`)

  if (!res.ok) {
    throw new Error('Failed to fetch profileData')
  }

  return res.json()
} */
const DashboardAnalytics = async () => {
  // Vars

  return (
    <Grid container spacing={6}>
      <Grid size={{ xs: 12, lg: 6 }}>
        <WebsiteAnalyticsSlider />
      </Grid>
    </Grid>
  )
}

export default DashboardAnalytics
