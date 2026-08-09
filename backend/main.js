import Fastify from "fastify"
import { db } from "./database.js"
import { eq } from "drizzle-orm"
import fastifyCors from "@fastify/cors";
import { coffee_brews } from "./schema.js"

const fastify = Fastify({logger: true})
const PORT = 5000

await fastify.register(fastifyCors, {
    origin: ["http://localhost:5173", `http://localhost:${PORT}`],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
})

fastify.get("/brews", async (request, reply) => {
    try {
        const brewData = await db.select().from(coffee_brews)
        reply.code(201)
        return brewData
    }
    catch (error) {
        reply.code(500)
        return {message: "An error has occurred while fetching data"}
    }
})

fastify.post("/brews/:id", async (request, reply) => {
    try {
        const { brew_id, beans_used, brewing_method, coffee_content, water_content, rating, notes } = request.body
        const [newBrew] = await db.insert(coffee_brews).values({
            brew_id, beans_used, brewing_method, coffee_content, water_content, rating, notes
        }).returning()
        reply.code(201)
        return newBrew
    }
    catch (error) {
        reply.code(400).send({error: error.message})
    }
})

fastify.put("/brews/:id", async (request, reply) => {
    try {
        const { brew_id, beans_used, brewing_method, coffee_content, water_content, rating, notes } = request.body
        const [updatedBrew] = await db.update(coffee_brews).set({
            brew_id, beans_used, brewing_method, coffee_content, water_content, rating, notes
        }).where(eq(coffee_brews.brew_id, Number(brew_id))).returning()
        if (!updatedBrew) {
            reply.code(404).send({message: "Brew not found"})
        }
        reply.code(201).send({message: "Brew updated successfully"})
    }
    catch (error) {
        reply.code(500).send({message: error.message})
    }
})

fastify.delete("/brews/:id", async (request, reply) => {
    try {
        const brew_id = request.body
        const deletedBrew = await db.delete(coffee_brews).where(eq(coffee_brews.brew_id, Number(brew_id))).returning()
        if (!deletedBrew) {
            reply.code(404).send({message: "Brew not found"})
        }
        reply.code(201).send({message: "Brew deleted successfully"})
    }
    catch (error) {
        reply.code(500).send({message: error.message})
    }
})

const startServer = async () => {
    try {
        await fastify.listen({port: PORT})
        fastify.log.info("Backend started successfully.")
    }
    catch (error) {
        fastify.log.error(`Unable to start the server: ${error}`)
        process.exit(1)
    }
}

startServer()