//import express from "express";
import Hotel from "../models/Hotel.js";

export const createHotel = (async (req, res) => {

    const newHotel = new Hotel(req.body);

    try {
        const savedHotel = await newHotel.save();
        res.status(200).json(savedHotel)
    }
    catch (err) {
        res.status(500).send(err)
    }

})


export const gethotels = (async (req, res) => {


    try {
        const hotels = await Hotel.find(req.query)
        res.status(200).json(hotels)
    } catch (err) {
        res.status(500).json(err)
    }
})

export const gethotel = (async (req, res) => {
    try {
        const hotel = await Hotel.findById(req.params.id)
        res.status(200).json(hotel)
    } catch (err) {
        res.status(500).json(err)
    }
})

export const updatehotel = (async (req, res) => {
    try {
        const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        res.status(200).json(updatedHotel)
    }
    catch (err) {
        res.status(500).json(err)
    }
})

export const deletehotel = (async (req, res) => {
    try {
        const delHotel = await Hotel.findByIdAndDelete(req.params.id)
        res.status(200).json(delHotel)
    }
    catch (err) {
        res.status(500).json(err)
    }
})

export const countByCity = async (req, res, next) => {
    const cities = req.query.cities.split(",");
    try {
        const list = await Promise.all(
            cities.map((city) => {
                return Hotel.countDocuments({ city: city });
            })
        );
        res.status(200).json(list);
    } catch (err) {
        next(err);
    }
};

export const countByType = async (req, res, next) => {
    try {
        const hotelCount = await Hotel.countDocuments({ type: "hotel" });
        const apartmentCount = await Hotel.countDocuments({ type: "apartment" });
        const resortCount = await Hotel.countDocuments({ type: "resort" });
        const villaCount = await Hotel.countDocuments({ type: "villa" });
        const cabinCount = await Hotel.countDocuments({ type: "cabin" });

        res.status(200).json([
            { type: "hotel", count: hotelCount },
            { type: "apartments", count: apartmentCount },
            { type: "resorts", count: resortCount },
            { type: "villas", count: villaCount },
            { type: "cabins", count: cabinCount },
        ]);
    } catch (err) {
        next(err);
    }
};

//export default createHotel

