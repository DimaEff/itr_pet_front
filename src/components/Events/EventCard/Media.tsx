import React, {FC} from 'react';
import {CardMedia} from "@mui/material";
import {SwiperSlide} from 'swiper/react/swiper-react.js';

import {ImageContainer} from "../../common/Containers";
import {IEvent} from "../../../store";
import {Slider} from "../../common/Slider";


interface MediaProps {
    event: IEvent;
}

const Media: FC<MediaProps> = ({event}) => {
    return (
        <CardMedia sx={{width: '100%', height: 194}}>
            <Slider>
                {event.images.map(({path}) => <SwiperSlide key={path}>
                    <ImageContainer src={path} w={'100%'} h={'100%'} fullImg/>
                </SwiperSlide>)}
            </Slider>
        </CardMedia>
    );
};

export default Media;