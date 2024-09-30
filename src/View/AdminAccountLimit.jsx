import { TabPanel } from '@mui/lab';
import { Grid, IconButton } from '@mui/material';
import React from 'react'
import ApiPaginateSearch from '../component/ApiPaginateSearch';
import CreateEditLimitAccount from '../component/accountLimits/CreateEditLimtAccount';
import CachedIcon from "@mui/icons-material/Cached";
const AdminAccountLimit = () => {
  return (
   <> <Grid item md={12} sm={12} xs={12}>
   <TabPanel value={value} index={0} dir={theme.direction}>
     <ApiPaginateSearch
       actionButtons={
         <Grid
           item
           md={12}
           sm={12}
           xs={12}
           sx={{
             display: "flex",
             justifyContent: { md: "end", xs: "start" },
             alignItems: "center",
             pr: 2,
             mt: { md: 0, xs: 2, sm: 2 },
           }}
         >
           <div className="mx-2">
             <CreateEditLimitAccount refresh={refresh} />
           </div>
           <Tooltip title="refresh">
     <IconButton
       aria-label="refresh"
       // color="success"
       sx={{
         color:"#0F52BA"
       }}
       onClick={() => {
         refreshFunc(setQuery);
       }}
     >
       <CachedIcon className="refresh-purple" />
     </IconButton>
   </Tooltip>
         </Grid>
       }
       apiEnd={ApiEndpoints.ADMIN_ACCOUNTS_LIMITS}
       searchOptions={searchOptions}
       setQuery={setQuery}
       columns={columns}
       apiData={apiData}
       setApiData={setApiData}
       tableStyle={CustomStyles}
       queryParam={query ? query : ""}
       returnRefetch={(ref) => {
         refresh = ref;
       }}
     />
   </TabPanel>
 </Grid></>
  )
}

export default AdminAccountLimit
