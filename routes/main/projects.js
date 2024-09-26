import express from 'express';
import { Projects } from '../../models/main/project.js';
import upload from '../../middleware/uploadImage.js';
const router = express.Router();

// POST route to create a new project with image
router.post('/create-project', (req, res) => {
    upload(req, res, (err) => {
      if (err) {
        return res.status(400).json({ error: err });
      } else {
        const newProject = new Projects({
          title: req.body.title,
          description: req.body.description,
          image: `/images/${req.file.filename}`,  // Store the relative image path
          link: req.body.link
        });
  
        newProject.save()
          .then((project) => res.json(project))
          .catch((error) => res.status(400).json({ error }));
      }
    });
  });
  

export default router