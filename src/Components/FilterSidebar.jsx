// src/components/FilterSidebar.js
import React, { memo } from "react";
import {
    Card,
    CardContent,
    Box,
    Typography,
    Grid,
    Checkbox,
    FormControlLabel,
    Slider,
    Divider,
    IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

// const FilterSidebar = ({ categories, onClose, isMobile }) => (
//     <Card
//         sx={{
//             backgroundColor: "#FFFFFF",
//             borderRadius: 2,
//             boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
//             border: "1px solid #F5F5F5",
//         }}
//     >
//         <CardContent sx={{ p: 2 }}>
//             <Box
//                 sx={{
//                     display: "flex",
//                     justifyContent: "space-between",
//                     alignItems: "center",
//                     mb: 2,
//                 }}
//             >
//                 <Typography
//                     variant="h6"
//                     sx={{ color: "#2C2C2C", fontWeight: 600, fontSize: "1.1rem" }}
//                 >
//                     FILTER BY
//                 </Typography>
//                 {isMobile && (
//                     <IconButton onClick={onClose} size="small">
//                         <CloseIcon sx={{ color: "#2C2C2C" }} />
//                     </IconButton>
//                 )}
//             </Box>

//             <Box>
//                 <Typography
//                     variant="subtitle2"
//                     sx={{ color: "#2C2C2C", mb: 1, fontWeight: 500 }}
//                 >
//                     Category
//                 </Typography>
//                 <Grid container spacing={1}>
//                     {categories.map((category) => (
//                         <Grid item xs={6} key={category}>
//                             <FormControlLabel
//                                 control={
//                                     <Checkbox
//                                         size="small"
//                                         sx={{
//                                             color: "#757575",
//                                             "&.Mui-checked": {
//                                                 color: "#424242",
//                                             },
//                                             "& .MuiSvgIcon-root": {
//                                                 fontSize: 18,
//                                             },
//                                         }}
//                                     />
//                                 }
//                                 label={category}
//                                 sx={{
//                                     margin: 0,
//                                     color: "#616161",
//                                     "& .MuiFormControlLabel-label": {
//                                         fontSize: "0.8rem",
//                                         whiteSpace: "nowrap",
//                                         overflow: "hidden",
//                                         textOverflow: "ellipsis",
//                                     },
//                                 }}
//                             />
//                         </Grid>
//                     ))}
//                 </Grid>
//             </Box>

//             <Divider sx={{ my: 2, borderColor: "#F0F0F0" }} />

//             <Box sx={{ px: 2 }}>
//                 <Typography
//                     variant="subtitle2"
//                     sx={{ color: "#2C2C2C", mb: 1, fontWeight: 500 }}
//                 >
//                     Price Range
//                 </Typography>
//                 <Slider
//                     defaultValue={[100, 1000]}
//                     valueLabelDisplay="auto"
//                     min={100}
//                     max={1000}
//                     sx={{
//                         color: "#424242",
//                         "& .MuiSlider-thumb": {
//                             backgroundColor: "#FFFFFF",
//                             border: "2px solid #424242",
//                         },
//                         "& .MuiSlider-track": {
//                             backgroundColor: "#424242",
//                         },
//                         "& .MuiSlider-rail": {
//                             backgroundColor: "#E0E0E0",
//                         },
//                     }}
//                 />

//                 <Grid container spacing={2}>
//                     <Grid item xs={6}>
//                         <Typography
//                             variant="caption"
//                             sx={{ color: "#757575", display: "block" }}
//                         >
//                             Min Price
//                         </Typography>
//                         <Typography variant="body2" sx={{ color: "#2C2C2C", fontWeight: 500 }}>
//                             ₹499
//                         </Typography>
//                     </Grid>
//                     <Grid item xs={6}>
//                         <Typography
//                             variant="caption"
//                             sx={{ color: "#757575", display: "block" }}
//                         >
//                             Max Price
//                         </Typography>
//                         <Typography variant="body2" sx={{ color: "#2C2C2C", fontWeight: 500 }}>
//                             ₹9,999
//                         </Typography>
//                     </Grid>
//                 </Grid>
//             </Box>
//         </CardContent>
//     </Card>
// );

const FilterSidebar = ({ categories, onClose, isMobile }) => (
    <Card
        sx={{
            backgroundColor: "#FFFFFF",
            borderRadius: 2,
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
            border: "1px solid #F5F5F5",
        }}
    >
        <CardContent sx={{ p: 2 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                <Typography variant="h6" sx={{ color: "#2C2C2C", fontWeight: 600, fontSize: "1.1rem" }}>
                    FILTER BY
                </Typography>
                {isMobile && (
                    <IconButton onClick={onClose} size="small">
                        <CloseIcon sx={{ color: "#2C2C2C" }} />
                    </IconButton>
                )}
            </Box>
            <Box>
                <Typography variant="subtitle2" sx={{ color: "#2C2C2C", mb: 1, fontWeight: 500 }}>
                    Category
                </Typography>
                <Grid container spacing={1}>
                    {categories.map((category) => (
                        <Grid item xs={6} key={category}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        size="small"
                                        sx={{
                                            color: "#757575",
                                            "&.Mui-checked": { color: "#424242" },
                                            "& .MuiSvgIcon-root": { fontSize: 18 },
                                        }}
                                    />
                                }
                                label={category}
                                sx={{
                                    margin: 0,
                                    color: "#616161",
                                    "& .MuiFormControlLabel-label": {
                                        fontSize: "0.8rem",
                                        whiteSpace: "nowrap",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                    },
                                }}
                            />
                        </Grid>
                    ))}
                </Grid>
            </Box>
            <Divider sx={{ my: 2, borderColor: "#F0F0F0" }} />
            <Box sx={{ px: 2 }}>
                <Typography variant="subtitle2" sx={{ color: "#2C2C2C", mb: 1, fontWeight: 500 }}>
                    Price Range
                </Typography>
                <Slider
                    defaultValue={[100, 1000]}
                    valueLabelDisplay="auto"
                    min={100}
                    max={1000}
                    sx={{
                        color: "#424242",
                        "& .MuiSlider-thumb": { backgroundColor: "#FFFFFF", border: "2px solid #424242" },
                        "& .MuiSlider-track": { backgroundColor: "#424242" },
                        "& .MuiSlider-rail": { backgroundColor: "#E0E0E0" },
                    }}
                />
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Typography variant="caption" sx={{ color: "#757575", display: "block" }}>
                            Min Price
                        </Typography>
                        <Typography variant="body2" sx={{ color: "#2C2C2C", fontWeight: 500 }}>
                            ₹499
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="caption" sx={{ color: "#757575", display: "block" }}>
                            Max Price
                        </Typography>
                        <Typography variant="body2" sx={{ color: "#2C2C2C", fontWeight: 500 }}>
                            ₹9,999
                        </Typography>
                    </Grid>
                </Grid>
            </Box>
        </CardContent>
    </Card>
);


export default memo(FilterSidebar);
