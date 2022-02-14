import {render, screen, fireEvent} from "@testing-library/react";

import ImageContainer from "./ImageContainer";


describe(ImageContainer.name, () => {
    it('renders', () => {
        render(<ImageContainer src={''}/>);

        const image = screen.getByAltText('image');
        expect(image).toBeInTheDocument();
    });

    // it('open full image on click', () => {
    //     render(<ImageContainer src={''} fullImg/>);
    //
    // });
});