const Pet = require('../models/Pet');

const getToken = require('../helpers/get-token');
const getUserByToken = require('../helpers/get-user-by-token');
const getuserByToken = require('../helpers/get-user-by-token');
const ObjectId = require('mongoose').Types.ObjectId;


module.exports = class PetController {
    static async create(req, res) {
        const { name, age, weight, color } = req.body;

        const available = true;

        //images uplaod

        const images = req.files;

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

    static async getAllUserPets(req, res) {
        const token = getToken(req);
        const user = await getUserByToken(token);

        const pets = await Pet.find({ 'user._id': user._id }).sort('-createAt');

        res.status(200).json({
            pets: pets,
        })
    }

    static async getAllUserAdoptions(req, res) {
        const token = getToken(req);
        const user = await getUserByToken(token);

        const adoptions = await Pet.find({ 'adopter._id': user._id }).sort('-createAt');

        res.status(200).json({
            adoptions
        })
    }

    static async getPetById(req, res) {
        const id = req.params.id;

        if (!ObjectId.isValid(id)) {
            return res.status(422).json({ message: 'Invalid id' });
        }

        const pet = await Pet.findOne({ _id: id });

        if (!pet) {
            return res.status(404).json({ message: 'Pet doesnt exist' });
        }

        res.status(200).json({
            pet: pet
        })
    }

    static async removePetById(req, res) {
        const id = req.params.id;

        if (!ObjectId.isValid(id)) {
            return res.status(422).json({ message: 'Invalid id' });
        }

        const pet = await Pet.findOne({ _id: id });

        if (!pet) {
            return res.status(404).json({ message: 'Pet doesnt exist' });
        }

        const token = getToken(req);
        const user = await getUserByToken(token);

        if (pet.user._id.toString() !== user._id.toString()) {
            return res.status(422).json({ message: 'There was a problem processing your request, please try again later.' });
        }

        await Pet.findByIdAndRemove(id);

        res.status(200).json({
            message: 'Pet Successfully deleted'
        })
    }

    static async updatePet(req, res) {
        const id = req.params.id;
        const { name, age, weight, color } = req.body;
        const images = req.files;

        const updateData = { name, age, weight, color, images: images.map(image => image.filename) };

        const pet = await Pet.findOne({ _id: id });
        if (!pet) return res.status(404).json({ message: 'Pet doesnt exist' });

        const token = getToken(req);
        const user = await getuserByToken(token);
        if (pet.user._id.toString() !== user._id.toString()) return res.status(422).json({ message: 'There was a problem processing your request, please try again later.' });

        if (!name) return res.status(422).json({ message: 'The name is required!' });
        if (!age) return res.status(422).json({ message: 'The age is required!!' });
        if (!weight) return res.status(422).json({ message: 'The weight is required!' });
        if (!color) return res.status(422).json({ message: 'The color is required!' });
        if (images.length === 0) return res.status(422).json({ message: 'The color is required!' });

        await Pet.findByIdAndUpdate(id, updateData);

        res.status(200).json({
            message: 'Pet successfully updated'
        })
    }

    static async schedule(req, res) {
        const id = req.params.id;

        const pet = await Pet.findOne({ _id: id });

        if (!pet) {
            return res.status(404).json({ message: 'Pet doesnt exist' })
        }

        const token = getToken(req);
        const user = await getUserByToken(token);

        if (pet.user._id.equals(user._id)) {
            return res.status(422).json({ message: 'you cannot schedule a visit with your own pet' });
        }

        if (pet.adopter) {
            if (pet.adopter._id.equals(user._id)) {
                return res.status(422).json({ message: 'you already scheduled a visit for this pet!' });
            }
        }

        pet.adopter = {
            _id: user._id,
            name: user.name,
            image: user.image,
        }

        await Pet.findByIdAndUpdate(id, pet);

        res.status(200).json({
            message: `the visit was successfully scheduled, contact ${pet.user.name} by phone ${pet.user.phone}`
        })
    }

    static async concludeAdoption(req, res) {
        const id = req.params.id;

        if (!ObjectId.isValid(id)) {
            return res.status(422).json({ message: 'Invalid id' });
        }

        const pet = await Pet.findOne({ _id: id });

        if (!pet) {
            return res.status(404).json({ message: 'Pet doesnt exist' })
        }

        const token = getToken(req);
        const user = await getUserByToken(token);

        if (pet.user._id.toString() !== user._id.toString()) {
            return res.status(422).json({ message: 'There was a problem processing your request, please try again later.' });
        }

        pet.available = false;

        await Pet.findByIdAndUpdate(id, pet);

        res.status(200).json({
            message: 'congratulations the adoption cycle was carried out successfully!'
        })



    }

}