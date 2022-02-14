import {render, screen} from "@testing-library/react";

import Button from './Button';


describe(Button.name, () => {
    it('renders', () => {
        render(<Button>
            test
        </Button>)

        const button = screen.getByRole('button');
        expect(button).toBeInTheDocument();

        const text = screen.getByText(/test/);
        expect(text).toBeInTheDocument();
    });
});