import Fastify from "fastify"
import { Sequelize, DataTypes, where } from "sequelize"
import fastifyCors from "@fastify/cors";
import dotenv from "dotenv"

dotenv.config()

const fastify = Fastify({logger: true})
const PORT = 5000
const sequelize = new Sequelize(`${process.env.DB_NAME}`, `${process.env.DB_USER}`, `${process.env.DB_PASSWORD}`, {
    host: `${process.env.DB_HOST}`,
    dialect: "postgres",    //replace this with your database
    logging: false
})

const Brew = sequelize.define(
    "Brew", 
    {
        brew_id: {type: DataTypes.INTEGER, primaryKey: true, allowNull: false},
        beans_used: {type: DataTypes.TEXT, allowNull: false},
        brewing_method: {type: DataTypes.TEXT, allowNull: false},
        coffee_content: {type: DataTypes.TEXT, allowNull: false},
        water_content: {type: DataTypes.TEXT, allowNull: false},
        rating: {type: DataTypes.INTEGER, allowNull: false},
        notes: {type: DataTypes.TEXT}
    }, 
    {
        tableName: "coffee_brews",
        timestamps: false
    }
)

await fastify.register(fastifyCors, {
    origin: ["http://localhost:5173", `http://localhost:${PORT}`],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
})

fastify.get("/brews", async (request, reply) => {
    try {
        const brewData = await Brew.findAll({ raw: true })
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
        const newBrew = await Brew.create({
            brew_id: request.body.brew_id,
            beans_used: request.body.beans_used,
            brewing_method: request.body.brewing_method,
            coffee_content: request.body.coffee_content,
            water_content: request.body.water_content,
            rating: request.body.rating,
            notes: request.body.notes
        })
        reply.code(201)
        return newBrew
    }
    catch (error) {
        reply.code(400)
        return {error: error.message}
    }
})

fastify.put("/brews/:id", async (request, reply) => {
    try {
        const [updatedBrews] = await Brew.update(
            {
                brew_id: request.body.brew_id,
                beans_used: request.body.beans_used,
                brewing_method: request.body.brewing_method,
                coffee_content: request.body.coffee_content,
                water_content: request.body.water_content,
                rating: request.body.rating,
                notes: request.body.notes
            },
            { where: { brew_id: request.body.brew_id } }
        )
        if (updatedBrews === 0) {
            reply.code(404)
            return {message: "Brew not found"}
        }
        reply.code(201)
        return {message: "Brew updated successfully"}
    }
    catch (error) {
        reply.code(500)
        return {message: error.message}
    }
})

fastify.delete("/brews/:id", async (request, reply) => {
    console.log(request.body)
    try {
        const deletedBrews = Brew.destroy({ where: { brew_id: request.body } })
        if (!deletedBrews) {
            reply.code(404)
            return {message: "Brew not found"}
        }
        reply.code(201)
        return {message: "Brew deleted successfully"}
    }
    catch (error) {
        reply.code(500)
        return {message: error.message}
    }
})

const startServer = async () => {
    try {
        await sequelize.authenticate()
        fastify.log.info("Database connected successfully.")
        await fastify.listen({port: PORT})
        fastify.log.info("Backend started successfully.")
    }
    catch (error) {
        fastify.log.error(`Unable to start the server: ${error}`)
        process.exit(1)
    }
}

startServer()