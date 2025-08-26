/* teste conexão de dados
const mongoose = require('mongoose');

async function connectToDatabase() {
  try {
    await mongoose.connect("mongodb+srv://flow:uni9@dorokiw.xvrlqme.mongodb.net/?retryWrites=true&w=majority&appName=Dorokiw", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const db = mongoose.connection;

    db.on("error", (error) => console.error("❌ Erro na conexão:", error));
    db.once("open", () => console.log("📦 Conectado ao banco de dados com sucesso!"));
    
  } catch (err) {
    console.error("❌ Erro ao conectar ao banco de dados:", err);
  }
}

module.exports = connectToDatabase;

*/
