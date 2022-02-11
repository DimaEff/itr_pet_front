import React, {Children, FC, useState} from 'react';
import SwiperCore, {Controller} from 'swiper';
import {Swiper, SwiperProps} from 'swiper/react/swiper-react.js';
import 'swiper/swiper.min.css';
import 'swiper/modules/navigation/navigation.min.css';
import 'swiper/modules/pagination/pagination.min.css';

import NavigationButton from "./NavigationButton";


interface SliderProps {

}

const Slider: FC<SliderProps & SwiperProps> = ({children, ...props}) => {
    const [control, setControl] = useState<SwiperCore>();

    const childrenArray = Children.toArray(children);

    return (
        <Swiper
            modules={[Controller]}
            controller={{control}}
            onSwiper={setControl}
            style={{
                width: '100%',
                height: '100%',
            }}
            {...props}
        >
            {children}
            {
                childrenArray.length > 1 && <>
                    <NavigationButton direction={'prev'} control={control}/>
                    <NavigationButton direction={'next'} control={control}/>
                </>
            }
        </Swiper>
    );
};

export default Slider;