// controllers usuarios

const usuariosGet = (req, res) => {
    res.json({
        msg: 'GET APP CONTROLLERS'
    });
}
const usuariosPost = (req, res) => {
    res.json({
        msg: 'POST APP CONTROLLERS'
    });
}
const usuariosPut = (req, res) => {
    res.json({
        msg: 'PUT APP CONTROLLERS'
    });
}
const usuariosDelete = (req, res) => {
    res.json({
        msg: 'DELETE APP CONTROLLERS'
    });
}
// exports
module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete
}