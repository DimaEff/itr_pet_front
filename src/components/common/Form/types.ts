import {Control} from "react-hook-form";


export interface WithControlProps {
    name: string;
    control: Control<any>;
}