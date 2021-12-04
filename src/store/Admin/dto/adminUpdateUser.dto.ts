import {UpdateUserDto} from "../../User/dto/updateUser.dto";


export interface AdminUpdateUserDto extends UpdateUserDto{
    readonly uid: string;
}