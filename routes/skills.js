import { Router } from 'express';
import Joi from 'joi';

const router = Router();

// Function to validate skill with joi schema
function validateSkill(skill) {
  const schema = Joi.object({
    name: string().min(3).required(),
  });

  return schema.validate(skill);
}

// Data
const skills = [
  { id: 1, name: 'JavaScript' },
  { id: 2, name: 'TypeScript' },
  { id: 3, name: 'Node Js' },
];

// HANDLE HTTP GET REQUESTS

router.get('/', (req, res) => {
  res.send(skills);
});

// Routes Parameters (:id)
router.get('/:id', (req, res) => {
  // Find skill id, if not exist, return 404 - Page not found
  const skill = skills.find((skill) => skill.id === parseInt(req.params.id));
  if (!skill) return res.status(404).send('Sorry, page not found!');

  res.send(skill);
});

// HANDLE HTTP POST REQUEST
router.post('/', (req, res) => {
  // Hard Core Validation - Bad Request (400)
  // if (!req.body.name || req.body.name.length < 3) {
  //   res.status(400).send('Name is required and min lenght 3 chars!');
  //   return;
  // }

  // Validate with joi schema, if not exist, return 400 - Bad request
  const { error } = validateSkill(req.body);
  if (error) return res.status(400).send(error.message);

  // Create new skill
  const skill = { id: skills.length + 1, name: req.body.name };
  skills.push(skill);
  res.send(skill);
});

// HANDLE HTTP PUT REQUEST
router.put('/:id', (req, res) => {
  // Find skill, if not exist, return 404
  const skill = skills.find((skill) => skill.id === parseInt(req.params.id));
  if (!skill) return res.status(404).send('The skill was not found!');

  // Validate skill, if invalid, return 400
  const { error } = validateSkill(req.body);
  if (error) return res.status(400).send(error.message);

  // Update skill, return the updated sill
  skill.name = req.body.name;
  res.send(skill);
});

// HANDLE HTTP DELETE REQUEST
router.delete('/:id', (req, res) => {
  // Find skill, if not exist, return 404
  const skill = skills.find((skill) => skill.id === parseInt(req.params.id));
  if (!skill) return res.status(404).send('The skill does not exist!');

  // Delete skill and return deleted skill
  const index = skills.indexOf(skill);
  skills.splice(index, 1);

  res.send(skill);
});

export default router;
