const Ambient = require('../models/ambient')

const ambientControllers = {
    getAmbients: async (req, res) => {
        let ambients
        let error = null
        try {
            ambients = await Ambient.find().populate('idProduct')
        } catch (err) { error = err }
        res.json({
            response: error ? 'ERROR' : { ambients },
            success: error ? false : true,
            error: error
        })
    },
    getOneAmbient: async (req, res) => {
        const id = req.params.id
        let ambient
        let error = null
        try {
            ambient = await Ambient.findOne({ _id: id }).populate('idProduct')
        } catch (err) { error = err }
        res.json({
            response: error ? 'ERROR' : { ambient },
            success: error ? false : true,
            error: error
        })
    },
    addAmbient: async (req, res) => {
        const { name, img, description, idProduct } = req.body
        let ambient
        let error = null
        try {
            ambient = await new Ambient({
                name,
                img,
                description,
                idProduct
            }).save()
        } catch (err) { error = err }
        res.json({
            response: error ? 'ERROR' : { ambient },
            success: error ? false : true,
            error: error
        })
    },
    modifyAmbient: async (req, res) => {
        const id = req.params.id
        const ambient = req.body
        let ambientdb
        let error = null
        try {
            ambientdb = await Ambient.findOneAndUpdate({ _id: id }, ambient, { new: true })
        } catch (err) { error = err }
        res.json({
            response: error ? 'ERROR' : { ambientdb },
            success: error ? false : true,
            error: error
        })
    },
    removeAmbient: async (req, res) => {
        const id = req.params.id
        let ambient
        let error = null
        try {
            ambient = await Ambient.findOneAndDelete({ _id: id })
        } catch (err) { error = err }
        res.json({
            response: error ? 'ERROR' : { ambient },
            success: error ? false : true,
            error: error
        })
    },
    readAmbients: async (req, res) => {
        const id = req.params.id
        let ambients
        let error = null
        try {
            ambients = await Ambient.find({ idProduct: id })
        } catch (err) { error = err }
        res.json({
            response: error ? 'ERROR' : { ambients },
            success: error ? false : true,
            error: error
        })
    }
}


module.exports = ambientControllers