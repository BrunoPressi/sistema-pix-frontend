import {api, buscarUsuarioPorId} from "../backend/api.ts";
import {useContext} from "react";
import {AuthContext} from "../contexts/auth.tsx";

export class UsuarioService {

    private context = useContext(AuthContext);
    private userdata = this.context.userData;
    private token: string | null= this.context.token;

     async carregarUsuario() {
        try {
            api.defaults.headers.Authorization = `Bearer ${this.token}`;
            const response = await buscarUsuarioPorId(this.userdata!.id);
            return response.Usuario;
        }
        catch (error: any) {
            console.log(error);
        }
    }

    getUserData() {
        return this.userdata;
    }

    getToken() {
         return this.token;
    }

    getContext() {
         return this.context;
    }
}