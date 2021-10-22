import { connectToDatabase } from '$lib/db/mongodb.js'
import { ObjectId } from 'mongodb'

export async function get(request) {
  try {
    const completed = request.query.get('completed') === 'true' ? true : false
    const dbConnection = await connectToDatabase()
    const db = dbConnection.db
    const collection = db.collection('sveltetodos')
    const todos = await collection.find({ completed }).toArray()
    return {
      status: 200,
      body: {
        todos
      }
    }
  } catch (err) {
    return {
      status: 500,
      body: {
        error: 'Server error'
      }
    }
  }
}

export async function post(request) {
  try {
    const dbConnection = await connectToDatabase()
    const db = dbConnection.db
    const collection = db.collection('sveltetodos')
    const todo = JSON.parse(request.body)
    await collection.insertOne(todo)

    return {
      status: 200,
      body: {
        message: 'Success'
      }
    }
  } catch (err) {
    return {
      status: 500,
      body: {
        error: 'Server error'
      }
    }
  }
}

export async function put(request) {
  try {
    const dbConnection = await connectToDatabase()
    const db = dbConnection.db
    const collection = db.collection('sveltetodos')
    const todo = JSON.parse(request.body)
    await collection.update({ _id: ObjectId(todo._id) }, { $set: { completed: todo.completed } })

    return {
      status: 200,
      body: {
        message: 'Success'
      }
    }
  } catch (err) {
    return {
      status: 500,
      body: {
        error: 'Server error'
      }
    }
  }
}

export async function del(request) {
  try {
    const dbConnection = await connectToDatabase()
    const db = dbConnection.db
    const collection = db.collection('sveltetodos')
    const todo = JSON.parse(request.body)
    await collection.deleteOne({ _id: ObjectId(todo._id) })

    return {
      status: 200,
      body: {
        message: 'Success'
      }
    }
  } catch (err) {
    return {
      status: 500,
      body: {
        error: 'Server error'
      }
    }
  }
}