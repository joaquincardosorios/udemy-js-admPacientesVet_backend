import Veterinario from "../models/Veterinario.js"


const registrar = async (req,res) => {
    const { email } = req.body

    // Prevenir usuarios duplicados
    const existeUsuario = await Veterinario.findOne({ email })

    if(existeUsuario){
        const error = new Error('Usuario ya registrado');
        return res.status(400).json({msg: error.message})
    }

    try {
        //Guardar nuevo veterinario
        const veterinario = new Veterinario(req.body);
        const veterinarioGuardado = await veterinario.save();

        res.json(veterinarioGuardado)
    } catch (error) {
        console.log(error)
    }

}

const perfil =  (req,res) => {
    res.json({msje: 'Mostrando perfil'})
}

const confirmar = async (req,res) => {
    const { token } = req.params;

    const usuarioConfirmar = await Veterinario.findOne({ token });
    if(!usuarioConfirmar){
        const error = new Error('Token no valido');
        return res.status(404).json({msg: error.message})
    } 
    try {
        usuarioConfirmar.token = null;
        usuarioConfirmar.confirmado = true;
        await usuarioConfirmar.save()
        return res.json({msg: "Usuario confirmado"})
    } catch (error) {
        console.log(error)
    }
    

    console.log(usuarioConfirmar)
}

const autenticar = async (req,res) => {
    const {email, password} = req.body;
    try {
        // Comprobar si usuario existe
        const usuario = await Veterinario.findOne({email})
        if(!usuario){
            const error = new Error('El usuario no existe')
            return res.status(403).json({msg: error.message})
        } 
        // Comprobar si usuario esta confirmado
        if(!usuario.confirmado){
            const error = new Error('Tu cuenta no ha sido confirmada')
            return res.status(403).json({msg: error.message})
        } 

        //Revisar password
        if( !await usuario.comprobarPassword(password)){
            const error = new Error('La contraseña es incorrecta')
            return res.status(403).json({msg: error.message})
        } 
        res.json({msg:"Todo cool"})
        // Autenticar password de usuario



    } catch (error) {
        console.log(error)
    }
    
    



    
}



export {
    registrar,
    perfil,
    confirmar,
    autenticar
}