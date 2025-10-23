import { SignRoutes } from "./SignRoutes"
import {useContext} from "react";
import {AuthContext} from "../contexts/auth.tsx";
import {OtherRoutes} from "./OtherRoutes.tsx";

export const RoutesApp: React.FC = () => {
    const { signed } = useContext(AuthContext)

    return signed ? <OtherRoutes/> : <SignRoutes/>
}