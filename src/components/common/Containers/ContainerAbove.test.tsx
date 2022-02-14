import {render, screen} from "@testing-library/react";


import ContainerAbove from "./ContainerAbove";


describe(ContainerAbove.name, () => {
    render(<ContainerAbove data-testid={'container-above'}>
            test
        </ContainerAbove>);

    const containerAbove = screen.getByTestId('container-above');
    const text = screen.queryByText('test');

    it('renders container and not display child', () => {
        expect(containerAbove).toBeInTheDocument();
        expect(text).toHaveStyle('display: none');
    });

    // it('display child on mouse enter', () => {
    //     fireEvent.mouseEnter(containerAbove);
    //     expect(text).toHaveStyle('display: flex');
    // });
    //
    // it('display child on drag enter', () => {
    //     fireEvent.dragEnter(containerAbove);
    //     expect(text).toHaveStyle('display: flex');
    // });
});