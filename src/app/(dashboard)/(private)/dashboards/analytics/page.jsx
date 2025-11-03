// MUI Imports
import Grid from '@mui/material/Grid2'

// Components Imports
import EarningReports from '@views/dashboards/analytics/EarningReports'
import LineAreaDailySalesChart from '@views/dashboards/analytics/LineAreaDailySalesChart'
import MonthlyCampaignState from '@views/dashboards/analytics/MonthlyCampaignState'
import SalesByCountries from '@views/dashboards/analytics/SalesByCountries'
import SalesOverview from '@views/dashboards/analytics/SalesOverview'
import SourceVisits from '@views/dashboards/analytics/SourceVisits'
import SupportTracker from '@views/dashboards/analytics/SupportTracker'
import TotalEarning from '@views/dashboards/analytics/TotalEarning'
import WebsiteAnalyticsSlider from '@views/dashboards/analytics/WebsiteAnalyticsSlider'

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
  return (
    <Grid container spacing={6}>
      <Grid size={{ xs: 12, lg: 6 }}>
        <WebsiteAnalyticsSlider />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
        <LineAreaDailySalesChart />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
        <SalesOverview />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <EarningReports />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <SupportTracker />
      </Grid>
      <Grid size={{ xs: 12, md: 6, lg: 4 }}>
        <SalesByCountries />
      </Grid>
      <Grid size={{ xs: 12, md: 6, lg: 4 }}>
        <TotalEarning />
      </Grid>
      <Grid size={{ xs: 12, md: 6, lg: 4 }}>
        <MonthlyCampaignState />
      </Grid>
      <Grid size={{ xs: 12, md: 6, lg: 4 }}>
        <SourceVisits />
      </Grid>
    </Grid>
  )
}

export default DashboardAnalytics
