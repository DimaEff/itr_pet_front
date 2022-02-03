import React, {FC} from 'react';
import SwiperCore from "swiper";
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';

import {IconButton} from "../Buttons";


interface NavigationButtonProps {
    direction: 'next' | 'prev';
    control: SwiperCore | undefined;
}

const NavigationButton: FC<NavigationButtonProps> = ({direction, control}) => {
    if (!control) {
        return <></>
    }

    const side: { [key in typeof direction]: string } = {
        next: 'right',
        prev: 'left',
    };

    const handleSlide = () => {
        if (direction === 'prev' && control.allowSlidePrev) {
            control.slidePrev();
        } else if (direction === 'next' && control.allowSlideNext) {
            control.slideNext();
        }
    }

    return (
        <IconButton
            onClick={handleSlide}
            sx={{
                zIndex: 1,
                position: 'absolute',
                top: '50%',
                [side[direction]]: 0,
            }}
        >
            {
                direction === 'next' ?
                    <ArrowForwardIosRoundedIcon /> :
                    <ArrowBackIosNewRoundedIcon />
            }
        </IconButton>
    );
};

export default NavigationButton;