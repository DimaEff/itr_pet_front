import {render, screen} from "@testing-library/react";
import AbcIcon from '@mui/icons-material/Abc';

import IconButton from "./IconButton";


describe(IconButton.name, () => {
    it('renders', () => {
         render(<IconButton>
             <AbcIcon />
         </IconButton>);

         const button = screen.getByRole('button');
         expect(button).toBeInTheDocument();
    });
});