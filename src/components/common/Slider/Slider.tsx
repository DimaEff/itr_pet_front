import React, {FC, useState} from 'react';
import SwiperCore, {Controller} from 'swiper';
import {Swiper, SwiperProps} from 'swiper/react/swiper-react.js';
import 'swiper/swiper.min.css';
import 'swiper/modules/navigation/navigation.min.css';
import 'swiper/modules/pagination/pagination.min.css';

import NavigationButton from "./NavigationButton";
import PaginationBar from "./PaginationBar";


interface SliderProps {

}

const Slider: FC<SliderProps & SwiperProps> = ({children, ...props}) => {
    const [control, setControl] = useState<SwiperCore>();

    return (
        <Swiper
            modules={[Controller]}
            controller={{control}}
            onSwiper={setControl}
        >
            {children}
            <NavigationButton direction={'prev'} control={control}/>
            <NavigationButton direction={'next'} control={control}/>
            {/*<PaginationBar control={control}/>*/}
        </Swiper>
    );
};

export default Slider;