import React, {createContext, useContext, useEffect, useState} from 'react';
import Loading from "@/components/Loading";
import axiosConfig from "@/axiosConfig";

type Tag = {
    name: string,
    _id: string
}

interface ITag {
    tags: Array<Tag>,
    setTags: Function,
    isLoggedIn: boolean,
    setIsLoggedIn: Function,
    loading: boolean
};

const defaultValue: ITag = {
    tags: [],
    setTags: () => {},
    isLoggedIn: false,
    setIsLoggedIn: () => {},
    loading: false
};


const AppContext = createContext(defaultValue);

const AppProvider = ({children}: {children: any}) => {

    const [tags, setTags] = useState<Array<Tag>>([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        if(isLoggedIn){
            const fetchData = async () => {
                setLoading(true);
                const response = await axiosConfig.get(`${process.env.REACT_APP_URL_BE||""}/posts/tags`, {withCredentials: true});
                // const response = await fetch(`${process.env.REACT_APP_URL_BE||""}/posts/tags`, {
                //     method: 'GET'
                // })
                setTags(response.data.data);
                console.log(response)
                setLoading(false);
            }
            fetchData()
        }
    }, [isLoggedIn]);

    useEffect(() => {
        const refreshToken = async () => {
            setLoading(true);
            try{

                const response = await axiosConfig.get(`${process.env.REACT_APP_URL_BE||""}/auth/refresh-token`, {withCredentials: true});
                // console.log(response)
                localStorage.setItem('accessToken', JSON.stringify(response.data.access_token));
                setIsLoggedIn(true)

            }catch(error){
                const response = await axiosConfig.delete(`${process.env.REACT_APP_URL_BE||""}/auth/logout`, {withCredentials: true});
                setIsLoggedIn(false);
                localStorage.removeItem('accessToken')
            }
            setLoading(false);
        }
        refreshToken()
    }, []);

    if(loading) return <Loading />

    return (
        <AppContext.Provider value={{ tags, setTags, isLoggedIn, setIsLoggedIn, loading }}>
            {children}
        </AppContext.Provider>
    );
};

export const useTags = () => {
    const { tags} = useContext(AppContext);

    return { tags };
};

export const useAuth = () => {
    const {isLoggedIn, setIsLoggedIn, loading} = useContext(AppContext);

    const logout = async () => {
        const response = await axiosConfig.delete(`${process.env.REACT_APP_URL_BE||""}/auth/logout`, {withCredentials: true});
        setIsLoggedIn(false);
        localStorage.removeItem('accessToken')
    }

    const login = () => {
        setIsLoggedIn(true);
    }

    return {isLoggedIn, logout, login, loading}
}

export default AppProvider;