import PlannerTask from '../models/PlannerTask.js'

// @desc    Get user planner tasks
// @route   GET /api/v1/planner/tasks
// @access  Private
export const getTasks = async (req, res) => {
  const { isCompleted } = req.query
  try {
    const filter = { user: req.user._id }
    if (isCompleted !== undefined) {
      filter.isCompleted = isCompleted === 'true'
    }

    const tasks = await PlannerTask.find(filter).sort({ dueDate: 1 })
    res.json(tasks)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// @desc    Create a new planner task
// @route   POST /api/v1/planner/tasks
// @access  Private
export const createTask = async (req, res) => {
  const { title, description, dueDate, priority } = req.body
  try {
    const task = await PlannerTask.create({
      user: req.user._id,
      title,
      description,
      dueDate,
      priority: priority || 'medium'
    })
    res.status(201).json(task)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// @desc    Update an existing task
// @route   PUT /api/v1/planner/tasks/:id
// @access  Private
export const updateTask = async (req, res) => {
  try {
    const task = await PlannerTask.findOne({ _id: req.params.id, user: req.user._id })

    if (!task) {
      return res.status(404).json({ message: 'Task not found' })
    }

    // Update fields conditionally
    task.title = req.body.title !== undefined ? req.body.title : task.title
    task.description = req.body.description !== undefined ? req.body.description : task.description
    task.dueDate = req.body.dueDate !== undefined ? req.body.dueDate : task.dueDate
    task.isCompleted = req.body.isCompleted !== undefined ? req.body.isCompleted : task.isCompleted
    task.priority = req.body.priority !== undefined ? req.body.priority : task.priority

    const updatedTask = await task.save()
    res.json(updatedTask)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// @desc    Delete a planner task
// @route   DELETE /api/v1/planner/tasks/:id
// @access  Private
export const deleteTask = async (req, res) => {
  try {
    const task = await PlannerTask.findOneAndDelete({ _id: req.params.id, user: req.user._id })
    if (task) {
      res.json({ message: 'Task deleted successfully' })
    } else {
      res.status(404).json({ message: 'Task not found' })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
