import {useEffect, useMemo, useState, Dispatch} from "react";
import Fuse from "fuse.js";


interface IUseSearch<T> {
    searchInput: string;
    setSearchInput: Dispatch<string>;
    searchedValues: T[];
}

function useSearch<T> (searchValues: T[], options: Fuse.IFuseOptions<T>): IUseSearch<T> {
    const fuse = useMemo(() => new Fuse(searchValues, options), [searchValues]);

    const [searchInput, setSearchInput] = useState('');
    const [searchedValues, setSearchedValues] = useState<T[]>(searchValues);

    useEffect(() => {
        if (searchInput.length < 3) {
            setSearchedValues(searchValues);
            return;
        }

        const res = fuse.search(searchInput);
        setSearchedValues(res.map(r => r.item));
    }, [searchInput, searchValues]);

    return {searchInput, setSearchInput, searchedValues};
}

export default useSearch;