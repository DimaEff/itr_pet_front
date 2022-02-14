import {render, screen} from "@testing-library/react";

import AppWrapper from "./AppWrapper";


describe(AppWrapper.name, () => {
    it('renders', () => {
        render(<AppWrapper>
            App wrapper
        </AppWrapper>);

        const childText = screen.getByText(/app wrapper/i);
        expect(childText).toBeInTheDocument();
    });
});