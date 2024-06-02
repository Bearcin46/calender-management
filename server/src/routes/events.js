import express from "express";
const router = express.Router();
import Event from "../models/Event.js";

// Create Event
router.post("/create", async (req, res) => {
  try {
    const newEvent = new Event(req.body);
    const savedEvent = await newEvent.save();
    res.status(201).json(savedEvent);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Read Events
router.get("/", async (req, res) => {
  try {
    const events = await Event.find({ userId: req.query.userId });
    res.status(200).json(events);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update Event
router.put("/:id", async (req, res) => {
  try {
    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedEvent);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete Event
router.delete("/:id", async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Event deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router; // Use ES6 module export
