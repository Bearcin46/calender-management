import express from "express";
import Eventdetails from "../models/Events";

const router = express.Router();

//creating a event

router.post("/create", async (req, res) => {
  try {
    const newEvent = new Eventdetails(req.body);
    const savedEvent = await newEvent.save();
    res.status(201).json(savedEvent);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//Read Events
router.get("/", async (req, res) => {
  try {
    const events = await Eventdetails.find({ userId: req.query.userId });
    res.status(200).json(events);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update Event
router.put("/:id", async (req, res) => {
  try {
    const updatedEvent = await Eventdetails.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedEvent);
  } catch (error) {
    res.status(400).json({ error: err.message });
  }
});

// Delete Event
router.delete("/:id", async (req, res) => {
  try {
    await Eventdetails.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Event deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
