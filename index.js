const express = require("express");
const server = express();
server.use(express.json());

const projetos = [
  { id: "1", titulo: "Projeto Teste", tarefas: ["tarefa de teste"] },
  { id: "2", titulo: "Projeto Teste 2", tarefas: ["tarefa de teste 2"] }
];
// MIDDLEWARES
function checkID(req, res, next) {
  const { id } = req.params;
  const projeto = projetos.find(p => p.id == id);
  if (!projeto) {
    return res.status(400).json({ erro: "Projeto não encontrado" });
  }
  return next();
}
// LISTAGEM DE TODOS OS PROJETOS
server.get("/projetos", (req, res) => {
  return res.json(projetos);
});
// LISTAGEM DE 1 PROJETO
server.get("/projetos/:id", checkID, (req, res) => {
  const { id } = req.params;
  const projeto = projetos.find(p => p.id == id);

  return res.json(projeto);
});
// CRIAR PROJETO
server.post("/projetos", (req, res) => {
  const { id, titulo } = req.body;
  projetos.push({ id: `${id}`, titulo: `${titulo}`, tarefas: [] });
  return res.json(projetos);
});
// CRIAR TAREFA NO PROJETO
server.post("/projetos/:id/tarefas", (req, res) => {
  const { id } = req.params;
  const { titulo } = req.body;
  const projeto = projetos.find(p => p.id == id);
  projeto.tarefas.push(titulo);
  return res.json(projeto);
});
// EDITAR PROJETO
server.put("/projetos/:id", (req, res) => {
  const { id } = req.params;
  const { titulo } = req.body;
  const projeto = projetos.find(p => p.id == id);
  projeto.titulo = titulo;
  return res.json(projeto);
});
// DELETAR PROJETO
server.delete("/projetos/:id", (req, res) => {
  const { id } = req.params;
  projetos.splice(id, 1);
  return res.send("projeto deletado com sucesso!");
});

server.listen(3000, () => {
  console.log("servidor ativado");
});
