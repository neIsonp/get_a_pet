const Pet = require('../models/Pet');

const getToken = require('../helpers/get-token');
const getUserByToken = require('../helpers/get-user-by-token');


module.exports = class PetController {
    static async create(req, res) {
        const { name, age, weight, color } = req.body;

        const available = true;

        //images uplaod

        const images = req.files;

        console.log(images);

        //validation

        const fields = [
            { name: name, message: 'The name is required' },
            { name: age, message: 'The age is required' },
            { name: weight, message: 'The weight is required' },
            { name: color, message: 'The color is required' },
        ];

        for (const field of fields) {
            if (!field.name) {
                return res.status(422).json({ message: field.message });
            }
        }

        if (images.length === 0) {
            return res.status(422).json({ message: "The image is required" });
        }

        //get pet owner

        const token = getToken(req);
        const user = await getUserByToken(token);

        const pet = new Pet({
            name, age, weight, color, available,
            images: [],
            user: {
                _id: user._id,
                name: user.name,
                image: user.image,
                phone: user.phone,
            }
        });

        images.map((image) => pet.images.push(image.filename));

        try {

            const newPet = await pet.save();
            res.status(201).json({
                message: "pet successfully registered",
                newPet,
            })

        } catch (error) {
            res.status(500).json({ message: error });
        }

    }

    static async getAll(req, res) {
        const pets = await Pet.find().sort('-createAt');

        res.status(200).json({
            pets: pets
        })
    }


}