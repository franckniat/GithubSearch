import { User } from '@/components/CardUser';
import { createContext, useState, useContext } from 'react';

// Définissez un type pour les données de recherche
type SearchData = {
    loading: boolean,
    result: boolean,
    username: string,
    userdata: User,
    userRepos: [],
} | {};

// Définissez un type pour le contexte
type SearchContextType = {
 searchData: SearchData;
 setSearchData: React.Dispatch<React.SetStateAction<SearchData>>;
};

// Créez un contexte personnalisé avec le type défini
const SearchContext = createContext<SearchContextType | undefined>(undefined);

// Créez un composant Provider qui met à jour le context
const SearchProvider = ({ children }: { children: React.ReactNode }) => {
    const [searchData, setSearchData] = useState<SearchData>({});

    return (
        <SearchContext.Provider value={{ searchData, setSearchData }}>
        {children}
        </SearchContext.Provider>
    );
};

// Utilisez le hook useContext pour accéder au contexte
const useSearch = () => {
    const context = useContext(SearchContext);
    if (!context) {
        throw new Error('useSearch doit être utilisé à l\'intérieur d\'un SearchProvider');
    }
    return context;
};

export { SearchProvider, useSearch };