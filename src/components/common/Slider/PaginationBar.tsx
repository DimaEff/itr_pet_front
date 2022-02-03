import React, {FC} from 'react';
import SwiperCore from "swiper";
import {Box, Stack} from "@mui/material";


interface PaginationBar {
    control: SwiperCore | undefined,
}

const Pagination: FC<PaginationBar> = ({control}) => {
    return (
        <Stack
            sx={{
                zIndex: 3,
                position: 'fixed',
                top: 5,
                left: '50%',
            }}
            direction={'row'}
        >
            {/*{control?.slides.length}*/}
            {/*{new Array(control).map(i => <Box*/}
            {/*    key={i}*/}
            {/*    onClick={() => control?.slideTo(i)}*/}
            {/*    sx={{*/}
            {/*        width: 20,*/}
            {/*        height: 5,*/}
            {/*        bc: i === current ? 'red': 'white',*/}
            {/*    }}*/}
            {/*/>)}*/}
        </Stack>
    );
};

export default Pagination;