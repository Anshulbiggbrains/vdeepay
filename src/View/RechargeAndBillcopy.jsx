















// <Box sx={{ width: "auto",maxWidth:"1000px" }}>
      
    //   <TabContext value={value}>
    //     <Box   className="card-css" sx={{ borderBottom: 1, borderColor: "divider" }}>
    //       <StyledTabs
    //         onChange={handleChange}
    //         aria-label="lab API tabs example"
    //         variant="scrollable"
    //         scrollButtons="auto"
    //       >
    //         <Tab
    //           className="cm-hover"
    //           icon={
    //             <CircularButton
    //               UnderlineRequired={false}
    //               onClick={() => {}}
    //               txt="Mobile"
    //               img={getRecAndBillImg("Mobile Postpaid")}
    //               img2={getRecAndBillInvertImg("Mobile Postpaid")}
    //               isActive={Number(value) === 1}
    //             />
    //           }
    //           value="1"
    //         />
    //         <Tab
    //           className="cm-hover"
    //           icon={
    //             <CircularButton
    //               UnderlineRequired={false}
    //               onClick={() => {}}
    //               txt="DTH"
    //               img={getRecAndBillImg("Cable TV")}
    //               img2={getRecAndBillInvertImg("Cable TV")}
    //               isActive={Number(value) === 2}
    //             />
    //           }
    //           value="2"
    //         />
    //         <Tab
    //           className="cm-hover"
    //           icon={
    //             <CircularButton
    //               UnderlineRequired={false}
    //               onClick={() => {}}
    //               txt="Electricity"
    //               img={getRecAndBillImg("Electricity")}
    //               img2={getRecAndBillInvertImg("Electricity")}
    //               isActive={Number(value) === 3}
    //             />
    //           }
    //           value="3"
    //         />
    //         <Tab
    //           className="cm-hover"
    //           icon={
    //             <CircularButton
    //               UnderlineRequired={false}
    //               onClick={() => {}}
    //               txt="Credit Card"
    //               img={getRecAndBillImg("Credit Card")}
    //               img2={getRecAndBillInvertImg("Credit Card")}
    //               isActive={Number(value) === 4}
    //             />
    //           }
    //           value="4"
    //         />
    //         <Tab
    //           className="cm-hover"
    //           icon={
    //             <CircularButton
    //               UnderlineRequired={false}
    //               onClick={() => {}}
    //               txt="BroadBand"
    //               img={getRecAndBillImg("Broadband")}
    //               img2={getRecAndBillInvertImg("Broadband")}
    //               isActive={Number(value) === 5}
    //             />
    //           }
    //           value="5"
    //         />
    //         <Tab
    //           className="cm-hover"
    //           icon={
    //             <CircularButton
    //               UnderlineRequired={false}
    //               onClick={() => {}}
    //               txt="Gas"
    //               img={getRecAndBillImg("Gas Cylinder")}
    //               img2={getRecAndBillInvertImg("Gas Cylinder")}
    //               isActive={Number(value) === 6}
    //             />
    //           }
    //           value="6"
    //         />
    //         <Tab
    //           className="cm-hover"
    //           icon={
    //             <CircularButton
    //               UnderlineRequired={false}
    //               onClick={() => {}}
    //               txt="Water"
    //               img={getRecAndBillImg("Water")}
    //               img2={getRecAndBillInvertImg("Water")}
    //               isActive={Number(value) === 7}
    //             />
    //           }
    //           value="7"
    //         />
    //         <Tab
    //           className="cm-hover"
    //           icon={
    //             <CircularButton
    //               UnderlineRequired={false}
    //               onClick={() => {}}
    //               txt="Insurance"
    //               img={getRecAndBillImg("Insurance")}
    //               img2={getRecAndBillInvertImg("Insurance")}
    //               isActive={Number(value) === 8}
    //             />
    //           }
    //           value="8"
    //         />
    //         <Tab
    //           className="cm-hover"
    //           icon={
    //             <CircularButton
    //               UnderlineRequired={false}
    //               onClick={() => {}}
    //               txt="Landline"
    //               img={getRecAndBillImg("Landline")}
    //               img2={getRecAndBillInvertImg("Landline")}
    //               isActive={Number(value) === 7}
    //             />
    //           }
    //           value="9"
    //         />
    //       </StyledTabs>
    //     </Box>
    //     <Box  
    //     sx={{mt:2}}
    //     className="recharge-outer-card"
    //     >
    //    <OuterIcon>
    //     <InnerIcon><img src={operatorIcon } alt="Operator icon"/></InnerIcon>
    //   </OuterIcon>
        
    //       <TabPanel
    //         value="1"
    //         sx={{ width: { md: "60%", sm: "100%", xs: "100%" } }}
    //       >
    //         <MobileRechargeForm view="mobile" setOperatorIcon={setOperatorIcon} operatorIcon={operatorIcon} />
    //       </TabPanel>
    //       <TabPanel
    //         value="2"
    //         sx={{ width: { md: "60%", sm: "100%", xs: "100%" } }}
    //       >
    //         <MobileRechargeForm view="dth"  setOperatorIcon={setOperatorIcon} operatorIcon={operatorIcon}  />
    //       </TabPanel>
    //       <TabPanel
    //         value="3"
    //         sx={{ width: { md: "60%", sm: "100%", xs: "100%" } }}
    //       >
    //         <ElectricityForm
    //           title="Electricity Bill Payment"
    //           subType="ELECTRICITY"
    //           setOperatorIcon={setOperatorIcon} operatorIcon={operatorIcon}
    //         />
    //       </TabPanel>
    //       <TabPanel
    //         value="4"
    //         sx={{ width: { md: "60%", sm: "100%", xs: "100%" } }}
    //       >
    //         {user && !user.instId ? (
    //           <Box sx={{ display: "flex", justifyContent: "center" }}>
    //             <OutletRegistration autoOpen  />
    //           </Box>
    //         ) : (
    //           <CreditcardForm setOperatorIcon={setOperatorIcon} operatorIcon={operatorIcon} />
    //         )}
    //       </TabPanel>
    //       {/*  */}
    //       <TabPanel
    //         value="5"
    //         sx={{ width: { md: "60%", sm: "100%", xs: "100%" } }}
    //       >
    //         {/* <BroadBandForm /> */}
    //         <ElectricityForm
    //           title="Broadband Bill Payment"
    //           subType="BROADBAND"
    //           setOperatorIcon={setOperatorIcon} operatorIcon={operatorIcon}
    //         />
    //       </TabPanel>
    //       {/*  */}
    //       <TabPanel
    //         value="6"
    //         sx={{ width: { md: "60%", sm: "100%", xs: "100%" } }}
    //       >
    //         {/* <GasForm /> */}
    //         <ElectricityForm title="Gas Bill Payment" subType="GAS" setOperatorIcon={setOperatorIcon} operatorIcon={operatorIcon} />
    //       </TabPanel>
    //       <TabPanel
    //         value="7"
    //         sx={{ width: { md: "60%", sm: "100%", xs: "100%" } }}
    //       >
    //         {/* <WaterForm /> */}
    //         <ElectricityForm title="Water Bill Payment" subType="WATER" setOperatorIcon={setOperatorIcon} operatorIcon={operatorIcon} />
    //       </TabPanel>
    //       <TabPanel
    //         value="8"
    //         sx={{ width: { md: "60%", sm: "100%", xs: "100%" } }}
    //       >
    //         {/* <LicPremiumForm /> */}
    //         <ElectricityForm title="Insurance" subType="INSURANCE"  setOperatorIcon={setOperatorIcon} operatorIcon={operatorIcon}/>
    //       </TabPanel>
    //       <TabPanel
    //         value="9"
    //         sx={{ width: { md: "60%", sm: "100%", xs: "100%" } }}
    //       >
    //         <ElectricityForm title="Landline Bill Payment" subType="LANDLINE"  setOperatorIcon={setOperatorIcon} operatorIcon={operatorIcon}/>
    //       </TabPanel>
    //     </Box>
    //   </TabContext>
    // </Box>
