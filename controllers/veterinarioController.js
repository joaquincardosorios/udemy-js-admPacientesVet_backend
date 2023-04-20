


const registrar =  (req,res) => {
    console.log(req.body)
    res.json({msje: 'Registrando usuario'})
}

const perfil =  (req,res) => {
    res.json({msje: 'Mostrando perfil'})
}


export {
    registrar,
    perfil
}